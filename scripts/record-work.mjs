/**
 * Records each live client site being scrolled, for the homepage reel and the
 * work index. Real screen recordings, so each site's own motion is in them.
 *
 *   node scripts/record-work.mjs              # all
 *   node scripts/record-work.mjs tree4less    # one
 *
 * Output: public/work/<key>.mp4 (1280×800, h264, ~9 s, no audio) and
 * public/work/<key>.jpg (the poster: the first frame of the clip).
 * Needs ffmpeg on PATH and Google Chrome.
 *
 * Cookie banners are removed before recording: they are the visitor's
 * choice on the client's site, not part of the design we are showing.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { WORK_SITES } from "./work-sites.mjs";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ONLY = process.argv.slice(2);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const tmp = mkdtempSync(path.join(tmpdir(), "888-rec-"));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  protocolTimeout: 120_000,
  args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
});

try {
  for (const site of WORK_SITES.filter((s) => !ONLY.length || ONLY.includes(s.key))) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(site.url, { waitUntil: "networkidle2", timeout: 60_000 });
    await wait(site.settle ?? 4500);
    await page.evaluate(() => {
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if ((cs.position === "fixed" || cs.position === "sticky") && /cookie|privacy|consent|do not sell/i.test(el.textContent ?? "") && el.getBoundingClientRect().height < 400) el.remove();
      }
    });
    await page.mouse.move(640, 400);

    const raw = path.join(tmp, `${site.key}.webm`);
    const rec = await page.screencast({ path: raw });
    await wait(900);
    // An even glide: small wheel steps, a little faster in the middle.
    const steps = 110;
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      await page.mouse.wheel({ deltaY: (site.speed ?? 46) * (0.55 + Math.sin(Math.PI * t)) });
      await wait(70);
    }
    await wait(600);
    await rec.stop();

    const out = `public/work/${site.key}.mp4`;
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", raw, "-t", "9", "-vf", "fps=30,scale=1280:800:flags=lanczos", "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", out]);
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", out, "-frames:v", "1", "-q:v", "4", `public/work/${site.key}.jpg`]);
    const dur = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]).toString().trim();
    console.log(`${out}  ${Number(dur).toFixed(1)} s`);
    await page.close();
  }
} finally {
  await browser.close();
  rmSync(tmp, { recursive: true, force: true });
}
