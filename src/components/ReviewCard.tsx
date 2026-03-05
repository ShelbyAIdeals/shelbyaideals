'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import StarRating from './StarRating';

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
}

export default function ReviewCard({
  title,
  slug,
  tool,
  rating,
  excerpt,
  bestFor,
  featuredImage,
  toolSlug,
}: ReviewCardProps) {
  const imageSlug = toolSlug || slug.replace('-review', '');
  const imageSrc = featuredImage || `/images/tools/${imageSlug}/thumb.webp`;
  const fallbackSrc = '/images/placeholders/tool-thumb.svg';

  return (
    <Link href={`/reviews/${slug}`} className="no-underline block">
      <motion.article
        className="card group overflow-hidden flex flex-col cursor-pointer h-full"
        whileHover={{ y: -4, boxShadow: '0 0 32px rgba(6,182,212,0.12)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        {/* Tool image */}
        <div className="aspect-video bg-void-800 overflow-hidden">
          <img
            src={imageSrc}
            alt={`${tool} review`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackSrc; }}
          />
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-1">
          {/* Top row: tool badge + rating */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="badge-accent">{tool}</span>
            <StarRating rating={rating} size="sm" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-heading font-bold text-void-100 leading-snug mb-2 group-hover:text-accent-400 transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-void-400 leading-relaxed mb-4 flex-1">
            {excerpt}
          </p>

          {/* Best for */}
          <p className="text-xs text-void-500 mb-4">
            <span className="font-semibold text-void-300">Best for:</span> {bestFor}
          </p>

          {/* Read review link */}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-void-100 group-hover:text-white">
            Read Review
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
