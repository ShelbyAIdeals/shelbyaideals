'use client';

import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/context';
import FavoriteButton from '@/components/FavoriteButton';
import type { Category } from '@/lib/types';

interface ToolListCardProps {
  slug: string;
  tool: string;
  toolLogo?: string;
  toolSlug?: string;
  excerpt: string;
  category: Category;
  rating: number;
  isFavorited?: boolean;
  bestFor: string;
  date: string;
}

export default function ToolListCard({
  slug,
  tool,
  toolLogo,
  toolSlug,
  excerpt,
  category,
  rating,
  bestFor,
  isFavorited = false,
}: ToolListCardProps) {
  const { t } = useTranslation();
  const clampedRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const isVerified = clampedRating >= 4.0;
  const favSlug = toolSlug || slug.replace('-review', '');
  const initial = tool.charAt(0).toUpperCase();

  const categoryLabel = category
    .replace('ai-', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Link href={`/reviews/${slug}`} className="no-underline block">
      <motion.article
        className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-xl border border-void-700/40 bg-void-800/30 hover:border-signal-500/30 hover:bg-void-800/50 transition-all duration-200 cursor-pointer group"
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Logo */}
        <div className="shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden">
          {toolLogo ? (
            <img
              src={toolLogo}
              alt={`${tool} logo`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-lg font-bold text-signal-400">{initial}</span>
          )}
        </div>

        {/* Middle: name + description + tags */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm sm:text-base font-heading font-bold text-void-50 truncate group-hover:text-signal-400 transition-colors">
              {tool}
            </h3>
            {isVerified && (
              <BadgeCheck size={15} className="text-signal-400 shrink-0" />
            )}
          </div>
          <p className="text-xs sm:text-sm text-void-400 line-clamp-1 mb-2">
            {excerpt}
          </p>
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-signal-500/10 text-signal-400 text-[10px] sm:text-xs font-medium">
              #{categoryLabel}
            </span>
            {bestFor && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-void-700/50 text-void-300 text-[10px] sm:text-xs">
                #{bestFor}
              </span>
            )}
          </div>
        </div>

        {/* Right: favorite + rating + arrow */}
        <div className="shrink-0 flex items-center gap-2">
          <FavoriteButton toolSlug={favSlug} isFavorited={isFavorited} />
          <div className="badge-score w-10 h-10 text-sm">
            {clampedRating.toFixed(1)}
          </div>
          <ArrowRight
            size={16}
            className="text-void-500 group-hover:text-signal-400 transition-all duration-200 group-hover:translate-x-1 hidden sm:block"
          />
        </div>
      </motion.article>
    </Link>
  );
}
