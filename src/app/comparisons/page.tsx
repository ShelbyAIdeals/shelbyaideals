import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllComparisons } from '@/lib/content';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ScrollReveal from '@/components/motion/ScrollReveal';

export const metadata: Metadata = {
  title: 'AI Tool Comparisons',
  description:
    'Head-to-head comparisons with real testing, side-by-side features, and clear winners by scenario.',
};

export default async function ComparisonsPage() {
  const comparisons = getAllComparisons();

  return (
    <main className="min-h-screen">
      <div className="container-main pt-44 sm:pt-48 pb-12 sm:pb-16">
        {/* Page Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
              AI Tool Comparisons
            </h1>
            <p className="text-lg text-void-400 leading-relaxed">
              Head-to-head comparisons with real testing, side-by-side features,
              and clear winners by scenario.
            </p>
          </div>
        </ScrollReveal>

        {/* Comparisons Grid */}
        {comparisons.length > 0 ? (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comp) => (
              <StaggerItem key={comp.slug}>
                <Link
                  href={`/comparisons/${comp.slug}`}
                  className="card p-6 no-underline hover:border-accent-500/40 border border-void-700/50 transition-all hover:-translate-y-1 block"
                >
                  {/* Tools involved */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {comp.tools.map((tool) => (
                      <span key={tool} className="badge-accent">
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-void-100 mb-2">
                    {comp.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-void-400 leading-relaxed mb-4">
                    {comp.excerpt}
                  </p>

                  {/* Winner count + link */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-void-400">
                      {comp.winners.length}{' '}
                      {comp.winners.length === 1 ? 'scenario' : 'scenarios'} compared
                    </span>
                    <span className="inline-flex items-center text-sm font-semibold text-accent-400">
                      Read Comparison <span className="ml-1">&rarr;</span>
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <p className="text-void-500 text-lg">
              No comparisons published yet. Check back soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
