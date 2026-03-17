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
    t('hero.rotator_workflow', 'for Your Workflow'),
    t('hero.rotator_freelancers', 'for Freelancers'),
    t('hero.rotator_teams', 'for Small Teams'),
    t('hero.rotator_creators', 'for Content Creators'),
    t('hero.rotator_solopreneurs', 'for Solopreneurs'),
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
