"use client";

import { useEffect, useRef } from "react";
import { reels, type Reel } from "@/site/film/reels";

/**
 * Now showing (the premiere home, 25 Nov 2026).
 *
 * Every client is presented as a feature: a title card, then the picture opens
 * like a shutter (a slit of light widening into a letterboxed frame), then a
 * poster credit block says who it is for and what 888 made. Our type never
 * sits on top of the client's site, so neither competes.
 *
 * Motion is time-based and starts when a feature scrolls in (one observer, no
 * per-frame work). Reduced motion and no-JavaScript show everything open.
 * Only the picture on screen plays.
 */
export default function Features() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    el.classList.add("pm-armed");
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -22% 0px" },
    );
    const play = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.intersectionRatio > 0.4) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: [0, 0.4, 1] },
    );
    // Films load only as they come near, and only the cut this screen shows (the
    // other is display:none), so nothing competes with the opener on first load.
    const load = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          for (const v of e.target.querySelectorAll<HTMLVideoElement>("video[data-src]")) {
            if (!v.offsetParent && getComputedStyle(v).display === "none") continue;
            v.poster = v.dataset.poster ?? "";
            v.src = v.dataset.src ?? "";
            v.removeAttribute("data-src");
            v.preload = "auto";
            play.observe(v);
          }
        }
      },
      { rootMargin: "120% 0px 120% 0px" },
    );
    el.querySelectorAll(".pm-reveal").forEach((n) => reveal.observe(n));
    el.querySelectorAll(".pm-pic").forEach((n) => load.observe(n));
    return () => { reveal.disconnect(); play.disconnect(); load.disconnect(); };
  }, []);

  return (
    <section ref={root} id="work" aria-labelledby="pm-title" className="pm" data-dark>
      <header className="pm-slate pm-reveal">
        <p className="pm-kicker"><span className="pm-rec" />888 presents</p>
        <h2 id="pm-title" className="pm-title">
          <span className="pm-mask"><span>Every business</span></span>
          <span className="pm-mask"><span>deserves an</span></span>
          <span className="pm-mask"><span>opening night.</span></span>
        </h2>
        <p className="pm-lede">Now showing. Real businesses, real work, all of it live.</p>
      </header>
      {reels.map((r, i) => <Feature key={r.id} reel={r} index={i} total={reels.length} />)}
    </section>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

function Feature({ reel, index, total }: { reel: Reel; index: number; total: number }) {
  return (
    <article className="pm-feature pm-reveal" aria-label={reel.client}>
      <p className="pm-reel">
        <span>Reel {pad(index + 1)} <span className="pm-dim">/ {pad(total)}</span></span>
        <span>{reel.kind}</span>
      </p>
      <div className="pm-pic" style={{ background: reel.ground }}>
        <Picture reel={reel} />
      </div>
      <div className="pm-credits">
        <h3 className="pm-name">
          <span className="pm-mask"><span>{reel.client}</span></span>
        </h3>
        <div className="pm-side">
          <p className="pm-line">{reel.title.replace(/\n/g, " ")}</p>
          <p className="pm-role">Made by 888</p>
          <ul className="pm-list">
            {reel.credits.map((c, k) => <li key={c} style={{ ["--k" as string]: k }}>{c}</li>)}
          </ul>
          {reel.url && (
            <a className="pm-link" href={reel.url} target="_blank" rel="noopener">
              {reel.domain} <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Wide screens get the wide cut, phones the vertical one. Pairs show two reels side by side. */
function Picture({ reel }: { reel: Reel }) {
  const v = (src: string, poster: string, cls: string, key?: string) => (
    <video key={key} className={cls} data-src={src} data-poster={poster} muted loop playsInline preload="none" aria-hidden tabIndex={-1} style={{ objectPosition: reel.focus ?? "50% 22%" }} />
  );
  if (reel.layout === "pair")
    return (
      <div className="pm-pair">
        {v(reel.tall.mp4, reel.tall.jpg, "pm-v pm-tall", "a")}
        {reel.tall2 && v(reel.tall2.mp4, reel.tall2.jpg, "pm-v pm-tall pm-second", "b")}
      </div>
    );
  return (
    <>
      {v(reel.wide.mp4, reel.wide.jpg, "pm-v pm-fill pm-wide")}
      {v(reel.tall.mp4, reel.tall.jpg, "pm-v pm-fill pm-narrow")}
    </>
  );
}
