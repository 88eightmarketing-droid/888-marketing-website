/**
 * Screenshots the work film at each reel's hold point and the how-it-works list,
 * at desktop and phone sizes. Usage: node scripts/qa-film.mjs [baseUrl] [outDir]
 */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
const BASE = process.argv[2] || "http://localhost:3100";
const OUT = process.argv[3] || "/tmp/qa-film";
mkdirSync(OUT, { recursive: true });
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"] });
for (const [label, w, h] of [["desktop", 1440, 900], ["phone", 390, 844]]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, isMobile: w < 768, hasTouch: w < 768 });
  await p.evaluateOnNewDocument(() => sessionStorage.setItem("opener-seen", "1"));
  await p.goto(BASE, { waitUntil: "networkidle2", timeout: 90000 });
  const n = await p.$$eval("#work-film .film-layer", (e) => e.length);
  for (const f of (process.env.AT || "0.05,0.6").split(",").map(Number)) {
    for (let i = 0; i < n; i++) {
      await p.evaluate((i, f, n) => { const s = document.getElementById("work-film"); scrollTo(0, s.getBoundingClientRect().top + scrollY + ((s.offsetHeight - innerHeight) * (i + f)) / n); }, i, f, n);
      await new Promise((r) => setTimeout(r, 1800));
      await p.screenshot({ path: `${OUT}/${label}-reel${i + 1}-${Math.round(f * 100)}.png` });
    }
  }
  await p.evaluate(() => { const s = document.getElementById("how"); scrollTo(0, s.getBoundingClientRect().top + scrollY + innerHeight * 0.9); });
  await new Promise((r) => setTimeout(r, 800));
  await p.screenshot({ path: `${OUT}/${label}-how.png` });
  console.log(label, "reels", n, "overflow", await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
  await p.close();
}
await b.close();
