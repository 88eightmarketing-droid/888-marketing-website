"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Phones only: appears after the fly-through, hides at the form so it never covers what it points to. */
export default function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      const form = document.getElementById("start");
      const past = hero ? scrollY > hero.offsetHeight - innerHeight : scrollY > 600;
      const formTop = form ? form.getBoundingClientRect().top : Infinity;
      setShow(past && formTop > innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div aria-hidden={!show} className={cn(layout.root, show ? layout.on : layout.off)}>
      <a href="#start" tabIndex={show ? 0 : -1} className={layout.button}>Get my page built — free to look</a>
    </div>
  );
}

const layout = {
  root: "fixed inset-x-0 bottom-0 z-40 bg-paper/95 p-3 backdrop-blur transition-transform duration-300 md:hidden",
  on: "translate-y-0",
  off: "translate-y-full",
  button: "flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-[15px] font-semibold text-white",
};
