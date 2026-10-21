// usage: node grid.mjs out.png cols cellW cellH img1 img2 ...  — contact sheet / side-by-side composite
import sharp from 'sharp';
const [out, cols, cw, ch, ...imgs] = process.argv.slice(2);
const C = +cols, W = +cw, H = +ch, rows = Math.ceil(imgs.length / C);
const tiles = await Promise.all(imgs.map(async (p, i) => ({
  input: await sharp(p).resize(W, H, { fit: 'cover', position: 'top' }).toBuffer(),
  left: (i % C) * W, top: Math.floor(i / C) * H,
})));
await sharp({ create: { width: C * W, height: rows * H, channels: 3, background: '#ffffff' } }).composite(tiles).png().toFile(out);
console.log('saved', out);
