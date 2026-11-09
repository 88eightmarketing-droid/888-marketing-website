"use client";

import { useRef, type PointerEvent } from "react";
import { preview } from "@/data/site";

/**
 * The one thing no agency page does: the visitor's own business name, on a
 * site, as they type it. The name is shared with the hero form, so anyone who
 * started filling that in arrives here already seeing their business.
 *
 * Labelled "Illustration": it is the opening screen of a design, not a site
 * we have built for them.
 */
export default function Preview({ name, setName }: { name: string; setName: (v: string) => void }) {
  const shown = name.trim() || "Your Business";
  const tilt = useRef<HTMLDivElement>(null);
  // The laptop leans toward the pointer (fine pointers only; CSS transition does the easing).
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !tilt.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tilt.current.style.transform = `perspective(1400px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(0)`;
  };
  const reset = () => { if (tilt.current) tilt.current.style.transform = "perspective(1400px) rotateY(-8deg) rotateX(4deg)"; };
  const long = shown.length > 18;
  return (
    <section className="overflow-hidden bg-white py-24 text-ink md:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5" data-fade>
          <h2 className="text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[0.95] tracking-[-0.055em]">{preview.title}</h2>
          <p className="mt-5 max-w-[26rem] text-[18px] leading-[1.55] text-steel">{preview.text}</p>
          <label className="mt-8 block">
            <span className="sr-only">{preview.placeholder}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
              placeholder={preview.placeholder}
              autoComplete="organization"
              className="w-full max-w-[26rem] rounded-[12px] border border-hair bg-mist px-5 py-4 text-[18px] font-semibold text-ink outline-none placeholder:text-steel/70 focus:border-ink focus:bg-white"
            />
          </label>
        </div>

        {/* Laptop showing the first screen */}
        <div className="md:col-span-7" data-fade style={{ ["--d" as string]: "120ms" }} aria-live="polite" onPointerMove={move} onPointerLeave={reset}>
          <div ref={tilt} className="relative mx-auto w-full max-w-[720px] transition-transform duration-500 ease-out [transform:perspective(1400px)_rotateY(-8deg)_rotateX(4deg)] [transform-style:preserve-3d]">
            <div className="rounded-t-[18px] bg-[#111] p-[1.6%] pb-[1.2%] shadow-[0_60px_100px_-50px_rgba(0,0,0,.45)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-white text-ink">
                {/* eslint-disable-next-line @next/next/no-img-element -- campaign still used as the sample site's backdrop */}
                <img src="/brand/w-pin.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full translate-x-[24%] object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,.85)_45%,rgba(255,255,255,0)_70%)]" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[4%] py-[3%] text-[clamp(7px,1.1vw,11px)] font-semibold">
                  <span className="max-w-[45%] truncate text-[clamp(9px,1.4vw,14px)] font-extrabold tracking-[-0.02em]">{shown}</span>
                  <span className="flex items-center gap-[1.6vw] text-steel md:gap-4">
                    <span className="hidden sm:inline">Services</span><span className="hidden sm:inline">About</span>
                    <span className="rounded-full bg-red px-[1.2em] py-[0.5em] font-bold text-white">Call now</span>
                  </span>
                </div>
                <div className="absolute bottom-[10%] left-[4%] max-w-[58%]">
                  <p className="text-[clamp(7px,1vw,11px)] font-semibold uppercase tracking-[0.14em] text-red">Open today</p>
                  <p className={`mt-[0.3em] break-words font-extrabold leading-[0.92] tracking-[-0.05em] ${long ? "text-[clamp(18px,3.2vw,34px)]" : "text-[clamp(24px,4.6vw,50px)]"}`}>{shown}</p>
                  <p className="mt-[0.6em] text-[clamp(7px,1.1vw,12px)] text-steel">The first call in town.</p>
                </div>
              </div>
            </div>
            <div className="relative mx-[-6%] h-[14px] rounded-b-[16px] bg-gradient-to-b from-[#d9d9dc] to-[#8f8f94]" />
            <p className="mt-5 text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-steel">{preview.label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
