"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "@/effects/magnetic/Magnetic";
import { useReducedMotion } from "@/lib/motion";
import { work } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

/**
 * The work, which is now what the page is about.
 *
 * This used to be two cards side by side, below the fold, under a headline
 * that had already made the site's whole argument. The argument has moved: the
 * page no longer tells anybody we build before charging, it shows two real
 * businesses at their own addresses and invites them to go and look.
 *
 * So each piece gets a screen to itself and is held there while you read it,
 * rather than being a thumbnail competing with the one beside it. Two sites
 * shown properly is a better portfolio than twelve shown small — and it is
 * also the honest size of what we can put here, because a concept sent to a
 * prospect who has not hired us is not work we have done.
 *
 * The capture always paints; the link under it opens the live site. If the two
 * ever disagree the live site is right and the capture is stale, which is why
 * the domain is printed on the frame rather than only in the markup.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  useEffect(() => {
    if (still || !root.current) return;

    const ctx = gsap.context(() => {
      /*
       * Desktop only. Pinning two tall stages on a phone turns an already long
       * page into a scroll somebody abandons, and the effect it buys cannot be
       * seen at 375px anyway.
       */
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          for (const piece of gsap.utils.toArray<HTMLElement>("[data-piece]")) {
            const frame = piece.querySelector("[data-frame]");
            const meta = piece.querySelector("[data-meta]");
            if (!frame || !meta) continue;

            /*
             * Transform and opacity only — the two things the compositor can
             * move without laying the page out again. Scrubbed rather than
             * played, so the motion belongs to the scroll and reverses when
             * somebody scrolls back up.
             */
            gsap.fromTo(
              frame,
              { scale: 1.05, yPercent: 2.5 },
              {
                scale: 1,
                yPercent: -2.5,
                ease: "none",
                scrollTrigger: { trigger: piece, start: "top bottom", end: "bottom top", scrub: 0.4 },
              },
            );

            gsap.from(meta, {
              y: 24,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: piece, start: "top 65%" },
            });
          }
        },
      });
    }, root);

    return () => ctx.revert();
  }, [still]);

  return (
    <section id="work" ref={root} className={layout.root}>
      <header className={layout.head}>
        <p className={type.eyebrow}>{work.eyebrow}</p>
        <h2 className={type.h2}>{work.title}</h2>
        <p className={type.body}>{work.text}</p>
      </header>

      {work.pieces.map((w, i) => (
        <article key={w.domain} data-piece className={layout.piece}>
          <div className={layout.stage}>
            <div data-meta className={layout.meta}>
              <p className={type.index}>{String(i + 1).padStart(2, "0")}</p>
              <p className={type.name}>{w.name}</p>
              <p className={type.kind}>{w.kind}</p>
              <p className={type.note}>{w.note}</p>
              <a href={w.url} target="_blank" rel="noreferrer" className={type.open}>
                Open {w.domain} ↗
              </a>
            </div>

            <a
              href={w.url}
              target="_blank"
              rel="noreferrer"
              data-frame
              className={layout.card}
              aria-label={`Open ${w.name} at ${w.domain} in a new tab`}
            >
              <span className={layout.bar}>
                <span className={layout.dot} />
                <span className={layout.dot} />
                <span className={layout.dot} />
                <span className={type.domain}>{w.domain}</span>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={w.shot}
                alt={`${w.name} — the site we built, as it looks today`}
                className={media.shot}
                width={1280}
                height={960}
                loading="lazy"
              />
            </a>
          </div>
        </article>
      ))}

      <div className={layout.ctaRow}>
        <Magnetic strength={0.25}>
          <a href="#start" className={type.cta}>{work.cta}</a>
        </Magnetic>
        <span className={type.ctaNote}>{work.note}</span>
      </div>
    </section>
  );
}

const layout = {
  root: "bg-paper px-5 pt-28 pb-24 md:px-10",
  head: "mx-auto w-full max-w-[1200px]",

  /*
   * A screen and a half each on desktop, ordinary flow on a phone. The height
   * is what gives the sticky stage something to travel through; without it the
   * pin has nowhere to go and the piece simply sits there.
   */
  piece: "mx-auto w-full max-w-[1200px] md:h-[150vh]",
  stage:
    "flex flex-col gap-8 py-16 md:sticky md:top-0 md:grid md:h-svh md:grid-cols-[minmax(0,360px)_1fr] "
    + "md:items-center md:gap-14 md:py-0",

  meta: "flex flex-col gap-3",
  card:
    "group block overflow-hidden rounded-sm border border-rule bg-paper-deep "
    + "shadow-[0_24px_60px_-28px_rgba(20,18,15,0.45)] will-change-transform",
  bar: "flex items-center gap-1.5 border-b border-rule bg-paper px-3 py-2.5",
  dot: "h-2.5 w-2.5 rounded-full bg-ink/20",
  ctaRow: "mx-auto mt-20 flex w-full max-w-[1200px] flex-wrap items-center gap-5",
};

const media = {
  shot: "aspect-[4/3] w-full object-cover object-top",
};

const type = {
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint",
  h2: "mt-4 max-w-[14ch] font-display text-[clamp(52px,7.5vw,116px)] uppercase leading-[0.9] text-ink",
  body: "mt-6 max-w-[560px] text-[15px] leading-relaxed text-ink-soft",

  index: "font-display text-[13px] tracking-[0.2em] text-ink-faint",
  name: "font-display text-[clamp(34px,4vw,60px)] uppercase leading-[0.95] text-ink",
  kind: "text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-faint",
  note: "mt-2 max-w-[42ch] text-[15px] leading-relaxed text-ink-soft",
  domain: "ml-2 truncate text-[11px] text-ink-faint",
  open:
    "mt-3 inline-flex min-h-11 items-center self-start text-[15px] font-semibold text-accent "
    + "underline decoration-accent/40 underline-offset-[6px] hover:decoration-accent",
  cta: "inline-block rounded-full bg-accent px-7 py-3.5 text-[14px] font-semibold text-paper",
  ctaNote: "text-[13px] text-ink-soft",
};
