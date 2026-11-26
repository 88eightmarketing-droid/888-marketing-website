/**
 * Screenshots the whole home page at even scroll steps, desktop and phone, and
 * reports overflow and page errors. Usage: node scripts/qa-page.mjs [baseUrl] [outDir] [steps]
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
const BASE = process.argv[2] || "http://localhost:3100";
const OUT = process.argv[3] || "/tmp/qa-page";
const N = Number(process.argv[4] || 14);
mkdirSync(OUT, { recursive: true });
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--hide-scrollbars", "--use-angle=metal", "--ignore-gpu-blocklist", "--enable-gpu", "--autoplay-policy=no-user-gesture-required"] });
for (const [label, w, h] of [["desktop", 1440, 900], ["phone", 390, 844]]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, isMobile: w < 768, hasTouch: w < 768 });
  await p.evaluateOnNewDocument(() => sessionStorage.setItem("opener-seen", "1"));
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e)));
  await p.goto(BASE, { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 3000));
  const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (let i = 0; i <= N; i++) {
    await p.evaluate((y) => scrollTo(0, y), Math.round((H * i) / N));
    await new Promise((r) => setTimeout(r, 1400));
    await p.screenshot({ path: `${OUT}/${label}-${String(i).padStart(2, "0")}.jpg`, type: "jpeg", quality: 70 });
  }
  console.log(label, "height", H + h, "overflow", await p.evaluate(() => document.documentElement.scrollWidth - innerWidth), errs.join(" | "));
  await p.close();
}
await b.close();
