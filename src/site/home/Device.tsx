"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { clamp01, createSequence } from "./Frames";

/**
 * Real work on photographed devices.
 *
 * The campaign photographs (Grok) have blank-looking screens; this lays live
 * content — screenshots or recordings of client sites — onto each screen with
 * a perspective transform that maps a flat rectangle onto the four corners of
 * the glass, measured from the photograph (in percent of the image).
 *
 * The stage keeps the photograph's 16:9 shape and fills the height of its
 * container, centred, so the percentages hold at every size; the container
 * crops the sides.
 */

export type Quad = [[number, number], [number, number], [number, number], [number, number]]; // TL, TR, BR, BL, in % of the photo

/** CSS matrix3d that maps the rectangle (0,0)-(w,h) onto the quad (pixels). */
function homography(w: number, h: number, q: [number, number][]): string {
  const src = [[0, 0], [w, 0], [w, h], [0, h]];
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [u, v] = q[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
  }
  // Gaussian elimination.
  for (let c = 0; c < 8; c++) {
    let p = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]]; [b[c], b[p]] = [b[p], b[c]];
    for (let r = 0; r < 8; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k];
      b[r] -= f * b[c];
    }
  }
  const [a, bb, c, d, e, f, g, hh] = b.map((v, i) => v / A[i][i]);
  return `matrix3d(${a},${d},0,${g},${bb},${e},0,${hh},0,0,1,0,${c},${f},0,1)`;
}

export function DeviceStage({ photo, alt, screens, className = "" }: {
  photo: string;
  alt: string;
  /** One entry per screen: its corners and what to show on it, at a base size. */
  screens: { quad: Quad; w: number; h: number; content: ReactNode; radius?: number }[];
  className?: string;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={stage} className={`absolute left-1/2 top-0 aspect-[16/9] h-full -translate-x-1/2 ${className}`}>
      <picture>
        <source srcSet={photo.replace(/\.jpg$/, ".avif")} type="image/avif" />
        <img src={photo} alt={alt} className="absolute inset-0 h-full w-full" />
      </picture>
      {size && screens.map((s, n) => {
        const q = s.quad.map(([x, y]) => [(x / 100) * size.w, (y / 100) * size.h] as [number, number]);
        return (
          <div
            key={n}
            className="absolute left-0 top-0 overflow-hidden"
            style={{ width: s.w, height: s.h, transformOrigin: "0 0", transform: homography(s.w, s.h, q), borderRadius: s.radius ?? 0 } as CSSProperties}
          >
            {s.content}
            {/* Glass: a faint reflection so the screen sits in the photo. */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_38%)]" />
          </div>
        );
      })}
    </div>
  );
}

const SITES = ["jellyceeblends", "cleanpuppy", "tree4less", "classeskin", "getkickz"];

/* ------------------------------------------------------------- the laptop ---- */

// Screen of /brand/w-laptop.jpg (white seamless, straight on), % of the 1792×1008 master.
const LAPTOP: Quad = [[28.6, 16.0], [71.6, 16.0], [71.6, 66.2], [28.6, 66.2]];
const LAPTOP_W = 1216, LAPTOP_H = 800; // the screen's own shape, so the recordings are not stretched

/** The client-site recordings, one after another. */
function Recordings({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  return (
    <video
      key={SITES[i]}
      src={`/work/${SITES[i]}.mp4`}
      poster={`/work/${SITES[i]}.jpg`}
      className={`h-full w-full object-cover object-top ${className}`}
      autoPlay
      muted
      playsInline
      preload="metadata"
      onEnded={() => setI((n) => (n + 1) % SITES.length)}
    />
  );
}

/** The laptop still, its screen playing the client-site recordings. */
export function Laptop({ className = "" }: { className?: string }) {
  return (
    <DeviceStage
      className={className}
      photo="/brand/w-laptop.jpg"
      alt="A laptop showing client websites we built"
      screens={[{ quad: LAPTOP, w: LAPTOP_W, h: LAPTOP_H, radius: 6, content: <Recordings /> }]}
    />
  );
}

/**
 * The laptop opening as you scroll (Grok clip of the lid closing, reversed and
 * cut to frames), then its screen waking on the recordings. `trigger` is the
 * element whose passage up the screen drives it.
 */
export function LidLaptop({ trigger }: { trigger: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cv = canvas.current;
    const el = document.querySelector(trigger);
    if (!cv || !el) return;
    const seq = createSequence(cv, "/seq/lid", 63);
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      // From the panel's top entering the screen to its middle reaching 60% down. Reduced motion: open.
      const p = still ? 1 : clamp01((innerHeight - r.top) / (innerHeight * 0.4 + r.height / 2));
      seq.draw(p);
      setOpen(p > 0.97);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(paint); };
    const ro = new ResizeObserver(() => { seq.resize(); on(); });
    ro.observe(cv);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => { cancelAnimationFrame(raf); ro.disconnect(); removeEventListener("scroll", on); };
  }, [trigger]);

  const [[l, t], [r], [, b]] = [LAPTOP[0], LAPTOP[1], LAPTOP[2]];
  return (
    <div className="absolute left-1/2 top-0 aspect-video h-full -translate-x-1/2">
      <canvas ref={canvas} aria-label="A laptop opening on client websites we built" role="img" className="absolute inset-0 h-full w-full" />
      <div
        className={`absolute overflow-hidden rounded-t-[0.5%] bg-black transition-opacity duration-700 ${open ? "opacity-100" : "opacity-0"}`}
        style={{ left: `${l}%`, top: `${t}%`, width: `${r - l}%`, height: `${b - t}%` }}
      >
        {open && <Recordings />}
      </div>
    </div>
  );
}
