/**
 * Captures the live client sites shown in the Work section, full length, at
 * desktop width. Output: public/work/<key>-desktop.webp.
 *
 *   node scripts/capture-work.mjs
 *
 * Run it again whenever a client site changes; the capture is a picture of the
 * live page and goes stale the moment the owner edits it. The live link under
 * each capture is the truth.
 *
 * Every page is scrolled top to bottom before the shot so lazy images and
 * scroll reveals have fired; otherwise the lower half captures as blank paper.
 */
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const SITES = [
  { key: "classeskin", url: "https://classeskin.com" },
  { key: "getkickz", url: "https://getkickz.com" },
];

const SHAPES = [
  { name: "desktop", width: 1440, height: 900, scale: 1, mobile: false, maxHeight: 6400, out: 1440 },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = innerHeight * 0.6;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
    }
    scrollTo(0, 0);
  });
  await wait(1200);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  for (const site of SITES) {
    for (const shape of SHAPES) {
      const page = await browser.newPage();
      await page.setViewport({ width: shape.width, height: shape.height, deviceScaleFactor: shape.scale, isMobile: shape.mobile, hasTouch: shape.mobile });
      // Skip first-visit loaders and motion so the capture is the settled page.
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      await page.goto(site.url, { waitUntil: "networkidle2", timeout: 60_000 });
      await wait(2500);
      await scrollThrough(page);
      const full = await page.evaluate(() => document.documentElement.scrollHeight);
      const height = Math.min(full, shape.maxHeight);
      const png = await page.screenshot({ clip: { x: 0, y: 0, width: shape.width, height }, captureBeyondViewport: true });
      const file = `public/work/${site.key}-${shape.name}.webp`;
      await sharp(png).resize({ width: shape.out }).webp({ quality: 78 }).toFile(file);
      const meta = await sharp(file).metadata();
      console.log(`${file}  ${meta.width}×${meta.height}  (page ${full}px tall)`);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
