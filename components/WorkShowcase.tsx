import Image, { type StaticImageData } from 'next/image';

import classeskin from '@/public/work/classeskin.png';
import getkickz from '@/public/work/getkickz.png';

/**
 * Real client sites, running.
 *
 * These replaced two demonstration pages built for invented businesses. The
 * demos were honest and clearly labelled, but "here is something we made up"
 * is a far weaker argument than "here is a real business, at its real address,
 * open it and check". For an agency selling websites, the only proof that
 * cannot be argued with is a website belonging to somebody else.
 *
 * ## Captures, not live embeds, and this was the other way round
 *
 * These were `<iframe>`s of the running sites, on the reasoning that a static
 * image invites the question of whether the site exists. The reasoning was
 * sound and the result was not: an embed is somebody else's page loading over
 * somebody else's network inside ours, and on the live site both frames were
 * routinely still blank — so the single strongest argument this business has,
 * on the page where it makes it, was two empty rectangles.
 *
 * The link under each one answers "does it exist" better than an embed ever
 * did, because it opens the actual site in the actual browser. So: a real
 * capture that always paints, above a link that always works.
 *
 * Recapture with headless Chrome when a client redesigns:
 *   chrome --headless --window-size=1440,1080 --virtual-time-budget=9000 \
 *     --screenshot=public/work/<name>.png https://<domain>
 */

interface Piece {
  url: string;
  domain: string;
  name: string;
  kind: string;
  note: string;
  shot: StaticImageData;
}

const PIECES: Piece[] = [
  {
    url: 'https://classeskin.com',
    domain: 'classeskin.com',
    name: 'Classé Skin & Sculpt',
    kind: 'Wellness · San Jose',
    note: 'A treatment menu people actually read, and a booking path that does not make anyone hunt for it.',
    shot: classeskin,
  },
  {
    url: 'https://getkickz.com',
    domain: 'getkickz.com',
    name: 'GetKickz',
    kind: 'Retail · Streetwear',
    note: 'Built around the drop. The thing that matters is above the fold and everything else gets out of its way.',
    shot: getkickz,
  },
];

function Frame({ piece }: { piece: Piece }) {
  return (
    <figure className="group">
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

        <div className="relative aspect-[4/3] overflow-hidden bg-paper">
          <Image
            src={piece.shot}
            alt={`${piece.name} — a site we built, as it looks today`}
            sizes="(max-width: 639px) 100vw, 46vw"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
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
