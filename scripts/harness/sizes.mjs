// Screens a page at several widths and scroll points; reports horizontal overflow and console errors.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const [url, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--use-angle=metal', '--hide-scrollbars'] });
for (const w of [320, 390, 768, 1024, 1440, 1920]) {
  const p = await b.newPage();
  const errs = [];
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 120)));
  p.on('pageerror', (e) => errs.push(e.message.slice(0, 120)));
  await p.setViewport({ width: w, height: w < 768 ? 844 : 900, isMobile: w < 768, hasTouch: w < 768 });
  await p.goto(url, { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 3000));
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const over = [];
  for (const f of [0, 0.03, 0.08, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.99]) {
    await p.evaluate((y) => window.scrollTo(0, y), Math.round(H * f));
    await new Promise((r) => setTimeout(r, 900));
    const ow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (ow > 0) over.push(`${Math.round(f * 100)}%:+${ow}px`);
    await p.screenshot({ path: `${out}/${w}-${String(Math.round(f * 100)).padStart(2, '0')}.png` });
  }
  console.log(w, 'overflow', over.join(' ') || 'none', '| errors', errs.length ? errs.join(' | ') : 'none');
  await p.close();
}
await b.close();
