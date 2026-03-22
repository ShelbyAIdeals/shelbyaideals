'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Sparkles, Shield, Zap, Video, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/context';
import { useAuth } from '@/lib/auth-context';
import HeroTextRotator from './motion/HeroTextRotator';

const trendingTools = [
  'Pictory', 'ElevenLabs', 'Synthesia', 'Frase', 'Mangools', 'Descript',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  }),
};

interface HeroProps {
  categoryCounts?: Record<string, number>;
}

export default function Hero({ categoryCounts = {} }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const firstName = profile?.first_name;
  const isLoggedIn = !!user && !!firstName;

  const trustPoints = [
    { icon: Shield, text: t('hero.trust_no_sponsored', '31+ tools tested hands-on') },
    { icon: Sparkles, text: t('hero.trust_tools_tested', 'Zero sponsored rankings') },
    { icon: Zap, text: t('hero.trust_workflow', 'Real screenshots & output samples') },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section className="relative overflow-visible">
      {/* Background glows */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          className="absolute -top-40 right-0 w-[600px] h-[600px] bg-signal-500/8 rounded-full blur-[120px]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 15, 0],
          }}
          transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-iris-500/6 rounded-full blur-[120px]"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -15, 0],
          }}
          transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute -bottom-60 right-1/4 w-[400px] h-[400px] bg-ember-500/5 rounded-full blur-[100px]"
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity, delay: 4 }}
        />
      </div>

      <div className={`container-main pb-16 sm:pb-20 lg:pb-28 ${isLoggedIn ? 'pt-8 sm:pt-14 lg:pt-16' : 'pt-14 sm:pt-16 lg:pt-24'}`}>
        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-signal-500/10 border border-signal-500/20 text-signal-400 text-sm font-medium mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-signal-400 animate-glow" />
              {t('hero.eyebrow', 'Tested AI Tools for Business')}
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className={`font-heading font-bold tracking-[-0.02em] text-void-50 leading-[1.08] ${isLoggedIn ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-4xl sm:text-5xl lg:text-6xl'}`}
            >
              {isLoggedIn && <span>{firstName}, </span>}
              {t('hero.headline_prefix', 'Find the Right AI Tool')}{' '}
              <br className="hidden sm:block" />
              <HeroTextRotator />
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mt-6 text-lg sm:text-xl text-void-300 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {t('hero.subheadline', 'Before you buy. Hands-on reviews, side-by-side comparisons, and honest recommendations so you can pick the best AI tools for your workflow — without wasting time or money.')}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="mt-8 max-w-lg mx-auto lg:mx-0"
            >
              <form onSubmit={handleSearch} className="relative group z-[2]">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-void-500 group-focus-within:text-signal-400 transition-colors"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('hero.search_placeholder', 'Search tools, categories, or comparisons...')}
                  className="search-input !pl-12 !pr-28"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer text-void-950"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-signal-500), var(--color-signal-400))',
                  }}
                >
                  {t('hero.search_button', 'Search')}
                </button>
              </form>

              {/* Trending pills */}
              <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2 z-[2] relative">
                <span className="text-xs text-void-500">{t('hero.trending', 'Popular now:')}</span>
                {trendingTools.map((tool) => (
                  <Link
                    key={tool}
                    href={`/search?q=${encodeURIComponent(tool)}`}
                    className="px-3 py-1 text-xs font-medium text-void-400 bg-void-800/60 border border-void-700/40 rounded-full hover:border-signal-500/30 hover:text-signal-400 no-underline transition-all"
                  >
                    {tool}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3"
            >
              <Link href="/reviews" className="btn-primary text-sm no-underline gap-2">
                {t('hero.browse_tools', 'See Top-Rated Tools')}
                <ArrowRight size={16} />
              </Link>
              <Link href="/comparisons" className="btn-ghost text-sm no-underline gap-2">
                {t('hero.browse_categories', 'Compare Your Options')}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* Right: Visual / Trust Elements */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="hidden lg:flex flex-col items-center justify-center"
          >
            {/* Hero visual — abstract tech grid */}
            <div className="relative w-full max-w-md aspect-square">
              {/* Floating cards representing new categories */}
              <motion.div
                className="absolute top-4 left-8 card-glass p-4 pr-8 flex items-center gap-3"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
              >
                <div className="w-10 h-10 rounded-lg bg-signal-500/15 border border-signal-500/20 flex items-center justify-center">
                  <Video size={18} className="text-signal-400" />
                </div>
                <div>
                  <div className="text-sm font-heading font-bold text-void-50">{t('hero.card_ai_video', 'AI Video & Audio')}</div>
                  <div className="text-xs text-void-400">{categoryCounts['ai-video-audio'] ?? 0} {t('hero.card_tools_reviewed', 'tools reviewed')}</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-28 right-4 card-glass p-4 pr-8 flex items-center gap-3"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
              >
                <div className="w-10 h-10 rounded-lg bg-ember-500/15 border border-ember-500/20 flex items-center justify-center">
                  <TrendingUp size={18} className="text-ember-400" />
                </div>
                <div>
                  <div className="text-sm font-heading font-bold text-void-50">{t('hero.card_marketing', 'Marketing & SEO')}</div>
                  <div className="text-xs text-void-400">{categoryCounts['ai-marketing-seo'] ?? 0} {t('hero.card_tools_reviewed', 'tools reviewed')}</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-28 left-12 card-glass p-4 pr-8 flex items-center gap-3"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
              >
                <div className="w-10 h-10 rounded-lg bg-iris-500/15 border border-iris-500/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-iris-400" />
                </div>
                <div>
                  <div className="text-sm font-heading font-bold text-void-50">{t('hero.card_content', 'Content & Productivity')}</div>
                  <div className="text-xs text-void-400">{categoryCounts['ai-content-productivity'] ?? 0} {t('hero.card_tools_reviewed', 'tools reviewed')}</div>
                </div>
              </motion.div>

              {/* Central rating badge */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
              >
                <div className="w-24 h-24 rounded-2xl bg-void-900 border border-signal-500/20 flex flex-col items-center justify-center shadow-lg"
                  style={{ boxShadow: '0 0 40px rgba(10, 209, 200, 0.1)' }}
                >
                  <span className="text-lg font-mono font-bold text-signal-400 leading-tight text-center px-1">7–14</span>
                  <span className="text-[10px] text-void-400 uppercase tracking-wider text-center leading-tight">{t('hero.days_tested', 'Days Tested Per Tool')}</span>
                </div>
              </motion.div>

              {/* Decorative connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                <line x1="120" y1="70" x2="200" y2="200" stroke="rgba(10,209,200,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="300" y1="140" x2="200" y2="200" stroke="rgba(245,158,11,0.08)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="130" y1="300" x2="200" y2="200" stroke="rgba(139,92,246,0.08)" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Trust Strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mt-16 pt-8 border-t border-void-800/50"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {trustPoints.map((point) => (
              <div key={point.text} className="flex items-center gap-2.5 bg-void-800/40 px-4 py-2.5 rounded-lg border border-void-700/30">
                <point.icon size={18} className="text-signal-400 shrink-0" />
                <span className="text-sm text-void-300">{point.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
