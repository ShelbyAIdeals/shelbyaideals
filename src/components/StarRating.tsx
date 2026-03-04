'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0-10 scale
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { icon: 14, text: 'text-xs', gap: 'gap-0.5' },
  md: { icon: 18, text: 'text-sm', gap: 'gap-1' },
  lg: { icon: 22, text: 'text-base', gap: 'gap-1' },
} as const;

export default function StarRating({ rating, size = 'md' }: StarRatingProps) {
  const clamped = Math.max(0, Math.min(10, rating));
  const outOfFive = clamped / 2;
  const fullStars = Math.floor(outOfFive);
  const hasHalf = outOfFive - fullStars >= 0.25 && outOfFive - fullStars < 0.75;
  const extraFull = outOfFive - fullStars >= 0.75 ? 1 : 0;
  const filledCount = fullStars + extraFull;
  const emptyStars = 5 - filledCount - (hasHalf ? 1 : 0);

  const { icon, text, gap } = sizeMap[size];

  return (
    <div className={`inline-flex items-center ${gap}`}>
      <div className={`flex items-center ${gap}`} aria-label={`Rating: ${clamped} out of 10`}>
        {/* Filled stars */}
        {Array.from({ length: filledCount }).map((_, i) => (
          <Star
            key={`filled-${i}`}
            size={icon}
            className="text-accent-400 fill-accent-400"
          />
        ))}

        {/* Half star */}
        {hasHalf && (
          <span className="relative inline-flex" key="half">
            <Star size={icon} className="text-void-700 fill-void-700" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star size={icon} className="text-accent-400 fill-accent-400" />
            </span>
          </span>
        )}

        {/* Empty stars */}
        {Array.from({ length: Math.max(0, emptyStars) }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={icon}
            className="text-void-700 fill-void-700"
          />
        ))}
      </div>
      <span className={`${text} font-semibold text-void-300 ml-1.5`}>
        {clamped.toFixed(1)}
      </span>
    </div>
  );
}
