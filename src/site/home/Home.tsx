"use client";

import { useEffect } from "react";
import { TopBar } from "./Top";
import Opener3D from "@/site/three/Opener3D";
import "@/site/three/opener3d.css";
import Closing from "./Closing";
import { Footer } from "./Sections";
import Features from "@/site/premiere/Features";
import Schedule from "@/site/premiere/Schedule";
import EndCredits from "@/site/premiere/EndCredits";
import "@/site/film/film.css";
import "@/site/premiere/premiere.css";

/**
 * The homepage: the premiere (25 Nov 2026). One idea: 888 gives local
 * businesses an opening night. The camera flies through the red eight into a
 * dark house, each client plays as a feature with its credits, the production
 * schedule, the end credits, one form. The one-page version it grew from is
 * branch `onepage-2026-11`; the audit is agency-previews docs/888-audit/AUDIT.md.
 */
export default function Home() {
  useFadeIn();
  return (
    <>
      <TopBar />
      <main>
        <Opener3D />
        <Features />
        <Schedule />
        <EndCredits />
        <div id="proposal">
          <Closing />
        </div>
      </main>
      <Footer />
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
