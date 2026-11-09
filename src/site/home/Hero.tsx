"use client";

import { useEffect, useRef, useState } from "react";
import { cta, hero, work } from "@/data/site";
import { useReducedMotion } from "@/lib/motion";
import { clamp01, createSequence, easeInOut, span } from "./Frames";

/**
 * The opening scene, scrubbed by scroll (white, November 2026).
 *
 *   0 – .42  the foldable unfolds from a tent and turns to face you
 *            (Grok clip, reversed, drawn as frames — Frames.tsx), gliding from
 *            beside the line to the centre; the line slides away
 *   .40 – .48 its display wakes on a real client site
 *   .48 – .74 the camera pushes in until the display fills the screen
 *   .50 – 1   the display scrolls through five live client sites, named as they pass
 *
 * The scene is pinned (sticky) inside a tall section; everything is placed in
 * pixels from the viewport size so the display lands in the centre of the
 * screen on any shape of window. Reduced motion gets the finished frame.
 */

const FRAMES = 97;
// Inner display of /brand/w-fold.jpg, in % of the photo (measured on the 1792×1008 master).
const S = { l: 31.86, t: 13.0, w: 36.5, h: 71.92 };
const REEL = { w: 960, h: 4465, shot: 893 }; // public/screens/reel.webp: five site heroes stacked

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const still = useRef<HTMLImageElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const reel = useRef<HTMLImageElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const ctas = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const [site, setSite] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const sec = root.current, st = stage.current, cv = canvas.current;
    if (!sec || !st || !cv) return;
    const seq = createSequence(cv, "/seq/fold", FRAMES);
    let geo = { vw: 0, vh: 0, fw: 0, fh: 0, xs: 0, x0: 0, y0: 0, cx: 0, cy: 0, z: 1, sw: 0, sh: 0 };
    let target = reduced ? 1 : 0, current = target, raf = 0, shown = -1;

    const measure = () => {
      const vw = innerWidth, vh = innerHeight;
      const fw = Math.min(1.35 * vh, 2.2 * vw), fh = (fw * 9) / 16;
      const sw = (S.w / 100) * fw, sh = (S.h / 100) * fh;
      const cx = ((S.l + S.w / 2) / 100) * fw, cy = ((S.t + S.h / 2) / 100) * fh;
      const contain = Math.min((vw * 0.94) / sw, (vh * 0.9) / sh);
      const cover = Math.max(vw / sw, vh / sh);
      const wide = vw >= 768;
      const z = wide ? Math.min(cover, contain * 1.15) : contain;
      // Wide screens: the device starts to the right of the line and glides to the centre as it turns.
      const x0 = vw / 2 - fw / 2;
      geo = { vw, vh, fw, fh, xs: wide ? x0 + vw * 0.2 : x0, x0, y0: vh * (wide ? 0.55 : 0.64) - fh / 2, cx, cy, z, sw, sh };
      st.style.width = `${fw}px`;
      st.style.height = `${fh}px`;
      if (reel.current) reel.current.style.width = `${sw}px`;
      seq.resize();
    };

    const render = (p: number) => {
      const g = geo;
      seq.draw(span(p, 0, 0.42));
      // The line and the buttons lift away as the device turns.
      const lift = span(p, 0, 0.22);
      if (copy.current) { copy.current.style.opacity = String(1 - lift); copy.current.style.translate = `${-lift * 60}px 0`; copy.current.style.visibility = lift >= 1 ? "hidden" : "visible"; }
      if (ctas.current) { ctas.current.style.opacity = String(1 - span(p, 0, 0.12)); ctas.current.style.visibility = p > 0.13 ? "hidden" : "visible"; }
      // The display wakes.
      const on = span(p, 0.4, 0.48);
      if (still.current) still.current.style.opacity = String(on);
      if (screen.current) screen.current.style.opacity = String(on);
      // Push in: scale about the stage origin while moving the display's centre to the screen's.
      const k = easeInOut(span(p, 0.48, 0.74));
      const z = 1 + (g.z - 1) * k;
      const xEnd = g.vw / 2 - g.z * g.cx, yEnd = g.vh / 2 - g.z * g.cy;
      const xTurn = g.xs + (g.x0 - g.xs) * easeInOut(span(p, 0.05, 0.42));
      const x = xTurn + (xEnd - xTurn) * k, y = g.y0 + (yEnd - g.y0) * k;
      if (stage.current) stage.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${z})`;
      // Scroll the reel through the five sites.
      const r = span(p, 0.5, 0.98);
      const reelH = (g.sw * REEL.h) / REEL.w, shotH = (g.sw * REEL.shot) / REEL.w;
      const off = r * Math.max(0, reelH - g.sh);
      if (reel.current) reel.current.style.transform = `translate3d(0, ${-off}px, 0)`;
      const idx = shotH > 0 ? Math.min(4, Math.max(0, Math.floor((off + g.sh * 0.5) / shotH))) : 0;
      if (idx !== shown) { shown = idx; setSite(idx); }
      if (caption.current) caption.current.style.opacity = String(span(p, 0.55, 0.62));
    };

    const tick = () => {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.0004) current = target;
      render(current);
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (reduced) return;
      const r = sec.getBoundingClientRect();
      target = clamp01(-r.top / Math.max(1, r.height - innerHeight));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => { measure(); render(current); };

    measure();
    onScroll();
    render(current);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); removeEventListener("resize", onResize); };
  }, [reduced]);

  const piece = work.pieces[site] ?? work.pieces[0];

  return (
    <section ref={root} id="top" className={`relative bg-white ${reduced ? "h-[100svh]" : "h-[300vh] md:h-[340vh]"}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* The device. Placed and scaled from script; the CSS here is the first paint. */}
        <div
          ref={stage}
          aria-hidden
          className="absolute left-0 top-0 aspect-video w-[min(135svh,220vw)] origin-top-left will-change-transform"
          style={{ transform: "translate3d(calc(50vw - 50%), calc(60svh - 50%), 0)" }}
        >
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
          {/* eslint-disable-next-line @next/next/no-img-element -- the full-resolution end frame, over the canvas */}
          <img ref={still} src="/brand/w-fold.jpg" alt="" className="absolute inset-0 h-full w-full opacity-0" />
          <div
            ref={screen}
            className="absolute overflow-hidden rounded-[0.4%] bg-black opacity-0"
            style={{ left: `${S.l}%`, top: `${S.t}%`, width: `${S.w}%`, height: `${S.h}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- five client site heroes, stacked */}
            <img ref={reel} src="/screens/reel.webp" alt="" className="absolute left-0 top-0 h-auto max-w-none will-change-transform" />
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-black/10" />
          </div>
        </div>

        {/* The line: left on wide screens, above the device on phones. */}
        <div ref={copy} className="relative z-10 mx-auto flex h-full max-w-[1320px] flex-col px-5 pt-[12svh] text-center md:justify-center md:px-8 md:pt-0 md:text-left">
          <p className="appear text-[12px] font-semibold uppercase tracking-[0.16em] text-steel md:text-[13px]" style={{ ["--i" as string]: 0 }}>{hero.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(3rem,13vw,4.2rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-ink md:text-[clamp(3.8rem,7.4vw,7.4rem)]">
            {hero.title.map((t, n) => (
              <span key={t} className="rise"><span style={{ ["--i" as string]: n }}>{t}</span></span>
            ))}
          </h1>
          <p className="appear mt-6 hidden max-w-[24rem] text-[18px] leading-[1.5] text-steel md:block" style={{ ["--i" as string]: 1 }}>Websites, Google, content and brand for local businesses that want to be the first call.</p>
          <div className="appear mt-8 hidden gap-2.5 md:flex" style={{ ["--i" as string]: 2 }}>
            <a href="#proposal" className="inline-flex min-h-12 items-center rounded-full bg-red px-6 text-[15px] font-bold text-white transition-colors hover:bg-red-deep">{cta}</a>
            <a href="#work" className="inline-flex min-h-12 items-center rounded-full border border-hair bg-white px-6 text-[15px] font-bold text-ink transition-colors hover:border-ink">See the work</a>
          </div>
        </div>

        <div ref={ctas} className="appear absolute inset-x-0 bottom-[4svh] z-10 flex flex-col items-center gap-3 px-5" style={{ ["--i" as string]: 2 }}>
          <div className="flex gap-2.5 md:hidden">
            <a href="#proposal" className="inline-flex min-h-12 items-center rounded-full bg-red px-5 text-[15px] font-bold text-white">{cta}</a>
            <a href="#work" className="inline-flex min-h-12 items-center rounded-full border border-hair bg-white px-5 text-[15px] font-bold text-ink">The work</a>
          </div>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-steel">
            <span className="block h-5 w-px animate-pulse bg-steel/50" /> Scroll
          </p>
        </div>

        {/* The site on the display, named. */}
        <div ref={caption} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 opacity-0">
          <div className="mx-auto flex max-w-[1320px] items-end justify-between gap-4 px-5 pb-24 md:px-8 md:pb-8">
            <div className="pointer-events-auto rounded-[16px] bg-white/90 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,.35)] backdrop-blur-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-red">Live now · {String(site + 1).padStart(2, "0")} / 05</p>
              <a href={piece.url} target="_blank" rel="noreferrer" className="mt-0.5 block text-[17px] font-extrabold tracking-[-0.02em] text-ink hover:underline">{piece.name}</a>
              <p className="text-[13px] text-steel">{piece.kind}</p>
            </div>
            <p className="hidden rounded-full bg-white/90 px-4 py-2 text-[12px] font-semibold text-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,.35)] backdrop-blur-md md:block">Real sites we built, on their own domains</p>
          </div>
        </div>
      </div>
    </section>
  );
}
