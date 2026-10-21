"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useMediaQuery } from "@/lib/motion";
import ScrollSequence from "@/effects/scroll-sequence/ScrollSequence";
import Magnetic from "@/effects/magnetic/Magnetic";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { captions, hero } from "@/data/content";
import { cn } from "@/lib/utils";

// Desktop: 192 frames at 1280px. Phones: every other frame at 720px (~2.4 MB instead of ~13 MB).
const set = (dir: string, n: number) => Array.from({ length: n }, (_, i) => `/sequences/${dir}/${String(i).padStart(3, "0")}.webp`);
const desktopFrames = set("sf", 192);
const mobileFrames = set("sf-m", 96);

/** Hero: a scroll-scrubbed San Francisco fly-through; captions tell the three steps. */
export default function FlyThrough() {
  const pin = useRef<HTMLElement>(null);
  const progress = useScrollProgress(pin, "top top", "bottom bottom");
  const [p, setP] = useState(0);
  // null on the server: the poster paints until the browser knows which frame set to load.
  const hydrated = useSyncExternalStore(() => () => {}, () => true, () => false);
  const narrow = useMediaQuery("(max-width: 767px)");
  const frames = hydrated ? (narrow ? mobileFrames : desktopFrames) : null;

  useEffect(() => {
    let raf = 0, last = -1;
    const loop = () => {
      const v = Math.round(progress.current * 200) / 200;
      if (v !== last) { last = v; setP(v); }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  return (
    <section id="top" ref={pin} className={layout.pin}>
      <div className={layout.sticky}>
        {/* First frame as a CSS backdrop: paints instantly, and stands in when JavaScript is off. */}
        <span className={media.poster} aria-hidden />
        {frames && <ScrollSequence frames={frames} progress={progress} className={media.canvas} smoothing={0.2} />}
        <span className={media.shade} aria-hidden />

        <div className={cn(layout.hero, p < 0.22 ? layout.on : layout.offUp)}>
          <p className={type.eyebrow}>{hero.eyebrow}</p>
          <h1 className={type.h1}>{hero.title.map((l, i) => <span key={l} className={i ? type.pink : layout.line}>{l}</span>)}</h1>
          <p className={type.lede}>{hero.text}</p>
          <div className={layout.ctas}>
            <Magnetic strength={0.3}><a href="#start" className={type.primary}>{hero.cta}</a></Magnetic>
            <span className={type.note}>{hero.note}</span>
          </div>
        </div>

        {captions.map((c) => (
          <div key={c.kicker} className={cn(layout.caption, c.align === "right" ? layout.right : c.align === "center" ? layout.center : layout.left, p >= c.from && p < c.to ? layout.on : layout.off)}>
            <p className={type.kicker}>{c.kicker}</p>
            <p className={type.caption}>{c.lines.map((l, i) => <span key={l} className={i ? type.pink : layout.line}>{l}</span>)}</p>
          </div>
        ))}

        <p className={layout.scroll} style={{ opacity: p < 0.04 ? 1 : 0 }}>Scroll ↓</p>
      </div>
    </section>
  );
}

const layout = {
  pin: "relative h-[600vh] bg-ink",
  sticky: "sticky top-0 h-svh overflow-hidden text-white",
  hero: "absolute inset-x-0 bottom-0 flex flex-col gap-5 px-5 pb-12 transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:px-10 md:pb-14",
  ctas: "mt-1 flex flex-wrap items-center gap-5",
  caption: "absolute top-1/2 -translate-y-1/2 px-5 transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:px-10",
  left: "left-0",
  right: "right-0 text-right",
  center: "inset-x-0 text-center",
  on: "opacity-100 blur-0",
  off: "pointer-events-none translate-y-[-38%] opacity-0 blur-sm",
  offUp: "pointer-events-none -translate-y-10 opacity-0 blur-sm",
  line: "block",
  scroll: "absolute bottom-6 right-5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity duration-500 md:right-10",
};

const media = {
  poster: "absolute inset-0 bg-[url(/sequences/sf-m/000.webp)] bg-cover bg-center md:bg-[url(/sequences/sf/000.webp)]",
  canvas: "absolute inset-0 h-full w-full",
  shade: "pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(26,18,16,0.88)_0%,rgba(26,18,16,0.55)_38%,rgba(26,18,16,0)_68%),linear-gradient(to_bottom,rgba(26,18,16,0.35),rgba(26,18,16,0)_18%)]",
};

const type = {
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.18em] text-sand",
  h1: "font-display text-[clamp(60px,10.5vw,176px)] uppercase leading-[0.86]",
  pink: "block text-sand",
  lede: "max-w-[560px] text-[15px] leading-relaxed text-white/85 md:text-[16px]",
  primary: "inline-block rounded-full bg-oxblood px-7 py-3.5 text-[14px] font-semibold text-white transition-transform duration-300 hover:scale-[1.04]",
  note: "text-[13px] text-white/70",
  kicker: "mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-sand",
  caption: "font-display text-[clamp(64px,11vw,184px)] uppercase leading-[0.86] drop-shadow-[0_2px_30px_rgba(0,0,0,0.35)]",
};
