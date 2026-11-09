"use client";

import { useEffect, useState } from "react";
import { cta, nav } from "@/data/site";

/**
 * The top bar: clear over the white opening scene, frosted once you scroll. The proposal
 * button is always one tap away — here on desktop, and as a bar pinned to the
 * bottom of the screen on phones (MobileCta).
 */
export function TopBar() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(scrollY > 24);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${solid ? "bg-white/85 shadow-[0_1px_0_rgba(11,11,12,.08)] backdrop-blur-xl" : ""}`}>
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 md:h-[72px] md:px-8">
        <a href="#top" className="inline-flex min-h-11 items-baseline gap-2 text-ink" aria-label="888 Marketing, top of page">
          <span className="text-[24px] font-extrabold tracking-[-0.05em]">888</span>
          <span className="text-[13px] font-semibold tracking-[0.02em] text-steel">Marketing</span>
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="inline-flex min-h-11 items-center text-[14px] font-medium text-steel transition-colors hover:text-ink">{n.label}</a>
          ))}
        </nav>
        <a href="#proposal" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[14px] font-bold text-white transition-transform duration-200 hover:scale-[1.03]">
          <span className="hidden sm:inline">{cta}</span>
          <span className="sm:hidden">Free proposal</span>
        </a>
      </div>
    </header>
  );
}

export function MobileCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(scrollY > innerHeight * 0.9);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`fixed inset-x-3 bottom-3 z-40 transition-[opacity,translate] duration-300 md:hidden ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
      <a href="#proposal" className="flex min-h-[54px] items-center justify-center rounded-[14px] bg-red text-[16px] font-bold text-white shadow-[0_12px_30px_-10px_rgba(168,6,11,.7)]">
        {cta} →
      </a>
    </div>
  );
}
