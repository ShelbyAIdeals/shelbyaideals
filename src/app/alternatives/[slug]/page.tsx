import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAlternativesSlugs,
  getAlternativesPage,
  getAllAlternativesPages,
} from '@/lib/alternatives-data';
import type { AlternativeTool } from '@/lib/alternatives-data';
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
      url: `https://www.shelby-ai.com/alternatives/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
    alternates: {
      canonical: `https://www.shelby-ai.com/alternatives/${slug}`,
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
