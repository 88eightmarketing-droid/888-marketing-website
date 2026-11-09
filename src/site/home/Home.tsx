"use client";

import { useEffect } from "react";
import { hero, tiles } from "@/data/site";
import { GlobalNav, LocalNav } from "./Nav";
import { Button, Tile, TileHead } from "./ui";
import { CareArt, Chrome888, ContentArt, Devices, IdentityArt, PresenceArt } from "./Art";
import { Difference, Footer, Process, Questions, WorkStrip } from "./Sections";
import Start from "./Start";

/**
 * The homepage, November 2026, product-page style: each service is presented
 * as a product tile (name, one line, two actions, a picture drawn in code),
 * then the spec-sheet line, how it works, a small strip of live client work,
 * questions and the form.
 *
 * Native scrolling, no scroll-jacking. Tiles fade up once as they arrive.
 */
export default function Home() {
  useFadeIn();
  return (
    <>
      <GlobalNav />
      <LocalNav />
      <main id="top">
        <div className="flex flex-col gap-3 bg-white">
          <Tile dark wide>
            <div className="flex flex-col items-center px-6 text-center" data-fade>
              <p className="text-[19px] font-semibold tracking-[-0.01em] text-white/60 md:text-[21px]">{hero.name}</p>
              <h1 className="mt-2 max-w-[14ch] text-[44px] font-semibold leading-[1.05] tracking-[-0.025em] text-white md:max-w-none md:text-[64px]">{hero.title}</h1>
              <div className="mt-6 flex flex-wrap justify-center gap-3.5">
                <Button href="#start">{hero.cta}</Button>
                <Button href="#how" variant="line" dark>{hero.secondary}</Button>
              </div>
            </div>
            <Chrome888 />
          </Tile>

          <Tile id="websites" mist wide>
            <TileHead name={tiles.websites.name} line={tiles.websites.line}>
              <Button href="#start">Start a project</Button>
              <Button href="#work" variant="line">See live sites</Button>
            </TileHead>
            <Devices />
          </Tile>

          <div className="grid gap-3 px-3 md:grid-cols-2">
            <Tile id="identity" dark>
              <TileHead name={tiles.identity.name} line={tiles.identity.line} dark>
                <Button href="#start">Start a project</Button>
              </TileHead>
              <IdentityArt />
            </Tile>
            <Tile id="content" mist>
              <TileHead name={tiles.content.name} line={tiles.content.line}>
                <Button href="#start">Start a project</Button>
              </TileHead>
              <ContentArt />
            </Tile>
            <Tile id="presence" mist>
              <TileHead name={tiles.presence.name} line={tiles.presence.line}>
                <Button href="#start">Start a project</Button>
              </TileHead>
              <PresenceArt />
            </Tile>
            <Tile id="care" dark>
              <TileHead name={tiles.care.name} line={tiles.care.line} dark>
                <Button href="#questions" variant="line" dark>How hosting works</Button>
              </TileHead>
              <CareArt />
            </Tile>
          </div>
        </div>

        <Difference />
        <Process />
        <WorkStrip />
        <Questions />
        <Start />
      </main>
      <Footer />
    </>
  );
}

/** Adds `is-in` to each `[data-fade]` the first time it scrolls into view. */
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
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-fade]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
