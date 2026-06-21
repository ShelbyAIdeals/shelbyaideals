import { Zap } from 'lucide-react';

interface KeyTakeawayProps {
  /** Optional one-sentence lead answer shown above the bullets. */
  summary?: string;
  /** Bullet points — the citable, extractable takeaways. */
  points?: string[];
  /** Box heading. Defaults to "Key Takeaways". */
  heading?: string;
}

/**
 * Server-rendered TL;DR / Key Takeaways box.
 * Placed at the TOP of guides & comparisons so AI engines (and skim readers)
 * extract an answer-first summary. Renders nothing if there's no content.
 */
export default function KeyTakeaway({ summary, points = [], heading = 'Key Takeaways' }: KeyTakeawayProps) {
  const cleanPoints = points.filter((p) => p && p.trim().length > 0);
  if (!summary && cleanPoints.length === 0) return null;

  return (
    <aside
      className="mb-8 rounded-xl border border-signal-500/25 bg-void-900 p-5 sm:p-6"
      style={{ boxShadow: '0 0 24px rgba(10,209,200,0.05)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Zap size={16} className="text-signal-400 shrink-0" aria-hidden="true" />
        <h2 className="text-sm font-heading font-bold uppercase tracking-wider text-signal-400 m-0">
          {heading}
        </h2>
      </div>

      {summary && (
        <p className="text-sm sm:text-[0.95rem] text-void-200 leading-relaxed mb-3">{summary}</p>
      )}

      {cleanPoints.length > 0 && (
        <ul className="space-y-2 m-0 list-none p-0">
          {cleanPoints.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm text-void-300 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal-500" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
