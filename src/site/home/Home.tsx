"use client";

import { useEffect } from "react";
import { TopBar } from "./Top";
import Opener3D from "@/site/three/Opener3D";
import "@/site/three/opener3d.css";
import Closing from "./Closing";
import { Footer } from "./Sections";
import WorkReel from "@/site/onepage/WorkReel";
import How from "@/site/onepage/How";
import "@/site/onepage/onepage.css";

/**
 * The homepage, one page (25 Nov 2026; audit in agency-previews docs/888-audit/AUDIT.md).
 *
 * One idea: the 888 mark as objects, the camera flies through the red eight
 * into a white page, then the work itself, full screen, one line per piece,
 * three lines on how it works, and one form. About 250 words. The services,
 * FAQ and "in writing" detail no longer sit on the home page.
 */
export default function Home() {
  useFadeIn();
  return (
    <>
      <TopBar />
      <main>
        <Opener3D />
        <WorkReel />
        <How />
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
