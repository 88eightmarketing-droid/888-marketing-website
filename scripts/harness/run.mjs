// Headless-Chrome harness for the clone extraction.
// usage: node run.mjs --width 1440 [--prime] [--shot out.png [--full]] [--eval file.js --out out.json] [--url URL] [--hover SEL] [--scroll N] [--click SEL]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i === -1 ? d : (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true); };

const url = opt('url', 'http://localhost:3912/');
const width = Number(opt('width', 1440));
const height = Number(opt('height', 900));
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--hide-scrollbars', '--no-first-run', '--use-angle=metal', '--enable-webgl', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage();
await page.setViewport({ width, height, deviceScaleFactor: Number(opt('dpr', 1)) });
if (opt('reduced', false)) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
if (opt('mobile', false)) await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
page.on('console', m => { if (opt('console', false)) console.error('[console]', m.type(), m.text()); });
try { await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }); } catch (e) { console.error('goto:', e.message); }
await new Promise(r => setTimeout(r, Number(opt('wait', 4000))));

if (opt('dismiss', false)) { await page.evaluate(fs.readFileSync('scripts/harness/dismiss.js','utf8')).catch(()=>{}); await new Promise(r => setTimeout(r, 600)); }
// --dismiss clicks a cookie 'Close' button before captures
if (opt('prime', false)) {
  // Scroll the whole page slowly so scroll-triggered reveals fire and lazy images load, then return to top.
  await page.evaluate(async () => {
    const step = 500;
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    await new Promise(r => setTimeout(r, 800));
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 1200));
  });
}

const scrollTo = opt('scroll', null);
if (scrollTo !== null) {
  await page.evaluate(async (y) => { window.scrollTo(0, Number(y)); await new Promise(r => setTimeout(r, 1500)); }, scrollTo);
}
const clickSel = opt('click', null);
if (clickSel) { await page.click(clickSel); await new Promise(r => setTimeout(r, 1200)); }
const hoverSel = opt('hover', null);
if (hoverSel) { await page.hover(hoverSel); await new Promise(r => setTimeout(r, 1000)); }

const probeFile = opt('probe', null);
if (probeFile) {
  // Hover probes: [{ sel, capture: [selectors relative to document], scroll?: y }]
  const probes = JSON.parse(fs.readFileSync(probeFile, 'utf8'));
  const PROPS = ['color','backgroundColor','borderColor','borderTopColor','opacity','transform','boxShadow','fill','filter','width','height','top','left','clipPath','visibility','textDecorationLine','scale','letterSpacing','borderRadius','transition'];
  const grab = (sels) => page.evaluate((sels, PROPS) => sels.map(s => [...document.querySelectorAll(s)].slice(0, 6).map(el => { const cs = getComputedStyle(el); const o = {}; PROPS.forEach(p => o[p] = cs[p]); const r = el.getBoundingClientRect(); o.rect = [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)]; return o; })), sels, PROPS);
  const results = [];
  for (const pr of probes) {
    try {
      await page.evaluate((sel) => { const el = document.querySelector(sel); if (el) el.scrollIntoView({ block: 'center' }); }, pr.sel);
      await new Promise(r => setTimeout(r, 900));
      await page.mouse.move(5, 5); await new Promise(r => setTimeout(r, 500));
      const before = await grab(pr.capture);
      await page.hover(pr.sel); await new Promise(r => setTimeout(r, pr.wait || 700));
      if (pr.moveWithin) { const box = await (await page.$(pr.sel)).boundingBox(); await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.5, { steps: 8 }); await new Promise(r => setTimeout(r, 500)); }
      const after = await grab(pr.capture);
      const diffs = pr.capture.map((s, i) => ({ sel: s, els: before[i].map((b, j) => { const a = after[i][j]; const d = {}; for (const k of Object.keys(b)) if (JSON.stringify(b[k]) !== JSON.stringify(a[k])) d[k] = b[k] + '  ->  ' + a[k]; return d; }) }));
      if (pr.shot) await page.screenshot({ path: pr.shot, type: 'png' });
      results.push({ sel: pr.sel, diffs });
    } catch (e) { results.push({ sel: pr.sel, error: e.message }); }
  }
  const out = opt('out', null); const text = JSON.stringify(results, null, 1);
  if (out) fs.writeFileSync(out, text); else console.log(text);
}
const evalFile = opt('eval', null);
if (evalFile) {
  const src = fs.readFileSync(evalFile, 'utf8');
  const result = await page.evaluate(src);
  const out = opt('out', null);
  const text = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
  if (out) fs.writeFileSync(out, text); else console.log(text);
}

const walk = opt('walk', null);
if (walk) {
  fs.mkdirSync(walk, { recursive: true });
  const step = Number(opt('step', height));
  let total = await page.evaluate(() => document.documentElement.scrollHeight);
  let i = 0;
  for (let y = 0; y < total; y += step) {
    await page.evaluate(async (y) => { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 700)); }, y);
    const sy = await page.evaluate(() => Math.round(window.scrollY));
    await page.screenshot({ path: `${walk}/${String(i).padStart(2,'0')}-y${sy}.png`, type: 'png' });
    i++;
    total = await page.evaluate(() => document.documentElement.scrollHeight);
  }
  console.log('walk done', i, 'shots, total', total);
}
const shot = opt('shot', null);
if (shot) {
  await page.screenshot({ path: shot, fullPage: !!opt('full', false), type: 'png' });
  console.log('saved', shot);
}
await browser.close();
