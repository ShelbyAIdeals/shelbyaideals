'use client';

import { useEffect, useRef } from 'react';

export default function MistEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);
  const particles = useRef<
    { x: number; y: number; vx: number; vy: number; r: number; o: number }[]
  >([]);

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
    };

    const initParticles = () => {
      const count = Math.floor((w * h) / 8000);
      particles.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 180 + 80,
        o: Math.random() * 0.06 + 0.03,
      }));
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse uses viewport coordinates (canvas is fixed)
    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const demistRadius = 160;

      for (const p of particles.current) {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = h + p.r;
        if (p.y > h + p.r) p.y = -p.r;

        // Cursor demist
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let alpha = p.o;
        if (dist < demistRadius + p.r) {
          const edge = demistRadius * 0.4;
          const fade = Math.max(0, (dist - edge) / (demistRadius + p.r - edge));
          alpha *= fade * fade; // quadratic falloff for smooth edge
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

      // Side glow — left
      const gl = ctx.createLinearGradient(0, 0, 300, 0);
      gl.addColorStop(0, 'rgba(147, 154, 92, 0.09)');
      gl.addColorStop(0.4, 'rgba(147, 154, 92, 0.03)');
      gl.addColorStop(1, 'rgba(147, 154, 92, 0)');
      ctx.fillStyle = gl;
      ctx.fillRect(0, 0, 300, h);

      // Side glow — right
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
