import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllAlternativesPages } from '@/lib/alternatives-data';
import ScrollReveal from '@/components/motion/ScrollReveal';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';

export const metadata: Metadata = {
  title: 'AI Tool Alternatives',
  description:
    'Find the best alternatives to popular AI tools. Side-by-side comparisons with real pricing, features, and honest recommendations from hands-on testing.',
  openGraph: {
    title: 'AI Tool Alternatives | ShelbyAIDeals',
    description:
      'Find the best alternatives to popular AI tools. Side-by-side comparisons with real pricing, features, and honest recommendations.',
    type: 'website',
    url: 'https://www.shelby-ai.com/alternatives',
  },
  alternates: {
    canonical: 'https://www.shelby-ai.com/alternatives/',
  },
};

export default function AlternativesPage() {
  const pages = getAllAlternativesPages();

  return (
    <main className="min-h-screen">
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        {/* Page Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4 font-heading">
              AI Tool Alternatives
            </h1>
            <p className="text-lg text-void-400 leading-relaxed">
              Not every tool is the right fit. Explore tested alternatives to the
              most popular AI tools, with real pricing and honest recommendations.
            </p>
          </div>
        </ScrollReveal>

        {/* Alternatives Grid */}
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <StaggerItem key={page.slug}>
              <Link
                href={`/alternatives/${page.slug}`}
                className="card p-6 no-underline hover:border-signal-500/40 border border-void-700/50 transition-all hover:-translate-y-1 block h-full"
              >
                {/* Tool badge */}
                <span className="badge-signal mb-3 inline-block">
                  {page.tool}
                </span>

                {/* Title */}
                <h2 className="text-lg font-bold text-void-100 mb-2 font-heading">
                  {page.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-void-400 leading-relaxed mb-4">
                  {page.description}
                </p>

                {/* Alternatives count + link */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-void-500">
                    {page.alternatives.length} alternatives compared
                  </span>
                  <span className="inline-flex items-center text-sm font-semibold text-signal-400">
                    View Alternatives <span className="ml-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom section */}
        <ScrollReveal>
          <div className="mt-14 text-center">
            <p className="text-sm text-void-500 max-w-lg mx-auto leading-relaxed">
              We add new alternatives pages as we review more tools. Have a
              suggestion?{' '}
              <Link
                href="/contact"
                className="text-signal-400 hover:text-signal-300 no-underline"
              >
                Let us know
              </Link>
              .
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
