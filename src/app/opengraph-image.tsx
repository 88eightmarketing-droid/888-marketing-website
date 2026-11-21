import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { EIGHT, GAP, STROKE } from "@/brand/mark";

/**
 * The card links unfurl into: white, the mark, the line, the address —
 * the same layout as the social covers built by scripts/brand.mjs.
 * Satori cannot see browser fonts, so Inter is embedded from src/app/fonts.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "888 Marketing. Make your phone ring.";

export default async function OpengraphImage() {
  const dir = path.join(process.cwd(), "src/app/fonts");
  const [bold, medium] = await Promise.all([readFile(path.join(dir, "Inter-Bold.ttf")), readFile(path.join(dir, "Inter-Medium.ttf"))]);
  const w = 2 * GAP + 100;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#ffffff", color: "#0b0b0c", padding: "72px 80px", fontFamily: "Inter" }}>
        <svg width={w * 0.62} height={172 * 0.62} viewBox={`0 12 ${w} 172`} fill="none" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
          <path d={EIGHT} stroke="#0b0b0c" />
          <path d={EIGHT} stroke="#0b0b0c" transform={`translate(${GAP})`} />
          <path d={EIGHT} stroke="#d40a10" transform={`translate(${2 * GAP})`} />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 124, fontWeight: 700, lineHeight: 0.95, letterSpacing: -5 }}>Make your</div>
          <div style={{ fontSize: 124, fontWeight: 700, lineHeight: 0.95, letterSpacing: -5 }}>phone ring.</div>
          <div style={{ marginTop: 34, fontSize: 30, fontWeight: 500, color: "#6b6b70" }}>Websites · Google · Content · Brand — 888marketing.net</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: bold, style: "normal", weight: 700 },
        { name: "Inter", data: medium, style: "normal", weight: 500 },
      ],
    },
  );
}
