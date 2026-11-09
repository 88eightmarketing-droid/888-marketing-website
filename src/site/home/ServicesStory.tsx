"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cta, services } from "@/data/site";
import { PhonePlayer } from "./Device";

/**
 * The services as a pinned story. On desktop the picture column holds still
 * while the four services scroll past beside it; each one that reaches the
 * middle of the screen brings its campaign still forward (crossfade and a
 * slow push-in) and fills its segment of the progress bar.
 *
 * Phones get each service with its own picture, stacked — pinning a tall
 * stage at 375px makes a page nobody finishes.
 */
export default function ServicesStory() {
  const [active, setActive] = useState(0);
  const panels = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    panels.current.forEach((p) => p && io.observe(p));
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="scroll-mt-20 bg-white pt-24 md:pt-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 className="text-[clamp(2.6rem,6vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.055em] md:col-span-8" data-fade>{services.title}</h2>
          <p className="max-w-[24rem] text-[18px] leading-[1.5] text-steel md:col-span-4 md:justify-self-end" data-fade style={{ "--d": "100ms" } as CSSProperties}>{services.text}</p>
        </div>

        <div className="mt-14 md:mt-20 md:grid md:grid-cols-12 md:gap-12">
          {/* Pinned picture column (desktop) */}
          <div className="hidden md:col-span-7 md:block">
            <div className="sticky top-[12vh] h-[76vh]">
              <div className="relative h-full overflow-hidden rounded-[32px] bg-mist">
                {services.items.map((s, n) => (
                  <div
                    key={s.id}
                    aria-hidden={n !== active}
                    className={`absolute inset-0 transition-[opacity,scale] duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] ${n === active ? "scale-100 opacity-100" : "scale-[1.12] opacity-0"}`}
                  >
                    <ServiceVisual id={s.id} />
                  </div>
                ))}
                <div className="absolute inset-x-8 bottom-8 flex items-end justify-between text-ink">
                  <p className="text-[96px] font-extrabold leading-[0.8] tracking-[-0.06em] tabular-nums">{String(active + 1).padStart(2, "0")}</p>
                  <div className="flex gap-2 pb-2">
                    {services.items.map((s, n) => (
                      <span key={s.id} className="h-1 w-10 overflow-hidden rounded-full bg-ink/10">
                        <span className={`block h-full bg-red transition-[width] duration-700 ${n <= active ? "w-full" : "w-0"}`} />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling text column */}
          <div className="flex flex-col gap-20 md:col-span-5 md:gap-0">
            {services.items.map((s, n) => (
              <article
                key={s.id}
                id={s.id}
                data-index={n}
                ref={(el) => { panels.current[n] = el; }}
                className={`scroll-mt-24 transition-opacity duration-500 md:flex md:min-h-[88vh] md:flex-col md:justify-center ${n === active ? "md:opacity-100" : "md:opacity-30"}`}
              >
                <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-[24px] bg-mist md:hidden" data-wipe>
                  <ServiceVisual id={s.id} />
                </div>
                <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-red">{String(n + 1).padStart(2, "0")} · {s.kicker}</p>
                <h3 className="mt-4 text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.05em]">{s.title}</h3>
                <p className="mt-5 text-[17px] leading-[1.6] text-steel">{s.body}</p>
                <ul className="mt-6 grid gap-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[16px] font-medium">
                      <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-red" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <a href="#proposal" className="group mt-8 inline-flex min-h-11 w-fit items-center gap-2 text-[16px] font-bold text-ink">
                  <span className="border-b-2 border-red pb-0.5">{cta}</span>
                  <span aria-hidden className="text-red transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="h-24 md:h-[12vh]" />
    </section>
  );
}

/**
 * What each service looks like when we do it — our own work, not stock:
 * the client sites on a phone, Plumbing Art's real posts for content, and for
 * brand a film animated from its real logo files (public/made).
 */
function ServiceVisual({ id }: { id: string }) {
  if (id === "websites") {
    return (
      <div className="absolute inset-0 flex items-center justify-center pb-[8%]">
        <PhonePlayer className="h-[78%]" />
      </div>
    );
  }
  if (id === "content") {
    return (
      <div className="absolute inset-0 flex items-center justify-center pb-[10%]">
        <div className="relative h-[66%] w-full">
          <Piece src="/made/pa-insta.webp" alt="An Instagram post we made for Plumbing Art" className="left-[14%] top-[8%] -rotate-[8deg]" />
          <Piece src="/made/pa-flyer.webp" alt="A flyer we made for Plumbing Art" className="left-[34%] top-0 z-10 rotate-[1deg]" />
          <Piece src="/made/pa-live.webp" alt="A launch post we made for Plumbing Art" className="left-[54%] top-[8%] rotate-[8deg]" />
        </div>
      </div>
    );
  }
  if (id === "google") {
    return (
      <picture>
        <source srcSet="/brand/w-pin.avif" type="image/avif" />
        <img src="/brand/w-pin.jpg" alt="A red map pin on a white studio floor" loading="lazy" className="absolute inset-0 h-full w-full object-cover mix-blend-multiply" />
      </picture>
    );
  }
  // Brand: a short film animated from Plumbing Art's real logo files (scripts/record-brand-film.mjs).
  return (
    <video
      src="/made/plumbingart-brand.mp4"
      poster="/made/plumbingart-brand.jpg"
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Plumbing Art's brand, designed by 888: the seal, the wordmark, its colours and its posts"
    />
  );
}

function Piece({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- content we made, from the client's package
    <img src={src} alt={alt} loading="lazy" className={`absolute aspect-[4/5] h-full rounded-[12px] object-cover shadow-[0_40px_60px_-30px_rgba(0,0,0,.55)] ${className}`} />
  );
}
