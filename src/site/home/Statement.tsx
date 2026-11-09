"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/motion";
import { statement } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

/** One sentence, large, lit word by word as it scrolls through the screen. */
export default function Statement() {
  const root = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  useEffect(() => {
    if (still || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.14 },
        { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 45%", scrub: true } },
      );
    }, root);
    return () => ctx.revert();
  }, [still]);

  return (
    <section ref={root} className="bg-night px-5 py-32 md:px-10 md:py-48">
      <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.12em] text-dim md:mb-14">(888) Studio</p>
      <p className="max-w-[22ch] font-display text-[clamp(2.1rem,5.4vw,6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-bone">
        {statement.split(" ").map((w, i) => (
          <span key={i} data-word>{w} </span>
        ))}
      </p>
    </section>
  );
}
