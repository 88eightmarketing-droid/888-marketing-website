/**
 * 888 Marketing identity — every logo, avatar, banner and icon from one script.
 *
 *   node scripts/brand.mjs
 *
 * The mark is the one the site's first-visit opener draws (src/site/Opener.tsx):
 * three round-stroked eights, ink, ink, 888 red. Text is outlined from Inter so
 * the SVGs render the same everywhere, with no font installed.
 *
 * Writes brand/out/ (the kit: logos, social, stationery) and the site icons in
 * src/app/ (icon.svg, apple-icon.png) and public/ (icon-192/512 for the manifest).
 * Rules and sizes: brand/README.md.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname;
const OUT = join(ROOT, "brand/out");

export const C = { ink: "#0b0b0c", red: "#d40a10", white: "#ffffff", mist: "#f4f3f1", steel: "#6b6b70" };

const medium = opentype.parse(readFileSync(join(ROOT, "brand/fonts/Inter-Medium.ttf")).buffer);
const bold = opentype.parse(readFileSync(join(ROOT, "brand/fonts/Inter-Bold.ttf")).buffer);

// One eight: a 36-radius loop on a 42-radius loop, drawn as a single stroke (from Opener.tsx).
const EIGHT = "M50 92A36 36 0 0 1 50 20A36 36 0 0 1 50 92A42 42 0 0 0 50 176A42 42 0 0 0 50 92";
const STROKE = 15;
// Outer box of the three eights, stroke included: y 12.5–183.5.
// Eights sit GAP apart (100 in the first opener made the bottom loops touch, so small sizes read as a chain).
export const GAP = 112;
const MARK = { x: 0, y: 12, w: 2 * GAP + 100, h: 172 };

/** Three eights, at (x, y) scaled so the row is `w` wide. Colours: first two, third. */
function mark(x, y, w, a = C.ink, b = C.red) {
  const s = w / MARK.w;
  const eights = [0, GAP, 2 * GAP]
    .map((dx, i) => `<path d="${EIGHT}" transform="translate(${dx})" stroke="${i === 2 ? b : a}"/>`)
    .join("");
  return `<g transform="translate(${x} ${y}) scale(${s}) translate(${-MARK.x} ${-MARK.y})" fill="none" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round">${eights}</g>`;
}
const markH = (w) => (w / MARK.w) * MARK.h;

/** Text outlined to a path. Tracking in em. Returns { d, width }. */
function text(str, x, y, size, { font = medium, tracking = 0 } = {}) {
  let cx = x;
  const parts = [];
  for (const ch of str) {
    const g = font.charToGlyph(ch);
    parts.push(g.getPath(cx, y, size).toPathData(2));
    cx += (g.advanceWidth / font.unitsPerEm) * size + tracking * size;
  }
  const width = cx - x - (str.length ? tracking * size : 0);
  return { d: parts.join(""), width };
}
const measure = (str, size, opts) => text(str, 0, 0, size, opts).width;
const textPath = (str, x, y, size, fill, opts) => `<path d="${text(str, x, y, size, opts).d}" fill="${fill}"/>`;

