"use client";

import { useEffect, useRef, useState } from "react";
import { cta, hero, work } from "@/data/site";
import { useReducedMotion } from "@/lib/motion";
import { clamp01, createSequence, easeInOut, span } from "./Frames";

/**
 * The opening scene: our work, the way a customer meets it (November 2026).
 *
 * A laptop and a phone on white. As the page arrives the laptop opens (Grok
 * clip, reversed, drawn as frames — Frames.tsx), the phone comes up in front
 * of it and both screens wake on the first site. Scrolling moves the pair to
 * the centre of the screen, and each further stretch of scroll is one client
 * site, in the owner's order: both screens play that site's real recording from the moment the
 * page is requested — its own intro — through its scroll effects
 * (scripts/record-showcase.mjs), desktop on the laptop, phone on the phone.
 *
 * Everything is placed in pixels from the viewport, so the pair lands centred
 * on any shape of window. Reduced motion gets the open pair and posters.
 */

const FRAMES = 63; // public/seq/lid
const SITES = work.pieces.slice(0, 5);
const BASE_W = 1000, BASE_H = 562.5; // the stage, before scaling (the laptop photo's 16:9)
// In % of the stage. Laptop screen measured on /brand/w-laptop.jpg; the phone is placed in front of it.
const LAPTOP = { l: 28.6, t: 16.0, w: 43.0, h: 50.2 };
const PHONE = { l: 64.5, t: 29, h: 50 }; // height in % of the stage; width follows the cut-out's 416:846
const PHONE_W = ((PHONE.h / 100) * BASE_H * (416 / 846)) / BASE_W * 100; // % of stage width
const PHONE_SCREEN = { l: 2.16, t: 1.06, w: 95.7, h: 98.0 }; // in % of the phone
// The pair's bounding box in stage %, for fitting it to the window.
const BOX = { l: 25, t: 15, r: PHONE.l + PHONE_W, b: PHONE.t + PHONE.h };

