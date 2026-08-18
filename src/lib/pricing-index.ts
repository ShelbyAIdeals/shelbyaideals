/**
 * AI Tool Pricing Index — original data study computed from pricing-data.ts.
 * Every number on /ai-pricing-index derives from the catalogued public plans,
 * so the page can never claim data we don't have.
 */

import { pricingData, type PricingPage } from './pricing-data';

export type IndexCategory =
  | 'AI Video'
  | 'AI Voice & Audio'
  | 'AI Writing & SEO'
  | 'AI Chat Assistants'
  | 'AI Image & Design'
  | 'AI Meetings'
  | 'AI Coding'
  | 'GEO & AI Visibility'
  | 'Productivity & Automation';

/** Explicit slug→category map — hand-classified, no fuzzy matching. */
const CATEGORY_BY_SLUG: Record<string, IndexCategory> = {
  pictory: 'AI Video',
  synthesia: 'AI Video',
  heygen: 'AI Video',
  creatify: 'AI Video',
  fliki: 'AI Video',
  'runway-ml': 'AI Video',
  descript: 'AI Video',
  elevenlabs: 'AI Voice & Audio',
  mubert: 'AI Voice & Audio',
  'otter-ai': 'AI Meetings',
  fathom: 'AI Meetings',
  fireflies: 'AI Meetings',
  cursor: 'AI Coding',
  otterly: 'GEO & AI Visibility',
  profound: 'GEO & AI Visibility',
  n8n: 'Productivity & Automation',
  gamma: 'AI Image & Design',
  'jasper-ai': 'AI Writing & SEO',
  'copy-ai': 'AI Writing & SEO',
  writesonic: 'AI Writing & SEO',
  rytr: 'AI Writing & SEO',
  grammarly: 'AI Writing & SEO',
  frase: 'AI Writing & SEO',
  'surfer-seo': 'AI Writing & SEO',
  semrush: 'AI Writing & SEO',
  mangools: 'AI Writing & SEO',
  scalenut: 'AI Writing & SEO',
  'easy-peasy-ai': 'AI Writing & SEO',
  chatgpt: 'AI Chat Assistants',
  'claude-ai': 'AI Chat Assistants',
  'google-gemini': 'AI Chat Assistants',
  grok: 'AI Chat Assistants',
  perplexity: 'AI Chat Assistants',
  chatbase: 'AI Chat Assistants',
  midjourney: 'AI Image & Design',
  'leonardo-ai': 'AI Image & Design',
  simplified: 'AI Image & Design',
  'decktopus-ai': 'AI Image & Design',
  mixo: 'AI Image & Design',
  'zapier': 'Productivity & Automation',
  'make-com': 'Productivity & Automation',
  'julius-ai': 'Productivity & Automation',
  clickup: 'Productivity & Automation',
  canva: 'AI Image & Design',
  notion: 'Productivity & Automation',
};

export interface ToolPricingRow {
  slug: string;
  tool: string;
  category: IndexCategory;
  hasFreePlan: boolean;
  hasFreeTrial: boolean;
  entryPaidPrice: number | null; // cheapest paid plan, per month
  popularPrice: number | null; // "Most Popular" (highlighted) plan, per month
  hasCustomTier: boolean;
  planCount: number;
  lastUpdated: string;
  /** ISO 4217-ish display currency of the vendor's list prices. */
  currency: 'USD' | 'EUR';
  /** Date the plans were checked against the vendor pricing page, if ever. */
  pricingVerified: string | null;
  /** Vendor pricing page used for verification. */
  pricingSourceUrl: string | null;
  /** True when the data could not be re-verified and may be stale. */
  needsVerification: boolean;
}

export interface CategoryStats {
  category: IndexCategory;
  toolCount: number;
  medianEntryPrice: number | null;
  cheapest: { tool: string; price: number } | null;
  priciest: { tool: string; price: number } | null;
}

export interface PricingIndexStats {
  toolCount: number;
  planCount: number;
  freePlanShare: number; // 0–100
  freeTrialShare: number; // 0–100
  customTierShare: number; // 0–100
  medianEntryPrice: number;
  averageEntryPrice: number;
  medianPopularPrice: number;
  cheapestEntry: { tool: string; price: number };
  priciestEntry: { tool: string; price: number };
  priceBuckets: { label: string; count: number }[];
  categories: CategoryStats[];
  rows: ToolPricingRow[];
  newestDataDate: string;
}

