import { ArrowRight } from 'lucide-react';
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
}

export default function ToolCard({
  rank,
  name,
  tagline,
  rating,
  pricing,
  bestFor,
  affiliateUrl,
}: ToolCardProps) {
  return (
    <div className="card group relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
      {/* Rank badge */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500 text-lg font-extrabold text-white shadow-[0_0_15px_rgba(119,126,73,0.4)]">
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

          <span className="rounded-full bg-accent-500/15 border border-accent-500/20 px-3 py-0.5 text-xs font-medium text-accent-400">
            Best for: {bestFor}
          </span>
        </div>
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
    </div>
  );
}
