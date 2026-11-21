"use client";

import { useEffect, useState } from "react";
import { MobileCta, TopBar } from "./Top";
import Hero from "./Hero";
import Proposal from "./Proposal";
import Closing from "./Closing";
import { Clients, Faq, Footer } from "./Sections";
import WorkFilm from "@/site/film/WorkFilm";
import HowItWorks from "@/site/film/HowItWorks";
import "@/site/film/film.css";

/**
 * The homepage, November 2026: a campaign landing page.
 *
 * White and clean, built like the agency landing pages that convert (the
 * proposal form straight after the opening, a call to action in every
 * section, a strong close — see docs/design-research.md) and finished like a
 * product launch: Grok film on white seamless scrubbed by scroll, with real
 * client sites on the devices, and a live preview of the visitor's own
 * business name.
 *
 * The business name typed in the proposal form feeds the preview section.
 */
export default function Home() {
  const [, setBusiness] = useState("");
  useFadeIn();
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Proposal onBusiness={setBusiness} />
        <Clients />
        <WorkFilm />
        <HowItWorks />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}

/** Adds `is-in` to each `[data-fade]` / `[data-wipe]` the first time it scrolls into view. */
function useFadeIn() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-fade],[data-wipe]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
