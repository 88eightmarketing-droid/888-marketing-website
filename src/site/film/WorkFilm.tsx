"use client";

import { useEffect, useRef, useState } from "react";
import { useHydrated, useMediaQuery, useReducedMotion } from "@/lib/motion";
import { reels, type Reel } from "./reels";

/**
 * The Work, in motion (November 2026).
 *
 * A pinned cinema: each piece of real 888 work (films and recordings of paying
 * clients' live sites, never stand-ins) opens from a framed card to the full
 * screen, pushes in slowly while its title rises, and hands over to the next.
 * Letterbox bars, grain and a running timecode make it read as a film.
 *
 * Per frame only CSS variables change: on each layer `--e` (entering, 0–1),
 * `--h` (holding, 0–1) and `--x` (leaving, 0–1). Only the active clip plays.
 * Phones get the vertical cuts.
 */

const VH_PER_REEL = 1.7;

export default function WorkFilm() {
  const root = useRef<HTMLElement>(null);
  const layers = useRef<HTMLDivElement[]>([]);
  const clock = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const wide = useMediaQuery("(min-width: 768px)");
  const mounted = useHydrated();
  const reduced = useReducedMotion();
  const n = reels.length;

  useEffect(() => {
    const sec = root.current;
    if (!sec) return;
    let target = 0, current = 0, raf = 0, last = -1;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const apply = () => {
      layers.current.forEach((el, i) => {
        if (!el) return;
        const l = current - i; // this layer's own time: <0 before, 0–1 during, >1 after
        const e = reduced ? (l >= 0 ? 1 : 0) : clamp((l + 0.05) / 0.35);
        const h = clamp((l - 0.25) / 0.6);
        const x = reduced ? 0 : clamp((l - 0.82) / 0.18);
        // Beat two: the piece slides aside into a window and the title takes the free side.
        const sp = reduced ? 1 : clamp((l - 0.32) / 0.22);
        el.style.setProperty("--s", (sp * sp * (3 - 2 * sp)).toFixed(4));
        el.style.setProperty("--e", e.toFixed(4));
        el.style.setProperty("--h", h.toFixed(4));
        el.style.setProperty("--x", i === n - 1 ? "0" : x.toFixed(4));
        el.style.visibility = l > -0.2 && (l < 1.05 || i === n - 1) ? "visible" : "hidden";
      });
      const i = Math.min(n - 1, Math.max(0, Math.floor(current + 0.15)));
      if (i !== last) { last = i; setActive(i); }
      if (clock.current) {
        const s = current * 7.3; // a running timecode, ~7 s of "film" per piece
        const f = Math.floor((s % 1) * 24);
        clock.current.textContent = `00:${String(Math.floor(s / 60)).padStart(2, "0")}:${String(Math.floor(s % 60)).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
      }
    };
    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      apply();
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      const r = sec.getBoundingClientRect();
      const run = r.height - innerHeight;
      target = Math.min(n - 0.001, Math.max(-0.05, (-r.top / run) * n));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); };
  }, [n, reduced]);

  // Only the clip on screen plays.
  useEffect(() => {
    layers.current.forEach((el, i) => {
      el?.querySelectorAll("video").forEach((v) => {
        if (i === active) { v.play().catch(() => {}); } else { v.pause(); }
      });
    });
  }, [active, wide, mounted]);

  return (
    <section ref={root} id="work-film" aria-label="Our work, in motion" className="relative bg-black text-white" style={{ height: `${n * VH_PER_REEL * 100 + 100}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        {reels.map((r, i) => (
          <div key={r.id} ref={(el) => { if (el) layers.current[i] = el; }} className="film-layer absolute inset-0" style={{ zIndex: i + 1, visibility: i === 0 ? "visible" : "hidden" }} aria-hidden={i !== active}>
            {mounted ? <Media reel={r} wide={wide} /> : <div className="film-media absolute inset-0" style={{ background: r.ground }} />}
            <div className="film-scrim absolute inset-0" />
            <Caption reel={r} index={i} total={n} />
          </div>
        ))}

        {/* Letterbox, grain, timecode */}
        <div aria-hidden className="film-bar film-bar-top pointer-events-none absolute inset-x-0 top-0 z-40 bg-black" />
        <div aria-hidden className="film-bar film-bar-bottom pointer-events-none absolute inset-x-0 bottom-0 z-40 bg-black" />
        <div aria-hidden className="film-grain pointer-events-none absolute inset-0 z-40" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[4.6rem] z-50 flex justify-between px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 md:top-[5.4rem] md:px-8">
          <span className="flex items-center gap-2"><span className="film-rec h-1.5 w-1.5 rounded-full bg-red" />888 · The work</span>
          <span ref={clock} className="tabular-nums">00:00:00:00</span>
        </div>
      </div>
    </section>
  );
}

function Media({ reel, wide }: { reel: Reel; wide: boolean }) {
  const src = wide ? reel.wide : reel.tall;
  if (reel.layout === "kit") {
    // Plumbing Art: the brand film in the middle, the printed kit around it.
    return (
      <div className="film-media absolute inset-0 grid place-items-center" style={{ background: reel.ground }}>
        {wide && reel.kit?.map((k, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- the client's real printed pieces, made by 888
          <img key={k.src} src={k.src} alt="" className="film-float absolute w-[clamp(160px,17vw,300px)] rounded-[10px] shadow-[0_30px_60px_rgba(0,0,0,.45)]" style={{ left: k.x, top: k.y, ["--r" as string]: `${k.r}deg`, ["--d" as string]: i % 2 ? 1 : -1 }} />
        ))}
        <video className="film-push relative aspect-square w-[min(78vw,62svh)] rounded-[18px] object-cover shadow-[0_40px_80px_rgba(0,0,0,.5)]" src={src.mp4} poster={src.jpg} muted loop playsInline preload="metadata" />
      </div>
    );
  }
  if (reel.layout === "pair" && wide) {
    // Two vertical reels, side by side, at phone size.
    return (
      <div className="film-media absolute inset-0 flex items-center justify-center gap-[3vw]" style={{ background: reel.ground }}>
        {[reel.tall, reel.tall2 ?? reel.tall].map((v, k) => (
          <video key={v.mp4} className="film-push aspect-[9/16] h-[min(74svh,720px)] rounded-[22px] object-cover shadow-[0_40px_80px_rgba(0,0,0,.6)]" style={{ ["--lift" as string]: k ? "4%" : "-4%" }} src={v.mp4} poster={v.jpg} muted loop playsInline preload="metadata" />
        ))}
      </div>
    );
  }
  return (
    <div className="film-media absolute inset-0" style={{ background: reel.ground }}>
      <video className="film-push absolute inset-0 h-full w-full object-cover" style={{ objectPosition: reel.focus ?? "50% 50%" }} src={src.mp4} poster={src.jpg} muted loop playsInline preload="metadata" />
    </div>
  );
}

function Caption({ reel, index, total }: { reel: Reel; index: number; total: number }) {
  return (
    <div className="film-caption absolute inset-x-0 bottom-0 z-30 px-5 pb-[calc(3.5vh+5.5rem)] md:inset-y-0 md:left-0 md:right-auto md:flex md:w-[40vw] md:items-center md:px-0 md:pb-0 md:pl-[max(2rem,calc((100vw-1320px)/2+2rem))]">
      <div className="flex flex-col gap-6">
        <div>
          <p className="film-rise flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70" style={{ ["--k" as string]: 0 }}>
            <span className="text-red">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-white/40" />
            {reel.kind}
            <span className="text-white/40">/ {String(total).padStart(2, "0")}</span>
          </p>
          <h3 className="mt-4 text-[clamp(2.2rem,4.6vw,5rem)] font-extrabold leading-[0.92] tracking-[-0.05em]">
            {reel.title.split("\n").map((line, k) => (
              <span key={k} className="block overflow-hidden pb-[0.05em]"><span className="film-line block" style={{ ["--k" as string]: k }}>{line}</span></span>
            ))}
          </h3>
          <p className="film-rise mt-4 max-w-[26rem] text-[15px] leading-[1.55] text-white/75 md:text-[16px]" style={{ ["--k" as string]: 2 }}>{reel.body}</p>
        </div>
        <a href={reel.url} target="_blank" rel="noreferrer" className="film-rise group inline-flex min-h-11 w-fit items-center gap-3 rounded-full border border-white/30 bg-white/10 px-5 text-[14px] font-semibold backdrop-blur hover:bg-white hover:text-ink" style={{ ["--k" as string]: 3 }}>
          {reel.client}
          <span className="text-white/60 group-hover:text-steel">{reel.domain} ↗</span>
        </a>
      </div>
    </div>
  );
}
