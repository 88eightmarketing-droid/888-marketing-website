/** Screenshots the 3D opener along its scroll. Usage: node scripts/qa-opener.mjs [baseUrl] [outDir] */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
const BASE = process.argv[2] || "http://localhost:3100";
const OUT = process.argv[3] || "/tmp/qa-opener";
mkdirSync(OUT, { recursive: true });
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--hide-scrollbars", "--use-angle=metal", "--ignore-gpu-blocklist", "--enable-gpu"] });
for (const [label, w, h] of [["desktop", 1440, 900], ["phone", 390, 844]]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, isMobile: w < 768, hasTouch: w < 768 });
  await p.evaluateOnNewDocument(() => sessionStorage.setItem("opener-seen", "1"));
  const errs = [];
  p.on("pageerror", (e) => errs.push(String(e)));
  await p.goto(BASE, { waitUntil: "networkidle2", timeout: 90000 });
  await new Promise((r) => setTimeout(r, 3500));
  for (const f of [0, 0.14, 0.36, 0.5, 0.7, 0.86, 0.95]) {
    await p.evaluate((f) => { const s = document.getElementById("top"); scrollTo(0, (s.offsetHeight - innerHeight) * f); }, f);
    await new Promise((r) => setTimeout(r, 1800));
    await p.screenshot({ path: `${OUT}/${label}-${String(Math.round(f * 100)).padStart(2, "0")}.png` });
  }
  console.log(label, "ready", await p.evaluate(() => document.querySelector(".o3-stage")?.dataset.ready ?? "no"), "nogl", await p.evaluate(() => document.querySelector(".o3-stage")?.dataset.nogl ?? "-"), errs.join(" | "));
  await p.close();
}
await b.close();
