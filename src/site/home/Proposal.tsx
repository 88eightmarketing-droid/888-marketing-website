"use client";

import { useEffect, useRef } from "react";
import { form, hero } from "@/data/site";
import { useReducedMotion } from "@/lib/motion";
import LeadForm from "./LeadForm";
import { span } from "./Frames";

/**
 * Straight after the opening scene: what we do, lit word by word as it
 * scrolls up the screen, and the proposal form beside it.
 * The business name typed here feeds the preview further down.
 */
export default function Proposal({ onBusiness }: { onBusiness: (name: string) => void }) {
  const text = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = text.current;
    if (!el || reduced) return;
    const words = [...el.querySelectorAll<HTMLSpanElement>("[data-w]")];
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // Lit from when the paragraph's top is 85% down the screen to when its bottom reaches 45%.
      const p = span(innerHeight * 0.85 - r.top, 0, innerHeight * 0.4 + r.height);
      words.forEach((w, i) => { w.style.opacity = String(0.14 + 0.86 * span(p * words.length, i - 0.5, i + 1)); });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(paint); };
    paint();
    addEventListener("scroll", on, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", on); };
  }, [reduced]);

  return (
    <section id="proposal" className="scroll-mt-20 bg-white py-24 md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 md:grid-cols-12 md:items-center md:gap-12 md:px-8">
        <div className="md:col-span-7">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-red">888 Marketing</p>
          <p ref={text} className="mt-5 text-[clamp(1.9rem,3.6vw,3.3rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink">
            {hero.text.split(" ").map((w, i) => (
              <span key={i} data-w className="transition-opacity duration-150">{w} </span>
            ))}
          </p>
        </div>
        <div className="md:col-span-5" data-fade>
          <div className="rounded-[28px] bg-mist p-6 md:p-8">
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <h2 className="text-[24px] font-extrabold tracking-[-0.035em] text-ink">{form.title}</h2>
              <span className="shrink-0 text-[12px] font-semibold text-steel">Free · no obligation</span>
            </div>
            <p className="mb-5 text-[15px] leading-[1.5] text-steel">{form.text}</p>
            <LeadForm id="proposal-form" onBusiness={onBusiness} compact />
          </div>
        </div>
      </div>
    </section>
  );
}
