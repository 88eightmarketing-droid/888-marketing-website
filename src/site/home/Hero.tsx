"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/motion";
import { form, hero } from "@/data/site";
import LeadForm from "./LeadForm";

gsap.registerPlugin(ScrollTrigger);

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * Above the fold, the whole pitch. Left: the line and a short proposal form.
 * Right: the campaign film — a thin titanium foldable standing open on crimson
 * seamless, its screen alive with colour — with a light sweep crossing it.
 * Scrolling pushes the film in and lifts the line away.
 *
 * Phones: the film as a square, then the line and the form on crimson.
 */
export default function Hero({ onBusiness }: { onBusiness: (name: string) => void }) {
  const root = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  useEffect(() => {
    if (still || !root.current) return;
    // Desktop only: on phones the form sits below the film and is still being
    // filled in while it scrolls, so it must not fade.
    const mm = gsap.matchMedia(root);
    mm.add("(min-width: 768px)", () => {
      gsap.to("[data-hero-film]", { scale: 1.12, yPercent: 6, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-hero-copy]", { yPercent: -14, opacity: 0.2, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, [still]);

  return (
    <section ref={root} id="top" className="relative overflow-hidden bg-crimson text-white">
      {/* Film: right side on desktop, a square on phones. */}
      <div className="relative aspect-square w-full overflow-hidden md:absolute md:inset-y-0 md:left-auto md:right-0 md:aspect-auto md:w-[58%]" aria-hidden>
        <div data-hero-film className="absolute inset-0 will-change-transform">
          <video className="hidden h-full w-full object-cover md:block" src="/brand/hero.mp4" poster="/brand/hero.jpg" autoPlay muted loop playsInline preload="auto" />
          <video className="h-full w-full object-cover md:hidden" src="/brand/hero-square.mp4" poster="/brand/hero.jpg" autoPlay muted loop playsInline preload="auto" />
        </div>
        <div className="sweep pointer-events-none absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-crimson)_0%,rgba(181,4,10,0)_35%)] md:bg-[linear-gradient(90deg,var(--color-crimson)_0%,rgba(181,4,10,0)_28%)]" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 pb-14 md:flex md:min-h-[100svh] md:items-center md:px-8 md:pb-14 md:pt-24">
        <div data-hero-copy className="-mt-14 md:mt-0 md:w-[46%]">
          <p className="appear text-[13px] font-semibold tracking-[0.04em] text-white/75" style={i(0)}>{hero.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(3.2rem,13vw,4.6rem)] font-extrabold leading-[0.9] tracking-[-0.055em] md:text-[clamp(3.6rem,6.4vw,6.8rem)]">
            {hero.title.map((t, n) => (
              <span key={t} className="rise"><span style={i(n)}>{t}</span></span>
            ))}
          </h1>
          <p className="appear mt-5 max-w-[30rem] text-[17px] leading-[1.55] text-white/85 md:text-[18px]" style={i(1)}>{hero.text}</p>

          <div id="proposal" className="appear mt-8 max-w-[34rem] scroll-mt-24 rounded-[20px] bg-white p-5 text-ink shadow-[0_40px_80px_-30px_rgba(40,0,2,.6)] md:p-6" style={i(2)}>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 className="text-[20px] font-extrabold tracking-[-0.03em]">{form.title}</h2>
              <span className="text-[12px] font-semibold text-steel">Free · no obligation</span>
            </div>
            <LeadForm id="proposal-form" onBusiness={onBusiness} compact />
          </div>
        </div>
      </div>
    </section>
  );
}