// The arrival, by time once the page opener lifts (0–1 over INTRO_MS): the lid opens,
// the phone rises, both screens wake and the first site starts from its own intro.
const INTRO_MS = 1900;
const OPEN = [0, 0.75] as const;
const RISE = [0.45, 0.9] as const;
const WAKE = [0.8, 1] as const;
// Then the scroll (0–1 over the section): the pair moves to the centre, and each
// further stretch is one site.
const PUSH = [0, 0.1] as const;
const SHOW = 0.1;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const screens = useRef<HTMLDivElement[]>([]);
  const laptopVid = useRef<HTMLVideoElement>(null);
  const phoneVid = useRef<HTMLVideoElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const chapters = useRef<HTMLDivElement>(null);
  const bars = useRef<HTMLSpanElement[]>([]);
  const [site, setSite] = useState(0);
  const [awake, setAwake] = useState(false);
  const reduced = useReducedMotion();

  // The scroll scene.
  useEffect(() => {
    const sec = root.current, st = stage.current, cv = canvas.current;
    if (!sec || !st || !cv) return;
    const seq = createSequence(cv, "/seq/lid", FRAMES);
    let g = { z0: 1, x0: 0, y0: 0, z1: 1, x1: 0, y1: 0 };
    let target = reduced ? SHOW : 0, current = target, raf = 0, shown = -1;
    let intro = reduced ? 1 : 0, introRaf = 0, introStart = 0;

    const fit = (bw: number, bh: number, cx: number, cy: number) => {
      const w = ((BOX.r - BOX.l) / 100) * BASE_W, h = ((BOX.b - BOX.t) / 100) * BASE_H;
      const z = Math.min(bw / w, bh / h);
      const mx = ((BOX.l + BOX.r) / 200) * BASE_W, my = ((BOX.t + BOX.b) / 200) * BASE_H;
      return { z, x: cx - z * mx, y: cy - z * my };
    };
    const measure = () => {
      const vw = innerWidth, vh = innerHeight, wide = vw >= 768;
      // Start: beside the line on wide screens, under it on phones. End: centred, as large as fits above the chapter bar.
      const a = wide ? fit(vw * 0.48, vh * 0.6, vw * 0.73, vh * 0.55) : fit(vw * 0.92, vh * 0.38, vw * 0.5, vh * 0.64);
      const b = wide ? fit(vw * 0.9, vh * 0.72, vw * 0.52, vh * 0.47) : fit(vw * 0.98, vh * 0.54, vw * 0.5, vh * 0.42);
      g = { z0: a.z, x0: a.x, y0: a.y, z1: b.z, x1: b.x, y1: b.y };
      seq.resize();
    };

    const arrive = (t: number) => {
      seq.draw(easeInOut(span(t, OPEN[0], OPEN[1])));
      const rise = easeInOut(span(t, RISE[0], RISE[1]));
      if (phone.current) { phone.current.style.opacity = String(rise); phone.current.style.translate = `0 ${(1 - rise) * 30}%`; }
      const on = String(span(t, WAKE[0], WAKE[1]));
      screens.current.forEach((s) => { if (s) s.style.opacity = on; });
    };
    const introTick = (now: number) => {
      if (!introStart) introStart = now;
      intro = clamp01((now - introStart) / INTRO_MS);
      arrive(intro);
      if (intro < 1) introRaf = requestAnimationFrame(introTick);
      else setAwake(true);
    };

    const render = (p: number) => {
      const lift = span(p, 0, 0.05);
      if (copy.current) { copy.current.style.opacity = String(1 - lift); copy.current.style.translate = `${-lift * 60}px 0`; copy.current.style.visibility = lift >= 1 ? "hidden" : "visible"; }
      if (hint.current) { hint.current.style.opacity = String(1 - span(p, 0, 0.03)); hint.current.style.visibility = p > 0.03 ? "hidden" : "visible"; }
      const k = easeInOut(span(p, PUSH[0], PUSH[1]));
      const z = g.z0 + (g.z1 - g.z0) * k, x = g.x0 + (g.x1 - g.x0) * k, y = g.y0 + (g.y1 - g.y0) * k;
      st.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${z})`;
      if (chapters.current) chapters.current.style.opacity = String(span(p, 0.04, SHOW));
      const idx = Math.min(SITES.length - 1, Math.floor(span(p, SHOW, 1) * SITES.length * 0.9999));
      if (idx !== shown) { shown = idx; setSite(idx); }
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
    if (reduced) { arrive(1); introRaf = requestAnimationFrame(() => setAwake(true)); }
    else {
      // Wait for the page opener (first visit) to lift; a repeat visit has none.
      const opener = document.documentElement.classList.contains("opener-off") ? 60 : 1150;
      arrive(0);
      const t = setTimeout(() => { introRaf = requestAnimationFrame(introTick); }, opener);
      addEventListener("pagehide", () => clearTimeout(t), { once: true });
    }
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(introRaf); removeEventListener("scroll", onScroll); removeEventListener("resize", onResize); };
  }, [reduced]);

  // Each chapter plays its site from the top, so its intro is seen (the first once the screens wake).
  // The bars follow the laptop clip.
  useEffect(() => {
    for (const v of [laptopVid.current, phoneVid.current]) {
      if (!v) continue;
      v.currentTime = 0;
      if (awake && !reduced) v.play().catch(() => {});
    }
    let raf = 0;
    const track = () => {
      const v = laptopVid.current;
      const now = v && v.duration ? v.currentTime / v.duration : 0;
      bars.current.forEach((b, i) => { if (b) b.style.transform = `scaleX(${i < site ? 1 : i > site ? 0 : now})`; });
      raf = requestAnimationFrame(track);
    };
    track();
    return () => cancelAnimationFrame(raf);
  }, [site, awake, reduced]);

  const s = SITES[site] ?? SITES[0];
  const next = SITES[site + 1];

  return (
    <section ref={root} id="top" className={`relative bg-white ${reduced ? "h-[100svh]" : "h-[560vh] md:h-[600vh]"}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* The pair. Placed and scaled from script. */}
        <div ref={stage} aria-hidden className="absolute left-0 top-0 origin-top-left will-change-transform" style={{ width: BASE_W, height: BASE_H, transform: "translate3d(40vw, 30svh, 0) scale(.6)" }}>
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
          <div
            ref={(el) => { if (el) screens.current[0] = el; }}
            className="absolute overflow-hidden rounded-t-[4px] bg-black opacity-0"
            style={{ left: `${LAPTOP.l}%`, top: `${LAPTOP.t}%`, width: `${LAPTOP.w}%`, height: `${LAPTOP.h}%` }}
          >
            <video ref={laptopVid} key={`l-${s.key}`} src={`/showcase/${s.key}-desktop.mp4`} poster={`/showcase/${s.key}-desktop.jpg`} muted playsInline preload="auto" className="h-full w-full object-cover object-top" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.12)_0%,rgba(255,255,255,0)_40%)]" />
          </div>
          <div ref={phone} className="absolute opacity-0 drop-shadow-[0_24px_24px_rgba(0,0,0,.25)]" style={{ left: `${PHONE.l}%`, top: `${PHONE.t}%`, width: `${PHONE_W}%`, height: `${PHONE.h}%` }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- the phone, cut out of its Grok still */}
            <img src="/brand/phone-cut.webp" alt="" className="absolute inset-0 h-full w-full" />
            <div
              ref={(el) => { if (el) screens.current[1] = el; }}
              className="absolute overflow-hidden rounded-[8%/3.9%] bg-black opacity-0"
              style={{ left: `${PHONE_SCREEN.l}%`, top: `${PHONE_SCREEN.t}%`, width: `${PHONE_SCREEN.w}%`, height: `${PHONE_SCREEN.h}%` }}
            >
              <video ref={phoneVid} key={`p-${s.key}`} src={`/showcase/${s.key}-phone.mp4`} poster={`/showcase/${s.key}-phone.jpg`} muted playsInline preload="auto" className="h-full w-full object-cover object-top" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_45%)]" />
            </div>
          </div>
          {/* The next site's clips, loading ahead. */}
          {next && (
            <div className="hidden">
              <video src={`/showcase/${next.key}-desktop.mp4`} preload="auto" muted playsInline />
              <video src={`/showcase/${next.key}-phone.mp4`} preload="auto" muted playsInline />
            </div>
          )}
        </div>

        {/* The line: left on wide screens, above the pair on phones. */}
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

        <div ref={hint} className="appear absolute inset-x-0 bottom-[4svh] z-10 flex flex-col items-center gap-3 px-5" style={{ ["--i" as string]: 2 }}>
          <div className="flex gap-2.5 md:hidden">
            <a href="#proposal" className="inline-flex min-h-12 items-center rounded-full bg-red px-5 text-[15px] font-bold text-white">{cta}</a>
            <a href="#work" className="inline-flex min-h-12 items-center rounded-full border border-hair bg-white px-5 text-[15px] font-bold text-ink">The work</a>
          </div>
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-steel">
            <span className="block h-5 w-px animate-pulse bg-steel/50" /> Scroll to see the work
          </p>
        </div>

        {/* The chapters: which site is playing, and how far through it. */}
        <div ref={chapters} className="pointer-events-none absolute inset-x-0 bottom-0 z-10 opacity-0">
          <div className="mx-auto max-w-[1320px] px-5 pb-24 md:px-8 md:pb-8">
            <div className="pointer-events-auto flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-red">Live now · {String(site + 1).padStart(2, "0")} / {String(SITES.length).padStart(2, "0")}</p>
                <a href={s.url} target="_blank" rel="noreferrer" className="mt-1 block text-[clamp(1.4rem,2.6vw,2.2rem)] font-extrabold leading-none tracking-[-0.04em] text-ink hover:underline">{s.name} ↗</a>
                <p className="mt-1 text-[14px] text-steel">{s.kind}</p>
              </div>
              <ol className="flex gap-2" aria-label="Sites in this showcase">
                {SITES.map((x, i) => (
                  <li key={x.key} className="w-12 md:w-24">
                    <span className="block h-[3px] overflow-hidden rounded-full bg-ink/10">
                      <span ref={(el) => { if (el) bars.current[i] = el; }} className="block h-full origin-left scale-x-0 bg-red" />
                    </span>
                    <span className={`mt-2 hidden truncate text-[11px] font-semibold md:block ${i === site ? "text-ink" : "text-steel/70"}`}>{x.name}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
