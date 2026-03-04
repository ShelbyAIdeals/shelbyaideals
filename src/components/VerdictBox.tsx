import { Award } from 'lucide-react';
import StarRating from './StarRating';
import CTAButton from './CTAButton';

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
  return (
    <div className="verdict-box">
      <div className="mb-4 flex items-center gap-2 text-accent-400">
        <Award size={22} className="text-accent-500" />
        <h3 className="text-lg font-heading font-bold">Final Verdict &mdash; {toolName}</h3>
      </div>

      <div className="mb-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-2xl font-extrabold text-void-950">
            {(Number(rating) || 0).toFixed(1)}
          </span>
          <StarRating rating={rating} size="md" />
        </div>
      </div>

      <p className="mb-3 text-void-300 leading-relaxed">{verdict}</p>

      <p className="mb-6 text-sm text-void-400">
        <span className="font-semibold text-void-200">Best for:</span> {bestFor}
      </p>

      <CTAButton
        href={affiliateUrl}
        label={affiliateLabel}
        variant="primary"
        size="lg"
      />
    </div>
  );
}
