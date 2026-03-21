import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Star, DollarSign, Zap } from 'lucide-react';
import { getUseCaseSlugs, getUseCasePage, getAllUseCasePages } from '@/lib/use-case-data';
import ScrollReveal from '@/components/motion/ScrollReveal';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getUseCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getUseCasePage(slug);

  if (!page) {
    return { title: 'Not Found' };
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: `https://www.shelby-ai.com/best-for/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
    alternates: {
      canonical: `https://www.shelby-ai.com/best-for/${slug}`,
    },
  };
}

export default async function BestForPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getUseCasePage(slug);

  if (!page) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.shelby-ai.com' },
      { '@type': 'ListItem', position: 2, name: 'Best For', item: 'https://www.shelby-ai.com/best-for' },
      { '@type': 'ListItem', position: 3, name: page.title, item: `https://www.shelby-ai.com/best-for/${slug}` },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: page.title,
    description: page.description,
    numberOfItems: page.tools.length,
    itemListElement: page.tools.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      url: tool.reviewSlug
        ? `https://www.shelby-ai.com/reviews/${tool.reviewSlug}`
        : `https://www.shelby-ai.com/best-for/${slug}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        {/* Breadcrumb */}
        <ScrollReveal>
          <nav className="flex items-center gap-2 text-sm text-void-500 mb-8">
            <Link href="/" className="hover:text-signal-400 no-underline transition-colors text-void-500">Home</Link>
            <span>/</span>
            <span className="text-void-500">Best For</span>
            <span>/</span>
            <span className="text-void-300">{page.useCase}</span>
          </nav>
        </ScrollReveal>

        {/* Page Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4 font-heading">
              {page.title}
            </h1>
            <p className="text-lg text-void-300 leading-relaxed">
              {page.intro}
            </p>
          </div>
        </ScrollReveal>

        {/* Quick Summary */}
        <ScrollReveal>
          <div className="bg-void-900/60 border border-signal-500/15 rounded-xl p-6 mb-12 backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-signal-400 uppercase tracking-wider mb-4 font-heading">
              Quick Summary
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.tools.map((tool, i) => (
                <div key={tool.slug} className="flex items-center gap-3 text-sm">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-500/15 border border-signal-500/25 text-xs font-bold text-signal-400">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <span className="text-void-100 font-medium">{tool.name}</span>
                    <span className="text-void-600 mx-1.5">&mdash;</span>
                    <span className="text-void-400 text-xs">{tool.standoutFeature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tool Cards */}
        <StaggerContainer className="space-y-8 mb-16">
          {page.tools.map((tool, index) => (
            <StaggerItem key={tool.slug}>
              <div className="card group relative border border-void-700/50 hover:border-signal-500/30 rounded-xl p-6 sm:p-8 transition-all">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Rank */}
                  <div className="flex sm:flex-col items-center gap-3 sm:gap-1">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-signal-500/15 border border-signal-500/25 text-lg font-bold text-signal-400">
                      {index + 1}
                    </div>
                    <span className="text-[10px] text-void-500 uppercase tracking-wider font-semibold">
                      {index === 0 ? 'Top Pick' : `#${index + 1}`}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-3 mb-3">
                      <h2 className="text-xl font-bold text-void-50 font-heading">
                        {tool.name}
                      </h2>
                      <span className="inline-flex items-center gap-1 rounded-full bg-signal-500/10 border border-signal-500/20 px-3 py-0.5 text-xs font-medium text-signal-400">
                        <Zap size={10} />
                        {tool.standoutFeature}
                      </span>
                    </div>

                    <p className="text-sm text-void-300 leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mb-5">
                      <div className="flex items-center gap-1.5 text-sm">
                        <DollarSign size={14} className="text-signal-500" />
                        <span className="text-void-200 font-medium">{tool.pricing}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-void-800/60">
                      <a
                        href={tool.affiliateUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        className="inline-flex items-center gap-2 rounded-lg bg-signal-500 px-5 py-2.5 text-sm font-semibold text-void-950 no-underline hover:bg-signal-400 transition-colors"
                      >
                        Try {tool.name} <ArrowRight size={14} />
                      </a>
                      {tool.reviewSlug && (
                        <Link
                          href={`/reviews/${tool.reviewSlug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline transition-colors"
                        >
                          Read Our Review <span>&rarr;</span>
                        </Link>
                      )}
                      <Link
                        href={`/pricing/${tool.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-void-400 hover:text-signal-400 no-underline transition-colors"
                      >
                        See Pricing
                      </Link>
                    </div>
                    <span className="mt-1 text-[10px] text-void-600">Affiliate link</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <ScrollReveal>
          <div className="text-center">
            <div className="bg-void-900/60 border border-signal-500/15 rounded-xl p-8 backdrop-blur-sm max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-void-50 mb-3 font-heading">
                Want to see all AI tools we have reviewed?
              </h2>
              <p className="text-sm text-void-400 mb-5 leading-relaxed">
                We test every tool hands-on with real workflows. Browse our full library of in-depth reviews and comparisons.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/reviews" className="btn-primary text-sm no-underline">
                  Browse All Reviews
                </Link>
                <Link href="/comparisons" className="btn-outline text-sm no-underline">
                  See Comparisons
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Browse by Role */}
      {(() => {
        const allPages = getAllUseCasePages().filter((p) => p.slug !== slug);
        const related = allPages.slice(0, 3);
        if (related.length === 0) return null;
        return (
          <div className="container-main pb-12 sm:pb-16">
            <ScrollReveal>
              <h2 className="text-xl font-bold text-void-100 mb-6 font-heading">
                Browse by Role
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/best-for/${p.slug}`}
                    className="group card p-5 border border-void-700/50 hover:border-signal-500/40 rounded-xl no-underline transition-all"
                  >
                    <span className="text-sm font-semibold text-void-100 group-hover:text-signal-400 transition-colors">
                      Best for {p.useCase}
                    </span>
                    <p className="text-xs text-void-400 mt-1">
                      {p.tools.length} tools recommended
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
