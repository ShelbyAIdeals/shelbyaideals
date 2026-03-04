import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
}: ReviewCardProps) {
  return (
    <article className="card group overflow-hidden flex flex-col hover:-translate-y-1">
      {/* Featured image */}
      {featuredImage && (
        <div className="aspect-video bg-void-800 overflow-hidden">
          <img
            src={featuredImage}
            alt={`${tool} review`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Top row: tool badge + rating */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="badge-accent">{tool}</span>
          <StarRating rating={rating} size="sm" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-heading font-bold text-void-100 leading-snug mb-2 group-hover:text-accent-400 transition-colors">
          <Link
            href={`/reviews/${slug}`}
            className="no-underline text-inherit"
          >
            {title}
          </Link>
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
        <Link
          href={`/reviews/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400 hover:text-accent-300 no-underline group/link"
        >
          Read Review
          <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
