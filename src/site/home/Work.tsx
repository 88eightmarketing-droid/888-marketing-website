import type { CSSProperties } from "react";
import { work, type Piece } from "@/data/site";
import { Reveal } from "./Reveal";

/**
 * The work index. Every piece is a real recording of the client's live site
 * (scripts/record-work.mjs), playing while it is on screen; clicking opens the
 * live site. The layout alternates scale and side so the page has a rhythm
 * rather than a grid: the first piece runs the full width.
 *
 * Videos carry `data-autoplay`; Home plays them in view and pauses them out of
 * it, so five clips never decode at once on a phone.
 */
export default function Work() {
  return (
    <section id="work" className={layout.root}>
      <header className={layout.head}>
        <p className={type.eyebrow} data-fade>{work.eyebrow} <span className="text-dim/60">({String(work.pieces.length).padStart(2, "0")})</span></p>
        <Reveal as="h2" text={work.title} className={type.h2} />
      </header>

      <div className={layout.list}>
        {work.pieces.map((p, i) => (
          <Project key={p.key} piece={p} index={i} />
        ))}
      </div>
    </section>
  );
}

const SHAPES = [
  { media: "md:col-span-12", meta: "md:col-span-12", aspect: "aspect-[16/10] md:aspect-[16/8]" },
  { media: "md:col-span-7", meta: "md:col-span-4 md:col-start-9 md:self-end", aspect: "aspect-[16/10]" },
  { media: "md:col-span-7 md:col-start-6 md:row-start-1", meta: "md:col-span-4 md:col-start-1 md:row-start-1 md:self-end", aspect: "aspect-[16/10]" },
  { media: "md:col-span-8 md:col-start-2", meta: "md:col-span-3 md:col-start-10 md:self-end", aspect: "aspect-[16/10]" },
  { media: "md:col-span-6", meta: "md:col-span-4 md:col-start-8 md:self-end", aspect: "aspect-[16/10]" },
];

function Project({ piece: p, index }: { piece: Piece; index: number }) {
  const shape = SHAPES[index % SHAPES.length];
  return (
    <article className={layout.item}>
      <a
        href={p.url}
        target="_blank"
        rel="noreferrer"
        data-cursor="Visit"
        data-media
        aria-label={`${p.name}: open ${p.domain} in a new tab`}
        className={`${layout.media} ${shape.media} ${shape.aspect}`}
      >
        <video
          data-autoplay
          className={layout.video}
          src={`/work/${p.key}.mp4`}
          poster={`/work/${p.key}.jpg`}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        />
      </a>
      <div className={`${layout.meta} ${shape.meta}`} data-fade style={{ "--d": "150ms" } as CSSProperties}>
        <p className={type.index}>{String(index + 1).padStart(2, "0")} — {p.kind} · {p.place}</p>
        <h3 className={type.name}>{p.name}</h3>
        <p className={type.line}>{p.line}</p>
        <a href={p.url} target="_blank" rel="noreferrer" className={type.link}>{p.domain} <span aria-hidden>↗</span></a>
      </div>
    </article>
  );
}

const layout = {
  root: "bg-night px-5 pb-24 pt-10 md:px-10 md:pb-40",
  head: "flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-start md:justify-between",
  list: "mt-16 flex flex-col gap-24 md:mt-28 md:gap-40",
  item: "grid gap-6 md:grid-cols-12 md:gap-x-6 md:gap-y-8",
  media: "group relative block overflow-hidden rounded-[6px] bg-night-2",
  video: "h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.03]",
  meta: "flex flex-col gap-3",
};

const type = {
  eyebrow: "font-mono text-[11px] uppercase tracking-[0.12em] text-dim",
  h2: "max-w-[14ch] font-display text-[clamp(2.6rem,6.4vw,7rem)] font-medium leading-[0.92] tracking-[-0.05em] text-bone md:text-right",
  index: "font-mono text-[11px] uppercase tracking-[0.12em] text-dim",
  name: "font-display text-[clamp(2rem,3.6vw,3.75rem)] font-medium leading-[0.95] tracking-[-0.045em] text-bone",
  line: "max-w-[34ch] text-[15px] leading-[1.55] text-bone/65",
  link: "mt-1 inline-flex min-h-11 w-fit items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-bone underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:decoration-flare",
};