const svg = (w, h, body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ""}${body}</svg>`;

/* ---------------------------------------------------------------- logos */

/** Stacked: 888 over MARKETING, the word tracked to the mark's width. */
function stacked(fg, accent, bg) {
  const w = MARK.w, pad = 40;
  const size = 34, tracking = 0.32;
  const tw = measure("MARKETING", size, { tracking });
  const gap = 30, mh = markH(w);
  const W = w + pad * 2, H = pad + mh + gap + size * 0.73 + pad;
  return svg(W, H, mark(pad, pad, w, fg, accent) + textPath("MARKETING", pad + (w - tw) / 2, pad + mh + gap + size * 0.727, size, fg, { tracking }), bg);
}

/** Horizontal: 888 then "Marketing" — headers, signatures, letterhead. */
function horizontal(fg, accent, bg) {
  const h = 120, pad = 30, w = (h * MARK.w) / MARK.h;
  const size = 92, gap = 34;
  const tw = measure("Marketing", size, { tracking: -0.02 });
  const W = pad + w + gap + tw + pad, H = h + pad * 2;
  // Baseline of the word sits on the bottom of the eights.
  return svg(W, H, mark(pad, pad, w, fg, accent) + textPath("Marketing", pad + w + gap, pad + h - 2, size, fg, { tracking: -0.02 }), bg);
}

/** Square avatar: the mark centred inside a circle-safe area (profile pictures crop to a circle). */
function avatar(size, fg, accent, bg) {
  const w = size * 0.7;
  return svg(size, size, mark((size - w) / 2, (size - markH(w)) / 2, w, fg, accent), bg);
}

/** One eight, for favicons where three would blur into a bar. */
function single(size, bg) {
  const s = (size * 0.78) / 172;
  // The eight's centre is (50, 98) in its own units.
  const ox = size / 2 - 50 * s, oy = size / 2 - 98 * s;
  return svg(size, size,
    `<g transform="translate(${ox} ${oy}) scale(${s})" fill="none" stroke="${C.red}" stroke-width="${STROKE + 3}" stroke-linecap="round"><path d="${EIGHT}"/></g>`,
    bg);
}

/* --------------------------------------------------------------- banners */

/**
 * A cover: white, the line set big in ink, the mark and the address.
 * `safe` is the box every platform keeps on every device; nothing important leaves it.
 */
function cover(W, H, safe, { line = "Make your phone ring.", foot = "888marketing.net" } = {}) {
  const sx = (W - safe.w) / 2, sy = (H - safe.h) / 2;
  const mw = Math.min(safe.w * 0.16, safe.h * 0.5 * (MARK.w / MARK.h));
  let size = safe.h * 0.34;
  const avail = safe.w - mw - safe.w * 0.06;
  while (measure(line, size, { font: bold, tracking: -0.035 }) > avail) size *= 0.96;
  const mh = markH(mw);
  const footSize = Math.max(16, size * 0.34);
  // Centre the line + address as one group; the mark is centred on the same axis.
  const groupH = size * 0.73 + footSize * 2.2;
  const top = sy + (safe.h - groupH) / 2;
  const lineY = top + size * 0.73;
  const lx = sx + mw + safe.w * 0.06;
  return svg(W, H,
    mark(sx, top + groupH / 2 - mh / 2, mw) +
    textPath(line, lx, lineY, size, C.ink, { font: bold, tracking: -0.035 }) +
    textPath(foot, lx, lineY + footSize * 2.2, footSize, C.steel, { tracking: 0.01 }),
    C.white);
}

/* --------------------------------------------------------------- write */

const files = {
  "logo/888-stacked.svg": stacked(C.ink, C.red),
  "logo/888-stacked-reverse.svg": stacked(C.white, C.red, C.ink),
  "logo/888-stacked-black.svg": stacked(C.ink, C.ink),
  "logo/888-stacked-white.svg": stacked(C.white, C.white),
  "logo/888-horizontal.svg": horizontal(C.ink, C.red),
  "logo/888-horizontal-reverse.svg": horizontal(C.white, C.red, C.ink),
  "logo/888-mark.svg": svg(MARK.w, MARK.h, mark(0, 0, MARK.w)),
  "logo/888-mark-reverse.svg": svg(MARK.w, MARK.h, mark(0, 0, MARK.w, C.white, C.red)),
  "logo/888-eight.svg": single(512),
  "social/avatar.svg": avatar(1080, C.ink, C.red, C.white),
  "social/avatar-dark.svg": avatar(1080, C.white, C.red, C.ink),
  // Safe areas per each platform's own guidance.
  "social/youtube-banner.svg": cover(2560, 1440, { w: 1546, h: 423 }),
  "social/facebook-cover.svg": cover(1640, 624, { w: 1250, h: 400 }),
  "social/x-header.svg": cover(1500, 500, { w: 1100, h: 300 }),
  "social/linkedin-cover.svg": cover(1128, 191, { w: 760, h: 120 }),
  "social/google-cover.svg": cover(1024, 576, { w: 860, h: 300 }),
};

const png = {
  "logo/888-stacked.svg": [1200],
  "logo/888-stacked-reverse.svg": [1200],
  "logo/888-horizontal.svg": [1200, 600],
  "logo/888-horizontal-reverse.svg": [1200],
  "logo/888-mark.svg": [1200],
  "social/avatar.svg": [1080],
  "social/avatar-dark.svg": [1080],
  "social/youtube-banner.svg": [2560],
  "social/facebook-cover.svg": [1640],
  "social/x-header.svg": [1500],
  "social/linkedin-cover.svg": [1128],
  "social/google-cover.svg": [1024],
};

for (const [name, body] of Object.entries(files)) {
  const p = join(OUT, name);
  mkdirSync(join(p, ".."), { recursive: true });
  writeFileSync(p, body);
}
for (const [name, widths] of Object.entries(png)) {
  for (const w of widths) {
    const base = name.replace(/\.svg$/, "");
    const out = join(OUT, widths.length > 1 || name.startsWith("logo/") ? `${base}-${w}.png` : `${base}.png`);
    await sharp(Buffer.from(files[name]), { density: 300 }).resize({ width: w }).png().toFile(out);
  }
}
// Social PNGs that platforms reject as too heavy go out as JPEG too.
for (const n of ["youtube-banner", "facebook-cover", "x-header", "linkedin-cover", "google-cover", "avatar"]) {
  await sharp(join(OUT, `social/${n}.png`)).flatten({ background: C.white }).jpeg({ quality: 92 }).toFile(join(OUT, `social/${n}.jpg`));
}

// Site icons (Next file conventions: src/app/icon.svg, src/app/apple-icon.png).
writeFileSync(join(ROOT, "src/app/icon.svg"), single(64, C.white));
await sharp(Buffer.from(avatar(180, C.ink, C.red, C.white)), { density: 300 }).resize(180).png().toFile(join(ROOT, "src/app/apple-icon.png"));
for (const s of [192, 512]) {
  await sharp(Buffer.from(avatar(s, C.ink, C.red, C.white)), { density: 300 }).resize(s).png().toFile(join(ROOT, `public/icon-${s}.png`));
}

await sharp(Buffer.from(single(64, C.white))).resize(48).png().toFile(join(OUT, "logo/favicon-48.png"));
console.log(`Wrote ${Object.keys(files).length} SVGs and their PNGs to brand/out, plus site icons.`);
