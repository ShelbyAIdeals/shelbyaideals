'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n/context';

interface DealOfTheWeekProps {
  toolName: string;
  deal: string;
  reviewSlug: string;
  affiliateUrl: string;
}

export default function DealOfTheWeek({ toolName, deal, reviewSlug, affiliateUrl }: DealOfTheWeekProps) {
  const { t } = useTranslation();
  return (
    <div className="relative overflow-hidden card-featured p-[1px] rounded-xl">
      {/* Animated shimmer border overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.3) 25%, rgba(251,191,36,0.5) 50%, rgba(245,158,11,0.3) 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s ease-in-out infinite',
          maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          borderRadius: 'inherit',
        }}
      />

      {/* Inner content */}
      <div className="relative bg-void-900 rounded-xl px-6 py-5 sm:px-8 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* Left: badge */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="badge-ember gap-1.5">
              <Sparkles size={13} />
              {t('common.deal_of_the_week', 'Deal of the Week')}
            </span>
          </div>

          {/* Center: tool name + deal text */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-heading font-bold text-void-50 truncate">
              {toolName}
            </h3>
            <p className="text-sm text-void-300 truncate">
              {deal}
            </p>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href={`/reviews/${reviewSlug}`}
              className="btn-ghost text-sm !px-4 !py-2 no-underline"
            >
              {t('common.read_review', 'Read Review')}
            </Link>
            <a
              href={affiliateUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="btn-accent text-sm !py-2.5 !px-5 gap-1.5"
            >
              {t('common.claim_deal', 'Start Free Trial')} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
