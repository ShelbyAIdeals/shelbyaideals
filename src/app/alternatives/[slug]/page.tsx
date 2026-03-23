import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAlternativesSlugs,
  getAlternativesPage,
  getAllAlternativesPages,
} from '@/lib/alternatives-data';
import type { AlternativeTool } from '@/lib/alternatives-data';
import ComparisonTable from '@/components/ComparisonTable';
import ScrollReveal from '@/components/motion/ScrollReveal';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAlternativesSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getAlternativesPage(slug);

  if (!page) {
    return { title: 'Alternatives Not Found' };
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: `https://www.shelby-ai.com/alternatives/${slug}/`,
      images: [{ url: 'https://www.shelby-ai.com/images/og-thumbnail.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
    },
    alternates: {
      canonical: `https://www.shelby-ai.com/alternatives/${slug}/`,
    },
  };
}

function AlternativeCard({ tool, index }: { tool: AlternativeTool; index: number }) {
  return (
    <div className="card group relative flex flex-col p-6 hover:border-signal-500/40 border border-void-700/50 transition-all">
      {/* Rank number */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-signal-500/15 border border-signal-500/25 text-sm font-bold text-signal-400">
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-void-50 mb-1 font-heading">
            {tool.name}
          </h2>
          <span className="inline-flex items-center rounded-full bg-signal-500/10 border border-signal-500/20 px-3 py-0.5 text-xs font-medium text-signal-400">
            Best for: {tool.bestFor}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-void-300 leading-relaxed mb-4">
        {tool.description}
      </p>

      {/* Pros & Cons */}
      {(tool.pros?.length || tool.cons?.length) ? (
        <div className="flex gap-4 mb-4 text-xs">
          {tool.pros && tool.pros.length > 0 && (
            <div className="flex-1">
              <span className="font-semibold text-signal-400 block mb-1">Pros</span>
              <ul className="space-y-0.5 text-void-300">
                {tool.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-1">
                    <span className="text-signal-500 mt-0.5">+</span> {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tool.cons && tool.cons.length > 0 && (
            <div className="flex-1">
              <span className="font-semibold text-ember-400 block mb-1">Cons</span>
              <ul className="space-y-0.5 text-void-300">
                {tool.cons.map((con) => (
                  <li key={con} className="flex items-start gap-1">
                    <span className="text-ember-400 mt-0.5">&minus;</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : null}

      {/* Why Switch */}
      {tool.whySwitch && (
        <p className="text-xs text-void-400 italic mb-4">
          {tool.whySwitch}
        </p>
      )}

      {/* Pricing */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xs font-semibold text-void-400 uppercase tracking-wider">
          Pricing:
        </span>
        <span className="text-sm text-void-200 font-medium">{tool.pricing}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-void-800/60">
        {tool.reviewSlug ? (
          <Link
            href={`/reviews/${tool.reviewSlug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline transition-colors"
          >
            Read Our Review <span>&rarr;</span>
          </Link>
        ) : (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-void-300 hover:text-signal-400 no-underline transition-colors"
          >
            Visit Website <span>&rarr;</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default async function AlternativesDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getAlternativesPage(slug);

  if (!page) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.shelby-ai.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Alternatives',
        item: 'https://www.shelby-ai.com/alternatives',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title,
        item: `https://www.shelby-ai.com/alternatives/${slug}`,
      },
    ],
  };

  const faqSchema = page.faqs && page.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((faq: { question: string; answer: string }) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: page.title,
    description: page.description,
    numberOfItems: page.alternatives.length,
    itemListElement: page.alternatives.map((alt, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: alt.name,
      url: alt.reviewSlug
        ? `https://www.shelby-ai.com/reviews/${alt.reviewSlug}`
        : alt.url,
    })),
  };

  return (
    <main className="min-h-screen">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        {/* Breadcrumb */}
        <ScrollReveal>
          <nav className="flex items-center gap-2 text-sm text-void-500 mb-8">
            <Link
              href="/"
              className="hover:text-signal-400 no-underline transition-colors text-void-500"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/alternatives"
              className="hover:text-signal-400 no-underline transition-colors text-void-500"
            >
              Alternatives
            </Link>
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
            {page.reviewSlug && (
              <p className="mt-4 text-sm text-void-400">
                Want our full take?{' '}
                <Link
                  href={`/reviews/${page.reviewSlug}`}
                  className="text-signal-400 hover:text-signal-300 no-underline font-medium"
                >
                  Read our {page.tool} review
                </Link>
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* Why Look for Alternatives */}
        {page.whyLookForAlternatives && (
          <ScrollReveal>
            <div className="bg-void-900/60 border border-void-700/50 rounded-xl p-6 mb-10 backdrop-blur-sm">
              <h2 className="text-lg font-bold text-void-50 mb-3 font-heading">
                Why Look for {page.tool} Alternatives?
              </h2>
              <p className="text-sm text-void-300 leading-relaxed">
                {page.whyLookForAlternatives}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Comparison Table */}
        <ScrollReveal>
          <h2 className="text-xl font-bold text-void-50 mb-4 font-heading">
            {page.tool} vs Alternatives at a Glance
          </h2>
          <ComparisonTable
            tools={page.alternatives.slice(0, 5).map((alt) => ({
              name: alt.name,
              features: {
                'Starting Price': alt.pricing,
                'Best For': alt.bestFor,
              },
              affiliateUrl: alt.reviewSlug ? `/reviews/${alt.reviewSlug}` : alt.url,
            }))}
          />
        </ScrollReveal>

        {/* Quick jump */}
        <ScrollReveal>
          <div className="bg-void-900/60 border border-void-700/50 rounded-xl p-5 mb-10 backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-signal-400 uppercase tracking-wider mb-3 font-heading">
              Quick Overview
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {page.alternatives.map((alt, i) => (
                <div key={alt.slug} className="flex items-center gap-2 text-sm">
                  <span className="text-signal-500 font-bold">{i + 1}.</span>
                  <span className="text-void-200 font-medium">{alt.name}</span>
                  <span className="text-void-600">&mdash;</span>
                  <span className="text-void-400 text-xs">{alt.bestFor}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Alternatives Grid */}
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {page.alternatives.map((alt, index) => (
            <StaggerItem key={alt.slug}>
              <AlternativeCard tool={alt} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <ScrollReveal>
          <div className="mt-14 text-center">
            <div className="bg-void-900/60 border border-signal-500/15 rounded-xl p-8 backdrop-blur-sm max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-void-50 mb-3 font-heading">
                Not sure which to pick?
              </h2>
              <p className="text-sm text-void-400 mb-5 leading-relaxed">
                We test every tool with real workflows. Browse our reviews for
                in-depth comparisons, pricing breakdowns, and honest verdicts.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/reviews"
                  className="btn-primary text-sm no-underline"
                >
                  Browse All Reviews
                </Link>
                <Link
                  href="/comparisons"
                  className="btn-outline text-sm no-underline"
                >
                  See Comparisons
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* FAQ Section */}
      {page.faqs && page.faqs.length > 0 && (
        <div className="container-main pb-12">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-void-100 mb-6 font-heading">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-3xl">
              {page.faqs.map((faq: { question: string; answer: string }) => (
                <details
                  key={faq.question}
                  className="group card border border-void-700/50 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-semibold text-void-100 hover:text-signal-400 transition-colors list-none">
                    {faq.question}
                    <span className="text-void-500 group-open:rotate-180 transition-transform ml-2 shrink-0">&#9662;</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-void-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      )}

      {/* More Alternatives */}
      {(() => {
        const allPages = getAllAlternativesPages().filter((p) => p.slug !== slug);
        const related = allPages.slice(0, 3);
        if (related.length === 0) return null;
        return (
          <div className="container-main pb-12 sm:pb-16">
            <ScrollReveal>
              <h2 className="text-xl font-bold text-void-100 mb-6 font-heading">
                More Alternatives
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/alternatives/${p.slug}`}
                    className="group card p-5 border border-void-700/50 hover:border-signal-500/40 rounded-xl no-underline transition-all"
                  >
                    <span className="text-sm font-semibold text-void-100 group-hover:text-signal-400 transition-colors">
                      {p.tool} Alternatives
                    </span>
                    <p className="text-xs text-void-400 mt-1">
                      {p.alternatives.length} alternatives compared
                    </p>
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
