import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * The share card Jessica's texts and emails unfurl into: the Golden Gate in fog under the
 * headline, in the site's own display face (embedded — Satori cannot see browser fonts).
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "888 Marketing — real sites for local businesses, from $499.";

export default async function OpengraphImage() {
  const [anton, bg] = await Promise.all([
    readFile(path.join(process.cwd(), "src/app/fonts/Anton-Regular.ttf")),
    readFile(path.join(process.cwd(), "src/app/og-bg.jpg")),
  ]);
  const src = `data:image/jpeg;base64,${bg.toString("base64")}`;
  /*
   * A photograph with a caption block under it, rather than type floating on a
   * scrim.
   *
   * The scrim never existed. Satori draws nothing for a gradient — given to
   * `background` or to `backgroundImage`, both render byte-identically to no
   * layer at all — so this card has been going out with white type over pale
   * fog since it was written. It reads on a monitor and it does not read on a
   * phone held in daylight, which is the only place anybody ever sees it.
   * Nothing looked wrong: the markup was there and the build was green. It
   * took rendering the card and looking at the pixels.
   *
   * A flat fill does render. So the fix stops trying to fade the photograph
   * out and gives the words their own ground instead — which also matches the
   * dark bands the site itself uses, and makes the contrast here a fixed fact
   * rather than whatever the photograph happens to be doing behind the text.
   */
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", fontFamily: "Anton", backgroundColor: "#14120f" }}>
        <div style={{ display: "flex", width: "100%", height: 236 }}>
          <img src={src} width={1200} height={236} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
        </div>
        {/*
          * The caption block is measured, not guessed: 630 less the photograph
          * leaves 394, and the type below comes to roughly 270 plus its
          * padding. The first attempt gave the photograph 300 and clipped the
          * strapline clean off the bottom edge of the card.
          */}
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, padding: "42px 64px 40px 64px" }}>
          {/* The accent, once — on the name, where the card is signed. */}
          <div style={{ fontSize: 30, color: "#c8442a", letterSpacing: 2 }}>888 MARKETING</div>
          <div style={{ fontSize: 96, lineHeight: 0.94, color: "#f6f3ee", marginTop: 14 }}>REAL SITES.</div>
          <div style={{ fontSize: 96, lineHeight: 0.94, color: "#f6f3ee" }}>OPEN THEM.</div>
          <div style={{ fontSize: 26, color: "#8b8377", marginTop: 20 }}>FROM $499 · HOSTING AND EMAIL INCLUDED</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Anton", data: anton, style: "normal", weight: 400 }] },
  );
}
