import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

interface DealOfTheWeekProps {
  toolName: string;
  deal: string;
  reviewSlug: string;
  affiliateUrl: string;
}

export default function DealOfTheWeek({ toolName, deal, reviewSlug, affiliateUrl }: DealOfTheWeekProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-accent-500/30 bg-gradient-to-r from-void-900 via-void-900 to-accent-950/30 p-6 sm:p-8">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent-500 flex items-center justify-center shrink-0">
            <Sparkles size={20} className="text-void-950" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-accent-400">
              Deal of the Week
            </span>
            <h3 className="text-lg font-heading font-bold text-white">
              {toolName} — {deal}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:ml-auto">
          <Link
            href={`/reviews/${reviewSlug}`}
            className="text-sm font-semibold text-void-300 hover:text-white no-underline transition-colors"
          >
            Read Review
          </Link>
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="btn-primary text-sm py-2.5 px-5 gap-1.5"
          >
            Claim Deal <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
