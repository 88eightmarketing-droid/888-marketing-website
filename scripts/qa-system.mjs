/**
 * Screenshots every chapter of the 888 System film, mid-chapter, at the sizes
 * people use. Usage: node scripts/qa-system.mjs [baseUrl] [outDir]
 * Default http://localhost:3100. Types "Rosa's Tacos" first so the name runs through.
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] || "http://localhost:3100";
const OUT = process.argv[3] || "/tmp/qa-system";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SIZES = [["desktop", 1440, 900], ["laptop", 1280, 720], ["phone", 390, 844], ["small", 360, 640]];
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
for (const [label, w, h] of SIZES) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: w < 768, hasTouch: w < 768 });
  await page.evaluateOnNewDocument(() => sessionStorage.setItem("opener-seen", "1"));
  await page.goto(BASE, { waitUntil: "networkidle2", timeout: 90_000 });
  await page.type("#how input", "Rosa’s Tacos");
  const n = await page.$$eval("#system .sys-screen", (els) => els.length);
  for (let i = 0; i < n; i++) {
    for (const f of (process.env.AT || "0.55").split(",").map(Number)) {
      await page.evaluate((i, f, n) => {
        const s = document.getElementById("system");
        const top = s.getBoundingClientRect().top + scrollY;
        scrollTo(0, top + ((s.offsetHeight - innerHeight) * (i + f)) / n);
      }, i, f, n);
      await new Promise((r) => setTimeout(r, 1400));
      await page.screenshot({ path: `${OUT}/${label}-${String(i + 1).padStart(2, "0")}-${Math.round(f * 100)}.png` });
    }
  }
  // Overflow check: nothing wider than the viewport.
  const wide = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(label, "chapters", n, "horizontal overflow px", wide);
  await page.close();
}
await browser.close();
