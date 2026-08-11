'use client';

import { useEffect, useRef } from 'react';

/**
 * The looping hero visual.
 *
 * Drawn rather than filmed. Stock footage of an office would say nothing true
 * about us, and a generic video loop is the most obvious tell of a template
 * site. This is a continuous plot of a grid being composed — lines finding
 * their positions, blocks settling into a layout — which is literally what the
 * platform does, and it is ours.
 *
 * Canvas rather than a stack of animated divs: it is one compositor layer, it
 * costs nothing on scroll, and it degrades to a still frame under
 * prefers-reduced-motion instead of being ripped out.
 */

interface Block {
  x: number; y: number; w: number; h: number;
  targetX: number; targetY: number; targetW: number; targetH: number;
  tone: number;
  settle: number;
}

const INK = '#14120f';
const ACCENT = '#c8442a';
const RULE = 'rgba(20, 18, 15, 0.14)';

export default function HeroMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let blocks: Block[] = [];
    let phase = 0;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    /**
     * Lay out a plausible page: a wide band, a couple of columns, a run of
     * smaller cards. The proportions are the ones the composition engine
     * actually favours, so the animation is a real artefact rather than decor.
     */
    function layout(): { x: number; y: number; w: number; h: number; tone: number }[] {
      const m = Math.min(width, height) * 0.08;
      const w = width - m * 2;
      const h = height - m * 2;

      const shapes: { x: number; y: number; w: number; h: number; tone: number }[] = [];

      // Hero band
      shapes.push({ x: m, y: m, w: w, h: h * 0.3, tone: 1 });

      // Two columns
      const gap = w * 0.03;
      const colY = m + h * 0.34;
      const colH = h * 0.28;
      shapes.push({ x: m, y: colY, w: w * 0.58, h: colH, tone: 0.35 });
      shapes.push({ x: m + w * 0.58 + gap, y: colY, w: w - w * 0.58 - gap, h: colH, tone: 0.2 });

      // Card run
      const cardY = m + h * 0.66;
      const cardH = h * 0.24;
      const cardW = (w - gap * 2) / 3;
      for (let i = 0; i < 3; i++) {
        shapes.push({ x: m + i * (cardW + gap), y: cardY, w: cardW, h: cardH, tone: i === 1 ? 0.55 : 0.25 });
      }

      return shapes;
    }

    function seed() {
      const shapes = layout();
      blocks = shapes.map((shape, index) => ({
        // Start scattered and collapse into place — composition, visibly.
        x: shape.x + (Math.random() - 0.5) * width * 0.5,
        y: shape.y + (Math.random() - 0.5) * height * 0.4,
        w: shape.w * (0.4 + Math.random() * 0.5),
        h: shape.h * (0.4 + Math.random() * 0.5),
        targetX: shape.x, targetY: shape.y, targetW: shape.w, targetH: shape.h,
        tone: shape.tone,
        settle: 0.04 + index * 0.006,
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr();
      canvas!.height = height * dpr();
      context!.setTransform(dpr(), 0, 0, dpr(), 0, 0);
      seed();
    }

    function draw() {
      context!.clearRect(0, 0, width, height);

      // Faint baseline grid — the measure the layout is built on.
      context!.strokeStyle = RULE;
      context!.lineWidth = 1;
      const step = Math.max(28, width / 26);
      context!.beginPath();
      for (let x = 0; x <= width; x += step) {
        context!.moveTo(Math.round(x) + 0.5, 0);
        context!.lineTo(Math.round(x) + 0.5, height);
      }
      context!.stroke();

      for (const block of blocks) {
        block.x += (block.targetX - block.x) * block.settle;
        block.y += (block.targetY - block.y) * block.settle;
        block.w += (block.targetW - block.w) * block.settle;
        block.h += (block.targetH - block.h) * block.settle;

        context!.fillStyle =
          block.tone >= 1
            ? INK
            : block.tone > 0.5
              ? ACCENT
              : `rgba(20, 18, 15, ${0.06 + block.tone * 0.12})`;

        context!.fillRect(Math.round(block.x), Math.round(block.y), Math.round(block.w), Math.round(block.h));
      }

      // Once settled, scatter again so the loop is continuous rather than a
      // one-shot that leaves a static image behind.
      phase += 1;
      const settled = blocks.every(
        (b) => Math.abs(b.targetX - b.x) < 1.2 && Math.abs(b.targetW - b.w) < 1.2,
      );
      if (settled && phase > 150) {
        phase = 0;
        seed();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();

    if (reduced) {
      // A single settled frame: the composition, without the movement.
      blocks = blocks.map((b) => ({ ...b, x: b.targetX, y: b.targetY, w: b.targetW, h: b.targetH }));
      context.clearRect(0, 0, width, height);
      for (const block of blocks) {
        context.fillStyle =
          block.tone >= 1 ? INK : block.tone > 0.5 ? ACCENT : `rgba(20,18,15,${0.06 + block.tone * 0.12})`;
        context.fillRect(block.x, block.y, block.w, block.h);
      }
    } else {
      raf = requestAnimationFrame(draw);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full"
    />
  );
}
