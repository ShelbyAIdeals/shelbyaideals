'use client';

import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/context';

interface ReviewCardProps {
  title: string;
  slug: string;
  tool: string;
  rating: number;
  excerpt: string;
  category: string;
  bestFor: string;
  featuredImage?: string;
  toolSlug?: string;
  toolLogo?: string;
}

export default function ReviewCard({
  title,
  slug,
  tool,
  rating,
  excerpt,
  category,
  bestFor,
  featuredImage,
  toolSlug,
  toolLogo,
}: ReviewCardProps) {
  const { t } = useTranslation();
  const imageSlug = toolSlug || slug.replace('-review', '');
  const webpSrc = `/images/tools/${imageSlug}/thumb.webp`;
  const svgSrc = `/images/tools/${imageSlug}/thumb.svg`;
  const imageSrc = featuredImage || webpSrc;
  const fallbackSrc = '/images/placeholders/tool-thumb.svg';

  const clampedRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const isVerified = clampedRating >= 4.0;

  return (
    <Link href={`/reviews/${slug}`} className="no-underline block h-full">
      <motion.article
        className="card-elevated group overflow-hidden flex flex-col cursor-pointer h-full"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {/* Image area with gradient overlay + rating circle */}
        <div className="relative aspect-video bg-void-800 overflow-hidden">
          <img
            src={imageSrc}
            alt={`${tool} review`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              if (img.src.endsWith('.webp')) img.src = svgSrc;
              else if (!img.src.endsWith('tool-thumb.svg')) img.src = fallbackSrc;
            }}
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, transparent 30%, var(--color-void-900) 100%)',
            }}
          />

          {/* Tool logo (overlapping top-left of image area) */}
          {toolLogo && (
            <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-void-900/80 border border-void-700/50 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-lg">
              <img
                src={toolLogo}
                alt={`${tool} logo`}
                className="w-7 h-7 object-contain"
                loading="lazy"
              />
            </div>
          )}

          {/* Rating score circle */}
          <motion.div
            className="badge-score w-10 h-10 text-sm absolute bottom-0 right-4 translate-y-1/2 z-10 shadow-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            {clampedRating.toFixed(1)}
          </motion.div>
        </div>

        {/* Content area */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 pt-6">
          {/* Tool name + verified badge */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-heading font-bold text-void-50 leading-snug group-hover:text-signal-400 transition-colors">
              {tool}
            </h3>
            {isVerified && (
              <BadgeCheck size={16} className="text-signal-400 shrink-0" />
            )}
          </div>

          {/* Article title */}
          <p className="text-sm text-void-300 leading-snug mb-3">
            {title}
          </p>

          {/* Excerpt */}
          <p className="text-sm text-void-400 leading-relaxed line-clamp-2 mb-4 flex-1">
            {excerpt}
          </p>

          {/* Tag row */}
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <span className="badge-signal">{category}</span>
            <span className="text-xs text-void-500 notranslate">
              <span className="font-semibold text-void-300">{t('review.best_for', 'Best for')}:</span>{' '}
              {bestFor}
            </span>
          </div>

          {/* Read Review link */}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 group-hover:text-signal-300 transition-colors mt-auto notranslate">
            {t('card.read_review', 'Read Review')}
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
