'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/i18n/context';

interface HeroTextRotatorProps {
  className?: string;
}

export default function HeroTextRotator({ className }: HeroTextRotatorProps) {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  // Index 0 is deliberately the fully-enumerated phrase: it is what screen
  // readers get, and what everyone sees if motion is reduced.
  const phrases = [
    t('hero.rotator_all', 'for Video, Audio, Marketing & SEO'),
    t('hero.rotator_video', 'for AI Video'),
    t('hero.rotator_audio', 'for AI Audio'),
    t('hero.rotator_seo', 'for SEO & Marketing'),
    t('hero.rotator_content', 'for Content Creation'),
    t('hero.rotator_small_biz', 'for Your Team'),
  ];

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [phrases.length, reduceMotion]);

  return (
    <span className={`inline-block relative ${className ?? ''}`}>
      {/* This sits inside the <h1>. Left live, it would re-announce a new
          headline every three seconds. The visual rotation is hidden from
          assistive tech and the complete phrase is exposed once, statically. */}
      <span className="sr-only">{phrases[0]}</span>

      <span aria-hidden="true" className="inline-block">
        {/* `initial={false}` stops the first phrase mounting at opacity 0 —
            it is part of the H1, i.e. part of the LCP element, and used to be
            served invisible in the static HTML. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phrases[index]}
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="text-gradient-signal inline-block"
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
