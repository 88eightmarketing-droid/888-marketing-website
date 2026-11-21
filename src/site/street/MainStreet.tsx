"use client";

import { useEffect, useRef } from "react";

/**
 * Main Street, after dark: the first screen (November 2026).
 *
 * One scroll-played film (footage/PROMPTS.md): a dark Bay Area street whose
 * storefronts light up one by one, each a real 888 client with the real site
 * on its window or screen, ending on a phone ringing on a counter. Generated
 * scenes, real work; the credit line says so.
 *
 * The film is a WebP frame sequence (public/seq/street/000.webp …), drawn to a
 * canvas cropped to fill the screen around a focal point, so phones get a tall
 * crop of the same frames. Type beats come in at set points of the scroll.
 */

export interface Beat {
  /** Scroll progress where it is fully in (0–1). */
  at: number;
  /** How long it holds, in progress. */
  hold: number;
  big: string;
  small?: string;
  red?: boolean;
}

const FRAMES = 0; // set when the sequence is cut (footage/out → public/seq/street)
const SCROLL_VH = 650;

export const beats: Beat[] = [
  { at: 0.03, hold: 0.1, big: "Most good businesses\nare invisible.", small: "888 Marketing · Bay Area" },
  { at: 0.2, hold: 0.08, big: "Website.", small: "Classé Skin & Sculpt · classeskin.com" },
  { at: 0.34, hold: 0.08, big: "Booking.", small: "Clean Puppy Club · thecleanpuppyclub.com" },
  { at: 0.48, hold: 0.08, big: "Brand.", small: "Plumbing Art · plumbingartbayarea.com" },
  { at: 0.62, hold: 0.08, big: "Systems.", small: "Frenemies Game Truck · frenemiesinabox.com" },
  { at: 0.76, hold: 0.08, big: "Film & social.", small: "JellyCee Blends · jellyceeblends.com" },
  { at: 0.92, hold: 0.08, big: "Make your\nphone ring.", red: true },
];

export default function MainStreet({ frames = FRAMES, dir = "/seq/street", focus = 0.5 }: { frames?: number; dir?: string; focus?: number }) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = root.current, cv = canvas.current, st = stage.current;
    if (!sec || !cv || !st || !frames) return;
    const ctx = cv.getContext("2d");
    const imgs: HTMLImageElement[] = [];
    let wanted = 0, last = -1, target = 0, current = 0, raf = 0;

    const draw = () => {
      if (!ctx) return;
      let n = wanted;
      while (n > 0 && !(imgs[n]?.complete && imgs[n].naturalWidth)) n--;
      const img = imgs[n];
      if (!img?.complete || !img.naturalWidth) return;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = Math.round(cv.clientWidth * dpr), h = Math.round(cv.clientHeight * dpr);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; last = -1; }
      if (n === last) return;
      last = n;
      // Cover-crop around the focal point.
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      ctx.drawImage(img, (w - dw) * focus, (h - dh) / 2, dw, dh);
    };
    const order = [0, frames - 1, ...Array.from({ length: frames - 2 }, (_, i) => i + 1)];
    for (const i of order) {
      const im = new Image();
      im.decoding = "async";
      im.onload = () => { if (i <= wanted) { last = -1; draw(); } };
      im.src = `${dir}/${String(i).padStart(3, "0")}.webp`;
      imgs[i] = im;
    }
    const tick = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0004) current = target;
      st.style.setProperty("--p", current.toFixed(4));
      wanted = Math.round(current * (frames - 1));
      draw();
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      const r = sec.getBoundingClientRect();
      target = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => { last = -1; draw(); onScroll(); };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); removeEventListener("resize", onResize); };
  }, [frames, dir, focus]);

  return (
    <section ref={root} id="top" data-dark aria-label="888 Marketing" className="relative bg-black text-white" style={{ height: `${SCROLL_VH}svh` }}>
      <div ref={stage} className="sticky top-0 h-svh overflow-hidden" style={{ ["--p" as string]: 0 }}>
        <canvas ref={canvas} aria-hidden className="absolute inset-0 h-full w-full" />
        <div aria-hidden className="ms-shade pointer-events-none absolute inset-0" />
        {beats.map((b, i) => (
          <div key={i} className="ms-beat pointer-events-none absolute inset-x-0 bottom-[14svh] px-5 md:bottom-[12svh] md:px-8" style={{ ["--at" as string]: b.at, ["--hold" as string]: b.hold }}>
            <div className="mx-auto max-w-[1320px]">
              {b.small && <p className="ms-small font-mono text-[11px] uppercase tracking-[0.24em] text-white/70">{b.small}</p>}
              <p className={`mt-3 text-[clamp(3rem,10vw,10rem)] font-extrabold leading-[0.88] tracking-[-0.06em] ${b.red ? "" : ""}`}>
                {b.big.split("\n").map((l, k) => (
                  <span key={k} className="block overflow-hidden pb-[0.04em]"><span className="ms-line block" style={{ ["--k" as string]: k }}>{l}{b.red && k === 1 ? <span className="text-red">.</span> : null}</span></span>
                ))}
              </p>
            </div>
          </div>
        ))}
        <a href="#proposal" className="ms-cta absolute bottom-6 left-1/2 inline-flex min-h-12 -translate-x-1/2 items-center rounded-full bg-red px-6 text-[15px] font-bold text-white md:bottom-8">Get a free proposal</a>
        <p className="absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 md:right-5">Scenes generated · the work on every screen is real</p>
      </div>
    </section>
  );
}
