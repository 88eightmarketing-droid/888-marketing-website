'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Real client sites, running.
 *
 * These replaced two demonstration pages built for invented businesses. The
 * demos were honest and clearly labelled, but "here is something we made up"
 * is a far weaker argument than "here is a real business, at its real address,
 * open it and check". For an agency selling websites, the only proof that
 * cannot be argued with is a website belonging to somebody else.
 *
 * Live iframes rather than screenshots, for the same reason: a static image of
 * a site invites the question of whether the site exists.
 *
 * They load only once scrolled into view — two embedded sites on first paint
 * would be indefensible on a phone.
 */

interface Piece {
  url: string;
  domain: string;
  name: string;
  kind: string;
  note: string;
}

const PIECES: Piece[] = [
  {
    url: 'https://classeskin.com',
    domain: 'classeskin.com',
    name: 'Classé Skin & Sculpt',
    kind: 'Wellness · San Jose',
    note: 'A treatment menu people actually read, and a booking path that does not make anyone hunt for it.',
  },
  {
    url: 'https://getkickz.com',
    domain: 'getkickz.com',
    name: 'GetKickz',
    kind: 'Retail · Streetwear',
    note: 'Built around the drop. The thing that matters is above the fold and everything else gets out of its way.',
  },
];

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
      { rootMargin: '300px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={ref} className="group">
      {/* Browser chrome, drawn rather than imaged so it stays crisp. */}
      <div style={{ borderRadius: 'var(--radius-card)' }}
        className="overflow-hidden border border-rule bg-white shadow-[0_1px_2px_rgba(20,18,15,0.06),0_12px_40px_-12px_rgba(20,18,15,0.25)]">
        <div className="flex items-center gap-2 border-b border-rule bg-paper-deep px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="ml-2 truncate font-[family-name:var(--font-sans)] text-[11px] text-ink-faint">
            {piece.domain}
          </span>
        </div>

        <div className="relative aspect-[4/3] bg-paper">
          {visible ? (
            <iframe
              src={piece.url}
              title={`${piece.name} — a site we built`}
              loading="lazy"
              // Somebody else's live site: give it nothing.
              sandbox="allow-scripts allow-same-origin"
              referrerPolicy="no-referrer"
              className="absolute left-0 top-0 origin-top-left border-0"
              style={{ width: '200%', height: '200%', transform: 'scale(0.5)' }}
            />
          ) : (
            <div className="absolute inset-0 animate-pulse bg-paper-deep" />
          )}
          {/* Keeps the embed from stealing scroll and taps on a phone. */}
          <a
            href={piece.url}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`Open ${piece.name}`}
          />
        </div>
      </div>

      <figcaption className="mt-5">
        <p className="eyebrow">{piece.kind}</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-tight">
          {piece.name}
        </p>
        <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-ink-soft">{piece.note}</p>
        <a
          href={piece.url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block text-sm text-accent underline underline-offset-4"
        >
          Open {piece.domain}
        </a>
      </figcaption>
    </figure>
  );
}

export default function WorkShowcase() {
  return (
    <div className="grid gap-12 sm:grid-cols-2 sm:gap-8">
      {PIECES.map((piece) => (
        <Frame key={piece.url} piece={piece} />
      ))}
    </div>
  );
}
