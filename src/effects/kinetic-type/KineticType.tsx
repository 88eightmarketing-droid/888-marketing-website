"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type KineticTypeProps = {
  word: string;
  rows?: number;
  className?: string;
  rowClassName?: string;
  /** Horizontal travel per row over the whole scroll range, in % of row width. */
  travel?: number;
  /** 3D tilt at the start of the range (deg); flattens to 0 at the end. */
  tilt?: { x: number; y: number; z: number };
};

/**
 * Repeating word rows on a tilted plane. Scroll slides alternate rows in opposite directions and
 * straightens the plane — the "DESIGN DESIGN" poster moment on textura.agency.
 */
export default function KineticType({ word, rows = 5, className, rowClassName, travel = 30, tilt = { x: 28, y: -18, z: 12 } }: KineticTypeProps) {
  const root = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(plane.current, { rotateX: tilt.x, rotateY: tilt.y, rotateZ: tilt.z, scale: 0.8 }, { rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1.15, ease: "none", scrollTrigger: st });
      gsap.utils.toArray<HTMLElement>("[data-row]").forEach((row, i) => {
        const dir = i % 2 ? 1 : -1;
        gsap.fromTo(row, { xPercent: -travel / 2 * dir - 25 }, { xPercent: travel / 2 * dir - 25, ease: "none", scrollTrigger: st });
      });
    }, root);
    return () => ctx.revert();
  }, [travel, tilt.x, tilt.y, tilt.z]);

  const line = Array.from({ length: 6 }, () => word).join(" ");
  return (
    <div ref={root} className={className} aria-label={word}>
      <div ref={plane} className="[transform-style:preserve-3d]" aria-hidden>
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} data-row className={rowClassName}>{line}</div>
        ))}
      </div>
    </div>
  );
}
