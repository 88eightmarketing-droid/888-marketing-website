"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export type SmoothScrollProps = {
  children: ReactNode;
  /** Lenis lerp factor: lower = floatier. Textura sites sit around 0.08–0.1. */
  lerp?: number;
  /** Wheel multiplier. */
  wheelMultiplier?: number;
  /** Start locked (e.g. behind a loader); call lenis.start() to release. */
  startLocked?: boolean;
};

/**
 * Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger and Lenis share one clock.
 * Native scroll is kept on touch devices and for reduced-motion visitors.
 */
export default function SmoothScroll({ children, lerp = 0.09, wheelMultiplier = 1, startLocked = false }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ lerp, wheelMultiplier, syncTouch: false });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (startLocked) instance.stop();
    // Publishing an instance created by this effect is exactly what the effect is for.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [lerp, wheelMultiplier, startLocked]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
