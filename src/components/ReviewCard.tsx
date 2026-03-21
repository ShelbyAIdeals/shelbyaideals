'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, X, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/context';
import { isAffiliateActive } from '@/lib/affiliate';

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imageSlug = toolSlug || slug.replace('-review', '');

  // Primary: screenshot, fallback chain: hero → thumb → logo → placeholder
  const screenshotSrc = `/images/tools/${imageSlug}/screenshot-1.png`;
  const screenshotJpg = `/images/tools/${imageSlug}/screenshot-1.jpg`;
  const screenshotJpeg = `/images/tools/${imageSlug}/screenshot-1.jpeg`;
  const heroPngSrc = `/images/tools/${imageSlug}/hero.png`;
  const thumbSrc = `/images/tools/${imageSlug}/thumb.png`;
  const toolPngSrc = `/images/tools/${imageSlug}/${imageSlug}.png`;
  const imageSrc = featuredImage || screenshotSrc;
  const fallbackSrc = '/images/placeholders/tool-thumb.svg';

  const clampedRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const isVerified = clampedRating >= 4.0;
  const hasAffiliate = isAffiliateActive(imageSlug);

  return (
    <>
      <div className="no-underline block h-full">
        <motion.article
          className="card-elevated group overflow-hidden flex flex-col h-full"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
          {/* Screenshot image — click to enlarge */}
          <div
            className="relative bg-void-800/80 overflow-hidden cursor-zoom-in"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLightboxOpen(true);
            }}
          >
            <img
              src={imageSrc}
              alt={`${tool} — UI screenshot from hands-on testing`}
              width={600}
              height={338}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                const src = img.src;
                if (src.includes('screenshot-1.png')) img.src = screenshotJpg;
                else if (src.includes('screenshot-1.jpg')) img.src = screenshotJpeg;
                else if (src.includes('screenshot-1.jpeg')) img.src = heroPngSrc;
                else if (src.includes('hero.png')) img.src = thumbSrc;
                else if (src.includes('thumb.png')) img.src = toolPngSrc;
                else if (!src.includes('tool-thumb.svg')) img.src = fallbackSrc;
              }}
            />

            {/* Zoom hint */}
            <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-void-950/70 text-void-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn size={14} />
            </div>

            {/* Tool logo */}
            {toolLogo && (
              <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
                <img
                  src={toolLogo}
                  alt={`${tool} logo`}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            )}

            {/* Top Pick badge */}
            {hasAffiliate && (
              <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-ember-500/90 text-white shadow-sm">
                Top Pick
              </span>
            )}

            {/* Rating */}
            <motion.div
              className="badge-score w-10 h-10 text-sm absolute bottom-3 right-3 z-10 shadow-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              {clampedRating.toFixed(1)}
            </motion.div>
          </div>

          {/* Content area */}
          <Link href={`/reviews/${slug}`} className="no-underline">
            <div className="p-5 sm:p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-heading font-bold text-void-50 leading-snug group-hover:text-signal-400 transition-colors">
                  {tool}
                </h3>
                {isVerified && (
                  <BadgeCheck size={16} className="text-signal-400 shrink-0" />
                )}
              </div>

              <p className="text-sm text-void-300 leading-snug mb-3">{title}</p>

              <p className="text-sm text-void-400 leading-relaxed line-clamp-2 mb-4 flex-1">
                {excerpt}
              </p>

              <div className="flex items-center flex-wrap gap-2 mb-4">
                <span className="badge-signal">{category}</span>
                <span className="text-xs text-void-500">
                  <span className="font-semibold text-void-300">{t('review.best_for', 'Best for')}:</span>{' '}
                  {bestFor}
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 group-hover:text-signal-300 transition-colors mt-auto">
                {t('card.read_review', 'See If It\'s Worth It')}
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </motion.article>
      </div>

      {/* Lightbox overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void-950/90 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-void-800/80 text-void-200 hover:text-white hover:bg-void-700 transition-colors cursor-pointer z-10"
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <img
            src={imageSrc}
            alt={`${tool} — enlarged screenshot`}
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
