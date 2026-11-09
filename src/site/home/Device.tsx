"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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

/* ----------------------------------------------------------- the foldable ---- */

const SITES = ["jellyceeblends", "cleanpuppy", "tree4less", "classeskin", "getkickz"];
const STRIP_W = 960, STRIP_H = 4468, PANEL_W = 480, PANEL_H = 893; // one panel = half the strip's width
// Inner display corners, measured on /brand/foldable.jpg (1792×1008).
const LEFT: Quad = [[29.85, 16.07], [50.11, 20.04], [50.11, 80.95], [29.85, 83.13]];
const RIGHT: Quad = [[50.17, 20.04], [70.48, 16.17], [70.54, 83.23], [50.17, 80.95]];
const DWELL = 13000;

/** The hero device: both panels of the foldable scroll a real client site, in step, then move to the next. */
export function Foldable({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % SITES.length), DWELL);
    return () => clearInterval(t);
  }, []);
  const panel = (offset: number) => (
    <div className="absolute inset-0 bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element -- client-site screen strip */}
      <img
        key={SITES[i]}
        src={`/screens/${SITES[i]}.webp`}
        alt=""
        className="screen-scroll absolute left-0 top-0 max-w-none"
        style={{ width: STRIP_W, height: STRIP_H, translate: `${-offset}px 0`, ["--travel" as string]: `${-(STRIP_H - PANEL_H)}px`, ["--dwell" as string]: `${DWELL}ms` }}
      />
    </div>
  );
  return (
    <DeviceStage
      className={className}
      photo="/brand/foldable.jpg"
      alt="A titanium foldable phone showing a client website we built"
      screens={[
        { quad: LEFT, w: PANEL_W, h: PANEL_H, content: panel(0) },
        { quad: RIGHT, w: PANEL_W, h: PANEL_H, content: panel(PANEL_W) },
      ]}
    />
  );
}

/* ------------------------------------------------------------- the laptop ---- */

const LAPTOP: Quad = [[25.0, 23.41], [60.83, 24.8], [63.62, 65.28], [27.29, 68.15]];

/** The laptop still, its screen playing the client-site recordings one after another. */
export function Laptop({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  return (
    <DeviceStage
      className={className}
      photo="/brand/laptop.jpg"
      alt="A laptop showing client websites we built"
      screens={[{
        quad: LAPTOP, w: 1280, h: 800,
        content: (
          <video
            key={SITES[i]}
            src={`/work/${SITES[i]}.mp4`}
            poster={`/work/${SITES[i]}.jpg`}
            className="h-full w-full object-cover object-top"
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={() => setI((n) => (n + 1) % SITES.length)}
          />
        ),
      }]}
    />
  );
}
