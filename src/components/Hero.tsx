'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, TrendingUp, Star, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroTextRotator from './motion/HeroTextRotator';
import AnimatedCounter from './motion/AnimatedCounter';

const stats = [
  { icon: BookOpen, value: '10+', label: 'Tools Reviewed' },
  { icon: Star, value: '4.8', label: 'Avg Rating' },
  { icon: TrendingUp, value: '6', label: 'Categories' },
];

const trendingTools = [
  'Jasper AI', 'Copy.ai', 'Midjourney', 'Cursor', 'Surfer SEO', 'Descript',
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay },
  }),
};

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section className="relative overflow-visible">
      {/* Animated gradient mesh background */}
      {/* Background glows — fixed to viewport so no seam lines */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          className="absolute -top-40 right-0 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[120px]"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 15, 0],
            rotate: [0, 1, -1, 0],
          }}
          transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 left-0 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[120px]"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, -20, 15, 0],
            rotate: [0, -1, 1, 0],
          }}
          transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, delay: 4 }}
        />
      </div>

      <div className="container-main pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-glow" />
            Honest AI Tool Reviews
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-void-50 leading-[1.1]"
          >
            Discover the Best AI Tools{' '}
            <HeroTextRotator />
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mt-6 text-lg sm:text-xl text-void-400 leading-relaxed max-w-2xl mx-auto"
          >
            Honest reviews, head-to-head comparisons, and workflow-first recommendations.
            No sponsored rankings. No BS.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="mt-10 max-w-xl mx-auto"
          >
            <form onSubmit={handleSearch} className="relative group z-[2] rounded-xl hover:bg-void-900/90 focus-within:bg-void-900/90 transition-colors">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-void-500 group-focus-within:text-accent-400 transition-colors"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools, categories, or comparisons..."
                className="search-input !pl-12 !pr-32"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-accent-500 text-void-950 text-sm font-semibold rounded-lg hover:bg-accent-400 transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Trending pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 z-[2] relative">
              <span className="text-xs text-void-500">Trending:</span>
              {trendingTools.map((tool) => (
                <Link
                  key={tool}
                  href={`/search?q=${encodeURIComponent(tool)}`}
                  className="px-3 py-1 text-xs font-medium text-void-400 bg-void-800/60 border border-void-700/50 rounded-full hover:bg-void-900/90 hover:border-accent-500/30 hover:text-accent-400 no-underline transition-all"
                >
                  {tool}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-500/10 border border-accent-500/15 flex items-center justify-center">
                  <stat.icon size={18} className="text-accent-400" />
                </div>
                <div className="text-left">
                  <AnimatedCounter
                    value={stat.value}
                    className="text-xl font-heading font-bold text-void-50"
                  />
                  <div className="text-xs text-void-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Quick action buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="/reviews" className="btn-primary text-sm no-underline gap-2">
              Browse All Tools
              <ArrowRight size={16} />
            </Link>
            <Link href="/categories" className="btn-outline text-sm no-underline gap-2">
              Browse Categories
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
