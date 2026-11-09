/**
 * Records a brand film — a short animation of a client's real brand files
 * (scripts/brand-film/<key>/film.html) — to video, for the Brand panel of the
 * services story. Built from the real SVG logos rather than generated, so
 * every letter stays exactly as designed.
 *
 *   node scripts/record-brand-film.mjs plumbingart
 *
 * Output: public/made/<key>-brand.mp4 (1080×1080, ~8.6 s, loops) and a .jpg poster.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const key = process.argv[2] ?? "plumbingart";
const LENGTH = 9.0; // seconds of timeline in film.html, ending where it starts
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const tmp = mkdtempSync(path.join(tmpdir(), "888-film-"));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars", "--allow-file-access-from-files"] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080 });
  await page.goto(pathToFileURL(path.resolve(`scripts/brand-film/${key}/film.html`)).href, { waitUntil: "load" });
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
  const raw = path.join(tmp, "film.webm");
  const rec = await page.screencast({ path: raw });
  await wait(400);
  const t0 = Date.now();
  await page.evaluate(() => document.getElementById("s").classList.add("go"));
  await wait(LENGTH * 1000 + 300);
  await rec.stop();
  const start = String((t0 - (t0 - 400)) / 1000 - 0.05);
  const out = `public/made/${key}-brand.mp4`;
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", start, "-i", raw, "-t", String(LENGTH), "-vf", "fps=30,scale=1080:1080:flags=lanczos", "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", out]);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", "7.6", "-i", out, "-frames:v", "1", "-q:v", "4", out.replace(/\.mp4$/, ".jpg")]);
  console.log(out, execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]).toString().trim(), "s");
} finally {
  await browser.close();
  rmSync(tmp, { recursive: true, force: true });
}
