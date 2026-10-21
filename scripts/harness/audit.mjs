// Measured audit: fonts, tap targets, contrast, transfer, first paint, reduced motion, no-JS HTML.
import puppeteer from 'puppeteer-core';
const url = process.argv[2];
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--use-angle=metal'] });
async function run(width, opts = {}) {
  const p = await b.newPage();
  if (opts.reduced) await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p.setViewport({ width, height: width < 768 ? 812 : 900, isMobile: width < 768, hasTouch: width < 768 });
  let bytes = 0; const big = [];
  p.on('response', async (r) => { try { const len = Number(r.headers()['content-length'] || 0); bytes += len; if (len > 300000) big.push([r.url().split('/').slice(-2).join('/'), Math.round(len / 1024) + 'KB']); } catch {} });
  const t0 = Date.now();
  await p.goto(url, { waitUntil: 'load' });
  const loadMs = Date.now() - t0;
  await new Promise((r) => setTimeout(r, 2500));
  const firstFrame = await p.evaluate(() => { const c = document.querySelector('canvas'); if (!c) return 'no canvas'; try { const d = c.getContext('2d').getImageData(c.width / 2, c.height / 2, 1, 1).data; return d[3] ? 'painted' : 'blank'; } catch { return 'unreadable'; } });
  const scrolled = await p.evaluate(async () => { const H = document.documentElement.scrollHeight; for (let y = 0; y < H; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, 0); return H; });
  const m = await p.evaluate(() => {
    const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true }); const toRgb = (c) => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = '#000'; cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); const d = cv.getImageData(0, 0, 1, 1).data; return `rgb(${d[0]},${d[1]},${d[2]})`; };
    const lum = (c) => { const v = toRgb(c).match(/[\d.]+/g).slice(0, 3).map(Number).map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
    const bgOf = (el) => { while (el) { const c = getComputedStyle(el).backgroundColor; if (c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c) && !/, 0\)$/.test(c)) return c; if (getComputedStyle(el).backgroundImage !== 'none' || el.tagName === 'IMG') return null; el = el.parentElement; } return 'rgb(255,255,255)'; };
    const lowContrast = [];
    for (const el of document.querySelectorAll('p,a,h1,h2,h3,li,span,button,dt,dd,summary,label')) {
      if (el.children.length && el.tagName !== 'A' && el.tagName !== 'BUTTON') continue;
      const t = el.textContent.trim(); if (!t) continue;
      const r = el.getBoundingClientRect(); if (!r.width || getComputedStyle(el).opacity === '0') continue;
      const bg = bgOf(el); if (!bg) continue;
      const fg = getComputedStyle(el).color; if (/, 0\)$/.test(fg)) continue;
      const a = lum(fg), c = lum(bg); const ratio = (Math.max(a, c) + 0.05) / (Math.min(a, c) + 0.05);
      const size = parseFloat(getComputedStyle(el).fontSize); const need = size >= 24 ? 3 : 4.5;
      if (ratio < need) lowContrast.push(`${ratio.toFixed(2)} "${t.slice(0, 40)}" ${size}px`);
    }
    const small = [...document.querySelectorAll('a,button,summary,input,textarea')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && (r.height < 44 || r.width < 44); }).map((e) => `${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)} ${(e.textContent || e.getAttribute('name') || '').trim().slice(0, 30)}`);
    const fonts = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family);
    const h = [...document.querySelectorAll('h1,h2')].map((e) => `${e.tagName} ${getComputedStyle(e).fontSize} ${getComputedStyle(e).fontFamily.split(',')[0]}`);
    const imgs = [...document.images].map((i) => `${i.src.split('/').pop()} ${i.naturalWidth}w shown ${Math.round(i.getBoundingClientRect().width)} alt="${i.alt.slice(0, 30)}"`);
    return { lowContrast: [...new Set(lowContrast)].slice(0, 20), small: [...new Set(small)].slice(0, 25), fonts: [...new Set(fonts)], h, imgs, title: document.title, desc: document.querySelector('meta[name=description]')?.content, robots: document.querySelector('meta[name=robots]')?.content, og: !!document.querySelector('meta[property="og:image"]'), icon: !!document.querySelector('link[rel*=icon]') };
  });
  console.log(JSON.stringify({ width, reduced: !!opts.reduced, loadMs, firstFrame, pageHeight: scrolled, transferKB: Math.round(bytes / 1024), big: big.slice(0, 8), ...m }, null, 1));
  await p.close();
}
await run(375);
await run(1440);
await run(375, { reduced: true });
await b.close();
