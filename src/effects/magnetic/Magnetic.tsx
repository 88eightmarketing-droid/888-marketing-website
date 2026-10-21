"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useCoarsePointer } from "@/lib/motion";

export type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element follows the pointer, as a fraction of the pointer offset. */
  strength?: number;
  /** Extra hit area around the element, px. */
  radius?: number;
};

/** Pulls its child toward the pointer when nearby; springs back with elastic ease on leave. */
export default function Magnetic({ children, className, strength = 0.35, radius = 40 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const coarse = useCoarsePointer();
  useEffect(() => {
    const el = ref.current;
    if (!el || coarse) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    let engaged = false;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const inside = Math.abs(dx) < r.width / 2 + radius && Math.abs(dy) < r.height / 2 + radius;
      if (inside) { engaged = true; xTo(dx * strength); yTo(dy * strength); }
      else if (engaged) { engaged = false; gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.35)", overwrite: true }); }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [coarse, strength, radius]);
  return <div ref={ref} className={className}>{children}</div>;
}
