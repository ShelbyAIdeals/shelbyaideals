import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBestOf } from '@/lib/content';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ScrollReveal from '@/components/motion/ScrollReveal';

export const metadata: Metadata = {
  title: 'Best AI Tools',
  description:
    'Curated, tested, and ranked -- the best AI tools for every use case and budget.',
  openGraph: {
    title: 'Best AI Tools',
    description:
      'Curated, tested, and ranked -- the best AI tools for every use case and budget.',
    images: [
      {
        url: 'https://www.shelby-ai.com/images/og-thumbnail.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best AI Tools',
    description:
      'Curated, tested, and ranked -- the best AI tools for every use case and budget.',
    images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
  },
};

export default async function BestOfPage() {
  const bestOf = getAllBestOf();

  return (
    <main className="min-h-screen">
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        {/* Page Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
              Best AI Tools
            </h1>
            <p className="text-lg text-void-400 leading-relaxed">
              Curated, tested, and ranked &mdash; the best AI tools for every use
              case and budget.
            </p>
          </div>
        </ScrollReveal>

        {/* Best-of Grid */}
        {bestOf.length > 0 ? (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bestOf.map((article) => (
              <StaggerItem key={article.slug}>
                <Link
                  href={`/best/${article.slug}`}
                  className="card p-6 no-underline hover:border-signal-500/40 border border-void-700/50 transition-all hover:-translate-y-1 block"
                >
                  {/* Tool count */}
                  <span className="badge-signal mb-3 inline-block">
                    {article.tools.length} tools ranked
                  </span>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-void-100 mb-2">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-void-400 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  {/* Top 3 tool names */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool.name}
                        className="rounded-full bg-void-700/50 px-2.5 py-0.5 text-xs font-medium text-void-300"
                      >
                        #{tool.rank} {tool.name}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center text-sm font-semibold text-signal-400">
                    See Full Rankings <span className="ml-1">&rarr;</span>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <p className="text-void-500 text-lg">
              No best-of lists published yet. Check back soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
