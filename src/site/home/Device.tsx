"use client";

import { useState } from "react";

/**
 * Real work on a photographed device. The laptop-and-phone opening scene
 * lives in Hero.tsx; this is the phone on its own, for the services story.
 */

const PHONE_SITES = ["plumbingart", "getkickz", "classeskin", "cleanpuppy", "tree4less"];

/**
 * The phone cut-out (Grok still, white seamless) playing the phone recordings
 * of the showcase sites, one after another, intros included.
 */
export function PhonePlayer({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  const k = PHONE_SITES[i];
  return (
    <div className={`relative aspect-[416/846] drop-shadow-[0_30px_30px_rgba(0,0,0,.22)] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- the phone, cut out of its Grok still */}
      <img src="/brand/phone-cut.webp" alt="" className="absolute inset-0 h-full w-full" />
      <div className="absolute left-[2.16%] top-[1.06%] h-[98%] w-[95.7%] overflow-hidden rounded-[8%/3.9%] bg-black">
        <video
          key={k}
          src={`/showcase/${k}-phone.mp4`}
          poster={`/showcase/${k}-phone.jpg`}
          className="h-full w-full object-cover object-top"
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-label="Client sites we built, playing on a phone"
          onEnded={() => setI((n) => (n + 1) % PHONE_SITES.length)}
        />
      </div>
    </div>
  );
}
