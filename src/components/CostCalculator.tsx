'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, TrendingDown, Wallet, Users, AlertTriangle } from 'lucide-react';
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

/**
 * Budget presets answer the conversational buying prompt directly:
 * "I have $50/month — which AI tools should I pay for?"
 */
const BUDGET_PRESETS = [
  { label: 'Free only', value: 0 },
  { label: '$20/mo', value: 20 },
  { label: '$50/mo', value: 50 },
  { label: '$100/mo', value: 100 },
  { label: '$200/mo', value: 200 },
];

/**
 * Role presets select a small starter stack from tools we have actually
 * reviewed (slugs are review slugs; unknown slugs are ignored at runtime so a
 * renamed review can never break the page). 3-5 tools per role, deliberately —
 * a preset that ticks 10 boxes is a price list, not a recommendation.
 */
const ROLE_PRESETS: { label: string; slugs: string[] }[] = [
  { label: 'Content writer', slugs: ['chatgpt-review', 'grammarly-review', 'frase-review'] },
  { label: 'Marketer', slugs: ['jasper-ai-review', 'surfer-seo-review', 'make-review'] },
  { label: 'Freelancer', slugs: ['chatgpt-review', 'grammarly-review', 'otter-ai-review'] },
  { label: 'Solopreneur', slugs: ['chatgpt-review', 'make-review', 'mangools-review'] },
  { label: 'YouTuber', slugs: ['descript-review', 'elevenlabs-review', 'pictory-review'] },
  { label: 'Podcaster', slugs: ['descript-review', 'otter-ai-review', 'mubert-review'] },
  { label: 'Ecommerce seller', slugs: ['chatgpt-review', 'pictory-review', 'chatbase-review'] },
  { label: 'Developer', slugs: ['claude-ai-review', 'chatgpt-review', 'perplexity-review'] },
  { label: 'Small agency', slugs: ['semrush-review', 'jasper-ai-review', 'otter-ai-review', 'make-review'] },
];

export default function CostCalculator({ tools }: CostCalculatorProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [budget, setBudget] = useState<number | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);

  const availableSlugs = useMemo(() => new Set(tools.map((t) => t.slug)), [tools]);

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
  const overBudget = budget !== null && monthly > budget;

  // Same-category pile-ups are the most common stack mistake: two or three
  // writing subscriptions doing one job. Flag, don't lecture.
  const overlaps = useMemo(() => {
    const byCat = new Map<string, ToolSummary[]>();
    for (const t of chosen) {
      const k = labelFor(t.category);
      if (!byCat.has(k)) byCat.set(k, []);
      byCat.get(k)!.push(t);
    }
    return Array.from(byCat.entries()).filter(([, list]) => list.filter((t) => t.minPrice > 0).length >= 2);
  }, [chosen]);

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
    setActiveRole(null);
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }

  function applyRole(label: string, slugs: string[]) {
    setActiveRole(label);
    setSelected(new Set(slugs.filter((s) => availableSlugs.has(s))));
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Role presets */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Users size={15} className="text-signal-400" />
          <h2 className="text-sm font-semibold text-signal-400 uppercase tracking-wider font-heading">Start from your role</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {ROLE_PRESETS.map((r) => (
            <button
              key={r.label}
              type="button"
              onClick={() => applyRole(r.label, r.slugs)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeRole === r.label
                  ? 'border-signal-500/70 bg-signal-500/15 text-signal-300'
                  : 'border-void-700/60 bg-void-900/40 text-void-300 hover:border-signal-500/40'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget presets */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Wallet size={15} className="text-signal-400" />
          <h2 className="text-sm font-semibold text-signal-400 uppercase tracking-wider font-heading">Set a monthly budget</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {BUDGET_PRESETS.map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={() => setBudget(budget === b.value ? null : b.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                budget === b.value
                  ? 'border-signal-500/70 bg-signal-500/15 text-signal-300'
                  : 'border-void-700/60 bg-void-900/40 text-void-300 hover:border-signal-500/40'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

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
                  <span className={`text-xs shrink-0 ${t.minPrice === 0 ? 'text-success-400 font-semibold' : 'text-void-400'}`}>
                    {t.minPrice > 0 ? `$${t.minPrice}/mo` : 'Free plan'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="rounded-2xl border border-signal-500/25 bg-void-900 p-6 sm:p-8 mb-6" style={{ boxShadow: '0 0 32px color-mix(in srgb, var(--color-signal-500) 6%, transparent)' }}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-signal-400 uppercase tracking-wider">Your stack ({chosen.length} {chosen.length === 1 ? 'tool' : 'tools'})</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold ${overBudget ? 'text-ember-300' : 'text-void-50'}`}>${monthly}</span>
              <span className="text-void-500">/month</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-void-500 uppercase tracking-wider">Per year</span>
            <div className="text-2xl font-bold text-void-200">${annual.toLocaleString()}</div>
          </div>
        </div>
        {budget !== null && chosen.length > 0 && (
          <p className={`mt-3 text-sm ${overBudget ? 'text-ember-300' : 'text-success-400'}`}>
            {overBudget
              ? `$${monthly - budget} over your $${budget}/mo budget — check the swaps below or lean on the free plans marked above.`
              : budget === 0
                ? monthly === 0
                  ? 'All free — this stack costs nothing per month.'
                  : `This stack is not free — it costs $${monthly}/mo.`
                : `$${budget - monthly} left in your $${budget}/mo budget.`}
          </p>
        )}
        {chosen.length === 0 && (
          <p className="mt-3 text-sm text-void-500">Pick a role above or tick tools to add up your monthly cost.</p>
        )}
        <p className="mt-3 text-2xs text-void-500">
          Prices are each tool&rsquo;s cheapest paid plan from our pricing guides; per-tool verification dates are on the{' '}
          <Link href="/ai-pricing-index/" className="text-void-400 hover:text-signal-400 no-underline">AI Pricing Index</Link>.
        </p>
      </div>

      {/* Overlap warnings */}
      {overlaps.length > 0 && (
        <div className="rounded-xl border border-ember-400/25 bg-void-900/40 p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={15} className="text-ember-300" />
            <h2 className="text-sm font-semibold text-ember-300 uppercase tracking-wider font-heading">Possible overlap</h2>
          </div>
          {overlaps.map(([cat, list]) => (
            <p key={cat} className="text-sm text-void-300">
              You picked {list.length} paid tools in {cat} ({list.map((t) => t.tool).join(', ')}) — their features overlap
              heavily, and most stacks only need one.
            </p>
          ))}
        </div>
      )}

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
                  <span className="inline-flex items-center gap-1 text-ember-300/90 text-xs"><Star size={10} className="fill-ember-300/90" />{to.rating.toFixed(1)}</span>
                </span>
                <span className="text-signal-400 font-semibold">save ~${save}/mo</span>
                <a href={to.affiliateUrl} target="_blank" rel="nofollow sponsored noopener" className="inline-flex items-center gap-1 text-signal-400 hover:text-signal-300 text-xs no-underline">
                  Try it <ArrowRight size={11} />
                </a>
                <Link href={`/reviews/${to.slug}/`} className="text-void-400 hover:text-signal-400 text-xs no-underline">review</Link>
              </div>
            ))}
          </div>
          <p className="mt-4 text-2xs text-void-500">Suggested alternatives are tools we&rsquo;ve tested and rate. &ldquo;Try&rdquo; links may be affiliate links.</p>
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
