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
    radius: 0,
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

    // Vignette: 15% dimmer at center and edges
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

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const bh = blackHole.current;
      if (bh.suckedAll || bh.cooldown > 0) return;

      const cx = e.clientX;
      const cy = e.clientY;

      // Blow mist outward from click
      for (const p of particles.current) {
        if (p.alive <= 0) continue;
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 600) {
          const force = (1 - dist / 600) * 25;
          p.vx += (dx / (dist + 1)) * force;
          p.vy += (dy / (dist + 1)) * force;
        }
      }

      if (!bh.active) {
        bh.active = true;
        bh.x = cx;
        bh.y = cy;
        bh.radius = 5;
        bh.consumed = 0;
      }
    };
    window.addEventListener('click', onClick);

    let frame = 0;

    // ── Black hole renderer ──
    const drawBlackHole = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      frame: number,
      alphaM: number = 1,
    ) => {
      if (r < 3) return;

      // 1. Punch out the void — pure darkness, no mist
      ctx.globalCompositeOperation = 'destination-out';
      const voidGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
      voidGrad.addColorStop(0, `rgba(0,0,0,${alphaM})`);
      voidGrad.addColorStop(0.92, `rgba(0,0,0,${alphaM})`);
      voidGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = voidGrad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';

      // 2. Re-draw stars visible inside BH lensing zone (not inside core)
      const coreR = r * 0.75;
      for (const s of stars.current) {
        const sdx = s.x - x;
        const sdy = s.y - y;
        const sDist = Math.sqrt(sdx * sdx + sdy * sdy);
        if (sDist < r * 1.1 && sDist > coreR) {
          // Slight lensing distortion — push star outward
          const lensShift = (1 - (sDist - coreR) / (r * 1.1 - coreR)) * r * 0.08;
          const angle = Math.atan2(sdy, sdx);
          const sx = s.x + Math.cos(angle) * lensShift;
          const sy = s.y + Math.sin(angle) * lensShift;
          const twinkle = Math.sin(frame * 0.016 * s.twinkleSpeed * 60 + s.twinkleOffset);
          const sa = s.o * (0.5 + 0.5 * twinkle) * alphaM;
          if (sa < 0.05) continue;
          ctx.fillStyle = `rgba(220,225,235,${sa})`;
          ctx.beginPath();
          ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Warm accretion glow — wide soft halo (the orange/amber glow from the image)
      const glowR = r * 1.6;
      const warmGlow = ctx.createRadialGradient(x, y, r * 0.7, x, y, glowR);
      warmGlow.addColorStop(0, 'rgba(255,120,20,0)');
      warmGlow.addColorStop(0.3, `rgba(255,140,40,${0.08 * alphaM})`);
      warmGlow.addColorStop(0.55, `rgba(255,100,20,${0.12 * alphaM})`);
      warmGlow.addColorStop(0.8, `rgba(200,60,10,${0.04 * alphaM})`);
      warmGlow.addColorStop(1, 'rgba(150,40,10,0)');
      ctx.fillStyle = warmGlow;
      ctx.beginPath();
      ctx.arc(x, y, glowR, 0, Math.PI * 2);
      ctx.fill();

      // 4. Accretion disk — tilted elliptical ring
      const diskR = r * 1.15;
      const diskW = Math.max(3, r * 0.09);
      const tilt = 0.32;
      const diskRot = 0.15; // slight tilt angle

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(diskRot);
      ctx.scale(1, tilt);

      // Thick outer glow band
      const bandGlow = ctx.createRadialGradient(0, 0, diskR - diskW * 3, 0, 0, diskR + diskW * 4);
      bandGlow.addColorStop(0, 'rgba(255,100,15,0)');
      bandGlow.addColorStop(0.3, `rgba(255,130,35,${0.12 * alphaM})`);
      bandGlow.addColorStop(0.5, `rgba(255,160,55,${0.2 * alphaM})`);
      bandGlow.addColorStop(0.7, `rgba(255,120,30,${0.1 * alphaM})`);
      bandGlow.addColorStop(1, 'rgba(200,70,10,0)');
      ctx.fillStyle = bandGlow;
      ctx.beginPath();
      ctx.arc(0, 0, diskR + diskW * 4, 0, Math.PI * 2);
      ctx.fill();

      // Main disk ring — bright amber
      ctx.shadowColor = `rgba(255,120,20,${0.6 * alphaM})`;
      ctx.shadowBlur = diskW * 3;
      ctx.strokeStyle = `rgba(255,170,60,${0.65 * alphaM})`;
      ctx.lineWidth = diskW;
      ctx.beginPath();
      ctx.arc(0, 0, diskR, 0, Math.PI * 2);
      ctx.stroke();

      // Inner bright ring — white-hot core of disk
      ctx.strokeStyle = `rgba(255,220,140,${0.4 * alphaM})`;
      ctx.lineWidth = diskW * 0.35;
      ctx.shadowBlur = diskW * 1.5;
      ctx.shadowColor = `rgba(255,200,100,${0.4 * alphaM})`;
      ctx.beginPath();
      ctx.arc(0, 0, diskR * 0.88, 0, Math.PI * 2);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.restore();

      // 5. Doppler brightening — bottom-left brighter arc
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(diskRot);
      ctx.scale(1, tilt);
      const dopplerAlpha = 0.35 * alphaM;
      ctx.strokeStyle = `rgba(255,200,100,${dopplerAlpha})`;
      ctx.lineWidth = diskW * 1.4;
      ctx.shadowColor = `rgba(255,160,60,${dopplerAlpha})`;
      ctx.shadowBlur = diskW * 4;
      ctx.beginPath();
      ctx.arc(0, 0, diskR, Math.PI * 0.55, Math.PI * 1.15);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // 6. Gravitationally lensed back-side — arc wrapping over the top
      ctx.save();
      ctx.translate(x, y);
      const lensedR = r * 1.02;
      ctx.strokeStyle = `rgba(255,140,45,${0.2 * alphaM})`;
      ctx.lineWidth = Math.max(2, r * 0.035);
      ctx.shadowColor = `rgba(255,110,30,${0.15 * alphaM})`;
      ctx.shadowBlur = r * 0.04;
      ctx.beginPath();
      ctx.arc(0, 0, lensedR, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      // Second thinner lensed arc
      ctx.strokeStyle = `rgba(255,180,80,${0.12 * alphaM})`;
      ctx.lineWidth = Math.max(1, r * 0.015);
      ctx.beginPath();
      ctx.arc(0, 0, lensedR * 0.96, Math.PI * 1.2, Math.PI * 1.8);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // 7. Photon ring — razor thin bright line at the shadow edge
      ctx.strokeStyle = `rgba(255,210,130,${0.3 * alphaM})`;
      ctx.lineWidth = Math.max(0.5, r * 0.008);
      ctx.shadowColor = `rgba(255,190,100,${0.2 * alphaM})`;
      ctx.shadowBlur = r * 0.03;
      ctx.beginPath();
      ctx.arc(x, y, r * 0.93, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 8. Gravitational lensing shimmer — bluish arcs bending at the edge
      const numArcs = 8;
      const arcRot = frame * 0.004;
      for (let i = 0; i < numArcs; i++) {
        const a = (i / numArcs) * Math.PI * 2 + arcRot;
        const wobbleR = r * (1.02 + Math.sin(frame * 0.015 + i * 2) * 0.03);
        const arcLen = 0.12 + Math.sin(frame * 0.02 + i * 1.3) * 0.04;
        const la = (0.06 + Math.sin(frame * 0.025 + i * 1.7) * 0.02) * alphaM;
        ctx.strokeStyle = `rgba(160,190,255,${la})`;
        ctx.lineWidth = Math.max(0.5, r * 0.006);
        ctx.beginPath();
        ctx.arc(x, y, wobbleR, a, a + arcLen);
        ctx.stroke();
      }
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const demistRadius = 100;
      const bh = blackHole.current;
      const maxBhRadius = Math.sqrt(w * w + h * h) * 0.65;

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

        let alpha = p.o * p.alive * vignette(p.x, p.y);
        if (!bh.active && dist < demistRadius + p.r) {
          const edge = demistRadius * 0.2;
          const fade = Math.max(0, (dist - edge) / (demistRadius + p.r - edge));
          alpha *= fade * fade * fade;
        }

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

      // ── Side glow ──
      const gl = ctx.createLinearGradient(0, 0, 300, 0);
      gl.addColorStop(0, 'rgba(185,190,200,0.07)');
      gl.addColorStop(0.4, 'rgba(185,190,200,0.02)');
      gl.addColorStop(1, 'rgba(185,190,200,0)');
      ctx.fillStyle = gl;
      ctx.fillRect(0, 0, 300, h);

      const gr = ctx.createLinearGradient(w, 0, w - 300, 0);
      gr.addColorStop(0, 'rgba(185,190,200,0.07)');
      gr.addColorStop(0.4, 'rgba(185,190,200,0.02)');
      gr.addColorStop(1, 'rgba(185,190,200,0)');
      ctx.fillStyle = gr;
      ctx.fillRect(w - 300, 0, 300, h);

      // ── Black hole (follows cursor, sucks mist) ──
      if (bh.active && !bh.suckedAll) {
        bh.x = mx;
        bh.y = my;

        // Growth: ~1cm per 10x10cm of mist, scaled to fill screen
        bh.radius = 5 + bh.consumed * maxBhRadius;

        let totalAlive = 0;

        for (const p of particles.current) {
          if (p.alive <= 0) continue;
          totalAlive++;

          const dx = p.x - bh.x;
          const dy = p.y - bh.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pullRange = bh.radius * 2.5 + 350;

          if (dist < pullRange) {
            const angle = Math.atan2(dy, dx);
            const tangentX = -Math.sin(angle);
            const tangentY = Math.cos(angle);

            const pull = 1 - dist / pullRange;
            const radialStr = pull * 7;
            const spiralStr = pull * pull * 2.5;

            p.vx -= (dx / (dist + 1)) * radialStr + tangentX * spiralStr;
            p.vy -= (dy / (dist + 1)) * radialStr + tangentY * spiralStr;

            if (dist < bh.radius + p.r * 0.3) {
              p.alive = Math.max(0, p.alive - 0.05);
              if (p.alive <= 0) {
                bh.consumed = Math.min(1, bh.consumed + 1 / particles.current.length);
              }
            }
          }
        }

        if (totalAlive === 0 || bh.consumed >= 0.95) {
          bh.suckedAll = true;
          bh.active = false;
          bh.cooldown = 20 * 60; // 20 seconds
          bh.regenProgress = 0;
          for (const p of particles.current) p.alive = 0;
        }

        drawBlackHole(ctx, bh.x, bh.y, bh.radius, frame);
      }

      // ── Cooldown + regen ──
      if (bh.suckedAll) {
        if (bh.cooldown > 0) {
          bh.cooldown--;
          // BH stays visible, slowly fading
          const fade = Math.min(1, bh.cooldown / (20 * 30));
          drawBlackHole(ctx, bh.x, bh.y, bh.radius, frame, fade);
        } else {
          bh.regenProgress += 0.003;

          if (bh.regenProgress >= 1) {
            bh.suckedAll = false;
            bh.active = false;
            bh.radius = 0;
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
