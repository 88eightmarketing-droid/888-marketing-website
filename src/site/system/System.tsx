"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * The 888 System: the whole workflow as one pinned scroll film (November 2026).
 *
 * One real phone (the Grok cut-out) stays on screen while the page scrolls
 * through every stage of how 888 works, in the order a client lives it. The
 * phone's screen is the stage's real screen, drawn in code with the visitor's
 * own business name in it. Each chapter gets one viewport of scroll; inside it
 * a local progress `--t` (0–1) drives that screen's own motion in CSS, so a
 * frame never re-renders React.
 *
 * Without motion (reduced motion) the chapters still change with the scroll,
 * the screens just arrive finished.
 */

export interface Chapter {
  id: string;
  /** Short label for the chapter rail. */
  label: string;
  kicker: string;
  title: string;
  body: string;
  /** What is on the phone. Receives the visitor's business name. */
  screen: (name: string) => ReactNode;
  /** Giant word behind the phone. */
  word: string;
}

const SCROLL_PER_CHAPTER = 1; // viewports

export default function System({ chapters, name }: { chapters: Chapter[]; name: string }) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const shown = name.trim() || "Your Business";

  useEffect(() => {
    const sec = root.current, st = stage.current;
    if (!sec || !st) return;
    let target = 0, current = 0, raf = 0, last = -1;
    const n = chapters.length;

    const apply = () => {
      const i = Math.min(n - 1, Math.floor(current));
      const t = reduced ? 1 : Math.min(1, Math.max(0, current - i));
      st.style.setProperty("--t", t.toFixed(4));
      st.style.setProperty("--p", (current / n).toFixed(4));
      if (i !== last) { last = i; setActive(i); }
    };
    const tick = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0005) current = target;
      apply();
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      const r = sec.getBoundingClientRect();
      const run = r.height - innerHeight;
      // 0 → n across the section; the last chapter holds for its full viewport.
      target = Math.min(n - 0.0001, Math.max(0, (-r.top / run) * n));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, [chapters.length, reduced]);

  const go = (i: number) => {
    const sec = root.current;
    if (!sec) return;
    const run = sec.offsetHeight - innerHeight;
    scrollTo({ top: sec.offsetTop + (run * (i + 0.02)) / chapters.length, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section
      ref={root}
      id="system"
      aria-label="How 888 works, step by step"
      className="relative bg-white text-ink"
      style={{ height: `${chapters.length * SCROLL_PER_CHAPTER * 100 + 100}svh` }}
    >
      <div ref={stage} className="sticky top-0 h-svh overflow-hidden" style={{ ["--t" as string]: 0, ["--p" as string]: 0 }}>
        {/* Giant word behind everything, one per chapter. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
          {chapters.map((c, i) => (
            <span
              key={c.id}
              className="sys-word absolute bottom-[-0.2em] right-[-0.02em] select-none whitespace-nowrap text-[clamp(8rem,21vw,24rem)] font-extrabold leading-none tracking-[-0.07em] text-[#f2f1ef]"
              data-on={i === active || undefined}
            >
              {c.word}
            </span>
          ))}
        </div>

        <div className="relative mx-auto flex h-full max-w-[1320px] flex-col px-5 md:grid md:grid-cols-12 md:items-center md:px-8">
          {/* Copy */}
          <div className="relative order-2 min-h-0 flex-1 md:order-1 md:col-span-5 md:h-full">
            {chapters.map((c, i) => (
              <div key={c.id} className="sys-copy absolute inset-x-0 top-5 md:top-1/2 md:-translate-y-1/2" data-on={i === active || undefined} aria-hidden={i !== active}>
                <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-steel">
                  <span className="tabular-nums text-red">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-8 bg-hair" />
                  {c.kicker}
                </p>
                <h3 className="sys-title mt-4 text-[clamp(2.1rem,4.6vw,4.4rem)] font-extrabold leading-[0.96] tracking-[-0.05em]">
                  {c.title.split("\n").map((line, k) => (
                    <span key={k} className="block overflow-hidden pb-[0.06em]"><span className="sys-line block" style={{ ["--k" as string]: k }}>{line}</span></span>
                  ))}
                </h3>
                <p className="sys-body mt-5 max-w-[27rem] text-[clamp(15px,1.25vw,18px)] leading-[1.55] text-steel">{c.body}</p>
              </div>
            ))}
          </div>

          {/* Phone */}
          <div className="relative order-1 flex shrink-0 items-center justify-center pt-[4.6rem] md:order-2 md:col-span-7 md:pt-0">
            <div className="sys-phone relative aspect-[416/846] h-[min(46svh,440px)] drop-shadow-[0_40px_40px_rgba(0,0,0,.20)] md:h-[min(78svh,760px)]">
              {/* eslint-disable-next-line @next/next/no-img-element -- the phone, cut out of its Grok still; its screen is opaque, so the drawn screen sits on top */}
              <img src="/brand/phone-cut.webp" alt="" className="pointer-events-none absolute inset-0 h-full w-full" />
              <div className="absolute left-[2.16%] top-[1.06%] h-[98%] w-[95.7%] overflow-hidden rounded-[8%/3.9%] bg-white [container-type:inline-size]">
                <div className="absolute inset-0 text-[calc(100cqw/30)]">
                  {chapters.map((c, i) => (
                    <div key={c.id} className="sys-screen absolute inset-0" data-on={i === active || undefined} data-past={i < active || undefined} aria-hidden={i !== active}>
                      {c.screen(shown)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter rail */}
        <nav aria-label="Steps" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-hair bg-white/85 p-1 backdrop-blur md:flex">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => go(i)}
              className={`min-h-9 rounded-full px-3 text-[12px] font-semibold transition-colors ${i === active ? "bg-ink text-white" : "text-steel hover:text-ink"}`}
              aria-current={i === active ? "step" : undefined}
            >
              {c.label}
            </button>
          ))}
        </nav>
        {/* Progress, phones */}
        <div aria-hidden className="absolute inset-x-5 top-[4.2rem] h-[2px] overflow-hidden rounded bg-hair md:hidden">
          <div className="h-full origin-left bg-red" style={{ transform: "scaleX(var(--p))" }} />
        </div>
      </div>
    </section>
  );
}
