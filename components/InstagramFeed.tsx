import { recentPosts } from '@/lib/instagram';
import { SOCIALS } from '@/components/Social';

/**
 * The feed, as plain markup.
 *
 * A server component, so the photographs are in the HTML that arrives. Nothing
 * here runs in the browser and nothing is fetched from a third party at render
 * time — which is the whole reason it is built this way rather than dropped in
 * as a widget.
 *
 * It renders nothing at all when there are no posts. That covers a missing
 * token, an expired one, and Meta having an afternoon, and in every case an
 * absent section is better than an empty box with a heading over it.
 */

const INSTAGRAM = SOCIALS.find((s) => s.name === 'Instagram')!;

export default async function InstagramFeed() {
  const posts = await recentPosts(6);

  // Fewer than a full row is a gap in the page rather than a gallery.
  if (posts.length < 3) return null;

  return (
    <section className="border-y border-rule bg-paper-deep">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        {/*
          * Named as a live feed, on purpose.
          *
          * It read as "some photographs we chose", which is the one thing it is
          * not. Every prospect who says "I just use Instagram" is looking at the
          * answer to their own objection here — but only if they can tell that
          * the grid fills itself. So: the glyph, the handle, and a line saying
          * out loud that this updates when we post.
          *
          * That last line is the sales pitch. It is the difference between a
          * visitor admiring our photographs and a visitor wanting this on their
          * own site.
          */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                <path d={INSTAGRAM.path} />
              </svg>
              Live from Instagram
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl">
              <a href={INSTAGRAM.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                @88eightmarketing
              </a>
            </h2>
            <p className="mt-3 max-w-[40ch] text-ink-soft">
              This section fills itself. We post to Instagram, it appears here —{' '}
              <span className="text-ink">and it can do the same on your site.</span>
            </p>
          </div>

          <a
            href={INSTAGRAM.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d={INSTAGRAM.path} />
            </svg>
            Follow
          </a>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {posts.map((post, index) => (
            <li key={post.id}>
              <a
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden bg-rule"
              >
                {/*
                  * Dimensions are declared so the grid holds its shape before
                  * the images arrive. Without them the page reflows as each one
                  * lands, which on a site selling web work is the wrong thing
                  * for a visitor to notice.
                  *
                  * Instagram's CDN serves one size and takes no resizing
                  * parameters, so there is no srcset to offer. The tiles are
                  * small; the images are not.
                  */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.caption ?? '888 Marketing on Instagram'}
                  width={640}
                  height={640}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {post.isVideo && (
                  <span
                    aria-hidden
                    className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-paper"
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/*
          * The ask, immediately under the proof.
          *
          * Somebody who has just worked out that this grid is live is as close
          * to wanting one as they will ever be. Making them scroll back up to
          * the contact form to act on it loses most of them.
          */}
        <p className="mt-8 text-sm text-ink-soft">
          Want your feed on your own site?{' '}
          <a href="#start" className="text-accent underline underline-offset-4">
            Tell us your business name
          </a>{' '}
          and we will build the page first.
        </p>
      </div>
    </section>
  );
}
