/**
 * Captures each live client site as a tall strip of real screens, at the
 * shape of the foldable's open display (nearly square), for the hero.
 *
 *   node scripts/capture-screens.mjs            # all
 *   node scripts/capture-screens.mjs tree4less  # one
 *
 * Output: public/screens/<key>.webp — five viewport-sized screens stacked,
 * 960 px wide. The hero scrolls the strip across both panels of the device.
 *
 * Viewport screenshots stacked, rather than one full-page capture, because
 * some client sites (JellyCee) are pinned scroll experiences: a full-page
 * capture of those is one hero and a mile of empty colour.
 */
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import { WORK_SITES } from "./work-sites.mjs";

const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ONLY = process.argv.slice(2);
const W = 1040, H = 968, SHOTS = 5, OUT_W = 960;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, protocolTimeout: 120_000, args: ["--hide-scrollbars"] });
try {
  for (const site of WORK_SITES.filter((s) => !ONLY.length || ONLY.includes(s.key))) {
    const page = await browser.newPage();
    await page.setViewport({ width: W, height: H });
    await page.goto(site.url, { waitUntil: "networkidle2", timeout: 60_000 });
    await wait(site.settle ?? 4500);
    await page.evaluate(() => {
      for (const el of document.querySelectorAll("body *")) {
        const cs = getComputedStyle(el);
        if ((cs.position === "fixed" || cs.position === "sticky") && /cookie|privacy|consent|do not sell/i.test(el.textContent ?? "") && el.getBoundingClientRect().height < 400) el.remove();
      }
    });
    await page.mouse.move(W / 2, H / 2);
    const shots = [];
    for (let i = 0; i < SHOTS; i++) {
      shots.push(await page.screenshot({ type: "png" }));
      for (let s = 0; s < 8; s++) { await page.mouse.wheel({ deltaY: (H * 0.85) / 8 }); await wait(90); }
      await wait(1400);
    }
    const strip = await sharp({ create: { width: W, height: H * SHOTS, channels: 3, background: "#fff" } })
      .composite(shots.map((input, i) => ({ input, left: 0, top: i * H })))
      .png()
      .toBuffer();
    const out = `public/screens/${site.key}.webp`;
    await sharp(strip).resize({ width: OUT_W }).webp({ quality: 72 }).toFile(out);
    const m = await sharp(out).metadata();
    console.log(`${out}  ${m.width}×${m.height}  ${(m.size / 1024).toFixed(0)} KB`);
    await page.close();
  }
} finally {
  await browser.close();
}
