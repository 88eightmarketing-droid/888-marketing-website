/**
 * Records each client site the way a first-time visitor sees it: from the
 * moment the page is requested, so the site's own intro (its first-visit
 * opener) is in the clip, then a steady scroll through the page so its scroll
 * effects play. One desktop clip (for the laptop) and one phone clip (for the
 * phone) per site, for the homepage showcase.
 *
 *   node scripts/record-showcase.mjs                 # all
 *   node scripts/record-showcase.mjs plumbingart     # one
 *
 * Output: public/showcase/<key>-desktop.mp4 (1280×800), <key>-phone.mp4
 * (390×844 at 2×, scaled to 540 wide) and a .jpg poster for each.
 *
 * Every site gets a fresh browser profile, so first-visit intros run.
 * Cookie banners are removed: they are the visitor's choice, not our design.
 */
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { SHOWCASE_SITES } from "./work-sites.mjs";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ONLY = process.argv.slice(2);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const tmp = mkdtempSync(path.join(tmpdir(), "888-show-"));
mkdirSync("public/showcase", { recursive: true });

const SHAPES = {
  desktop: { viewport: { width: 1280, height: 800 }, out: "scale=1280:800:flags=lanczos", crf: "28" },
  phone: { viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, out: "scale=540:-2:flags=lanczos", crf: "29" },
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  protocolTimeout: 180_000,
  args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
});

const dropBanners = (page) => page.evaluate(() => {
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if ((cs.position === "fixed" || cs.position === "sticky") && /cookie|privacy|consent|do not sell/i.test(el.textContent ?? "") && el.getBoundingClientRect().height < 400) el.remove();
  }
}).catch(() => {});

try {
  for (const site of SHOWCASE_SITES.filter((s) => !ONLY.length || ONLY.includes(s.key))) {
    for (const [shape, cfg] of Object.entries(SHAPES)) {
      const ctx = await browser.createBrowserContext();
      const page = await ctx.newPage();
      await page.setViewport(cfg.viewport);
      if (shape === "phone") await page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1");
      const raw = path.join(tmp, `${site.key}-${shape}.webm`);
      // The intro: start recording just after the request goes out, before the page paints,
      // so the site's opener is in the clip. (Recording from about:blank instead gives the
      // phone clips the wrong frame size.)
      const loading = page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      await wait(120);
      const rec = await page.screencast({ path: raw });
      await loading;
      await wait(site.intro ?? 3200);
      await dropBanners(page);
      // The scroll: an even glide, a little faster in the middle.
      const h = cfg.viewport.height;
      const steps = 120;
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        await page.mouse.wheel({ deltaY: (h / 800) * (site.speed ?? 44) * (0.55 + Math.sin(Math.PI * t)) });
        await wait(65);
      }
      await wait(700);
      await rec.stop();

      const out = `public/showcase/${site.key}-${shape}.mp4`;
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", raw, "-vf", `fps=30,${cfg.out}`, "-c:v", "libx264", "-preset", "slow", "-crf", cfg.crf, "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", out]);
      // Poster: a frame just after the intro, so a paused clip shows the site, not a blank load.
      const at = String(((site.intro ?? 3200) + 400) / 1000);
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", at, "-i", out, "-frames:v", "1", "-q:v", "4", out.replace(/\.mp4$/, ".jpg")]);
      const dur = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out]).toString().trim();
      console.log(`${out}  ${Number(dur).toFixed(1)} s`);
      await ctx.close();
    }
  }
} finally {
  await browser.close();
  rmSync(tmp, { recursive: true, force: true });
}
