import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { getAllUseCasePages } from '@/lib/use-case-data';
import ScrollReveal from '@/components/motion/ScrollReveal';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ExploreMore from '@/components/ExploreMore';

export const metadata: Metadata = {
  title: 'Best AI Tools by Use Case — Find the Right Tool for Your Needs',
  description:
    'Find the best AI tools for your specific use case. Curated recommendations for writers, freelancers, marketers, startups, and more. Tested and reviewed.',
  alternates: {
    canonical: 'https://www.shelby-ai.com/best-for/',
  },
};

export default function BestForIndexPage() {
  const pages = getAllUseCasePages();

  return (
    <main className="min-h-screen">
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        <ScrollReveal>
          <nav className="flex items-center gap-2 text-sm text-void-500 mb-8">
            <Link href="/" className="hover:text-signal-400 no-underline transition-colors text-void-500">Home</Link>
            <span>/</span>
            <span className="text-void-300">Best For</span>
          </nav>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal-500/15 border border-signal-500/25">
                <Users size={20} className="text-signal-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-void-50 font-heading">
                Best AI Tools by Use Case
              </h1>
            </div>
            <p className="text-lg text-void-300 leading-relaxed">
              Not sure which AI tool is right for you? Browse our curated picks organized by what you actually need to get done. Every tool has been tested hands-on.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <StaggerItem key={page.slug}>
              <Link
                href={`/best-for/${page.slug}`}
                className="group card flex flex-col p-6 border border-void-700/50 hover:border-signal-500/40 rounded-xl no-underline transition-all h-full"
              >
                <h2 className="text-lg font-bold text-void-50 font-heading group-hover:text-signal-400 transition-colors mb-2">
                  Best AI Tools for {page.useCase}
                </h2>
                <p className="text-sm text-void-400 leading-relaxed mb-4 flex-1">
                  {page.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {page.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool.slug}
                      className="text-xs bg-void-800/80 border border-void-700/50 rounded-full px-2.5 py-0.5 text-void-300"
                    >
                      {tool.name}
                    </span>
                  ))}
                  {page.tools.length > 3 && (
                    <span className="text-xs text-void-500">+{page.tools.length - 3} more</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-signal-400 group-hover:text-signal-300 transition-colors pt-3 border-t border-void-800/60">
                  View {page.tools.length} Picks <ArrowRight size={14} />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ExploreMore variant="bestfor" />
      </div>
    </main>
  );
}
