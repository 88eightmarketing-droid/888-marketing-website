// Exports a deterministic R3F scene as an image sequence for ScrollSequence.
// usage: node scripts/render-sequence.mjs <route> <outDir> [frames=120] [w=1280] [h=800]
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'node:fs';
const [route = '/render/coffee', out = 'public/sequences/coffee', n = 120, w = 1280, h = 800] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--use-angle=metal', '--ignore-gpu-blocklist'] });
const p = await b.newPage();
await p.setViewport({ width: +w, height: +h });
await p.goto('http://localhost:3913' + route, { waitUntil: 'networkidle2' });
await p.waitForFunction(() => typeof window.setFrame === 'function');
await new Promise(r => setTimeout(r, 1500));
for (let i = 0; i < +n; i++) {
  await p.evaluate(t => window.setFrame(t), i / (n - 1));
  const png = await p.screenshot({ type: 'png' });
  await sharp(png).webp({ quality: 72 }).toFile(`${out}/${String(i).padStart(3, '0')}.webp`);
}
console.log('rendered', n, 'frames to', out);
await b.close();
