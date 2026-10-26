import { useEffect, useRef } from 'react';
import type { Theme } from '../hooks/useTheme';

interface Props {
  lines: string[];
  theme: Theme;
}

interface Cell {
  hx: number; // home position
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  color: string;
  seed: number;
}

const CHARS = '{}[]<>/\\=+*;:01#@%&$';
const DISPLAY_FONT = '"Bricolage Grotesque", "Arial Black", sans-serif';
const MONO_FONT = '"JetBrains Mono", ui-monospace, monospace';

const hexToRgb = (hex: string) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};

/**
 * Draws the name as a grid of code characters.
 * The text is rendered into a small hidden canvas (1 pixel = 1 character),
 * then every filled pixel becomes a character that is pushed away by the pointer
 * and springs back home.
 */
export default function AsciiName({ lines, theme }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const off = document.createElement('canvas');
    const octx = off.getContext('2d', { willReadFrequently: true });
    if (!ctx || !octx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -9999, y: -9999 };
    let cells: Cell[] = [];
    let cw = 0, ch = 0, W = 0, H = 0, dpr = 1;
    let moved = '#000';
    let raf = 0;

    const build = () => {
      const css = getComputedStyle(document.documentElement);
      const lily = hexToRgb(css.getPropertyValue('--lily').trim());
      const stem = hexToRgb(css.getPropertyValue('--stem').trim());
      moved = css.getPropertyValue('--stem').trim();

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ch = Math.max(5, Math.round(H / 46));
      cw = ch * 0.62;

      const cols = Math.floor(W / cw);
      const rows = Math.floor(H / ch);
      off.width = cols;
      off.height = rows;
      octx.clearRect(0, 0, cols, rows);
      octx.fillStyle = '#000';
      octx.textBaseline = 'middle';

      // Cells are taller than wide, so squash the text vertically to keep proportions
      const aspect = cw / ch;
      octx.setTransform(1, 0, 0, aspect, 0, 0);
      const lineH = rows / lines.length;
      let size = (lineH * 0.95) / aspect;
      octx.font = `800 ${size}px ${DISPLAY_FONT}`;
      const widest = Math.max(...lines.map((l) => octx.measureText(l).width));
      if (widest > cols) size *= cols / widest;
      octx.font = `800 ${size}px ${DISPLAY_FONT}`;
      lines.forEach((line, i) => octx.fillText(line, 0, (lineH * (i + 0.5)) / aspect));
      octx.setTransform(1, 0, 0, 1, 0, 0);

      const data = octx.getImageData(0, 0, cols, rows).data;
      cells = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (data[(y * cols + x) * 4 + 3] < 90) continue;
          const t = (x / cols) * 0.35;
          const rgb = lily.map((a, k) => Math.round(a + (stem[k] - a) * t));
          cells.push({
            hx: x * cw, hy: y * ch, x: x * cw, y: y * ch, vx: 0, vy: 0,
            char: CHARS[(x * 7 + y * 13) % CHARS.length],
            color: `rgb(${rgb.join(',')})`,
            seed: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const frame = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.font = `700 ${ch}px ${MONO_FONT}`;
      ctx.textBaseline = 'top';
      const radius = Math.max(60, H * 0.35);
      const t = now / 1000;

      for (const p of cells) {
        if (!reduceMotion) {
          const dx = p.x - pointer.x, dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < radius) {
            const force = (1 - dist / radius) * 2.2;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
          p.vx = (p.vx + (p.hx - p.x) * 0.06) * 0.82;
          p.vy = (p.vy + (p.hy - p.y) * 0.06) * 0.82;
          p.x += p.vx;
          p.y += p.vy;
        }
        const away = Math.hypot(p.x - p.hx, p.y - p.hy) / 30;
        ctx.fillStyle = away > 0.15 ? moved : p.color;
        const flicker = !reduceMotion && Math.sin(t * 2 + p.seed) > 0.97;
        const char = flicker ? CHARS[(Math.floor(t * 10) + Math.floor(p.seed * 10)) % CHARS.length] : p.char;
        ctx.fillText(char, p.x, p.y);
      }
      raf = requestAnimationFrame(frame);
    };

    const setPointer = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = clientX - r.left;
      pointer.y = clientY - r.top;
    };
    const clearPointer = () => { pointer.x = pointer.y = -9999; };
    const onPointerMove = (e: PointerEvent) => setPointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => setPointer(e.touches[0].clientX, e.touches[0].clientY);

    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 120);
    };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', clearPointer);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', clearPointer);
    window.addEventListener('resize', onResize);

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      build();
      raf = requestAnimationFrame(frame);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', clearPointer);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', clearPointer);
      window.removeEventListener('resize', onResize);
    };
  }, [lines, theme]); // rebuild when the theme changes so colors follow it

  return <canvas id="name" ref={canvasRef} aria-hidden="true" />;
}
