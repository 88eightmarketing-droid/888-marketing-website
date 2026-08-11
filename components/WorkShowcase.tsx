'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Real pages, running.
 *
 * Not screenshots and not mockups — live iframes of concept pages the platform
 * actually produced. For an agency selling websites, the honest proof is the
 * websites, and a static image of one invites the question of whether it exists.
 *
 * They load lazily and only once scrolled into view: three embedded pages on
 * first paint would be indefensible on a phone.
 */

interface Piece {
  slug: string;
  name: string;
  kind: string;
  note: string;
}

const PIECES: Piece[] = [
  {
    slug: 'demo-valley-tree',
    name: 'Valley Tree Service',
    kind: 'Trades',
    note: 'Phone-first. Someone with a limb through the fence is not reading an About page.',
  },
  {
    slug: 'demo-linden-spa',
    name: 'Linden Row Spa',
    kind: 'Wellness',
    note: 'Booking-led and photographic. The same platform, and not a relation of the one on the left.',
  },
];

const BASE = 'https://agency-previews-888-marketing.vercel.app/site';

function Frame({ piece }: { piece: Piece }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={ref} className="group">
      {/* Browser chrome, drawn rather than imaged so it stays crisp. */}
      <div className="overflow-hidden border border-rule bg-white shadow-[0_1px_2px_rgba(20,18,15,0.06),0_12px_40px_-12px_rgba(20,18,15,0.25)]">
        <div className="flex items-center gap-2 border-b border-rule bg-paper-deep px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="ml-2 truncate font-[family-name:var(--font-sans)] text-[11px] text-ink-faint">
            {piece.slug.replace('demo-', '')}.com
          </span>
        </div>

        <div className="relative aspect-[4/3] bg-paper">
          {visible ? (
            <iframe
              src={`${BASE}/${piece.slug}`}
              title={`${piece.name} — concept page`}
              loading="lazy"
              // A live page from another origin: give it nothing.
              sandbox="allow-scripts"
              referrerPolicy="no-referrer"
              className="absolute left-0 top-0 origin-top-left border-0"
              style={{ width: '200%', height: '200%', transform: 'scale(0.5)' }}
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-paper-deep" />
          )}
          {/* Keeps the embed from stealing scroll and clicks on a phone. */}
          <a
            href={`${BASE}/${piece.slug}`}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`Open the ${piece.name} concept`}
          />
        </div>
      </div>

      <figcaption className="mt-5">
        <p className="eyebrow">{piece.kind}</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight">
          {piece.name}
        </p>
        <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-ink-soft">{piece.note}</p>
      </figcaption>
    </figure>
  );
}

export default function WorkShowcase() {
  return (
    <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
      {PIECES.map((piece) => (
        <Frame key={piece.slug} piece={piece} />
      ))}
    </div>
  );
}
