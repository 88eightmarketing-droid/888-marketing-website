"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/motion";
import { work } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

/**
 * The work, shown at full length.
 *
 * On a desktop each site gets a tall stretch of page: the browser frame holds
 * still (CSS sticky) while the full-length capture scrolls inside it, scrubbed
 * to the visitor's own scroll, so they read the whole client site without
 * leaving ours. On a phone the frame is a plain card showing the top of the
 * page — pinning two long stages at 375px makes a page nobody finishes.
 *
 * Captures come from `scripts/capture-work.mjs`. The "Open" link is the truth;
 * if the capture and the live site disagree, re-run the script.
 */
export default function Work() {
  const root = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  useEffect(() => {
    if (still || !root.current) return;
    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 900px)", () => {
      for (const piece of gsap.utils.toArray<HTMLElement>("[data-piece]")) {
        const view = piece.querySelector<HTMLElement>("[data-view]");
        const shot = piece.querySelector<HTMLElement>("[data-shot]");
        if (!view || !shot) continue;
        gsap.to(shot, {
          y: () => -(shot.offsetHeight - view.clientHeight),
          ease: "none",
          scrollTrigger: {
            trigger: piece,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }
    });
    return () => mm.revert();
  }, [still]);

  return (
    <section id="work" ref={root} className={layout.root}>
      <header className={layout.head}>
        <p className={type.eyebrow} data-reveal>{work.eyebrow}</p>
        <h2 className={type.h2} data-reveal>{work.title}</h2>
        <p className={type.body} data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>{work.text}</p>
      </header>

      {work.pieces.map((w, n) => (
        <article key={w.domain} data-piece className={layout.piece}>
          <div className={layout.sticky}>
            <div className={layout.meta} data-reveal>
              <p className={type.index}>{String(n + 1).padStart(2, "0")} / {String(work.pieces.length).padStart(2, "0")}</p>
              <h3 className={type.name}>{w.name}</h3>
              <p className={type.kind}>{w.kind}</p>
              <p className={type.note}>{w.note}</p>
              <a href={w.url} target="_blank" rel="noreferrer" className={type.open}>
                Open {w.domain} <span aria-hidden>↗</span>
              </a>
            </div>

            <a
              href={w.url}
              target="_blank"
              rel="noreferrer"
              className={layout.frame}
              aria-label={`Open ${w.name} at ${w.domain} in a new tab`}
              data-reveal
            >
              <span className={layout.bar}>
                <span className={layout.dots} aria-hidden><i /><i /><i /></span>
                <span className={type.domain}>{w.domain}</span>
                <span className={type.live}><span className={layout.pulse} aria-hidden />Live</span>
              </span>
              <span data-view className={layout.view}>
                {/* eslint-disable-next-line @next/next/no-img-element -- a 6000px-tall capture is translated, not laid out; next/image adds nothing here */}
                <img
                  data-shot
                  src={w.shot}
                  width={w.shotW}
                  height={w.shotH}
                  alt={`${w.name}, the site we built, as it looks today`}
                  loading="lazy"
                  decoding="async"
                  className={layout.shot}
                />
              </span>
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}

const layout = {
  root: "border-t border-rule px-5 pt-24 md:px-10 md:pt-36",
  head: "grid gap-6 pb-14 md:grid-cols-12 md:pb-20",
  piece: "relative pb-20 min-[900px]:h-[320vh] min-[900px]:pb-0",
  sticky: "grid gap-8 min-[900px]:sticky min-[900px]:top-0 min-[900px]:h-[100svh] min-[900px]:grid-cols-12 min-[900px]:items-center min-[900px]:gap-10",
  meta: "flex flex-col gap-3 min-[900px]:col-span-4",
  frame: "group relative block overflow-hidden rounded-[10px] border border-rule bg-paper-deep shadow-[0_40px_80px_-40px_rgba(20,18,15,0.35)] min-[900px]:col-span-8",
  bar: "flex h-10 items-center gap-4 border-b border-rule bg-paper px-4",
  dots: "flex gap-1.5 [&>i]:block [&>i]:size-2.5 [&>i]:rounded-full [&>i]:bg-rule",
  pulse: "inline-block size-1.5 rounded-full bg-[#2f8f4e] shadow-[0_0_0_3px_rgba(47,143,78,0.18)]",
  view: "block aspect-[4/5] overflow-hidden min-[900px]:aspect-auto min-[900px]:h-[calc(100svh-12rem)]",
  shot: "block h-auto w-full will-change-transform",
};

const type = {
  eyebrow: "text-eyebrow font-medium uppercase tracking-[0.16em] text-ink-faint md:col-span-12",
  h2: "font-display text-[clamp(2.75rem,7vw,7rem)] leading-[0.95] tracking-[-0.025em] md:col-span-7",
  body: "max-w-[30rem] self-end text-[16px] leading-[1.6] text-ink-soft md:col-span-4 md:col-start-9 md:text-[17px]",
  index: "text-eyebrow tracking-[0.16em] text-ink-faint tabular-nums",
  name: "font-display text-[clamp(2rem,3.4vw,3.25rem)] leading-[1] tracking-[-0.015em]",
  kind: "text-[13px] text-ink-faint",
  note: "mt-2 max-w-[24rem] text-[16px] leading-[1.6] text-ink-soft",
  open: "mt-4 inline-flex min-h-11 w-fit items-center gap-2 border-b border-ink text-[15px] font-medium transition-colors hover:border-accent hover:text-accent",
  domain: "flex-1 truncate text-center text-[12px] text-ink-faint",
  live: "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-faint",
};
