'use client';

import { useEffect, useRef } from 'react';

export default function MistEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; r: number; o: number }[]>([]);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();

    // Reinit on resize
    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    // Generate mist particles
    const count = Math.floor((canvas.width * canvas.height) / 18000);
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 120 + 60,
      o: Math.random() * 0.04 + 0.015,
    }));

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    const onScroll = () => {
      // keep y updated with scroll
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('scroll', onScroll);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const demistRadius = 180;

      for (const p of particles.current) {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -p.r) p.x = canvas.width + p.r;
        if (p.x > canvas.width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = canvas.height + p.r;
        if (p.y > canvas.height + p.r) p.y = -p.r;

        // Distance from cursor
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Fade near cursor
        let alpha = p.o;
        if (dist < demistRadius + p.r) {
          const fade = Math.max(0, (dist - demistRadius * 0.3) / (demistRadius + p.r - demistRadius * 0.3));
          alpha *= fade;
        }

        if (alpha < 0.001) continue;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `rgba(147, 154, 92, ${alpha})`);
        grad.addColorStop(0.5, `rgba(147, 154, 92, ${alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(147, 154, 92, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Side glow strips
      const sideGrad = ctx.createLinearGradient(0, 0, 250, 0);
      sideGrad.addColorStop(0, 'rgba(147, 154, 92, 0.06)');
      sideGrad.addColorStop(0.5, 'rgba(147, 154, 92, 0.02)');
      sideGrad.addColorStop(1, 'rgba(147, 154, 92, 0)');
      ctx.fillStyle = sideGrad;
      ctx.fillRect(0, 0, 250, canvas.height);

      const sideGradR = ctx.createLinearGradient(canvas.width, 0, canvas.width - 250, 0);
      sideGradR.addColorStop(0, 'rgba(147, 154, 92, 0.06)');
      sideGradR.addColorStop(0.5, 'rgba(147, 154, 92, 0.02)');
      sideGradR.addColorStop(1, 'rgba(147, 154, 92, 0)');
      ctx.fillStyle = sideGradR;
      ctx.fillRect(canvas.width - 250, 0, 250, canvas.height);

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
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
