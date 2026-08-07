import { Trophy } from 'lucide-react';
import CTAButton from './CTAButton';

interface WinnerBoxProps {
  toolName: string;
  scenario: string;
  reason: string;
  affiliateUrl: string;
}

export default function WinnerBox({
  toolName,
  scenario,
  reason,
  affiliateUrl,
}: WinnerBoxProps) {
  return (
    <div
      className="my-8 rounded-xl border border-void-700/50 border-l-4 border-l-ember-500 bg-void-900 p-6"
      style={{ boxShadow: '0 0 20px color-mix(in srgb, var(--color-ember-500) 10%, transparent)' }}
    >
      <div className="mb-3 flex items-center gap-2">
        <Trophy size={20} className="text-ember-400" />
        <span className="text-sm font-semibold uppercase tracking-wide text-ember-400">
          Our Pick for {scenario}
        </span>
      </div>

      {/* Was an h4 sitting directly under the page's h2s, skipping h3. */}
      <h3 className="mb-2 text-2xl font-extrabold text-void-50">
        {toolName}
      </h3>

      <p className="mb-5 text-void-400 leading-relaxed">{reason}</p>

      <CTAButton
        href={affiliateUrl}
        label={`Try ${toolName}`}
        variant="primary"
        size="md"
      />
    </div>
  );
}
