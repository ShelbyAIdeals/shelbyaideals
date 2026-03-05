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

  const blackHole = useRef({
    active: false,
    x: 0,
    y: 0,
    radius: 5,
    consumed: 0,
    suckedAll: false,
    cooldown: 0,
    regenProgress: 0,
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

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const bh = blackHole.current;
      if (bh.suckedAll || bh.cooldown > 0) return;
      if (!bh.active) {
        bh.active = true;
        bh.x = e.clientX;
        bh.y = e.clientY;
        bh.radius = 5;
        bh.consumed = 0;
      }
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
      const maxBhRadius = 190; // ~10cm at 96dpi

      // ── Stars ──
      const time = frame * 0.016;
      for (const s of stars.current) {
        const twinkle = Math.sin(time * s.twinkleSpeed * 60 + s.twinkleOffset);
        const alpha = s.o * (0.5 + 0.5 * twinkle);
        if (alpha < 0.05) continue;

        ctx.fillStyle = `rgba(220, 225, 230, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.r > 1.2 && alpha > 0.5) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          glow.addColorStop(0, `rgba(220, 225, 230, ${alpha * 0.2})`);
          glow.addColorStop(1, 'rgba(220, 225, 230, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Black hole (follows cursor, sucks mist) ──
      if (bh.active && !bh.suckedAll) {
        // Follow cursor
        bh.x = mx;
        bh.y = my;

        // Grow based on consumed mist
        bh.radius = 5 + bh.consumed * (maxBhRadius - 5);

        let totalAlive = 0;

        for (const p of particles.current) {
          if (p.alive <= 0) continue;
          totalAlive++;

          const dx = p.x - bh.x;
          const dy = p.y - bh.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pullRange = bh.radius * 3 + 350;

          if (dist < pullRange) {
            const angle = Math.atan2(dy, dx);
            const tangentX = -Math.sin(angle);
            const tangentY = Math.cos(angle);

            const pull = 1 - dist / pullRange;
            const radialStrength = pull * 7;
            const spiralStrength = pull * pull * 3;

            p.vx -= (dx / (dist + 1)) * radialStrength + tangentX * spiralStrength;
            p.vy -= (dy / (dist + 1)) * radialStrength + tangentY * spiralStrength;

            // Consume within black hole
            if (dist < bh.radius + p.r * 0.2) {
              p.alive = Math.max(0, p.alive - 0.06);
              if (p.alive <= 0) {
                bh.consumed = Math.min(1, bh.consumed + 1 / particles.current.length);
              }
            }
          }
        }

        // All consumed
        if (totalAlive === 0 || bh.consumed >= 0.95) {
          bh.suckedAll = true;
          bh.active = false;
          bh.cooldown = 20 * 60; // 20s at 60fps
          bh.regenProgress = 0;
          for (const p of particles.current) p.alive = 0;
        }

        // Draw: clear hole (destination-out erases canvas content)
        ctx.globalCompositeOperation = 'destination-out';
        const coreGrad = ctx.createRadialGradient(bh.x, bh.y, 0, bh.x, bh.y, bh.radius);
        coreGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        coreGrad.addColorStop(0.8, 'rgba(0, 0, 0, 0.9)');
        coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(bh.x, bh.y, bh.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        // Waterfall suction wisps at the outer edge
        const numWisps = 16 + Math.floor(bh.consumed * 24);
        const rotBase = frame * 0.04;

        for (let i = 0; i < numWisps; i++) {
          const baseAngle = (i / numWisps) * Math.PI * 2 + rotBase;
          const wobble = Math.sin(frame * 0.06 + i * 2.1) * 0.25;
          const a = baseAngle + wobble;

          // Wisp streams from outside inward — like a waterfall
          const outerDist = bh.radius * (1.2 + Math.sin(frame * 0.03 + i * 1.3) * 0.2);
          const innerDist = bh.radius * 0.6;

          const ox = bh.x + Math.cos(a) * outerDist;
          const oy = bh.y + Math.sin(a) * outerDist;
          const ix = bh.x + Math.cos(a + 0.4) * innerDist;
          const iy = bh.y + Math.sin(a + 0.4) * innerDist;

          const cpDist = (outerDist + innerDist) * 0.5;
          const cpx = bh.x + Math.cos(a + 0.2) * cpDist;
          const cpy = bh.y + Math.sin(a + 0.2) * cpDist;

          const wAlpha = 0.04 + bh.consumed * 0.08;
          const grad = ctx.createLinearGradient(ox, oy, ix, iy);
          grad.addColorStop(0, `rgba(190, 195, 200, ${wAlpha})`);
          grad.addColorStop(0.6, `rgba(190, 195, 200, ${wAlpha * 0.4})`);
          grad.addColorStop(1, 'rgba(190, 195, 200, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5 + bh.consumed * 2.5;
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.quadraticCurveTo(cpx, cpy, ix, iy);
          ctx.stroke();
        }
      }

      // ── Cooldown + Regen ──
      if (bh.suckedAll) {
        if (bh.cooldown > 0) {
          bh.cooldown--;
        } else {
          bh.regenProgress += 0.003;

          if (bh.regenProgress >= 1) {
            bh.suckedAll = false;
            bh.active = false;
            bh.radius = 5;
            bh.consumed = 0;
            for (const p of particles.current) {
              p.alive = 1;
              p.o = p.maxO;
              p.vx = (Math.random() - 0.5) * 1.2;
              p.vy = (Math.random() - 0.5) * 0.6;
            }
          } else {
            const regenFront = bh.regenProgress;
            for (const p of particles.current) {
              const nx = p.x / w;
              const ny = p.y / h;
              const edgeDist = Math.min(nx, 1 - nx, ny, 1 - ny) * 2;
              const threshold = 1 - regenFront;

              if (edgeDist < threshold) {
                p.alive = Math.min(1, p.alive + 0.02);
                p.o = p.maxO * p.alive;
              }
            }
          }
        }
      }

      // ── Mist particles (light gray) ──
      for (const p of particles.current) {
        if (p.alive <= 0.01) continue;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.01;

        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        if (p.y > h + p.r) p.y = -p.r;

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
        grad.addColorStop(0, `rgba(185, 190, 195, ${alpha})`);
        grad.addColorStop(0.4, `rgba(185, 190, 195, ${alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(185, 190, 195, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Side glow (light gray) ──
      const gl = ctx.createLinearGradient(0, 0, 300, 0);
      gl.addColorStop(0, 'rgba(185, 190, 195, 0.09)');
      gl.addColorStop(0.4, 'rgba(185, 190, 195, 0.03)');
      gl.addColorStop(1, 'rgba(185, 190, 195, 0)');
      ctx.fillStyle = gl;
      ctx.fillRect(0, 0, 300, h);

      const gr = ctx.createLinearGradient(w, 0, w - 300, 0);
      gr.addColorStop(0, 'rgba(185, 190, 195, 0.09)');
      gr.addColorStop(0.4, 'rgba(185, 190, 195, 0.03)');
      gr.addColorStop(1, 'rgba(185, 190, 195, 0)');
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
