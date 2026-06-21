'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, RefreshCw } from 'lucide-react';

export interface FinderTool {
  name: string;
  pricing: string;
  minPrice: number;
  standoutFeature: string;
  reviewSlug?: string;
  affiliateUrl: string;
  rating?: number;
}

export interface FinderGoal {
  id: string;
  label: string;
  emoji: string;
  useCaseSlug: string;
  tools: FinderTool[];
}

interface ToolFinderProps {
  goals: FinderGoal[];
}

type Budget = { id: string; label: string; max: number };

const BUDGETS: Budget[] = [
  { id: 'free', label: 'Free / freemium', max: 0 },
  { id: 'low', label: 'Under $30/mo', max: 30 },
  { id: 'any', label: 'Best regardless of price', max: Number.POSITIVE_INFINITY },
];

export default function ToolFinder({ goals }: ToolFinderProps) {
  const [goalId, setGoalId] = useState<string | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);

  const goal = goals.find((g) => g.id === goalId) ?? null;

  function reset() {
    setGoalId(null);
    setBudget(null);
  }

  // Recommendation: top-ranked tool within budget; fall back to overall top pick.
  let pick: FinderTool | null = null;
  let runnersUp: FinderTool[] = [];
  let overBudgetFallback = false;
  if (goal && budget) {
    const inBudget = goal.tools.filter((t) => t.minPrice <= budget.max);
    const ranked = inBudget.length > 0 ? inBudget : goal.tools;
    overBudgetFallback = inBudget.length === 0;
    pick = ranked[0] ?? null;
    runnersUp = ranked.slice(1, 3);
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step 1 — Goal */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-signal-400 uppercase tracking-wider mb-4 font-heading">
          1. What do you want to do?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {goals.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGoalId(g.id)}
              aria-pressed={goalId === g.id}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                goalId === g.id
                  ? 'border-signal-500/60 bg-signal-500/10 text-void-50'
                  : 'border-void-700/50 bg-void-900/40 text-void-200 hover:border-signal-500/30'
              }`}
            >
              <span className="text-lg" aria-hidden="true">{g.emoji}</span>
              <span className="font-medium">{g.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2 — Budget */}
      {goal && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-signal-400 uppercase tracking-wider mb-4 font-heading">
            2. What's your budget?
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {BUDGETS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBudget(b)}
                aria-pressed={budget?.id === b.id}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  budget?.id === b.id
                    ? 'border-signal-500/60 bg-signal-500/10 text-void-50'
                    : 'border-void-700/50 bg-void-900/40 text-void-200 hover:border-signal-500/30'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Result */}
      {pick && goal && budget && (
        <section className="rounded-2xl border border-signal-500/25 bg-void-900 p-6 sm:p-8" style={{ boxShadow: '0 0 32px rgba(10,209,200,0.06)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-signal-400 uppercase tracking-wider">Your match</span>
            <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs text-void-400 hover:text-signal-400 transition-colors">
              <RefreshCw size={12} /> Start over
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h3 className="text-2xl font-bold text-void-50 font-heading">{pick.name}</h3>
            {pick.rating && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 border border-amber-400/25 px-3 py-0.5 text-xs font-semibold text-amber-300">
                <Star size={11} className="fill-amber-300" /> {pick.rating.toFixed(1)}/5
              </span>
            )}
          </div>

          <p className="text-sm text-void-300 mb-1">
            <span className="text-void-500">Best for:</span> {pick.standoutFeature}
          </p>
          <p className="text-sm text-void-300 mb-4">
            <span className="text-void-500">Pricing:</span> {pick.pricing}
          </p>

          {overBudgetFallback && (
            <p className="text-xs text-amber-300/90 mb-4">
              Nothing in that budget for this goal — here's our top overall pick instead.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={pick.affiliateUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-5 py-2.5 text-sm font-semibold text-void-950 no-underline hover:bg-signal-400 transition-colors"
            >
              Try {pick.name} <ArrowRight size={14} />
            </a>
            {pick.reviewSlug && (
              <Link
                href={`/reviews/${pick.reviewSlug}/`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline transition-colors"
              >
                Read our review <ArrowRight size={13} />
              </Link>
            )}
            <Link
              href={`/best-for/${goal.useCaseSlug}/`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-void-400 hover:text-signal-400 no-underline transition-colors"
            >
              See all picks
            </Link>
          </div>

          {runnersUp.length > 0 && (
            <div className="mt-6 pt-5 border-t border-void-800/60">
              <span className="text-xs font-semibold text-void-500 uppercase tracking-wider">Also worth a look</span>
              <div className="mt-3 flex flex-col gap-2">
                {runnersUp.map((t) => (
                  <div key={t.name} className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="font-semibold text-void-200 min-w-[7rem]">{t.name}</span>
                    {t.rating && <span className="text-amber-300/90 text-xs">{t.rating.toFixed(1)}/5</span>}
                    <span className="text-void-500 text-xs">{t.pricing}</span>
                    {t.reviewSlug && (
                      <Link href={`/reviews/${t.reviewSlug}/`} className="text-signal-400 hover:text-signal-300 text-xs no-underline">
                        Review
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="mt-5 text-[10px] text-void-600">
            Recommendations from our hands-on testing. &ldquo;Try&rdquo; links are affiliate links — they never affect our rankings.
          </p>
        </section>
      )}
    </div>
  );
}
