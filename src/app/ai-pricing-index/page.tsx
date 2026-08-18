import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Database, Quote } from 'lucide-react';
import { getPricingIndex } from '@/lib/pricing-index';
import NewsletterSignup from '@/components/NewsletterSignup';
import ScrollReveal from '@/components/motion/ScrollReveal';

const CANONICAL = 'https://www.shelby-ai.com/ai-pricing-index/';

// Tool count is computed from the dataset so the title can never drift from
// the table the page actually renders (it previously hardcoded "31").
const TOOL_COUNT = getPricingIndex().toolCount;

export const metadata: Metadata = {
  title: `AI Tool Pricing Index 2026: What ${TOOL_COUNT} Popular AI Tools Actually Cost`,
  description:
    `Original dataset: every public pricing plan of ${TOOL_COUNT} popular AI tools, with per-tool verification dates. Median entry price, free-plan share, cost by category — free to cite.`,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `AI Tool Pricing Index 2026 — Original Data on ${TOOL_COUNT} AI Tools`,
    description:
      `Median entry price, free-plan availability, and cost distribution across ${TOOL_COUNT} popular AI tools, from their public pricing pages.`,
    type: 'article',
    url: CANONICAL,
    images: [{ url: 'https://www.shelby-ai.com/images/og-thumbnail.png', width: 1200, height: 630 }],
  },
};

function money(n: number | null, currency: 'USD' | 'EUR' = 'USD'): string {
  if (n === null) return '—';
  const symbol = currency === 'EUR' ? '€' : '$';
  return Number.isInteger(n) ? `${symbol}${n}` : `${symbol}${n.toFixed(2)}`;
}

