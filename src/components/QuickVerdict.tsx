import { Star, Users, DollarSign, ArrowRight } from 'lucide-react';
import CTAButton from './CTAButton';

interface QuickVerdictProps {
  rating: number;
  bestFor: string;
  pricing: string;
  affiliateUrl: string;
  affiliateLabel: string;
}

export default function QuickVerdict({
  rating,
  bestFor,
  pricing,
  affiliateUrl,
  affiliateLabel,
}: QuickVerdictProps) {
  return (
    <div
      className="my-6 rounded-xl border border-accent-500/15 bg-void-900/60 backdrop-blur-sm p-5"
      style={{ boxShadow: '0 0 20px rgba(6,182,212,0.05)' }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Info pills */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500 text-sm font-bold text-void-950">
              {(Number(rating) || 0).toFixed(1)}
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-void-500">Rating /5</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < Math.round(Number(rating) || 0)
                        ? 'fill-accent-400 text-accent-400'
                        : 'fill-void-700 text-void-700'
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <span className="hidden h-8 w-px bg-void-700 md:block" />

          {/* Best for */}
          <div className="flex items-center gap-2">
            <Users size={16} className="text-accent-500" />
            <div className="flex flex-col">
              <span className="text-xs text-void-500">Best for</span>
              <span className="text-sm font-medium text-void-200">
                {bestFor}
              </span>
            </div>
          </div>

          {/* Divider */}
          <span className="hidden h-8 w-px bg-void-700 md:block" />

          {/* Pricing */}
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-accent-500" />
            <div className="flex flex-col">
              <span className="text-xs text-void-500">Pricing</span>
              <span className="text-sm font-medium text-void-200">
                {pricing}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="shrink-0">
          <CTAButton
            href={affiliateUrl}
            label={affiliateLabel}
            variant="primary"
            size="md"
            icon={<ArrowRight size={16} />}
          />
        </div>
      </div>
    </div>
  );
}
