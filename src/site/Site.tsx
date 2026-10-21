"use client";

import type { ReactNode } from "react";
import SmoothScroll from "@/effects/smooth-scroll/SmoothScroll";
import Header from "./sections/Header";
import FlyThrough from "./sections/FlyThrough";
import Work from "./sections/Work";
import Price from "./sections/Price";
import How from "./sections/How";
import Visible from "./sections/Visible";
import Faq from "./sections/Faq";
import Start from "./sections/Start";
import Footer from "./sections/Footer";
import StickyCta from "./sections/StickyCta";

/** Client shell; the Instagram feed is a server component passed in as `feed`. */
export default function Site({ feed }: { feed: ReactNode }) {
  return (
    <SmoothScroll lerp={0.09}>
      <Header />
      <main>
        <FlyThrough />
        <Work />
        <Price />
        <How />
        <Visible />
        <Faq />
        {feed}
        <Start />
      </main>
      <Footer />
      <StickyCta />
    </SmoothScroll>
  );
}
