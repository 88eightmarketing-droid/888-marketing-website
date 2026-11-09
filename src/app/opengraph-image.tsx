import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * The share card links unfurl into: the hero, on night, with a still from the
 * reel of client work in its window.
 *
 * Satori cannot see browser fonts, so Inter Tight and Geist Mono are embedded
 * from src/app/fonts (static instances — Satori renders a variable font at its
 * default weight). Flat fills only: Satori draws nothing for gradients.
 * The still is cut from public/work/reel.mp4 into src/app/og-reel.jpg.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "888 Marketing — design studio. Built to be the first call.";

export default async function OpengraphImage() {
  const dir = path.join(process.cwd(), "src/app");
  const [tight, mono, still] = await Promise.all([
    readFile(path.join(dir, "fonts/InterTight-Medium.ttf")),
    readFile(path.join(dir, "fonts/GeistMono-Regular.ttf")),
    readFile(path.join(dir, "og-reel.jpg")),
  ]);
  const src = `data:image/jpeg;base64,${still.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", backgroundColor: "#0b0b0a", color: "#efebe4", padding: "48px 56px", fontFamily: "Inter Tight" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 34, letterSpacing: -1.5 }}>888</div>
            <div style={{ fontFamily: "Geist Mono", fontSize: 16, letterSpacing: 2, color: "#8f8a82" }}>MARKETING</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: 0.88, letterSpacing: -6 }}>
            <div>Built to be</div>
            <div>the first</div>
            <div style={{ display: "flex" }}>call<span style={{ color: "#ef5a36" }}>.</span></div>
          </div>
          <div style={{ fontFamily: "Geist Mono", fontSize: 18, letterSpacing: 2, color: "#8f8a82" }}>DESIGN STUDIO · WEBSITES · IDENTITY · CONTENT</div>
        </div>
        <img src={src} width={420} height={534} style={{ width: 420, height: 534, objectFit: "cover", borderRadius: 14 }} alt="" />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: tight, style: "normal", weight: 500 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
