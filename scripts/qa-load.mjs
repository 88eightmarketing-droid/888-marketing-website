/**
 * Measures how the home page loads: bytes by type in the first seconds, first
 * paint, LCP, and when the opener is ready. Phone on throttled 4G and desktop.
 * Usage: node scripts/qa-load.mjs [url]
 */
import puppeteer from "puppeteer-core";
const URL = process.argv[2] || "http://localhost:3100";
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, args: ["--use-angle=metal", "--ignore-gpu-blocklist", "--enable-gpu"] });
for (const [label, w, h, slow] of [["phone-4g", 390, 844, true], ["desktop", 1440, 900, false]]) {
  const p = await b.newPage();
  await p.setViewport({ width: w, height: h, isMobile: w < 768, hasTouch: w < 768 });
  await p.setCacheEnabled(false);
  const cdp = await p.createCDPSession();
  await cdp.send("Network.enable");
  if (slow) await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (9 * 1024 * 1024) / 8, uploadThroughput: (1.5 * 1024 * 1024) / 8 });
  const reqs = new Map(); const t0 = Date.now(); const rows = [];
  cdp.on("Network.responseReceived", (e) => reqs.set(e.requestId, { url: e.response.url, type: e.type }));
  cdp.on("Network.loadingFinished", (e) => { const r = reqs.get(e.requestId); if (r) rows.push({ ...r, bytes: e.encodedDataLength, t: Date.now() - t0 }); });
  await p.evaluateOnNewDocument(() => { window.__lcp = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true }); });
  await p.goto(URL, { waitUntil: "load", timeout: 120000 });
  const tLoad = Date.now() - t0;
  await new Promise((r) => setTimeout(r, 8000));
  const m = await p.evaluate(() => ({ fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime, lcp: window.__lcp, ready: document.querySelector(".o3-stage")?.dataset.ready }));
  const by = {}; for (const r of rows) { const k = r.type; by[k] ??= { n: 0, kb: 0 }; by[k].n++; by[k].kb += r.bytes / 1024; }
  console.log(`\n${label}: load event ${tLoad} ms, FCP ${Math.round(m.fcp)} ms, LCP ${Math.round(m.lcp)} ms, opener ready ${m.ready}`);
  for (const [k, v] of Object.entries(by)) console.log(`  ${k.padEnd(10)} ${String(v.n).padStart(3)} files ${Math.round(v.kb).toString().padStart(6)} KB`);
  console.log("  biggest:"); for (const r of rows.sort((a, z) => z.bytes - a.bytes).slice(0, 10)) console.log(`   ${Math.round(r.bytes / 1024).toString().padStart(6)} KB  @${r.t}ms  ${r.url.replace(/^https?:\/\/[^/]+/, "").slice(0, 80)}`);
  await p.close();
}
await b.close();
