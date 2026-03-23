import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Check, Clock, Shield, CreditCard } from 'lucide-react';
import { getPricingSlugs, getPricingPage, getAllPricingPages } from '@/lib/pricing-data';
import ScrollReveal from '@/components/motion/ScrollReveal';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPricingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPricingPage(slug);

  if (!page) {
    return { title: 'Pricing Not Found' };
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: `https://www.shelby-ai.com/pricing/${slug}/`,
      images: [{ url: 'https://www.shelby-ai.com/images/og-thumbnail.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
    },
    alternates: {
      canonical: `https://www.shelby-ai.com/pricing/${slug}/`,
    },
  };
}

export default async function PricingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getPricingPage(slug);

  if (!page) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shelby-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://www.shelby-ai.com/pricing/' },
      { '@type': 'ListItem', position: 3, name: `${page.tool} Pricing`, item: `https://www.shelby-ai.com/pricing/${slug}/` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Product/Offer schema — all data is from trusted static pricing-data.ts, not user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: page.tool,
          applicationCategory: 'BusinessApplication',
          offers: page.plans
            .filter((p) => p.price !== 'Custom' && p.price !== 'Free')
            .map((p) => ({
              '@type': 'Offer',
              name: p.name,
              price: p.price.replace(/[^0-9.]/g, '') || '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            })),
        }) }}
      />

      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        {/* Breadcrumb */}
        <ScrollReveal>
          <nav className="flex items-center gap-2 text-sm text-void-500 mb-8">
            <Link href="/" className="hover:text-signal-400 no-underline transition-colors text-void-500">Home</Link>
            <span>/</span>
            <span className="text-void-500">Pricing</span>
            <span>/</span>
            <span className="text-void-300">{page.tool}</span>
          </nav>
        </ScrollReveal>

        {/* Page Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4 font-heading">
              {page.title}
            </h1>
            <p className="text-lg text-void-300 leading-relaxed">
              {page.intro}
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-void-400">
                <Clock size={14} className="text-signal-500" />
                <span>Last updated: {page.lastUpdated}</span>
              </div>
              {page.freeTrialAvailable && (
                <div className="flex items-center gap-2 text-sm text-signal-400">
                  <Shield size={14} />
                  <span>{page.freeTrialDays}-day free trial available</span>
                </div>
              )}
              {page.moneyBackGuarantee && (
                <div className="flex items-center gap-2 text-sm text-signal-400">
                  <CreditCard size={14} />
                  <span>{page.moneyBackGuarantee}</span>
                </div>
              )}
            </div>

            {page.reviewSlug && (
              <p className="mt-4 text-sm text-void-400">
                Want the full picture?{' '}
                <Link
                  href={`/reviews/${page.reviewSlug}`}
                  className="text-signal-400 hover:text-signal-300 no-underline font-medium"
                >
                  Read our {page.tool} review &rarr;
                </Link>
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* Value Analysis & Annual vs Monthly */}
        {(page.valueAnalysis || page.annualVsMonthly) && (
          <ScrollReveal>
            <div className="max-w-3xl mb-12 space-y-6">
              {page.valueAnalysis && (
                <div>
                  <h2 className="text-lg font-bold text-void-50 mb-2 font-heading">Is {page.tool} Worth It?</h2>
                  <p className="text-sm text-void-300 leading-relaxed">{page.valueAnalysis}</p>
                </div>
              )}
              {page.annualVsMonthly && (
                <div className="p-4 rounded-lg border border-signal-500/15 bg-void-900/40">
                  <h3 className="text-sm font-semibold text-signal-400 mb-2">Annual vs Monthly Billing</h3>
                  <p className="text-sm text-void-300 leading-relaxed">{page.annualVsMonthly}</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Pricing Cards */}
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-16">
          {page.plans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={`relative flex flex-col rounded-xl border p-6 h-full transition-all ${
                  plan.highlighted
                    ? 'border-signal-500/40 bg-void-900/80 shadow-[0_0_30px_rgba(6,182,212,0.08)]'
                    : 'border-void-700/50 bg-void-900/40'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-signal-500 px-4 py-1 text-xs font-bold text-void-950 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="mb-4">
                  <h2 className="text-lg font-bold text-void-50 font-heading">{plan.name}</h2>
                  <p className="text-sm text-void-400 mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-void-50">{plan.price}</span>
                  <span className="text-sm text-void-500 ml-1">{plan.period}</span>
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-void-300">
                      <Check size={14} className="text-signal-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold no-underline transition-all ${
                    plan.highlighted
                      ? 'bg-signal-500 text-void-950 hover:bg-signal-400'
                      : 'border border-void-600 text-void-200 hover:border-signal-500/40 hover:text-signal-400'
                  }`}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : `Try ${plan.name}`}
                  <ArrowRight size={14} />
                </a>
                <span className="mt-1.5 text-center text-xs text-void-600">Affiliate link</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Per-Unit Breakdown & Competitor Comparison */}
        {(page.perUnitBreakdown || page.competitorComparison) && (
          <ScrollReveal>
            <div className="max-w-3xl mx-auto mb-12 space-y-6">
              {page.perUnitBreakdown && (
                <div>
                  <h2 className="text-lg font-bold text-void-50 mb-2 font-heading">Cost Per Unit</h2>
                  <p className="text-sm text-void-300 leading-relaxed">{page.perUnitBreakdown}</p>
                </div>
              )}
              {page.competitorComparison && (
                <div>
                  <h2 className="text-lg font-bold text-void-50 mb-2 font-heading">How {page.tool} Pricing Compares</h2>
                  <p className="text-sm text-void-300 leading-relaxed">{page.competitorComparison}</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* FAQs */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-void-50 mb-8 font-heading text-center">
              {page.tool} Pricing FAQ
            </h2>
            <div className="space-y-6">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="border-b border-void-800/60 pb-6">
                  <h3 className="text-base font-semibold text-void-100 mb-2">{faq.question}</h3>
                  <p className="text-sm text-void-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal>
          <div className="mt-14 text-center">
            <div className="bg-void-900/60 border border-signal-500/15 rounded-xl p-8 backdrop-blur-sm max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-void-50 mb-3 font-heading">
                Not sure if {page.tool} is right for you?
              </h2>
              <p className="text-sm text-void-400 mb-5 leading-relaxed">
                Read our in-depth review with real test results, or compare {page.tool} with its top alternatives.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {page.reviewSlug && (
                  <Link href={`/reviews/${page.reviewSlug}`} className="btn-primary text-sm no-underline">
                    Read Full Review
                  </Link>
                )}
                <Link href={`/alternatives/${slug}`} className="btn-outline text-sm no-underline">
                  See Alternatives
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Related Pricing Guides */}
      {(() => {
        const allPages = getAllPricingPages().filter((p) => p.slug !== slug);
        const related = allPages.slice(0, 3);
        if (related.length === 0) return null;
        return (
          <div className="container-main pb-12 sm:pb-16">
            <ScrollReveal>
              <h2 className="text-xl font-bold text-void-100 mb-6 font-heading">
                More Pricing Guides
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/pricing/${p.slug}`}
                    className="group card p-5 border border-void-700/50 hover:border-signal-500/40 rounded-xl no-underline transition-all"
                  >
                    <span className="text-sm font-semibold text-void-100 group-hover:text-signal-400 transition-colors">
                      {p.tool} Pricing
                    </span>
                    <span className="flex items-center gap-1 text-xs text-signal-400 mt-2">
                      View Plans <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        );
      })()}
    </main>
  );
}
