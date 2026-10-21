"use client";

import { useEffect, useRef } from "react";

export type ScrollSequenceProps = {
  /** Ordered frame URLs. */
  frames: string[];
  /** Scroll progress ref (0..1), e.g. from useScrollProgress. */
  progress: { current: number };
  className?: string;
  fit?: "cover" | "contain";
  /** Per-tick lerp toward the target frame (1 = no smoothing). */
  smoothing?: number;
  /** Called with the fraction of frames loaded. */
  onProgress?: (loaded: number) => void;
};

/**
 * The "3D scroll website" technique: a pre-rendered clip exported as stills, drawn to a canvas with
 * the frame index tied to scroll. Frames load first/last/middle-out so scrubbing works early.
 */
export default function ScrollSequence({ frames, progress, className, fit = "cover", smoothing = 0.18, onProgress }: ScrollSequenceProps) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d")!;
    const images: (HTMLImageElement | null)[] = frames.map(() => null);
    let loaded = 0;
    let alive = true;
    // Coarse-to-fine order: every 8th frame, then every 4th, 2nd, rest.
    const order: number[] = [];
    for (const stride of [8, 4, 2, 1]) for (let i = 0; i < frames.length; i += stride) if (!order.includes(i)) order.push(i);
    let q = 0;
    const pump = () => {
      while (q < order.length && q - loaded < 6) {
        const i = order[q++];
        const img = new Image();
        img.decoding = "async";
        img.src = frames[i];
        img.onload = () => { if (!alive) return; images[i] = img; loaded++; onProgress?.(loaded / frames.length); draw(true); pump(); };
        img.onerror = () => { loaded++; pump(); };
      }
    };

    const size = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      el.width = el.clientWidth * dpr;
      el.height = el.clientHeight * dpr;
      draw(true);
    };
    let current = 0, drawn = -1;
    const nearest = (i: number) => {
      for (let d = 0; d < frames.length; d++) {
        if (images[i - d]) return images[i - d];
        if (images[i + d]) return images[i + d];
      }
      return null;
    };
    function draw(force = false) {
      const idx = Math.round(current);
      if (!force && idx === drawn) return;
      const img = nearest(idx);
      if (!img) return;
      drawn = idx;
      const cw = el!.width, ch = el!.height, ir = img.width / img.height, cr = cw / ch;
      const cover = fit === "cover" ? ir > cr : ir < cr;
      const w = cover ? ch * ir : cw, h = cover ? ch : cw / ir;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    }
    let raf = 0;
    const tick = () => {
      const target = Math.min(1, Math.max(0, progress.current)) * (frames.length - 1);
      current += (target - current) * smoothing;
      if (Math.abs(target - current) < 0.01) current = target;
      draw();
      raf = requestAnimationFrame(tick);
    };
    size();
    pump();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(size);
    ro.observe(el);
    return () => { alive = false; cancelAnimationFrame(raf); ro.disconnect(); };
  }, [frames, progress, fit, smoothing, onProgress]);

  return <canvas ref={canvas} className={className} aria-hidden />;
}
