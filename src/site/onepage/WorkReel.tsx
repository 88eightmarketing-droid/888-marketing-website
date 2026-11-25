"use client";

import { useEffect, useRef } from "react";
import { reels, type Reel } from "@/site/film/reels";

/**
 * The work, full screen (one-page home, 25 Nov 2026).
 *
 * Each piece of real client work fills the screen and stays pinned while the
 * next one slides up over it, so the page reads as one film. One line of type
 * per piece. Pure CSS sticky stacking: nothing is computed per frame, so it
 * cannot jam on a slow phone. The first film opens out of the white page from
 * an inset frame (a scroll-driven animation; browsers without it show it full).
 * Only the film on screen plays.
 */
export default function WorkReel() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const vids = [...(root.current?.querySelectorAll("video") ?? [])];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.intersectionRatio > 0.5) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} id="work" aria-label="Work" className="wr">
      {reels.map((r, i) => (
        <Panel key={r.id} reel={r} index={i} total={reels.length} />
      ))}
    </section>
  );
}

function Panel({ reel, index, total }: { reel: Reel; index: number; total: number }) {
  const line = reel.title.replace(/\n/g, " ");
  return (
    <article className={`wr-panel${index === 0 ? " wr-first" : ""}`} data-dark style={{ background: reel.ground }}>
      <div className="wr-frame" style={{ background: reel.ground }}>
        <Media reel={reel} />
        <div className="wr-shade" />
        <div className="wr-copy">
          <p className="wr-label">
            <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <span>{reel.kind}</span>
          </p>
          <h3 className="wr-line">{line}</h3>
          {reel.url ? (
            <a className="wr-client" href={reel.url} target="_blank" rel="noopener">
              {reel.client} <span aria-hidden>↗</span>
              <span className="sr-only"> (opens {reel.domain})</span>
            </a>
          ) : (
            <p className="wr-client">{reel.client}</p>
          )}
        </div>
      </div>
    </article>
  );
}

/** Phones get the vertical cut, wider screens the wide one. Kits and pairs sit centred on their ground. */
function Media({ reel }: { reel: Reel }) {
  const v = (src: string, poster: string, cls: string) => (
    <video className={cls} src={src} poster={poster} muted loop playsInline preload="metadata" aria-hidden tabIndex={-1} />
  );
  if (reel.layout === "kit") return <div className="wr-center">{v(reel.wide.mp4, reel.wide.jpg, "wr-square")}</div>;
  if (reel.layout === "pair")
    return (
      <div className="wr-center wr-pair">
        {v(reel.tall.mp4, reel.tall.jpg, "wr-tall")}
        {reel.tall2 && v(reel.tall2.mp4, reel.tall2.jpg, "wr-tall wr-second")}
      </div>
    );
  return (
    <>
      {v(reel.wide.mp4, reel.wide.jpg, "wr-fill wr-wide")}
      {v(reel.tall.mp4, reel.tall.jpg, "wr-fill wr-narrow")}
    </>
  );
}
