// Loads each route headless and reports console errors / page errors.
import puppeteer from 'puppeteer-core';
const routes = process.argv.slice(2);
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--use-angle=metal', '--ignore-gpu-blocklist'] });
for (const r of routes) {
  const p = await b.newPage();
  await p.setViewport({ width: 1280, height: 800 });
  const errs = [];
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
  p.on('pageerror', (e) => errs.push('PAGEERROR ' + e.message.slice(0, 160)));
  const res = await p.goto('http://localhost:3912' + r, { waitUntil: 'networkidle2', timeout: 60000 }).catch((e) => ({ status: () => e.message }));
  await new Promise((x) => setTimeout(x, 2500));
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await new Promise((x) => setTimeout(x, 1200));
  console.log(res.status(), r, errs.length ? errs.join(' | ') : 'ok');
  await p.close();
}
await b.close();
