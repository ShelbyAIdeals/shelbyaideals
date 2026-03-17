'use client';

import { Users, DollarSign, Calendar, ArrowRight } from 'lucide-react';
import StarRating from './StarRating';
import { useTranslation } from '@/i18n/context';

interface QuickVerdictProps {
  rating: number;
  bestFor: string;
  pricing: string;
  affiliateUrl: string;
  affiliateLabel: string;
  lastTested?: string;
  lastUpdated?: string;
}

export default function QuickVerdict({
  rating,
  bestFor,
  pricing,
  affiliateUrl,
  affiliateLabel,
  lastTested,
  lastUpdated,
}: QuickVerdictProps) {
  const { t } = useTranslation();
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const percentage = (safeRating / 5) * 100;

  // SVG ring parameters
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="rounded-xl border border-void-700/60 bg-void-900 p-6"
      style={{ boxShadow: '0 0 24px rgba(10,209,200,0.04)' }}
    >
      {/* Rating circle */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="relative w-20 h-20">
          <svg
            className="w-20 h-20 -rotate-90"
            viewBox="0 0 80 80"
            aria-hidden="true"
          >
            {/* Track */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="var(--color-void-700)"
              strokeWidth="6"
            />
            {/* Filled ring */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="var(--color-signal-500)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          {/* Rating number centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono font-bold text-2xl text-void-50">
              {safeRating.toFixed(1)}
            </span>
          </div>
        </div>

        <StarRating rating={safeRating} size="sm" />
      </div>

      {/* Info rows */}
      <div className="space-y-4 mb-6">
        {/* Best For */}
        <div className="flex items-start gap-3">
          <Users size={16} className="mt-0.5 shrink-0 text-signal-500" />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-void-500 uppercase tracking-wider">
              {t('article.best_for', 'Best For')}
            </span>
            <span className="text-sm text-void-200">{bestFor}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-start gap-3">
          <DollarSign size={16} className="mt-0.5 shrink-0 text-signal-500" />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-void-500 uppercase tracking-wider">
              {t('article.pricing', 'Pricing')}
            </span>
            <span className="text-sm text-void-200">{pricing}</span>
          </div>
        </div>

        {/* Last Tested */}
        {lastTested && (
          <div className="flex items-start gap-3">
            <Calendar size={16} className="mt-0.5 shrink-0 text-signal-500" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-void-500 uppercase tracking-wider">
                {t('article.last_tested', 'Last Tested')}
              </span>
              <span className="text-sm text-void-200">{lastTested}</span>
            </div>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <a
        href={affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="btn-accent w-full text-center gap-2"
      >
        <span>{affiliateLabel}</span>
        <ArrowRight size={16} />
      </a>

      {/* Trust signal */}
      {lastUpdated && (
        <p className="mt-3 text-center text-xs text-void-500">
          {t('article.updated', 'Updated')} {lastUpdated}
        </p>
      )}
    </div>
  );
}
