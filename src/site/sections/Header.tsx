"use client";

import { useEffect, useState } from "react";
import { nav } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Header() {
  // Clear over the fly-through, then a solid bar for the flat colour sections.
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => { const h = document.getElementById("top"); setSolid(!!h && scrollY > h.offsetHeight - innerHeight - 10); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={cn(layout.root, solid ? layout.solid : layout.clear)}>
      <a href="#top" className={type.logo}>888 <span className={solid ? type.lightSolid : type.light}>Marketing</span></a>
      <nav className={layout.nav}>{nav.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
      <a href="#start" className={cn(type.cta, solid && type.ctaSolid)}>Get your page</a>
    </header>
  );
}

const layout = {
  root: "fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 transition-colors duration-500 md:px-10",
  clear: "text-white",
  solid: "bg-cream/95 text-oxblood shadow-[0_1px_0_rgba(139,26,58,0.15)] backdrop-blur",
  nav: "hidden gap-2 text-[13px] font-medium md:flex [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a]:px-3",
};

const type = {
  logo: "inline-flex min-h-11 items-center gap-[0.28em] font-display text-[24px] uppercase tracking-wide",
  light: "text-sand",
  lightSolid: "text-ink",
  cta: "inline-flex min-h-11 items-center rounded-full bg-white px-5 text-[13px] font-semibold text-oxblood transition-transform duration-300 hover:scale-[1.04]",
  ctaSolid: "bg-oxblood text-white",
};