export default function AiPricingIndexPage() {
  const idx = getPricingIndex();

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'AI Tool Pricing Index 2026',
    description: `Public pricing plans of ${idx.toolCount} popular AI tools (${idx.planCount} plans), catalogued and normalized: entry paid price, most-popular plan price, free plan and free trial availability, custom/enterprise tiers.`,
    url: CANONICAL,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    creator: {
      '@type': 'Organization',
      name: 'ShelbyAI',
      url: 'https://www.shelby-ai.com/',
    },
    dateModified: idx.newestDataDate,
    variableMeasured: [
      'Entry paid price (USD/month)',
      'Most-popular plan price (USD/month)',
      'Free plan availability',
      'Free trial availability',
      'Custom/enterprise tier availability',
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shelby-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Tool Pricing Index', item: CANONICAL },
    ],
  };

  return (
    <main className="min-h-screen">
      {/* Schema markup — all data from trusted static pricing-data.ts, not user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container-main pt-48 sm:pt-52 pb-16">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-signal-500/10 border border-signal-500/30 text-signal-400 text-sm font-medium mb-6">
              <Database size={15} />
              Original data — free to cite with attribution
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4 font-heading">
              AI Tool Pricing Index 2026: What {idx.toolCount} Popular AI Tools Actually Cost
            </h1>
            {/* Answer-first summary — the numbers an AI engine or journalist will quote */}
            <div className="rounded-xl border border-signal-500/25 bg-void-900/60 p-5 mb-6">
              <p className="text-void-200 leading-relaxed">
                We catalogued every public pricing plan of <strong>{idx.toolCount} popular AI tools</strong> ({idx.planCount} plans
                in total). The median entry price of a paid AI tool is{' '}
                <strong className="text-signal-400">{money(idx.medianEntryPrice)}/month</strong> (average {money(idx.averageEntryPrice)}),{' '}
                <strong>{idx.freePlanShare}%</strong> offer a free plan, and the median &ldquo;most popular&rdquo; plan costs{' '}
                <strong className="text-signal-400">{money(idx.medianPopularPrice)}/month</strong>. The cheapest paid entry point is{' '}
                {idx.cheapestEntry.tool} at {money(idx.cheapestEntry.price)}/mo; the priciest is {idx.priciestEntry.tool} at{' '}
                {money(idx.priciestEntry.price)}/mo.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Stat cards */}
        <ScrollReveal>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 max-w-4xl mb-12">
            {[
              { label: 'Median entry price', value: `${money(idx.medianEntryPrice)}/mo` },
              { label: 'Offer a free plan', value: `${idx.freePlanShare}%` },
              { label: 'Offer a free trial', value: `${idx.freeTrialShare}%` },
              { label: 'Have a custom/enterprise tier', value: `${idx.customTierShare}%` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-void-700/50 bg-void-900/40 p-5">
                <div className="text-2xl font-extrabold text-void-50">{s.value}</div>
                <div className="text-xs text-void-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Price distribution */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl font-bold text-void-50 mb-4 font-heading">How AI tool entry prices are distributed</h2>
            <div className="space-y-2.5">
              {idx.priceBuckets.map((b) => {
                const total = idx.priceBuckets.reduce((s, x) => s + x.count, 0);
                const pct = total > 0 ? Math.round((b.count / total) * 100) : 0;
                return (
                  <div key={b.label} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 text-sm text-void-300">{b.label}</span>
                    <div className="flex-1 h-6 rounded bg-void-900/60 overflow-hidden">
                      <div className="h-full bg-signal-500/70" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-20 shrink-0 text-sm text-void-400">{b.count} tools ({pct}%)</span>
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-void-400 mt-3">
              Entry price = the cheapest paid plan of each tool, normalized to USD/month. Free plans excluded from the distribution.
            </p>
          </div>
        </ScrollReveal>

        {/* By category */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl font-bold text-void-50 mb-4 font-heading">Median AI tool price by category</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-void-400 border-b border-void-700/60">
                    <th className="py-2 pr-4">Category</th>
                    <th className="py-2 pr-4">Tools</th>
                    <th className="py-2 pr-4">Median entry</th>
                    <th className="py-2 pr-4">Cheapest</th>
                    <th className="py-2">Priciest</th>
                  </tr>
                </thead>
                <tbody>
                  {idx.categories.map((c) => (
                    <tr key={c.category} className="border-b border-void-800/60 text-void-200">
                      <td className="py-2.5 pr-4 font-semibold">{c.category}</td>
                      <td className="py-2.5 pr-4">{c.toolCount}</td>
                      <td className="py-2.5 pr-4 text-signal-400 font-semibold">{money(c.medianEntryPrice)}/mo</td>
                      <td className="py-2.5 pr-4">{c.cheapest ? `${c.cheapest.tool} (${money(c.cheapest.price)})` : '—'}</td>
                      <td className="py-2.5">{c.priciest ? `${c.priciest.tool} (${money(c.priciest.price)})` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        {/* Full table */}
        <ScrollReveal>
          <div className="max-w-4xl mb-12">
            <h2 className="text-2xl font-bold text-void-50 mb-4 font-heading">The full index: all {idx.toolCount} tools</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-void-400 border-b border-void-700/60">
                    <th className="py-2 pr-4">Tool</th>
                    <th className="py-2 pr-4">Category</th>
                    <th className="py-2 pr-4">Free plan</th>
                    <th className="py-2 pr-4">Free trial</th>
                    <th className="py-2 pr-4">Entry paid</th>
                    <th className="py-2 pr-4">Popular plan</th>
                    <th className="py-2 pr-4">Verified</th>
                    <th className="py-2">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {idx.rows.map((r) => (
                    <tr key={r.slug} className="border-b border-void-800/60 text-void-200">
                      <td className="py-2.5 pr-4 font-semibold">{r.tool}</td>
                      <td className="py-2.5 pr-4 text-void-400">{r.category}</td>
                      <td className="py-2.5 pr-4">{r.hasFreePlan ? 'Yes' : 'No'}</td>
                      <td className="py-2.5 pr-4">{r.hasFreeTrial ? 'Yes' : 'No'}</td>
                      <td className="py-2.5 pr-4 text-signal-400 font-semibold">
                        {r.entryPaidPrice !== null ? `${money(r.entryPaidPrice, r.currency)}/mo` : '—'}
                      </td>
                      <td className="py-2.5 pr-4">{r.popularPrice !== null ? `${money(r.popularPrice, r.currency)}/mo` : '—'}</td>
                      <td className="py-2.5 pr-4 text-void-400 whitespace-nowrap">
                        {r.pricingVerified ? (
                          r.pricingSourceUrl ? (
                            <a href={r.pricingSourceUrl} target="_blank" rel="nofollow noopener" className="text-void-300 hover:text-signal-400 no-underline" title="Verified against the vendor's own pricing page">
                              {r.pricingVerified}
                            </a>
                          ) : (
                            r.pricingVerified
                          )
                        ) : r.needsVerification ? (
                          <span className="text-ember-300" title="Could not be re-verified against the vendor page — may be stale">needs check</span>
                        ) : (
                          <span title="Last updated date of our pricing guide; not re-verified against the vendor page since">{r.lastUpdated}*</span>
                        )}
                      </td>
                      <td className="py-2.5">
                        <Link href={`/pricing/${r.slug}`} className="text-signal-400 hover:text-signal-300 no-underline inline-flex items-center gap-1">
                          Pricing guide <ArrowRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-void-500 mt-3">
              Dates link to the vendor pricing page the plans were verified against. Dates marked * are the last update of
              our guide without a fresh vendor-page verification — treat those prices as indicative until re-checked.
              Euro prices (€) are the vendor&rsquo;s own list currency and are excluded from the USD medians above.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="/data/ai-pricing-index.json" className="btn-outline text-xs no-underline" download>
                Download JSON
              </a>
              <a href="/data/ai-pricing-index.csv" className="btn-outline text-xs no-underline" download>
                Download CSV
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Methodology */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl font-bold text-void-50 mb-3 font-heading">Methodology</h2>
            <p className="text-sm text-void-300 leading-relaxed mb-2">
              We maintain detailed pricing guides for each of these {idx.toolCount} tools, built from the tools&rsquo; own public
              pricing pages. This index normalizes those plans: for each tool we record the cheapest paid plan (USD/month),
              the plan the vendor marks as most popular, and whether a free plan, free trial, or custom/enterprise tier exists.
              Per-tool verification dates are shown on each linked pricing guide; the most recent update in the dataset is {idx.newestDataDate}.
              Prices for tools billed per-user are counted at the single-user rate. No vendor pays for placement in this index.
            </p>
          </div>
        </ScrollReveal>

        {/* Cite box — the backlink hook */}
        <ScrollReveal>
          <div className="max-w-3xl mb-14 rounded-xl border border-signal-500/25 bg-void-900 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Quote size={16} className="text-signal-400" />
              <h2 className="text-lg font-bold text-void-50 font-heading">Cite this data</h2>
            </div>
            <p className="text-sm text-void-300 leading-relaxed">
              This dataset is free to use in articles, research, and presentations under CC BY 4.0 — just credit
              &ldquo;ShelbyAI — AI Tool Pricing Index&rdquo; with a link to this page. Journalists and creators: if you need a
              custom cut of the data (a category, a price range, a comparison), <Link href="/contact" className="text-signal-400 hover:text-signal-300 no-underline">contact us</Link> and
              we&rsquo;ll pull it for you.
            </p>
          </div>
        </ScrollReveal>

        {/* CTA + newsletter */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12 flex flex-wrap gap-3">
            <Link href="/finder" className="btn-primary text-sm no-underline gap-2">
              Find the right AI tool for you <ArrowRight size={14} />
            </Link>
            <Link href="/calculator" className="btn-outline text-sm no-underline gap-2">
              Calculate your AI stack cost <ArrowRight size={14} />
            </Link>
          </div>
          <div className="max-w-3xl">
            <NewsletterSignup variant="section" />
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
