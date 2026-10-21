// Joins a rendered lead-in (clouds) to a photo push sequence through a white-out:
// lead-in frames → fade to fog-white → fade up into the first photo frame → photo frames.
// usage: node scripts/compose-sequence.mjs <leadDir> <photoDir> <outDir> <width> <transitionFrames> [step]
import sharp from 'sharp';
import fs from 'node:fs';
const [lead, photo, out, W = 1280, T = 14, step = 1] = process.argv.slice(2);
const H = Math.round((+W * 9) / 16);
fs.mkdirSync(out, { recursive: true });
const list = (d) => fs.readdirSync(d).filter((f) => f.endsWith('.webp')).sort().map((f) => `${d}/${f}`);
const L = list(lead), P = list(photo);
const raw = (f) => sharp(f).resize(+W, H, { fit: 'cover' }).removeAlpha().raw().toBuffer();
const white = [238, 241, 244];
let n = 0;
const write = (buf) => sharp(buf, { raw: { width: +W, height: H, channels: 3 } }).webp({ quality: 68 }).toFile(`${out}/${String(n++).padStart(3, '0')}.webp`);
for (let i = 0; i < L.length; i += +step) await write(await raw(L[i]));
const a = await raw(L[L.length - 1]), b = await raw(P[0]);
for (let k = 1; k <= +T; k += +step) {
  const t = k / (+T + 1), buf = Buffer.alloc(a.length);
  for (let p = 0; p < a.length; p++) {
    const w = white[p % 3];
    buf[p] = t < 0.5 ? a[p] + (w - a[p]) * (t / 0.5) : w + (b[p] - w) * ((t - 0.5) / 0.5);
  }
  await write(buf);
}
for (let i = 0; i < P.length; i += +step) await write(await raw(P[i]));
console.log('composed', n, 'frames into', out);
