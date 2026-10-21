/**
 * Our own Instagram feed, fetched on the server.
 *
 * ## Server-side, whichever source
 *
 * Always fetched on the server, cached, and rendered as ordinary markup. No
 * third-party script, no cookies from anyone, no layout shift. This site is
 * 55 KB with no images at all, and a drop-in widget would arrive with a
 * JavaScript bundle heavier than the whole page to show six photographs — we
 * sell fast websites, and losing that argument on our own homepage is not on.
 *
 * Which is why Behold is used through its JSON feed rather than its embed
 * script. A hosted feed and a client-side widget are not the same trade, and
 * conflating them nearly cost us the good version: the JSON gives us somebody
 * else's Meta compliance and token maintenance while the page stays exactly as
 * light as it is now.
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
 * ## Three ways in, tried in order
 *
 * `BEHOLD_FEED_ID` — a hosted JSON feed. No Meta app, no token, nothing to
 * refresh. Preferred, because the other two both failed on our own account:
 * Meta will not issue a token to someone who does not fully administer the
 * Page and the Instagram account, and sorting that out is a business-settings
 * job rather than a code one.
 *
 * `INSTAGRAM_TOKEN` — direct from Meta. Lasts 60 days and must be refreshed
 * before it expires, which is the one real maintenance cost. Setting
 * `INSTAGRAM_USER_ID` alongside it selects the Facebook-login variant, where
 * the account is reached through its linked Page.
 *
 * None of them set: an empty list, and the section does not render.
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
/**
 * One post from Behold's JSON feed.
 *
 * Their shape, not Meta's. Fields are optional because a hosted feed is a
 * contract we do not control, and the failure we care about is a silently
 * empty grid rather than a thrown error.
 */
interface BeholdPost {
  id?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  permalink?: string;
  prunedCaption?: string;
  caption?: string;
  mediaType?: string;
  sizes?: { medium?: { mediaUrl?: string }; small?: { mediaUrl?: string } };
}

/**
 * Whatever was pasted into the environment variable, as a feed URL.
 *
 * Behold's dashboard shows both a feed id and a full endpoint, and which one
 * lands in the variable depends on who copied it. Accepting either is three
 * lines; the alternative is a 404 whose only clue is that somebody pasted the
 * wrong half of a page, which is exactly how the first attempt failed.
 */
function beholdUrl(value: string): string {
  const raw = value.trim();

  /*
   * An embed snippet, which is what the dashboard offers first.
   *
   * Behold's copy button gives a script tag, so that is what gets pasted —
   * twice now. The feed id is inside it as an attribute, so rather than
   * explaining which half of the page to copy, take it from either.
   */
  const attribute = raw.match(/(?:feed-id|data-feed-id|feedId)\s*=\s*["']([^"']+)["']/i);
  if (attribute) return `https://feeds.behold.so/${attribute[1]}`;

  const trimmed = raw.replace(/\/+$/, '');

  if (/^https?:\/\//i.test(trimmed)) {
    /*
     * Only the JSON host is a feed. A widget script URL answers 200 with
     * JavaScript, which fails later as a parse error and reads like our bug
     * rather than the wrong URL — so it is rejected here where it can be named.
     */
    try {
      const host = new URL(trimmed).hostname.toLowerCase();
      if (host !== 'feeds.behold.so') {
        const id = trimmed.split('/').filter(Boolean).pop() ?? '';
        if (/^[A-Za-z0-9_-]{6,}$/.test(id) && !/\.(?:js|css|json)$/i.test(id)) {
          return `https://feeds.behold.so/${id}`;
        }
      }
    } catch { /* fall through and use it as given */ }
    return trimmed;
  }

  // A bare id, or the tail of a path somebody copied.
  const id = trimmed.split('/').filter(Boolean).pop() ?? trimmed;
  return `https://feeds.behold.so/${id}`;
}

async function fromBehold(feedId: string, limit: number): Promise<InstagramPost[]> {
  const endpoint = beholdUrl(feedId);
  const response = await fetch(endpoint, { next: { revalidate: 3600 } });

  if (!response.ok) {
    // The endpoint is logged, not just the status. A feed id is not a secret —
    // it is in the embed code on every page that uses one — and a 404 with no
    // indication of what was requested is unanswerable.
    console.error(`Behold feed unavailable: ${response.status} for ${endpoint}`);
    return [];
  }

  /*
   * Behold has returned both a bare array and an object with `posts` across
   * versions of their API. Accepting either costs one line and means a change
   * at their end degrades to an empty section rather than a crash.
   */
  /*
   * Checked before parsing, so a widget script served with a 200 is reported as
   * the wrong URL rather than as a JSON syntax error three frames deeper.
   */
  const type = response.headers.get('content-type') ?? '';
  if (!/json/i.test(type)) {
    console.error(
      `Behold returned ${type || 'no content type'} from ${endpoint} — that is the `
      + 'widget script, not the JSON feed. Use the feed id or the feeds.behold.so URL.',
    );
    return [];
  }

  const body = (await response.json()) as BeholdPost[] | { posts?: BeholdPost[] };
  const posts = Array.isArray(body) ? body : body.posts ?? [];

  return posts
    .map((post): InstagramPost | null => {
      // Prefer a sized variant: the full-resolution original is far more than a
      // 300px tile needs, and Behold offers smaller renditions for free.
      const image = post.sizes?.medium?.mediaUrl
        ?? post.sizes?.small?.mediaUrl
        ?? (post.mediaType === 'VIDEO' ? post.thumbnailUrl : post.mediaUrl)
        ?? post.mediaUrl;

      if (!image || !post.permalink) return null;

      return {
        id: post.id ?? post.permalink,
        image,
        permalink: post.permalink,
        caption: altFrom(post.prunedCaption ?? post.caption),
        isVideo: post.mediaType === 'VIDEO',
      };
    })
    .filter((post): post is InstagramPost => post !== null)
    .slice(0, limit);
}

export async function recentPosts(limit = 6): Promise<InstagramPost[]> {
  /*
   * Behold first. It needs no Meta app, no token and no refresh, and the two
   * direct routes both dead-ended on account permissions rather than on code.
   */
  const feedId = process.env.BEHOLD_FEED_ID;
  if (feedId) {
    try {
      return await fromBehold(feedId, limit);
    } catch (cause) {
      console.error(`Behold feed failed: ${cause instanceof Error ? cause.message : cause}`);
      return [];
    }
  }

  const token = process.env.INSTAGRAM_TOKEN;
  if (!token) return [];

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
