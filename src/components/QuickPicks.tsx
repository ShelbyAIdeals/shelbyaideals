import Link from 'next/link';
import { ArrowRight, Star, Trophy } from 'lucide-react';

interface Pick {
  rank: number;
  name: string;
  rating: number;
  reason: string;
  affiliateUrl?: string;
  reviewSlug?: string;
}

export default function QuickPicks({
  title = 'Our Top Picks',
  picks,
}: {
  title?: string;
  picks: Pick[];
}) {
  if (picks.length === 0) return null;

  return (
    <div className="rounded-2xl border border-signal-500/20 bg-gradient-to-b from-signal-500/5 to-transparent p-6 sm:p-8 mb-10">
      <div className="flex items-center gap-2 mb-6">
        <Trophy size={20} className="text-signal-400" />
        <h2 className="text-lg font-bold text-void-50 font-heading">{title}</h2>
      </div>

      <div className="space-y-4">
        {picks.map((pick) => (
          <div
            key={pick.rank}
            className="flex items-center gap-4 p-4 rounded-xl bg-void-900/50 border border-void-700/40"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-signal-500/15 border border-signal-500/25 text-signal-400 font-bold text-sm shrink-0">
              #{pick.rank}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-void-50 text-sm">
                  {pick.name}
                </span>
                <span className="flex items-center gap-0.5 text-xs text-amber-400">
                  <Star size={11} fill="currentColor" />
                  {pick.rating}
                </span>
              </div>
              <p className="text-xs text-void-400 leading-relaxed">
                {pick.reason}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {pick.reviewSlug && (
                <Link
                  href={`/reviews/${pick.reviewSlug}`}
                  className="text-xs font-semibold text-signal-400 hover:text-signal-300 no-underline hidden sm:inline-flex items-center gap-1"
                >
                  Read Review <ArrowRight size={11} />
                </Link>
              )}
              {pick.affiliateUrl && (
                <a
                  href={pick.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-signal-500 text-void-950 hover:bg-signal-400 transition-colors no-underline"
                >
                  Try It
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
