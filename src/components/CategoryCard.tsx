'use client';

import Link from 'next/link';
import {
  PenTool,
  Palette,
  Code,
  Zap,
  Search,
  Clock,
  Video,
  TrendingUp,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/context';

/* ── Icon map ─────────────────────────────────────────── */

const iconMap: Record<string, LucideIcon> = {
  'pen-tool': PenTool,
  palette: Palette,
  code: Code,
  zap: Zap,
  search: Search,
  clock: Clock,
  video: Video,
  'trending-up': TrendingUp,
};

/* ── Category → color tint mapping ────────────────────── */

type ColorTint = {
  bg: string;
  iconBg: string;
  iconBorder: string;
  iconText: string;
  hoverBorder: string;
};

const tintMap: Record<string, ColorTint> = {
  'ai-video': {
    bg: 'bg-signal-500/[0.08]',
    iconBg: 'bg-signal-500/15',
    iconBorder: 'border-signal-500/20',
    iconText: 'text-signal-400',
    hoverBorder: 'group-hover:border-signal-500/40',
  },
  'ai-marketing': {
    bg: 'bg-ember-500/[0.08]',
    iconBg: 'bg-ember-500/15',
    iconBorder: 'border-ember-500/20',
    iconText: 'text-ember-400',
    hoverBorder: 'group-hover:border-ember-500/40',
  },
  'ai-content': {
    bg: 'bg-iris-500/[0.08]',
    iconBg: 'bg-iris-500/15',
    iconBorder: 'border-iris-500/20',
    iconText: 'text-iris-400',
    hoverBorder: 'group-hover:border-iris-500/40',
  },
};

const defaultTint: ColorTint = {
  bg: 'bg-signal-500/[0.08]',
  iconBg: 'bg-signal-500/15',
  iconBorder: 'border-signal-500/20',
  iconText: 'text-signal-400',
  hoverBorder: 'group-hover:border-signal-500/40',
};

function getTint(slug: string): ColorTint {
  return tintMap[slug] || defaultTint;
}

/* ── Component ────────────────────────────────────────── */

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
  icon: string;
  articleCount: number;
}

export default function CategoryCard({
  name,
  slug,
  description,
  icon,
  articleCount,
}: CategoryCardProps) {
  const { t } = useTranslation();
  const IconComponent = iconMap[icon] || Zap;
  const tint = getTint(slug);

  return (
    <Link href={`/categories/${slug}`} className="no-underline block h-full">
      <motion.div
        className={`
          group h-full rounded-xl border border-void-700/40
          ${tint.bg} ${tint.hoverBorder}
          p-6 flex flex-col cursor-pointer
          transition-all duration-200
        `}
        whileHover={{ y: -4, boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {/* Top row: icon circle + article count badge */}
        <div className="flex items-start justify-between mb-4">
          {/* Category icon in colored circle */}
          <div
            className={`
              w-12 h-12 rounded-full flex items-center justify-center shrink-0
              ${tint.iconBg} border ${tint.iconBorder} ${tint.iconText}
              transition-all duration-200
              group-hover:shadow-lg
            `}
          >
            <IconComponent size={28} strokeWidth={1.8} />
          </div>

          {/* Article count badge */}
          <span className="badge-void">
            {articleCount} {articleCount === 1 ? t('common.article_singular', 'article') : t('common.article_plural', 'articles')}
          </span>
        </div>

        {/* Category name */}
        <h3 className="text-lg font-heading font-bold text-void-50 mb-2 group-hover:text-signal-400 transition-colors">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-void-400 leading-relaxed line-clamp-2 flex-1 mb-4">
          {description}
        </p>

        {/* Explore link */}
        <span
          className={`
            inline-flex items-center gap-1.5 text-sm font-semibold
            ${tint.iconText} opacity-0 group-hover:opacity-100
            transition-all duration-200 mt-auto
          `}
        >
          {t('common.explore', 'Explore')}
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </motion.div>
    </Link>
  );
}
