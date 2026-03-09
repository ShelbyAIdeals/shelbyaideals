'use client';

import { useEffect, useRef } from 'react';

interface MistParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  o: number;
  alive: number;
  maxO: number;
  demist: number;
}

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
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);
  const particles = useRef<MistParticle[]>([]);
  const stars = useRef<Star[]>([]);
  const mouseDown = useRef(false);
  const lastRegenTime = useRef(0);
  const mistDensity = useRef(50);
  const isLight = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      initParticles();
      initStars();
    };

    const initParticles = () => {
      const count = Math.floor((w * h) / 13598);
      particles.current = Array.from({ length: count }, () => {
        const o = Math.random() * 0.06 + 0.03;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.811 - 0.421,
          vy: (Math.random() - 0.5) * 0.315,
          r: Math.random() * 180 + 80,
          o,
          alive: 1,
          maxO: o,
          demist: 0,
        };
      });
    };

    const initStars = () => {
      const count = Math.floor((w * h) / 3000);
      stars.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        o: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
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

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) mouseDown.current = true;
    };
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) mouseDown.current = false;
    };
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);


    const onMistDensity = (e: Event) => {
      mistDensity.current = (e as CustomEvent).detail;
    };
    window.addEventListener('mistDensity', onMistDensity);

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
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const demistRadius = 180;
      const now = performance.now();

      // ── Regen: revive dead particles per frame in random chunks ──
      if (mistDensity.current > 0 && now >= lastRegenTime.current) {
        const dead = particles.current.filter(p => p.alive <= 0);
        if (dead.length > 0) {
          const chunkSize = Math.max(1, Math.ceil(particles.current.length * 0.00007));
          // Shuffle and pick a chunk
          for (let i = 0; i < Math.min(chunkSize, dead.length); i++) {
            const idx = Math.floor(Math.random() * dead.length);
            const p = dead[idx];
            p.x = Math.random() * w;
            p.y = Math.random() * h;
            p.vx = (Math.random() - 0.5) * 0.811 - 0.421;
            p.vy = (Math.random() - 0.5) * 0.315;
            p.alive = 0.05;
            p.o = p.maxO * p.alive;
          }
        }
      }

      // ── Stars ──
      const time = frame * 0.016;
      const light = isLight.current;
      const starR = light ? 50 : 220;
      const starG = light ? 40 : 225;
      const starB = light ? 30 : 235;
      for (const s of stars.current) {
        const twinkle = Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset);
        const alpha = s.o * (0.5 + 0.5 * twinkle) * vignette(s.x, s.y);
        if (alpha < 0.05) continue;

        ctx.fillStyle = `rgba(${starR},${starG},${starB},${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.r > 1.2 && alpha > 0.5) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          glow.addColorStop(0, `rgba(${starR},${starG},${starB},${alpha * 0.2})`);
          glow.addColorStop(1, `rgba(${starR},${starG},${starB},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Mist particles ──
      for (const p of particles.current) {
        // Fade revived particles back in slowly
        if (p.alive > 0 && p.alive < 1) {
          p.alive = Math.min(1, p.alive + 0.005);
          p.o = p.maxO * p.alive;
        }

        if (p.alive <= 0.01) continue;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.999;
        p.vy *= 0.999;
        p.vx += (Math.random() - 0.5) * 0.003;
        p.vy += (Math.random() - 0.5) * 0.002;

        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        if (p.y > h + p.r) p.y = -p.r;

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // ── Hold left click: suck mist into cursor at constant rate ──
        if (mouseDown.current && dist < demistRadius * 2.2) {
          p.alive = Math.max(0, p.alive - 0.08);
          p.o = p.maxO * p.alive;
          if (p.alive <= 0.01) {
            p.alive = 0;
            lastRegenTime.current = now;
          }
        }

        // ── Hover demist: stronger in center, fades at edges ──
        const effectRadius = demistRadius + p.r;
        if (dist < effectRadius) {
          const target = Math.pow(1 - dist / effectRadius, 1.0);
          p.demist += (target - p.demist) * 0.36;
        } else {
          // Mist slowly reappears after cursor passes
          p.demist = Math.max(0, p.demist - 0.02);
        }

        let alpha = p.o * p.alive * vignette(p.x, p.y) * (1 - p.demist) * (mistDensity.current / 100) * (light ? 2.6 : 1);

        if (alpha < 0.002) continue;

        const mistR = light ? 60 : 185;
        const mistG = light ? 50 : 190;
        const mistB = light ? 40 : 200;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `rgba(${mistR},${mistG},${mistB},${alpha})`);
        grad.addColorStop(0.4, `rgba(${mistR},${mistG},${mistB},${alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${mistR},${mistG},${mistB},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mistDensity', onMistDensity);
      window.removeEventListener('themeChange', onThemeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="mist-canvas"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
