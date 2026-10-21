import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * The share card Jessica's texts and emails unfurl into: the Golden Gate in fog under the
 * headline, in the site's own display face (embedded — Satori cannot see browser fonts).
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "888 Marketing — See your website before you pay.";

export default async function OpengraphImage() {
  const [anton, bg] = await Promise.all([
    readFile(path.join(process.cwd(), "src/app/fonts/Anton-Regular.ttf")),
    readFile(path.join(process.cwd(), "src/app/og-bg.jpg")),
  ]);
  const src = `data:image/jpeg;base64,${bg.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "Anton" }}>
        <img src={src} width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} alt="" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,18,16,0.95) 0%, rgba(26,18,16,0.75) 45%, rgba(26,18,16,0.1) 85%)" }} />
        <div style={{ position: "absolute", left: 64, right: 64, bottom: 56, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#f3c5d9", letterSpacing: 2 }}>888 MARKETING</div>
          <div style={{ fontSize: 112, lineHeight: 0.9, color: "#ffffff", marginTop: 10 }}>SEE YOUR WEBSITE</div>
          <div style={{ fontSize: 112, lineHeight: 0.9, color: "#f3c5d9" }}>BEFORE YOU PAY.</div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.85)", marginTop: 22, fontFamily: "Anton" }}>FROM $499 · HOSTING AND EMAIL INCLUDED</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Anton", data: anton, style: "normal", weight: 400 }] },
  );
}
