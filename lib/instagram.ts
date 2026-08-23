/**
 * Our own Instagram feed, fetched on the server.
 *
 * ## Why not a widget
 *
 * Behold, Elfsight and the rest are the right answer for a *client's* site —
 * they carry the Meta compliance work and the client pays a few dollars a month
 * for somebody else to keep it alive.
 *
 * They are the wrong answer here. This site is 55 KB with no images at all, and
 * a widget would arrive with a JavaScript bundle heavier than the entire page
 * to show six photographs. We sell fast websites; loading somebody else's
 * framework to render a photo grid loses that argument on our own homepage.
 *
 * So the posts are fetched on the server, cached, and rendered as ordinary
 * markup. No third-party script, no cookies from anyone, no layout shift.
 *
 * ## Why this does not need App Review
 *
 * App Review and Advanced Access exist so an app can act for accounts that do
 * not belong to whoever built it. This account belongs to us. An app in
 * development mode can read the accounts of its own admins and testers, which
 * is exactly and only what this does.
 *
 * That is also why this approach does not generalise to clients — see the
 * handbook, "Putting a Client's Instagram Feed on Their Site".
 *
 * ## The token
 *
 * `INSTAGRAM_TOKEN` is a long-lived access token. It lasts 60 days and must be
 * refreshed before it expires, which is the one real maintenance cost. Setup
 * steps are in the handbook.
 *
 * `INSTAGRAM_USER_ID` is set only for the Facebook-login route — it is the
 * Instagram account's numeric id, and its presence is what selects that path.
 *
 * With no token configured, this returns an empty list and the section does not
 * render. The site is complete without it, which is deliberate: a feed is worth
 * having and never worth a broken homepage.
 */

export interface InstagramPost {
  id: string;
  /** The image to show. For a video this is the thumbnail. */
  image: string;
  permalink: string;
  /** First line of the caption, for alt text. Never rendered as a claim. */
  caption?: string;
  isVideo: boolean;
}

interface GraphMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
}

const FIELDS = 'id,media_type,media_url,thumbnail_url,permalink,caption';

/**
 * Alt text from a caption.
 *
 * Captions are marketing copy with hashtags and emoji, which makes a poor
 * description for somebody using a screen reader. The first sentence is
 * usually the only part written as a sentence, so that is what is taken, and
 * the hashtag block at the end is dropped.
 */
function altFrom(caption: string | undefined): string | undefined {
  if (!caption) return undefined;

  const firstLine = caption.split('\n').find((line) => line.trim().length > 0);
  if (!firstLine) return undefined;

  const withoutTags = firstLine.replace(/#[\w]+/g, '').replace(/\s{2,}/g, ' ').trim();
  if (withoutTags.length < 4) return undefined;

  return withoutTags.length > 120 ? `${withoutTags.slice(0, 117).trimEnd()}…` : withoutTags;
}

/**
 * The latest posts, or an empty list.
 *
 * Never throws. A homepage must not fail to render because Meta is having an
 * afternoon, and there is no state in which an empty feed is worse than an
 * error page.
 */
export async function recentPosts(limit = 6): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_TOKEN;
  if (!token) return [];

  /*
   * Two ways in, because Meta offers two and only one of them works per setup.
   *
   *   Instagram login — the account authorises the app directly and the token
   *   reads `me` on graph.instagram.com. Cleanest, and it needs the account to
   *   hold an Instagram Tester role on the app.
   *
   *   Facebook login — the account is reached through the Facebook Page it is
   *   linked to, so the token is a Page token and the media lives under the
   *   Instagram user's own id on graph.facebook.com.
   *
   * Setting INSTAGRAM_USER_ID picks the second. Supporting both costs four
   * lines and saves being blocked on which one Meta lets us finish today.
   */
  const igUserId = process.env.INSTAGRAM_USER_ID;

  const url = igUserId
    ? new URL(`https://graph.facebook.com/v21.0/${igUserId}/media`)
    : new URL('https://graph.instagram.com/me/media');

  url.searchParams.set('fields', FIELDS);
  url.searchParams.set('limit', String(Math.min(limit * 2, 25)));
  url.searchParams.set('access_token', token);

  try {
    const response = await fetch(url, {
      // Revalidated hourly. Instagram's CDN URLs expire after a day or so, so a
      // longer cache would eventually serve links to images that have gone.
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      // Loud in the log, silent on the page. A 190 here means the token has
      // expired and somebody has sixty days of notice they did not act on.
      console.error(`Instagram feed unavailable: ${response.status} ${await response.text()}`);
      return [];
    }

    const body = (await response.json()) as { data?: GraphMedia[] };

    return (body.data ?? [])
      .map((media): InstagramPost | null => {
        const image = media.media_type === 'VIDEO' ? media.thumbnail_url : media.media_url;
        // A video whose thumbnail has not finished processing has neither, and
        // an empty frame in the grid looks like a broken page.
        if (!image) return null;

        return {
          id: media.id,
          image,
          permalink: media.permalink,
          caption: altFrom(media.caption),
          isVideo: media.media_type === 'VIDEO',
        };
      })
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, limit);
  } catch (cause) {
    console.error(`Instagram feed failed: ${cause instanceof Error ? cause.message : cause}`);
    return [];
  }
}
