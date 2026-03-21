'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  r: number;
  o: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function MistEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);
  const stars = useRef<Star[]>([]);
  const isLight = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const initStars = () => {
      const count = Math.floor((w * h) / 8000);
      stars.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.0 + 0.2,
        o: Math.random() * 0.5 + 0.15,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      initStars();
    };

    const vignette = (px: number, py: number) => {
      const nx = (px / w - 0.5) * 2;
      const ny = (py / h - 0.5) * 2;
      const d = Math.sqrt(nx * nx + ny * ny);
      const centerDim = Math.max(0, 1 - d * 2.5) * 0.15;
      const edgeDim = Math.max(0, (d - 0.5) / 0.9) * 0.15;
      return 1 - centerDim - edgeDim;
    };

    resize();
    window.addEventListener('resize', resize);

    const onThemeChange = (e: Event) => {
      const light = (e as CustomEvent).detail === 'light';
      isLight.current = light;
      if (canvas) canvas.style.mixBlendMode = light ? 'multiply' : 'screen';
    };
    window.addEventListener('themeChange', onThemeChange);
    isLight.current = document.documentElement.dataset.theme === 'light';
    if (isLight.current) canvas.style.mixBlendMode = 'multiply';

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      const time = frame * 0.016;
      const light = isLight.current;

      // ── Corner lighting glow (dark mode only) ──
      if (!light) {
        // Top-right corner glow — cyan/signal tint
        const trGlow = ctx.createRadialGradient(w * 0.85, h * 0.08, 0, w * 0.85, h * 0.08, w * 0.35);
        trGlow.addColorStop(0, 'rgba(10, 209, 200, 0.04)');
        trGlow.addColorStop(0.5, 'rgba(10, 209, 200, 0.015)');
        trGlow.addColorStop(1, 'rgba(10, 209, 200, 0)');
        ctx.fillStyle = trGlow;
        ctx.fillRect(0, 0, w, h);

        // Bottom-left corner glow — subtle warm/iris tint
        const blGlow = ctx.createRadialGradient(w * 0.15, h * 0.92, 0, w * 0.15, h * 0.92, w * 0.35);
        blGlow.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
        blGlow.addColorStop(0.5, 'rgba(139, 92, 246, 0.01)');
        blGlow.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = blGlow;
        ctx.fillRect(0, 0, w, h);
      }

      // ── Stars ──
      // Dark mode: light twinkling stars with glow
      // Light mode: dark/black stars, no glow
      const starR = light ? 40 : 220;
      const starG = light ? 35 : 225;
      const starB = light ? 30 : 235;

      for (const s of stars.current) {
        const twinkle = Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset);
        const alpha = s.o * (0.5 + 0.5 * twinkle) * vignette(s.x, s.y);
        if (alpha < 0.05) continue;

        ctx.fillStyle = `rgba(${starR},${starG},${starB},${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect — dark mode only
        if (!light && s.r > 1.2 && alpha > 0.5) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          glow.addColorStop(0, `rgba(${starR},${starG},${starB},${alpha * 0.2})`);
          glow.addColorStop(1, `rgba(${starR},${starG},${starB},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('themeChange', onThemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="star-canvas"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
