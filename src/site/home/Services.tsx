"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/data/site";
import { Reveal } from "./Reveal";

/**
 * Five disciplines set as huge rows. On a desktop, hovering a row floats a
 * small clip of client work beside the pointer; on phones each row simply
 * carries its line of description. The preview is decoration — every word is
 * in the rows themselves.
 */
export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const card = useRef<HTMLDivElement>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const tick = () => {
      cx += (x - cx) * 0.14; cy += (y - cy) * 0.14;
      if (card.current) card.current.style.transform = `translate3d(${cx + 28}px, ${cy - 110}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); };
  }, []);

  useEffect(() => {
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) void v.play().catch(() => {});
      else v.pause();
    });
  }, [active]);

  return (
    <section id="services" className={layout.root} onPointerLeave={() => setActive(null)}>
      <p className={type.eyebrow} data-fade>{services.eyebrow}</p>
      <ol className={layout.list}>
        {services.items.map((s, i) => (
          <li
            key={s.name}
            // The dimming lives on the row, not the heading: React rewrites a
            // heading's className on every hover, which wiped the `is-in` the
            // reveal observer had added and hid the words.
            className={`${layout.row} ${active !== null && active !== i ? "[&_h3]:text-bone/25" : ""}`}
            onPointerEnter={() => setActive(i)}
            onPointerLeave={() => setActive(null)}
          >
            <span className={type.n}>{String(i + 1).padStart(2, "0")}</span>
            <Reveal as="h3" text={s.name} className={type.name} />
            <p className={type.line}>{s.line}</p>
          </li>
        ))}
      </ol>

      <div ref={card} aria-hidden className={layout.card}>
        <div className={`${layout.cardInner} ${active === null ? "scale-75 opacity-0" : "scale-100 opacity-100"}`}>
          {services.items.map((s, i) => (
            <video
              key={s.name}
              ref={(el) => { vids.current[i] = el; }}
              className={`${layout.cardVideo} ${active === i ? "opacity-100" : "opacity-0"}`}
              src={`/work/${s.clip}.mp4`}
              poster={`/work/${s.clip}.jpg`}
              muted
              loop
              playsInline
              preload="none"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const layout = {
  root: "relative bg-night px-5 py-24 md:px-10 md:py-40",
  list: "mt-10 border-b border-line md:mt-14",
  row: "group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-t border-line py-6 md:grid-cols-[4rem_1fr_minmax(0,22rem)] md:py-7",
  card: "pointer-events-none fixed left-0 top-0 z-40 hidden [@media(pointer:fine)]:block",
  cardInner: "relative h-[200px] w-[320px] origin-top-left overflow-hidden rounded-[6px] bg-night-2 transition-[opacity,scale] duration-500 ease-out-expo",
  cardVideo: "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300",
};

const type = {
  eyebrow: "font-mono text-[11px] uppercase tracking-[0.12em] text-dim",
  n: "font-mono text-[11px] tracking-[0.12em] text-dim",
  name: "font-display text-[clamp(3rem,9.5vw,10rem)] text-bone font-medium leading-[0.9] tracking-[-0.055em] transition-[color,translate] duration-500 ease-out-expo md:group-hover:translate-x-[1.5vw]",
  line: "col-start-2 mt-2 max-w-[30rem] text-[15px] leading-[1.55] text-bone/60 md:col-start-3 md:mt-0 md:self-end md:pb-3",
};
