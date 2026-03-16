'use client';

import { Star } from 'lucide-react';

interface RatingDistributionProps {
  reviews: { rating: number }[];
  averageRating: number;
}

export default function RatingDistribution({ reviews, averageRating }: RatingDistributionProps) {
  const total = reviews.length;

  // Count reviews per star level
  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const review of reviews) {
    const star = Math.round(review.rating);
    if (star >= 1 && star <= 5) counts[star]++;
  }

  return (
    <div className="flex items-start gap-6">
      {/* Average score */}
      <div className="text-center shrink-0">
        <div className="text-4xl font-heading font-bold text-void-50">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex items-center gap-0.5 mt-1 justify-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              className={star <= Math.round(averageRating) ? 'text-amber-400 fill-amber-400' : 'text-void-600'}
            />
          ))}
        </div>
        <div className="text-xs text-void-500 mt-1">
          {total} {total === 1 ? 'review' : 'reviews'}
        </div>
      </div>

      {/* Distribution bars */}
      <div className="flex-1 space-y-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = counts[star];
          const percentage = total > 0 ? (count / total) * 100 : 0;

          return (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-void-400 w-4 text-right font-medium">{star}</span>
              <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
              <div className="flex-1 h-2 bg-void-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs text-void-500 w-6 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
