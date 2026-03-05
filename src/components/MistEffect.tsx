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
  const mouseDownStart = useRef(0);
  const mouseMoved = useRef(false);
  const lastRegenTime = useRef(0);
  const demisterOn = useRef(false);
  const shockwave = useRef<{ x: number; y: number; radius: number; active: boolean; startTime: number }>({
    x: 0, y: 0, radius: 0, active: false, startTime: 0,
  });

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
      const count = Math.floor((w * h) / 12238);
      particles.current = Array.from({ length: count }, () => {
        const o = Math.random() * 0.06 + 0.03;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.52 - 0.27,
          vy: (Math.random() - 0.5) * 0.202,
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
      if (mouseDown.current) {
        const dx = e.clientX - mouse.current.x;
        const dy = e.clientY - mouse.current.y;
        if (Math.abs(dx) + Math.abs(dy) > 5) mouseMoved.current = true;
      }
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        mouseDown.current = true;
        mouseDownStart.current = performance.now();
        mouseMoved.current = false;
      }
    };
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) mouseDown.current = false;
    };
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Quick click on empty space = shockwave demist from cursor (skip interactive elements)
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const holdDuration = performance.now() - mouseDownStart.current;
      if (holdDuration > 300 || mouseMoved.current) return;

      const el = e.target as HTMLElement;
      if (el.closest('a, button, input, textarea, select, label, [role="button"], [role="link"], [tabindex]')) return;

      shockwave.current = {
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        active: true,
        startTime: performance.now(),
      };
    };
    window.addEventListener('click', onClick);

    const onDemister = (e: Event) => {
      demisterOn.current = (e as CustomEvent).detail;
      if (demisterOn.current) {
        for (const p of particles.current) {
          p.alive = 0;
          p.o = 0;
        }
      } else {
        lastRegenTime.current = performance.now();
      }
    };
    window.addEventListener('demister', onDemister);

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const demistRadius = 180;
      const now = performance.now();

      // ── Shockwave: expanding ring that kills mist ──
      const sw = shockwave.current;
      if (sw.active) {
        const maxRadius = Math.sqrt(w * w + h * h);
        sw.radius += maxRadius * 0.025; // crosses screen in ~40 frames (~0.67s)
        const ringWidth = 300;

        for (const p of particles.current) {
          if (p.alive <= 0) continue;
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < sw.radius && dist > sw.radius - ringWidth) {
            p.alive = 0;
            p.o = 0;
          }
        }

        if (sw.radius > maxRadius + ringWidth) {
          sw.active = false;
          // Start regen after 5 seconds
          lastRegenTime.current = now + 5000;
        }
      }

      // ── Regen: revive dead particles per frame in random chunks ──
      if (!demisterOn.current && now >= lastRegenTime.current) {
        const dead = particles.current.filter(p => p.alive <= 0);
        if (dead.length > 0) {
          const chunkSize = Math.max(1, Math.ceil(particles.current.length * 0.00007));
          // Shuffle and pick a chunk
          for (let i = 0; i < Math.min(chunkSize, dead.length); i++) {
            const idx = Math.floor(Math.random() * dead.length);
            const p = dead[idx];
            p.x = Math.random() * w;
            p.y = Math.random() * h;
            p.vx = (Math.random() - 0.5) * 0.52 - 0.27;
            p.vy = (Math.random() - 0.5) * 0.202;
            p.alive = 0.05;
            p.o = p.maxO * p.alive;
          }
        }
      }

      // ── Stars ──
      const time = frame * 0.016;
      for (const s of stars.current) {
        const twinkle = Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset);
        const alpha = s.o * (0.5 + 0.5 * twinkle) * vignette(s.x, s.y);
        if (alpha < 0.05) continue;

        ctx.fillStyle = `rgba(220,225,235,${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.r > 1.2 && alpha > 0.5) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          glow.addColorStop(0, `rgba(220,225,235,${alpha * 0.2})`);
          glow.addColorStop(1, 'rgba(220,225,235,0)');
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

        let alpha = p.o * p.alive * vignette(p.x, p.y) * (1 - p.demist);

        if (alpha < 0.002) continue;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `rgba(185,190,200,${alpha})`);
        grad.addColorStop(0.4, `rgba(185,190,200,${alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(185,190,200,0)');
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
      window.removeEventListener('click', onClick);
      window.removeEventListener('demister', onDemister);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
