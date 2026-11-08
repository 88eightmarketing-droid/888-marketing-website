"use client";

import { useEffect, type ReactNode } from "react";
import SmoothScroll from "@/effects/smooth-scroll/SmoothScroll";
import Header from "./Header";
import Hero from "./Hero";
import Work from "./Work";
import Principles from "./Principles";
import Services from "./Services";
import Process from "./Process";
import Questions from "./Questions";
import Start from "./Start";
import Footer from "./Footer";

/**
 * The homepage, November 2026.
 *
 * A design studio's front door: the promise in the hero, then the evidence —
 * live work, the standard every site is held to, what we do, how a project
 * runs — then the form. No prices; every project is quoted in writing.
 *
 * The Instagram feed is a server component, passed in as `feed`.
 */
export default function Home({ feed }: { feed: ReactNode }) {
  useReveal();
  return (
    <SmoothScroll lerp={0.1}>
      <Header />
      <main id="top">
        <Hero />
        <Work />
        <Principles />
        <Services />
        <Process />
        <Questions />
        {feed}
        <Start />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

/** Adds `is-in` to every `[data-reveal]` the first time it scrolls into view. */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
