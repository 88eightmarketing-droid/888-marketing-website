'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The proof, in the first screen — two real client sites, cross-fading.
 *
 * This slot has been through several versions and the reasoning is worth
 * keeping. First an abstract animation of a layout composing itself, which was
 * pleasant and told a plumber nothing. Then a phone frame showing a page for an
 * invented tree service — better, because it was a real page, but a phone-sized
 * window and a made-up business are both ways of underselling.
 *
 * Now: real client work, full width, rotating. Two sites that look nothing like
 * each other is the argument, made without a word of copy — a visitor watching
 * a spa become a streetwear shop has understood "you will not get a template"
 * faster than any sentence could tell them.
 *
 * Both frames stay mounted and only their opacity changes. Swapping the `src`
 * would reload the site on every turn, which flashes white and costs the
 * visitor bandwidth for something they already looked at.
 */

interface Piece {
  url: string;
  domain: string;
  name: string;
  where: string;
}

const PIECES: Piece[] = [
  { url: 'https://classeskin.com', domain: 'classeskin.com', name: 'Classé Skin & Sculpt', where: 'San Jose' },
  { url: 'https://getkickz.com', domain: 'getkickz.com', name: 'GetKickz', where: 'Streetwear' },
];

const INTERVAL = 7000;

export default function HeroProof() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  // Above the fold, so effectively eager — the observer only guards against a
  // phone that lands mid-page paying for it twice.
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
      { rootMargin: '500px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Rotation stops for anyone who has asked for less motion, and while the tab
  // is in the background — nobody needs a carousel running in a tab they left.
  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % PIECES.length);
    }, INTERVAL);

    return () => window.clearInterval(timer);
  }, [visible]);

  const current = PIECES[index];

  return (
    <div ref={ref} className="relative">
      <div className="overflow-hidden border border-rule bg-white shadow-[0_2px_4px_rgba(20,18,15,0.05),0_24px_60px_-20px_rgba(20,18,15,0.35)]">
        {/* Browser chrome, drawn rather than imaged so it stays sharp. */}
        <div className="flex items-center gap-2 border-b border-rule bg-paper-deep px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="ml-3 truncate rounded bg-white/70 px-3 py-1 text-[11px] tabular-nums text-ink-faint transition-opacity duration-500">
            {current.domain}
          </span>
        </div>

        <div className="relative aspect-[16/11] bg-paper">
          {PIECES.map((piece, i) => (
            <div
              key={piece.url}
              aria-hidden={i !== index}
              className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              {visible ? (
                <iframe
                  src={piece.url}
                  title={`${piece.name} — a site we built`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  sandbox="allow-scripts allow-same-origin"
                  referrerPolicy="no-referrer"
                  className="absolute left-0 top-0 origin-top-left border-0"
                  style={{ width: '200%', height: '200%', transform: 'scale(0.5)' }}
                />
              ) : (
                <div className="absolute inset-0 animate-pulse bg-paper-deep" />
              )}
            </div>
          ))}

          {/* Keeps the embed from stealing scroll and taps. */}
          <a
            href={current.url}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`Open ${current.domain}`}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm text-ink-faint">
          <span className="text-ink">{current.name}</span>, {current.where} — one of ours.{' '}
          <a
            href={current.url}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline underline-offset-4"
          >
            Open it
          </a>
        </p>

        {/* Small, and clickable — a visitor who wants the other one should not
            have to wait seven seconds for it. */}
        <div className="ml-auto flex items-center gap-2">
          {PIECES.map((piece, i) => (
            <button
              key={piece.url}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${piece.name}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-accent' : 'w-1.5 bg-ink/20 hover:bg-ink/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
