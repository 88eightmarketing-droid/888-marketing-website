/**
 * Records a live client site for the work films: a wide cut (1600×900) and a
 * phone cut (390×844 at 2×, scaled to 540×1168), 20 s each, no audio. It holds
 * on the hero, then glides down the page so the site's own motion is in it.
 *
 *   node scripts/record-film.mjs rincon https://carnitaselrincon.com
 *   node scripts/record-film.mjs trailpushers https://trailpushers.vercel.app 5000
 *
 * Third argument: ms to wait for the site's opener before recording (default 4500).
 * Output: public/film/<key>-wide|tall.mp4 and a .jpg poster each.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";

const [key, url, settleArg] = process.argv.slice(2);
if (!key || !url) throw new Error("usage: record-film.mjs <key> <url> [settleMs]");
const SETTLE = Number(settleArg ?? 4500);
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const tmp = mkdtempSync(path.join(tmpdir(), "888-film-"));

const SHAPES = {
  wide: { viewport: { width: 1600, height: 900 }, vf: "fps=30,scale=1600:900:flags=lanczos", crf: "27" },
  tall: { viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, vf: "fps=30,scale=540:1168:flags=lanczos", crf: "28" },
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, protocolTimeout: 180_000, args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"] });
try {
  for (const [shape, cfg] of Object.entries(SHAPES)) {
    const ctx = await browser.createBrowserContext();
    const page = await ctx.newPage();
    await page.setViewport(cfg.viewport);
    if (shape === "tall") await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1");
    await page.goto(url, { waitUntil: "networkidle2", timeout: 90_000 });
    await wait(SETTLE);
    // Load lazy media first (pass down the page and back), so nothing records as an empty tile.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 250)); }
      scrollTo(0, 0);
    });
    await wait(2500);
    // Cookie banners are the visitor's choice, not the design we are showing.
    await page.evaluate(() => {
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if ((cs.position === "fixed" || cs.position === "sticky") && /cookie|consent|do not sell/i.test(el.textContent ?? "") && el.getBoundingClientRect().height < 400) el.remove();
      }
    }).catch(() => {});
    const raw = path.join(tmp, `${shape}.webm`);
    const rec = await page.screencast({ path: raw });
    await wait(3000); // hold on the hero
    // Glide over the page body, stopping before the footer; never faster than MAX px a step.
    const room = await page.evaluate(() => { const f = document.querySelector("footer"); const end = f ? f.getBoundingClientRect().top + scrollY - innerHeight * 0.6 : document.documentElement.scrollHeight - innerHeight; return Math.max(0, end); });
    const steps = 200, MAX = shape === "tall" ? 48 : 40;
    const norm = steps * (0.55 + 2 / Math.PI); // sum of the easing weights
    const k = Math.min(room / norm, MAX);
    for (let i = 0; i < steps; i++) {
      const d = k * (0.55 + Math.sin((Math.PI * i) / steps));
      await page.evaluate((d) => scrollBy(0, d), d);
      await wait(75);
    }
    await wait(1500);
    await rec.stop();
    await ctx.close();
    const out = `public/film/${key}-${shape}.mp4`;
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", raw, "-t", "20", "-vf", cfg.vf, "-c:v", "libx264", "-preset", "slow", "-crf", cfg.crf, "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", out]);
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", "1.5", "-i", out, "-frames:v", "1", "-q:v", "4", `public/film/${key}-${shape}.jpg`]);
    const dur = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]).toString().trim();
    console.log(`${out}  ${Number(dur).toFixed(1)} s`);
  }
} finally {
  await browser.close();
  rmSync(tmp, { recursive: true, force: true });
}
