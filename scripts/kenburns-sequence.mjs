// Turns a list of stills into one continuous "camera push" sequence: each shot pushes in toward a focal
// point, then zooms through into the next with a crossfade. Stand-in for an AI-generated drone clip.
// usage: node scripts/kenburns-sequence.mjs <outDir> <frames> <w> <h>   (shots configured below)
import sharp from 'sharp';
import fs from 'node:fs';

const [out = 'public/sequences/abhi', N = 180, W = 1280, H = 720, shotsFile] = process.argv.slice(2);
const defaultShots = [
  { src: 'public/stock/coffee/skyline.webp', fx: 0.5, fy: 0.62 },
  { src: 'public/stock/coffee/street.webp', fx: 0.82, fy: 0.55 },
  { src: 'public/stock/coffee/door.webp', fx: 0.7, fy: 0.55 },
  { src: 'public/stock/coffee/window.webp', fx: 0.5, fy: 0.62 },
  { src: 'public/stock/coffee/machine.webp', fx: 0.4, fy: 0.62 },
  { src: 'public/stock/coffee/pour.webp', fx: 0.55, fy: 0.72 },
];
const shots = shotsFile ? JSON.parse(fs.readFileSync(shotsFile, 'utf8')) : defaultShots;
fs.mkdirSync(out, { recursive: true });

// Each shot gets an equal slice; the last 30% of a slice is the zoom-through into the next shot.
const imgs = await Promise.all(shots.map(async (s) => {
  const img = sharp(s.src);
  const m = await img.metadata();
  return { ...s, w: m.width, h: m.height, buf: await img.raw().removeAlpha().toBuffer() };
}));

const ease = (t) => t * t * (3 - 2 * t);
async function view(shot, scale) {
  // Crop a W:H window shrinking toward the focal point as scale grows.
  const aspect = W / H;
  let cw = shot.w, ch = cw / aspect;
  if (ch > shot.h) { ch = shot.h; cw = ch * aspect; }
  cw /= scale; ch /= scale;
  const left = Math.round(Math.min(shot.w - cw, Math.max(0, shot.fx * shot.w - cw / 2)));
  const top = Math.round(Math.min(shot.h - ch, Math.max(0, shot.fy * shot.h - ch / 2)));
  return sharp(shot.buf, { raw: { width: shot.w, height: shot.h, channels: 3 } })
    .extract({ left, top, width: Math.round(cw), height: Math.round(ch) })
    .resize(+W, +H).raw().toBuffer();
}

const slice = 1 / shots.length;
for (let f = 0; f < N; f++) {
  const t = f / (N - 1);
  const i = Math.min(shots.length - 1, Math.floor(t / slice));
  const local = (t - i * slice) / slice;
  const hold = 0.7;
  let frame;
  if (local < hold || i === shots.length - 1) {
    frame = await view(imgs[i], 1 + ease(Math.min(1, local / (i === shots.length - 1 ? 1 : hold))) * 0.35);
  } else {
    const k = ease((local - hold) / (1 - hold));
    const a = await view(imgs[i], 1.35 + k * 0.9);
    const b = await view(imgs[i + 1], 0.999 + k * 0.001 + 0.001);
    frame = Buffer.alloc(a.length);
    for (let p = 0; p < a.length; p++) frame[p] = a[p] * (1 - k) + b[p] * k;
  }
  await sharp(frame, { raw: { width: +W, height: +H, channels: 3 } }).webp({ quality: 70 }).toFile(`${out}/${String(f).padStart(3, '0')}.webp`);
}
console.log('wrote', N, 'frames to', out);
