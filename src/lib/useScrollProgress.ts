"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll progress (0..1) of `target` between ScrollTrigger `start` and `end`, kept in a ref so
 * render loops (useFrame, rAF) can read it without re-rendering React.
 */
export function useScrollProgress(target: RefObject<HTMLElement | null>, start = "top bottom", end = "bottom top") {
  const progress = useRef(0);
  useEffect(() => {
    if (!target.current) return;
    const st = ScrollTrigger.create({ trigger: target.current, start, end, onUpdate: (s) => (progress.current = s.progress) });
    progress.current = st.progress;
    return () => st.kill();
  }, [target, start, end]);
  return progress;
}
