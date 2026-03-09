import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, DollarSign } from 'lucide-react';
import { getAllPricingPages } from '@/lib/pricing-data';
import ScrollReveal from '@/components/motion/ScrollReveal';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';

export const metadata: Metadata = {
  title: 'AI Tool Pricing Guides 2026 — Plans, Costs & Value Comparisons',
  description:
    'Complete pricing breakdowns for the top AI tools. Compare plans, features, and costs side-by-side. Updated for 2026 with real pricing data.',
  alternates: {
    canonical: 'https://shelby-ai.com/pricing',
  },
};

export default function PricingIndexPage() {
  const pages = getAllPricingPages();

  return (
    <main className="min-h-screen">
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        <ScrollReveal>
          <nav className="flex items-center gap-2 text-sm text-void-500 mb-8">
            <Link href="/" className="hover:text-accent-400 no-underline transition-colors text-void-500">Home</Link>
            <span>/</span>
            <span className="text-void-300">Pricing</span>
          </nav>
        </ScrollReveal>

        <ScrollReveal>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/15 border border-accent-500/25">
                <DollarSign size={20} className="text-accent-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-void-50 font-heading">
                AI Tool Pricing Guides
              </h1>
            </div>
            <p className="text-lg text-void-300 leading-relaxed">
              Detailed pricing breakdowns for every AI tool we review. Compare plans, understand what you get at each tier, and find the best value for your needs.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => {
            const cheapestPlan = page.plans.find((p) => p.price !== '$0' && p.price !== 'Custom');
            return (
              <StaggerItem key={page.slug}>
                <Link
                  href={`/pricing/${page.slug}`}
                  className="group card flex flex-col p-6 border border-void-700/50 hover:border-accent-500/40 rounded-xl no-underline transition-all h-full"
                >
                  <h2 className="text-lg font-bold text-void-50 font-heading group-hover:text-accent-400 transition-colors mb-2">
                    {page.tool} Pricing
                  </h2>
                  <p className="text-sm text-void-400 leading-relaxed mb-4 flex-1">
                    {page.plans.length} plans compared — from {page.plans[0].price === '$0' ? 'Free' : page.plans[0].price} to {page.plans[page.plans.length - 1].price}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-void-800/60">
                    {cheapestPlan && (
                      <span className="text-xs text-void-500">
                        Starting at <span className="text-accent-400 font-semibold">{cheapestPlan.price}{cheapestPlan.period.includes('month') ? '/mo' : ''}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-sm font-semibold text-accent-400 group-hover:text-accent-300 transition-colors">
                      View Plans <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </main>
  );
}
