'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, TrendingDown } from 'lucide-react';
import type { ToolSummary } from '@/lib/tool-summary';

interface CostCalculatorProps {
  tools: ToolSummary[];
}

const CATEGORY_LABELS: Record<string, string> = {
  'ai-video-audio': 'AI Video & Audio',
  'ai-marketing-seo': 'AI Marketing & SEO',
  'ai-content-productivity': 'AI Content & Productivity',
};

function labelFor(cat: string): string {
  return CATEGORY_LABELS[cat] ?? 'Other AI Tools';
}

export default function CostCalculator({ tools }: CostCalculatorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const grouped = useMemo(() => {
    const m = new Map<string, ToolSummary[]>();
    for (const t of tools) {
      const k = labelFor(t.category);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(t);
    }
    return Array.from(m.entries());
  }, [tools]);

  const chosen = tools.filter((t) => selected.has(t.slug));
  const monthly = chosen.reduce((sum, t) => sum + t.minPrice, 0);
  const annual = monthly * 12;

  // For each selected tool, suggest a cheaper commissionable alternative in the same category.
  const swaps = chosen
    .map((t) => {
      const alt = tools
        .filter((o) => o.category === t.category && o.slug !== t.slug && o.isAffiliate && o.minPrice < t.minPrice && o.minPrice > 0)
        .sort((a, b) => a.minPrice - b.minPrice)[0];
      return alt ? { from: t, to: alt, save: t.minPrice - alt.minPrice } : null;
    })
    .filter((s): s is { from: ToolSummary; to: ToolSummary; save: number } => Boolean(s));

  function toggle(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Tool checklist */}
      <div className="space-y-6 mb-8">
        {grouped.map(([cat, list]) => (
          <div key={cat}>
            <h2 className="text-sm font-semibold text-signal-400 uppercase tracking-wider mb-3 font-heading">{cat}</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {list.map((t) => (
                <label
                  key={t.slug}
                  className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-sm cursor-pointer transition-all ${
                    selected.has(t.slug)
                      ? 'border-signal-500/60 bg-signal-500/10 text-void-50'
                      : 'border-void-700/50 bg-void-900/40 text-void-200 hover:border-signal-500/30'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={selected.has(t.slug)}
                      onChange={() => toggle(t.slug)}
                      className="accent-signal-500"
                    />
                    <span className="font-medium truncate">{t.tool}</span>
                  </span>
                  <span className="text-xs text-void-400 shrink-0">{t.minPrice > 0 ? `$${t.minPrice}/mo` : 'Free'}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="rounded-2xl border border-signal-500/25 bg-void-900 p-6 sm:p-8 mb-6" style={{ boxShadow: '0 0 32px rgba(10,209,200,0.06)' }}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-signal-400 uppercase tracking-wider">Your stack ({chosen.length} {chosen.length === 1 ? 'tool' : 'tools'})</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-void-50">${monthly}</span>
              <span className="text-void-500">/month</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-void-500 uppercase tracking-wider">Per year</span>
            <div className="text-2xl font-bold text-void-200">${annual.toLocaleString()}</div>
          </div>
        </div>
        {chosen.length === 0 && (
          <p className="mt-3 text-sm text-void-500">Tick a few tools above to add up your monthly cost.</p>
        )}
      </div>

      {/* Money-saving swaps */}
      {swaps.length > 0 && (
        <div className="rounded-xl border border-void-700/50 bg-void-900/40 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown size={16} className="text-signal-400" />
            <h2 className="text-sm font-semibold text-signal-400 uppercase tracking-wider font-heading">Cheaper tested alternatives</h2>
          </div>
          <div className="space-y-4">
            {swaps.map(({ from, to, save }) => (
              <div key={to.slug} className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
                <span className="text-void-400">Swap <span className="text-void-200 font-medium">{from.tool}</span> →</span>
                <span className="inline-flex items-center gap-1 font-semibold text-void-50">
                  {to.tool}
                  <span className="inline-flex items-center gap-1 text-amber-300/90 text-xs"><Star size={10} className="fill-amber-300/90" />{to.rating.toFixed(1)}</span>
                </span>
                <span className="text-signal-400 font-semibold">save ~${save}/mo</span>
                <a href={to.affiliateUrl} target="_blank" rel="nofollow sponsored noopener" className="inline-flex items-center gap-1 text-signal-400 hover:text-signal-300 text-xs no-underline">
                  Try it <ArrowRight size={11} />
                </a>
                <Link href={`/reviews/${to.slug}/`} className="text-void-400 hover:text-signal-400 text-xs no-underline">review</Link>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[10px] text-void-600">Suggested alternatives are tools we&rsquo;ve tested and rate. &ldquo;Try&rdquo; links may be affiliate links.</p>
        </div>
      )}

      {chosen.length > 0 && swaps.length === 0 && (
        <p className="text-center text-sm text-void-500">
          No cheaper tested swap for your picks — not sure where to start?{' '}
          <Link href="/finder" className="text-signal-400 hover:text-signal-300 no-underline">Try the AI Tool Finder →</Link>
        </p>
      )}
    </div>
  );
}
