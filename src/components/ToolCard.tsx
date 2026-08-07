'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import StarRating from './StarRating';
import CTAButton from './CTAButton';

interface ToolCardProps {
  rank: number;
  name: string;
  tagline: string;
  rating: number;
  pricing: string;
  bestFor: string;
  affiliateUrl: string;
  reviewSlug?: string;
  pricingSlug?: string;
}

export default function ToolCard({
  rank,
  name,
  tagline,
  rating,
  pricing,
  bestFor,
  affiliateUrl,
  reviewSlug,
  pricingSlug,
}: ToolCardProps) {
  return (
    // The hover glow lives in `.card:hover` (globals.css), which is theme-aware.
    // It used to be duplicated on this element as
    // `rgba(var(--color-signal-500), 0.12)` — invalid CSS, since that token holds
    // a hex string and rgba() needs numeric channels, so the browser dropped the
    // declaration and the glow never rendered at all.
    <motion.div
      className="card group relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Rank badge — podium reads gold / silver / bronze. Every fill here is
          light enough that it needs dark type: void-50 on ember-400 measured
          1.47:1. Bronze is ember-600 rather than ember-700 because ember-700
          is the one step on the ramp no text colour can clear 4.5:1 against. */}
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-extrabold text-void-950 ${
        rank === 1 ? 'bg-ember-400 shadow-glow-ember' :
        rank === 2 ? 'bg-void-300' :
        rank === 3 ? 'bg-ember-600' :
        'bg-signal-500 shadow-glow-sm'
      }`}>
        {rank}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-void-50">{name}</h3>
        <p className="mt-0.5 text-sm text-void-500 line-clamp-1">{tagline}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <StarRating rating={rating} size="sm" />

          <span className="text-xs font-medium text-void-500">
            {pricing}
          </span>

          <span className="rounded-full bg-signal-500/15 border border-signal-500/20 px-3 py-0.5 text-xs font-medium text-signal-400">
            Best for: {bestFor}
          </span>
        </div>

        {(reviewSlug || pricingSlug) && (
          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 text-xs">
            {reviewSlug && (
              <Link href={`/reviews/${reviewSlug}/`} className="inline-flex items-center gap-1 text-signal-400 hover:text-signal-300 no-underline transition-colors">
                <ArrowRight size={12} /> Read review
              </Link>
            )}
            {pricingSlug && (
              <Link href={`/pricing/${pricingSlug}/`} className="inline-flex items-center gap-1 text-signal-400 hover:text-signal-300 no-underline transition-colors">
                <ArrowRight size={12} /> See pricing
              </Link>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="shrink-0">
        <CTAButton
          href={affiliateUrl}
          label={`Try ${name}`}
          variant="primary"
          size="sm"
          icon={<ArrowRight size={14} />}
        />
      </div>
    </motion.div>
  );
}
