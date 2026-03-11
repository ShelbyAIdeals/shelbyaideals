import type { Metadata } from 'next';
import Link from 'next/link';
import { Tag, Star, ArrowRight, Zap, ExternalLink } from 'lucide-react';
import ScrollReveal from '@/components/motion/ScrollReveal';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import NewsletterSignup from '@/components/NewsletterSignup';
import { getFeaturedDeals, getAllDeals, type Deal } from '@/lib/deals-data';

export const metadata: Metadata = {
  title: 'AI Tool Deals & Free Trials',
  description:
    'Curated AI tool deals, free trials, and exclusive discounts. Save on the best AI writing, video, SEO, and automation tools in 2026.',
  openGraph: {
    title: 'AI Tool Deals & Free Trials | ShelbyAIDeals',
    description:
      'Curated AI tool deals, free trials, and exclusive discounts for creators and small teams.',
    images: [
      {
        url: 'https://shelby-ai.com/images/og-thumbnail.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tool Deals & Free Trials',
    description:
      'Curated AI tool deals, free trials, and exclusive discounts for creators and small teams.',
    images: ['https://shelby-ai.com/images/og-thumbnail.png'],
  },
};

function DealBadge({ deal }: { deal: Deal }) {
  const colors = {
    'free-trial': 'bg-accent-500/15 text-accent-300 border-accent-500/25',
    discount: 'bg-green-500/15 text-green-300 border-green-500/25',
    'free-tier': 'bg-violet-500/15 text-violet-300 border-violet-500/25',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full border ${colors[deal.dealType]}`}
    >
      <Tag size={12} />
      {deal.dealLabel}
    </span>
  );
}

function DealCard({ deal, featured = false }: { deal: Deal; featured?: boolean }) {
  return (
    <div
      className={`relative flex flex-col h-full rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-xl ${
        featured
          ? 'bg-void-900 border-accent-500/30 shadow-[0_0_30px_rgba(5,160,186,0.08)]'
          : 'bg-void-900 border-void-700/60 hover:border-void-600/80'
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-6">
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-accent-500 text-void-950">
            <Star size={12} fill="currentColor" />
            Featured Deal
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-bold text-void-50 font-heading">{deal.tool}</h3>
          <p className="text-xs text-void-500 mt-0.5">{deal.category}</p>
        </div>
        <DealBadge deal={deal} />
      </div>

      <p className="text-sm text-void-300 leading-relaxed mb-4 flex-grow">
        {deal.tagline}
      </p>

      {/* Pricing */}
      {deal.dealPrice && (
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-accent-400">{deal.dealPrice}</span>
          {deal.regularPrice && (
            <span className="text-sm text-void-500 line-through">{deal.regularPrice}</span>
          )}
        </div>
      )}

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {deal.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-void-300">
            <Zap size={14} className="text-accent-500 mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2">
        <a
          href={deal.affiliateUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg transition-colors ${
            featured
              ? 'bg-accent-500 text-void-950 hover:bg-accent-400'
              : 'bg-void-800 text-void-50 border border-void-700/50 hover:bg-void-700 hover:border-void-600'
          }`}
        >
          Get {deal.tool}
          <ExternalLink size={14} />
        </a>
        {deal.reviewSlug && (
          <Link
            href={`/reviews/${deal.reviewSlug}`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-void-400 hover:text-accent-400 transition-colors no-underline"
          >
            Read Full Review
            <ArrowRight size={12} />
          </Link>
        )}
        <span className="text-[10px] text-void-600 text-center">Affiliate link</span>
      </div>
    </div>
  );
}

export default function DealsPage() {
  const featured = getFeaturedDeals();
  const all = getAllDeals();
  const nonFeatured = all.filter((d) => !d.featured);

  return (
    <main className="min-h-screen">
      <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
        {/* Hero */}
        <ScrollReveal>
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/15 text-accent-400 text-xs font-semibold mb-4">
              <Tag size={14} />
              Updated March 2026
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4 font-heading">
              AI Tool Deals & Free Trials
            </h1>
            <p className="text-lg text-void-400 leading-relaxed">
              Curated deals on the best AI tools for creators, freelancers, and small teams.
              Free trials, free tiers, and exclusive discounts — all in one place.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Deals */}
        <ScrollReveal>
          <h2 className="text-xl font-bold text-void-50 font-heading mb-6">
            Top Picks
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {featured.map((deal) => (
            <StaggerItem key={deal.slug}>
              <DealCard deal={deal} featured />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* All Deals */}
        <ScrollReveal>
          <h2 className="text-xl font-bold text-void-50 font-heading mb-6">
            More AI Tool Deals
          </h2>
        </ScrollReveal>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {nonFeatured.map((deal) => (
            <StaggerItem key={deal.slug}>
              <DealCard deal={deal} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Newsletter CTA */}
        <ScrollReveal>
          <NewsletterSignup className="mt-8" />
        </ScrollReveal>
      </div>
    </main>
  );
}