function parsePrice(price: string): number | null {
  // Vendors now list in USD or EUR (Surfer, n8n switched to €). Parse both;
  // the row's `currency` field tells the UI which symbol to render. Aggregate
  // stats stay USD-only so medians never mix currencies.
  const m = price.match(/[$€]\s?(\d+(?:,\d{3})*(?:\.\d+)?)/);
  return m ? parseFloat(m[1].replace(/,/g, '')) : null;
}

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
}

function toRow(page: PricingPage): ToolPricingRow {
  const paidPrices = page.plans
    .map((p) => parsePrice(p.price))
    .filter((n): n is number => n !== null && n > 0);
  const highlighted = page.plans.find((p) => p.highlighted);
  const highlightedPrice = highlighted ? parsePrice(highlighted.price) : null;
  return {
    slug: page.slug,
    tool: page.tool,
    category: CATEGORY_BY_SLUG[page.slug] ?? 'Productivity & Automation',
    hasFreePlan: page.plans.some((p) => {
      const n = parsePrice(p.price);
      return n === 0 || /^free$/i.test(p.price.trim());
    }),
    hasFreeTrial: page.freeTrialAvailable,
    entryPaidPrice: paidPrices.length > 0 ? Math.min(...paidPrices) : null,
    popularPrice: highlightedPrice && highlightedPrice > 0 ? highlightedPrice : null,
    hasCustomTier: page.plans.some((p) => /custom/i.test(p.price)),
    planCount: page.plans.length,
    lastUpdated: page.lastUpdated,
    currency: page.currency ?? 'USD',
    pricingVerified: page.pricingVerified ?? null,
    pricingSourceUrl: page.pricingSourceUrl ?? null,
    needsVerification: page.pricingNeedsVerification ?? false,
  };
}

export function getPricingIndex(): PricingIndexStats {
  const rows = pricingData.map(toRow).sort((a, b) => a.tool.localeCompare(b.tool));
  // Aggregate stats are computed from USD-listed tools only, so a euro-priced
  // vendor (Surfer, n8n) can never skew a dollar median. Their rows still
  // appear in the table with their own currency symbol.
  const usdRows = rows.filter((r) => r.currency === 'USD');
  const entries = usdRows
    .filter((r) => r.entryPaidPrice !== null)
    .map((r) => ({ tool: r.tool, price: r.entryPaidPrice as number }));
  const entryPrices = entries.map((e) => e.price);
  const popularPrices = usdRows
    .map((r) => r.popularPrice)
    .filter((n): n is number => n !== null);

  const buckets = [
    { label: 'Under $10/mo', test: (p: number) => p < 10 },
    { label: '$10–19/mo', test: (p: number) => p >= 10 && p < 20 },
    { label: '$20–49/mo', test: (p: number) => p >= 20 && p < 50 },
    { label: '$50+/mo', test: (p: number) => p >= 50 },
  ];

  const categoryNames = [...new Set(rows.map((r) => r.category))].sort();
  const categories: CategoryStats[] = categoryNames.map((category) => {
    const catRows = rows.filter((r) => r.category === category);
    const catEntries = catRows
      .filter((r) => r.entryPaidPrice !== null && r.currency === 'USD')
      .map((r) => ({ tool: r.tool, price: r.entryPaidPrice as number }))
      .sort((a, b) => a.price - b.price);
    return {
      category,
      toolCount: catRows.length,
      medianEntryPrice: catEntries.length > 0 ? median(catEntries.map((e) => e.price)) : null,
      cheapest: catEntries[0] ?? null,
      priciest: catEntries[catEntries.length - 1] ?? null,
    };
  });

  const sortedEntries = [...entries].sort((a, b) => a.price - b.price);

  return {
    toolCount: rows.length,
    planCount: rows.reduce((sum, r) => sum + r.planCount, 0),
    freePlanShare: Math.round((rows.filter((r) => r.hasFreePlan).length / rows.length) * 100),
    freeTrialShare: Math.round((rows.filter((r) => r.hasFreeTrial).length / rows.length) * 100),
    customTierShare: Math.round((rows.filter((r) => r.hasCustomTier).length / rows.length) * 100),
    medianEntryPrice: median(entryPrices),
    averageEntryPrice: Math.round((entryPrices.reduce((a, b) => a + b, 0) / entryPrices.length) * 100) / 100,
    medianPopularPrice: median(popularPrices),
    cheapestEntry: sortedEntries[0],
    priciestEntry: sortedEntries[sortedEntries.length - 1],
    priceBuckets: buckets.map((b) => ({
      label: b.label,
      count: entryPrices.filter(b.test).length,
    })),
    categories,
    rows,
    newestDataDate: rows.map((r) => r.lastUpdated).sort().reverse()[0] ?? '',
  };
}
