"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const ROW_A = ["Websites", "Google", "Content", "Brand", "Ads", "Websites", "Google"];
const ROW_B = ["Be the first call", "Be the pin they tap", "Be the first call", "Be the pin they tap"];

/**
 * Two lines of type the height of a room, moving in opposite directions as you
 * scroll — the page's breath between the services and the preview. Decorative:
 * the same words are in the sections around it.
 */
export default function Kinetic() {
  const root = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  useEffect(() => {
    if (still || !root.current) return;
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.4 };
      gsap.fromTo("[data-row-a]", { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-row-b]", { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger: st });
    }, root);
    return () => ctx.revert();
  }, [still]);

  return (
    <section ref={root} aria-hidden className="overflow-hidden bg-ink py-16 text-white md:py-24">
      <div data-row-a className="flex w-max gap-[0.35em] whitespace-nowrap text-[clamp(4rem,13vw,12rem)] font-extrabold leading-[0.95] tracking-[-0.06em]">
        {ROW_A.map((w, n) => (
          <span key={n} className="flex items-center gap-[0.35em]">
            <span className={n % 2 ? "text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,.55)]" : ""}>{w}</span>
            <span className="inline-block size-[0.18em] rounded-full bg-red" />
          </span>
        ))}
      </div>
      <div data-row-b className="mt-2 flex w-max gap-[0.35em] whitespace-nowrap text-[clamp(4rem,13vw,12rem)] font-extrabold leading-[0.95] tracking-[-0.06em] text-red">
        {ROW_B.map((w, n) => (
          <span key={n} className="flex items-center gap-[0.35em]">
            {w}
            <span className="inline-block size-[0.18em] rounded-full bg-white" />
          </span>
        ))}
      </div>
    </section>
  );
}
