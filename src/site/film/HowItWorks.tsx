"use client";

import { useEffect, useRef } from "react";

/**
 * How 888 works, told in type: each step is one huge line that lights from
 * pale to ink as it crosses the middle of the screen (the Obys/Noomo kinetic
 * statement). From the Studio's real workflow; no prices, no claims.
 */

const steps: [string, string][] = [
  ["We build it first.", "A real, working site with your name on it, before anyone talks about money."],
  ["One price, in writing.", "Everything on one page. Once it is sent, the price does not move."],
  ["Signed on your phone.", "A short summary, the full agreement, and your finger. No printer."],
  ["Photos, film, logo, words.", "A shoot at your place, a short film, a mark with its own guide."],
  ["Live on your own domain.", "Registered in your name. Hosting included."],
  ["Found on Google and Maps.", "Your profile and listings set up to match, so the search ends with you."],
  ["Posted, with your OK.", "One post, a caption for each channel, approved from your phone."],
  ["Reviews from one tap.", "A card on your counter opens your Google review box. Everyone gets the same ask."],
  ["One page shows what it brings in.", "Where your calls and messages come from, what the ads spent, what we did this week."],
];

export default function HowItWorks() {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const items = [...ol.querySelectorAll<HTMLLIElement>("li")];
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = innerHeight * 0.5;
      for (const li of items) {
        const r = li.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid) / (innerHeight * 0.42);
        li.style.setProperty("--a", Math.max(0, 1 - d).toFixed(3));
      }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, []);

  return (
    <section id="how" aria-labelledby="how-title" className="bg-white px-5 py-28 text-ink md:px-8 md:py-40">
      <div className="mx-auto max-w-[1320px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-steel">How it works</p>
        <h2 id="how-title" className="mt-4 max-w-[16ch] text-[clamp(2.4rem,6vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.055em]">
          From the first look to the first call<span className="text-red">.</span>
        </h2>
        <ol ref={list} className="mt-20 md:mt-28">
          {steps.map(([line, note], i) => (
            <li key={line} className="how-step grid gap-3 border-t border-hair py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10" style={{ ["--a" as string]: 0 }}>
              <span className="font-mono text-[12px] tracking-[0.2em] text-steel md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="how-line text-[clamp(2rem,5.6vw,5.4rem)] font-extrabold leading-[0.95] tracking-[-0.05em] md:col-span-8">{line}</span>
              <span className="how-note text-[15px] leading-[1.5] text-steel md:col-span-3 md:text-[16px]">{note}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
