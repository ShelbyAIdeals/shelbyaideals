'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, X, Plus, ArrowRight, Check, Minus } from 'lucide-react';
import type { ToolSummary } from '@/lib/tool-summary';

interface ToolCompareProps {
  tools: ToolSummary[];
}

const MAX = 3;

export default function ToolCompare({ tools }: ToolCompareProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);

  const chosen = selected
    .map((s) => tools.find((t) => t.slug === s))
    .filter((t): t is ToolSummary => Boolean(t));
  const available = tools.filter((t) => !selected.includes(t.slug));

  function add(slug: string) {
    setSelected((prev) => (prev.length < MAX ? [...prev, slug] : prev));
    setAdding(false);
  }
  function remove(slug: string) {
    setSelected((prev) => prev.filter((s) => s !== slug));
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Picker */}
      {selected.length < MAX && (
        <div className="mb-8">
          {!adding ? (
            <button
              type="button"
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-signal-500/40 bg-signal-500/10 px-5 py-2.5 text-sm font-semibold text-signal-300 hover:bg-signal-500/15 transition-colors"
            >
              <Plus size={16} /> Add a tool to compare {selected.length > 0 && `(${selected.length}/${MAX})`}
            </button>
          ) : (
            <div className="rounded-xl border border-void-700/50 bg-void-900 p-3 max-h-72 overflow-y-auto">
              <div className="grid gap-1.5 sm:grid-cols-2">
                {available.map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => add(t.slug)}
                    className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm text-void-200 hover:bg-signal-500/10 transition-colors"
                  >
                    <span className="font-medium">{t.tool}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-amber-300/90">
                      <Star size={10} className="fill-amber-300/90" /> {t.rating.toFixed(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {chosen.length === 0 ? (
        <p className="text-center text-sm text-void-500">Add at least 2 tools to see them side by side.</p>
      ) : (
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${chosen.length}, minmax(0,1fr))` }}>
          {chosen.map((t) => (
            <div key={t.slug} className="rounded-xl border border-void-700/50 bg-void-900/40 p-5 flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-3">
                <h2 className="text-lg font-bold text-void-50 font-heading">{t.tool}</h2>
                <button type="button" onClick={() => remove(t.slug)} aria-label={`Remove ${t.tool}`} className="text-void-500 hover:text-ember-400 transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 border border-amber-400/25 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                  <Star size={10} className="fill-amber-300" /> {t.rating.toFixed(1)}/5
                </span>
                {t.isAffiliate && (
                  <span className="rounded-full bg-signal-500/10 border border-signal-500/20 px-2.5 py-0.5 text-[10px] font-medium text-signal-400 uppercase tracking-wide">Tested</span>
                )}
              </div>

              <p className="text-sm text-void-300 mb-4">
                <span className="text-void-500">From </span>
                <span className="font-semibold text-void-100">{t.priceLabel}</span>
              </p>

              {t.pros.length > 0 && (
                <ul className="space-y-1.5 mb-3">
                  {t.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-void-300">
                      <Check size={13} className="text-signal-500 mt-0.5 shrink-0" /> <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
              {t.cons.length > 0 && (
                <ul className="space-y-1.5 mb-4">
                  {t.cons.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-xs text-void-400">
                      <Minus size={13} className="text-ember-400 mt-0.5 shrink-0" /> <span>{c}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-col gap-2 pt-3 border-t border-void-800/60">
                <a
                  href={t.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-signal-500 px-3 py-2 text-xs font-semibold text-void-950 no-underline hover:bg-signal-400 transition-colors"
                >
                  {t.affiliateLabel} <ArrowRight size={12} />
                </a>
                <Link href={`/reviews/${t.slug}/`} className="text-center text-xs font-semibold text-signal-400 hover:text-signal-300 no-underline">
                  Read review
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {chosen.length > 0 && (
        <p className="mt-6 text-center text-[10px] text-void-600">
          Ratings from our hands-on testing. &ldquo;Try&rdquo; links may be affiliate links — they never affect our ratings.
        </p>
      )}
    </div>
  );
}
