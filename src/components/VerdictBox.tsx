import { Trophy, ArrowRight } from 'lucide-react';
import StarRating from './StarRating';
import Link from 'next/link';

interface VerdictBoxProps {
  rating: number;
  verdict: string;
  bestFor: string;
  affiliateUrl: string;
  affiliateLabel: string;
  toolName: string;
}

export default function VerdictBox({
  rating,
  verdict,
  bestFor,
  affiliateUrl,
  affiliateLabel,
  toolName,
}: VerdictBoxProps) {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <div
      className="rounded-xl border border-iris-500/20 p-6 md:p-8"
      style={{
        background:
          'linear-gradient(to right, rgba(46,16,101,0.3), var(--color-void-900), rgba(46,16,101,0.2))',
      }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        {/* Left — rating */}
        <div className="flex flex-col items-center gap-2 shrink-0 md:pt-1">
          <span className="text-4xl font-mono font-bold text-signal-400">
            {safeRating.toFixed(1)}
          </span>
          <StarRating rating={safeRating} size="md" />
        </div>

        {/* Right — content */}
        <div className="flex-1 min-w-0">
          {/* Label */}
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={18} className="text-iris-400 shrink-0" />
            <span className="text-sm font-semibold uppercase tracking-wider text-iris-400">
              Our Verdict
            </span>
          </div>

          {/* Tool name */}
          <h3 className="text-xl font-heading font-bold text-void-50 mb-3">
            {toolName}
          </h3>

          {/* Verdict text */}
          <p className="text-void-300 leading-relaxed mb-2">{verdict}</p>

          {/* Best for */}
          <p className="text-sm text-void-400 mb-6">
            <span className="font-semibold text-void-200">Best for:</span>{' '}
            {bestFor}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="btn-accent gap-2"
            >
              <span>Try {toolName}</span>
              <ArrowRight size={16} />
            </a>

            <Link
              href="/reviews"
              className="btn-ghost gap-2"
            >
              <span>Read Alternatives</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
