"use client";

import { useEffect, useState } from "react";
import { nav } from "@/data/site";
import { cn } from "@/lib/utils";

/** Clear over the hero, then paper with a hairline. The action is ink here; the accent belongs to the hero's button. */
export default function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(layout.root, solid && layout.solid)}>
      <a href="#top" className={type.logo} aria-label="888 Marketing, back to top">
        <span className={type.mark}>888</span>
        <span className={type.word}>Marketing</span>
      </a>
      <nav className={layout.nav} aria-label="Sections">
        {nav.map((n) => (
          <a key={n.href} href={n.href} className={type.link}>{n.label}</a>
        ))}
      </nav>
      <a href="#start" className={type.cta}>Start a project</a>
    </header>
  );
}

const layout = {
  root: "fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-transparent px-5 py-3 transition-[background-color,border-color] duration-500 md:px-10",
  solid: "border-rule bg-paper/90 backdrop-blur-md",
  nav: "hidden items-center gap-1 md:flex",
};

const type = {
  logo: "inline-flex min-h-11 items-baseline gap-2",
  mark: "font-display text-[28px] leading-none tracking-[-0.02em]",
  word: "text-[11px] font-medium uppercase tracking-[0.2em] text-ink-soft",
  link: "inline-flex min-h-11 items-center px-3 text-[13px] text-ink-soft transition-colors hover:text-ink",
  cta: "inline-flex min-h-11 items-center rounded-full border border-ink px-5 text-[13px] font-medium transition-colors duration-300 hover:bg-ink hover:text-paper",
};
