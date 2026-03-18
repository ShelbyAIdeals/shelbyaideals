'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '@/i18n/context';

interface HeroTextRotatorProps {
  className?: string;
}

export default function HeroTextRotator({ className }: HeroTextRotatorProps) {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();

  const phrases = [
    t('hero.rotator_video', 'with AI Video'),
    t('hero.rotator_audio', 'with AI Audio'),
    t('hero.rotator_automation', 'with Automation'),
    t('hero.rotator_repurposing', 'by Repurposing'),
    t('hero.rotator_small_biz', 'for Small Business'),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <span className={`inline-block relative ${className ?? ''}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="text-gradient-signal inline-block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
