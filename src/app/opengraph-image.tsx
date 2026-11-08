import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * The share card links unfurl into: the homepage hero, set on paper.
 *
 * Satori cannot see browser fonts, so Instrument Serif is embedded from
 * src/app/fonts. Flat fills only — Satori draws nothing for gradients (the old
 * card shipped white type on pale fog for that reason). The previous card,
 * with the Golden Gate photograph, is on branch `archive/sf-flythrough-2026-11`.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "888 Marketing — design studio. Built to be the first call.";

export default async function OpengraphImage() {
  const dir = path.join(process.cwd(), "src/app/fonts");
  const [regular, italic] = await Promise.all([
    readFile(path.join(dir, "InstrumentSerif-Regular.ttf")),
    readFile(path.join(dir, "InstrumentSerif-Italic.ttf")),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 72px", backgroundColor: "#f6f3ee", color: "#14120f", fontFamily: "Instrument Serif" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <div style={{ fontSize: 44, lineHeight: 1 }}>888</div>
          <div style={{ fontSize: 20, letterSpacing: 5, color: "#4a453d" }}>MARKETING</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, lineHeight: 0.9, letterSpacing: -4 }}>Built to be</div>
          <div style={{ fontSize: 150, lineHeight: 0.9, letterSpacing: -4, fontStyle: "italic", color: "#4a453d" }}>the first call.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #ddd6cb", paddingTop: 20, fontSize: 30, color: "#4a453d" }}>
          <div>Strategy · Identity · Websites · Content</div>
          <div style={{ color: "#c8442a" }}>888marketing.net</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: regular, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: italic, style: "italic", weight: 400 },
      ],
    },
  );
}
