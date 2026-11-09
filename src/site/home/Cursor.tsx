"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small bone dot that trails the pointer and opens into a labelled disc over
 * anything marked `data-cursor="Visit"` (or any label). Fine pointers only, and
 * never under reduced motion — touch and keyboard users keep the native cursor
 * and lose nothing.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const ok = matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!ok.matches) return;
    document.documentElement.classList.add("has-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      setOn(true);
      const t = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(t?.dataset.cursor ?? null);
    };
    const leave = () => setOn(false);
    const tick = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] hidden [@media(pointer:fine)]:block">
      <div
        className={[
          "flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone font-mono text-[11px] uppercase tracking-[0.12em] text-night transition-[width,height,opacity] duration-500 ease-out-expo",
          label ? "size-24" : "size-2.5",
          on ? "opacity-100" : "opacity-0",
          label ? "" : "mix-blend-difference",
        ].join(" ")}
      >
        <span className={label ? "opacity-100 transition-opacity delay-150 duration-300" : "opacity-0"}>{label}</span>
      </div>
    </div>
  );
}
