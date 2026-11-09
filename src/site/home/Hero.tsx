"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/motion";
import { hero } from "@/data/site";
import { Reveal } from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * The opening: the line set huge and staggered across the screen, and under
 * it a small window playing the reel of client sites. Scrolling opens the
 * window to the full screen and the line lifts away — the work takes over
 * the page.
 *
 * Without JavaScript or with reduced motion it is the same composition held
 * still: the line, and the reel in its window.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  useEffect(() => {
    if (still || !root.current) return;
    const mm = gsap.matchMedia(root);
    const build = (from: string) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.fromTo("[data-hero-media]", { clipPath: from }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0)
        .fromTo("[data-hero-video]", { scale: 1.25 }, { scale: 1, ease: "none" }, 0)
        .to("[data-hero-type]", { yPercent: -35, opacity: 0, ease: "none", duration: 0.6 }, 0)
        .fromTo("[data-hero-label]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: "none" }, 0.75);
    };
    mm.add("(min-width: 768px)", () => build(DESKTOP));
    mm.add("(max-width: 767px)", () => build(PHONE));
    return () => mm.revert();
  }, [still]);

  return (
    <section ref={root} className={layout.root} aria-label="888 Marketing">
      <div className={layout.stage}>
        <div data-hero-type className={layout.type}>
          <h1 className={type.h1}>
            <Reveal text={hero.lines[0]} mode="load" className="block" />
            <span className={layout.row2}>
              <span className={`${type.note} hero-fade`} style={{ "--i": 0 } as CSSProperties}>
                {hero.notes[0]}
                <br />
                {hero.notes[1]}
              </span>
              <Reveal text={hero.lines[1]} mode="load" start={3} />
            </span>
            <span className={layout.row3}>
              <Reveal text={hero.lines[2].replace(".", "")} mode="load" start={5}>
                <span className="w" style={{ "--wi": 6 } as CSSProperties}><span className="text-flare">.</span></span>
              </Reveal>
            </span>
          </h1>
        </div>

        <div data-hero-media className={layout.media}>
          <video
            data-hero-video
            className={layout.video}
            src="/work/reel.mp4"
            poster="/work/reel.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="A reel of client websites we designed and built"
          />
          <div className={layout.shade} aria-hidden />
          <p data-hero-label className={type.label}>
            <span>{hero.reelLabel}</span>
            <span>Scroll ↓</span>
          </p>
        </div>
      </div>
    </section>
  );
}

// The window sits below the line, never under it: white type over a light frame of a client site vanished.
const DESKTOP = "inset(55% 5% 6% 48% round 14px)";
const PHONE = "inset(62% 5% 6% 5% round 12px)";

const layout = {
  root: "relative h-[230svh] bg-night",
  stage: "sticky top-0 h-[100svh] overflow-hidden",
  type: "relative z-10 px-5 pt-[16svh] md:px-10 md:pt-[13svh]",
  row2: "flex items-end gap-6 md:pl-[14vw]",
  row3: "block pl-[22vw] md:pl-[42vw]",
  // The starting window is set in CSS too (keep in step with PHONE / DESKTOP), so it is right before JavaScript runs.
  media: "absolute inset-0 overflow-hidden will-change-[clip-path] [clip-path:inset(62%_5%_6%_5%_round_12px)] md:[clip-path:inset(55%_5%_6%_48%_round_14px)]",
  video: "h-full w-full object-cover will-change-transform",
  shade: "absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-night/20",
};

const type = {
  h1: "font-display text-[clamp(3.6rem,18vw,7rem)] font-medium leading-[0.86] tracking-[-0.055em] text-bone md:text-[clamp(5rem,10.4vw,12rem)]",
  note: "mb-[0.9em] hidden shrink-0 font-mono text-[11px] font-normal uppercase leading-[1.5] tracking-[0.08em] text-dim md:block",
  label: "absolute inset-x-5 bottom-6 flex justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-bone md:inset-x-10 md:bottom-8",
};
