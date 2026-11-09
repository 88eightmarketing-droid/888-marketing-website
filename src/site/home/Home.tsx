"use client";

import { useEffect } from "react";
import SmoothScroll from "@/effects/smooth-scroll/SmoothScroll";
import Cursor from "./Cursor";
import Header from "./Header";
import Hero from "./Hero";
import Statement from "./Statement";
import Work from "./Work";
import Services from "./Services";
import Band from "./Band";
import Questions from "./Questions";
import Start from "./Start";
import Footer from "./Footer";

/**
 * The studio homepage, November 2026 — cinematic and work-first, after
 * Basic/Dept and makemepulse (see docs/design-research.md).
 *
 * The reel of client sites opens the page and expands to full screen; then a
 * statement, the work index (real recordings of live client sites), the
 * services, the call to action, questions and the form.
 */
export default function Home() {
  useInView();
  return (
    <SmoothScroll lerp={0.09}>
      <Cursor />
      <Header />
      <main id="top">
        <Hero />
        <Statement />
        <Work />
        <Services />
        <Band />
        <Questions />
        <Start />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

/**
 * Two observers: one adds `is-in` to `[data-split]`, `[data-fade]` and
 * `[data-media]` the first time each scrolls into view; the other plays
 * `video[data-autoplay]` while on screen and pauses it off screen.
 */
function useInView() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          reveal.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-split],[data-fade],[data-media]").forEach((el) => reveal.observe(el));

    const play = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) void v.play().catch(() => {});
          else v.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    document.querySelectorAll<HTMLVideoElement>("video[data-autoplay]").forEach((v) => play.observe(v));

    return () => { reveal.disconnect(); play.disconnect(); };
  }, []);
}
