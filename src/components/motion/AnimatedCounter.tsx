'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: string; // e.g. "50+", "4.8", "10K+"
  className?: string;
}

function parseTarget(value: string): { num: number; prefix: string; suffix: string; decimals: number } {
  const match = value.match(/^([^\d]*)(\d+\.?\d*)(.*)$/);
  if (!match) return { num: 0, prefix: '', suffix: value, decimals: 0 };
  const numStr = match[2];
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return { num: parseFloat(numStr), prefix: match[1], suffix: match[3], decimals };
}

export default function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(value);
  const { num, prefix, suffix, decimals } = parseTarget(value);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, num, prefix, suffix, decimals]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {display}
    </motion.span>
  );
}
