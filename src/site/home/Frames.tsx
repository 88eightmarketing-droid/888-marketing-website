"use client";

/**
 * Scroll-scrubbed film, drawn as an image sequence on a canvas.
 *
 * A <video> cannot be scrubbed smoothly by scroll on every browser (seeking
 * lands on keyframes, iOS throttles it), so the Grok clips are cut into WebP
 * frames (public/seq/<name>/000.webp …) and the frame for the scroll position
 * is drawn here. Frames load in the background; until one has arrived the
 * nearest earlier frame that has is drawn instead.
 *
 * The canvas fills its parent, which must have the frames' 16:9 shape.
 */
export function createSequence(canvas: HTMLCanvasElement, dir: string, count: number) {
  const ctx = canvas.getContext("2d");
  const frames: HTMLImageElement[] = [];
  let last = -1;
  let wanted = 0;

  const draw = (i: number) => {
    if (!ctx) return;
    let n = i;
    while (n > 0 && !(frames[n]?.complete && frames[n].naturalWidth)) n--;
    const img = frames[n];
    if (!img?.complete || !img.naturalWidth) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; last = -1; }
    if (n === last) return;
    last = n;
    ctx.drawImage(img, 0, 0, w, h);
  };

  // Load the first and last frames first, so both ends of the scroll are ready.
  const order = [0, count - 1, ...Array.from({ length: count - 2 }, (_, i) => i + 1)];
  for (const i of order) {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => { if (i <= wanted) { last = -1; draw(wanted); } };
    img.src = `${dir}/${String(i).padStart(3, "0")}.webp`;
    frames[i] = img;
  }

  return {
    /** Draw the frame for progress p (0–1). */
    draw(p: number) {
      wanted = Math.round(Math.min(1, Math.max(0, p)) * (count - 1));
      draw(wanted);
    },
    /** Redraw after the canvas changes size. */
    resize() { last = -1; draw(wanted); },
  };
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** Progress of p through the window [a, b], clamped to 0–1. */
export const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
