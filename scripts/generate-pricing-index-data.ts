/**
 * Emits the AI Pricing Index as machine-readable JSON and CSV.
 * Run before `next build` so /data/ai-pricing-index.{json,csv} exist in the
 * static export. The files are generated from the same pricing-index module
 * the page renders from, so the downloadable data can never disagree with the
 * published table.
 */
import fs from 'fs';
import path from 'path';
import { getPricingIndex } from '../src/lib/pricing-index';

const outputDir = path.join(process.cwd(), 'public/data');
fs.mkdirSync(outputDir, { recursive: true });

const idx = getPricingIndex();

const json = {
  name: 'ShelbyAI — AI Tool Pricing Index',
  url: 'https://www.shelby-ai.com/ai-pricing-index/',
  license: 'CC BY 4.0 — credit "ShelbyAI — AI Tool Pricing Index" with a link',
  generated: new Date().toISOString().split('T')[0],
  newestDataDate: idx.newestDataDate,
  notes:
    'entryPaidPrice and popularPrice are per month in the currency field. ' +
    'pricingVerified is the date the plans were checked against the vendor pricing page (pricingSourceUrl); ' +
    'rows without it carry only our guide’s lastUpdated date and should be treated as indicative.',
  stats: {
    toolCount: idx.toolCount,
    planCount: idx.planCount,
    medianEntryPriceUsd: idx.medianEntryPrice,
    averageEntryPriceUsd: idx.averageEntryPrice,
    medianPopularPriceUsd: idx.medianPopularPrice,
    freePlanSharePct: idx.freePlanShare,
    freeTrialSharePct: idx.freeTrialShare,
    customTierSharePct: idx.customTierShare,
  },
  tools: idx.rows,
};

fs.writeFileSync(path.join(outputDir, 'ai-pricing-index.json'), JSON.stringify(json, null, 2));

const csvEscape = (v: unknown): string => {
  const s = v === null || v === undefined ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const header = [
  'tool',
  'slug',
  'category',
  'currency',
  'entry_paid_price_per_month',
  'popular_plan_price_per_month',
  'has_free_plan',
  'has_free_trial',
  'has_custom_tier',
  'plan_count',
  'pricing_verified',
  'pricing_source_url',
  'last_updated',
  'needs_verification',
];

const csvRows = idx.rows.map((r) =>
  [
    r.tool,
    r.slug,
    r.category,
    r.currency,
    r.entryPaidPrice,
    r.popularPrice,
    r.hasFreePlan,
    r.hasFreeTrial,
    r.hasCustomTier,
    r.planCount,
    r.pricingVerified,
    r.pricingSourceUrl,
    r.lastUpdated,
    r.needsVerification,
  ]
    .map(csvEscape)
    .join(','),
);

fs.writeFileSync(
  path.join(outputDir, 'ai-pricing-index.csv'),
  [header.join(','), ...csvRows].join('\n') + '\n',
);

console.log(`Generated public/data/ai-pricing-index.{json,csv} (${idx.rows.length} tools)`);
