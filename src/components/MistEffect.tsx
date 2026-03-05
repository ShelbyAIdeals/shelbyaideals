'use client';

import { useEffect, useRef } from 'react';

interface MistParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  o: number;       // base opacity
  alive: number;    // 0 = consumed, 1 = fully visible
  maxO: number;     // original opacity for regen
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

  // Black hole state
  const blackHole = useRef({
    active: false,
    x: 0,
    y: 0,
    radius: 30,           // starts visible
    consumed: 0,          // how much mist consumed (0-1)
    suckedAll: false,     // true when all mist gone
    regenProgress: 0,     // 0-1, how much has regenerated
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
      const count = Math.floor((w * h) / 8000);
      particles.current = Array.from({ length: count }, () => {
        const o = Math.random() * 0.06 + 0.03;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 0.6,
          r: Math.random() * 180 + 80,
          o,
          alive: 1,
          maxO: o,
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

    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    // Left click → activate black hole
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const bh = blackHole.current;
      if (bh.suckedAll) return; // wait for regen cycle
      if (!bh.active) {
        bh.radius = 30;
        bh.consumed = 0;
      }
      bh.active = true;
      bh.x = e.clientX;
      bh.y = e.clientY;
    };
    window.addEventListener('click', onClick);

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const demistRadius = 100;
      const bh = blackHole.current;

      // ── Stars layer (behind mist) ──
      const time = frame * 0.016;
      for (const s of stars.current) {
        const twinkle = Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset);
        const alpha = s.o * (0.5 + 0.5 * twinkle);
        if (alpha < 0.05) continue;

        ctx.fillStyle = `rgba(220, 225, 210, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Bright stars get a small glow
        if (s.r > 1.2 && alpha > 0.5) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          glow.addColorStop(0, `rgba(220, 225, 210, ${alpha * 0.2})`);
          glow.addColorStop(1, 'rgba(220, 225, 210, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Black hole logic ──
      if (bh.active && !bh.suckedAll) {
        // Grow radius based on consumed mist
        bh.radius = 30 + bh.consumed * 500;

        // Suck in nearby particles
        let totalAlive = 0;

        for (const p of particles.current) {
          if (p.alive <= 0) continue;
          totalAlive++;

          const dx = p.x - bh.x;
          const dy = p.y - bh.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pullRange = bh.radius * 4 + 400;

          if (dist < pullRange) {
            // Pull particle toward black hole — stronger when closer
            const strength = (1 - dist / pullRange) * 8;
            p.vx -= (dx / (dist + 1)) * strength;
            p.vy -= (dy / (dist + 1)) * strength;

            // Consume if within the black hole radius
            if (dist < bh.radius + p.r * 0.3) {
              p.alive = Math.max(0, p.alive - 0.08);
              if (p.alive <= 0) {
                bh.consumed = Math.min(1, bh.consumed + 1 / particles.current.length);
              }
            }
          }
        }

        // Check if all consumed
        if (totalAlive === 0 || bh.consumed >= 0.95) {
          bh.suckedAll = true;
          bh.active = false;
          bh.regenProgress = 0;
          for (const p of particles.current) p.alive = 0;
        }

        // Draw black hole — use normal blend to show dark core on screen-blend canvas
        ctx.globalCompositeOperation = 'destination-out';
        const coreGrad = ctx.createRadialGradient(bh.x, bh.y, 0, bh.x, bh.y, bh.radius);
        coreGrad.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
        coreGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.5)');
        coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(bh.x, bh.y, bh.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        // Accretion ring
        const ringR = bh.radius * 1.3;
        ctx.strokeStyle = `rgba(147, 154, 92, ${0.3 + bh.consumed * 0.5})`;
        ctx.lineWidth = 2 + bh.consumed * 3;
        ctx.beginPath();
        ctx.arc(bh.x, bh.y, ringR, 0, Math.PI * 2);
        ctx.stroke();

        // Outer glow
        const outerGlow = ctx.createRadialGradient(bh.x, bh.y, bh.radius * 0.8, bh.x, bh.y, bh.radius * 2);
        outerGlow.addColorStop(0, `rgba(147, 154, 92, ${0.06 + bh.consumed * 0.1})`);
        outerGlow.addColorStop(1, 'rgba(147, 154, 92, 0)');
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(bh.x, bh.y, bh.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Regeneration phase ──
      if (bh.suckedAll) {
        // ~50px per second regeneration (roughly 5cm at 96dpi)
        // At 60fps that's ~0.83px per frame of regen radius growth
        // We regen from edges inward as a growing circle of mist
        bh.regenProgress += 0.003; // slow regen (~5-6 seconds full)

        if (bh.regenProgress >= 1) {
          // Full regen complete — reset everything
          bh.suckedAll = false;
          bh.active = false;
          bh.radius = 30;
          bh.consumed = 0;
          bh.regenProgress = 1;
          for (const p of particles.current) {
            p.alive = 1;
            p.o = p.maxO;
            p.vx = (Math.random() - 0.5) * 1.2;
            p.vy = (Math.random() - 0.5) * 0.6;
          }
        } else {
          // Gradually bring particles back
          const regenFront = bh.regenProgress;
          for (const p of particles.current) {
            // Regen from edges — particles further from center come back first
            const nx = p.x / w;
            const ny = p.y / h;
            const edgeDist = Math.min(nx, 1 - nx, ny, 1 - ny) * 2; // 0 at edge, 1 at center
            const threshold = 1 - regenFront; // starts at 1 (nothing), goes to 0 (everything)

            if (edgeDist < threshold) {
              // This particle should regen
              p.alive = Math.min(1, p.alive + 0.02);
              p.o = p.maxO * p.alive;
            }
          }
        }
      }

      // ── Mist particles ──
      for (const p of particles.current) {
        if (p.alive <= 0.01) continue;

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Dampen velocity back to normal drift
        p.vx *= 0.995;
        p.vy *= 0.995;
        // Add tiny drift to keep movement
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.01;

        // Wrap
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        if (p.y > h + p.r) p.y = -p.r;

        // Cursor demist (passive, smaller)
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let alpha = p.o * p.alive;
        if (!bh.active && dist < demistRadius + p.r) {
          const edge = demistRadius * 0.2;
          const fade = Math.max(0, (dist - edge) / (demistRadius + p.r - edge));
          alpha *= fade * fade * fade;
        }

        if (alpha < 0.002) continue;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `rgba(147, 154, 92, ${alpha})`);
        grad.addColorStop(0.4, `rgba(147, 154, 92, ${alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(147, 154, 92, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Side glow ──
      const gl = ctx.createLinearGradient(0, 0, 300, 0);
      gl.addColorStop(0, 'rgba(147, 154, 92, 0.09)');
      gl.addColorStop(0.4, 'rgba(147, 154, 92, 0.03)');
      gl.addColorStop(1, 'rgba(147, 154, 92, 0)');
      ctx.fillStyle = gl;
      ctx.fillRect(0, 0, 300, h);

      const gr = ctx.createLinearGradient(w, 0, w - 300, 0);
      gr.addColorStop(0, 'rgba(147, 154, 92, 0.09)');
      gr.addColorStop(0.4, 'rgba(147, 154, 92, 0.03)');
      gr.addColorStop(1, 'rgba(147, 154, 92, 0)');
      ctx.fillStyle = gr;
      ctx.fillRect(w - 300, 0, 300, h);

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
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
