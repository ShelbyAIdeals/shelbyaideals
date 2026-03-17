import type { Metadata } from 'next';
import { getFeaturedDeals, getAllDeals } from '@/lib/deals-data';
import DealsContent from '@/components/DealsContent';

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

export default function DealsPage() {
  const featured = getFeaturedDeals();
  const all = getAllDeals();
  const nonFeatured = all.filter((d) => !d.featured);

  return (
    <main className="min-h-screen">
      <DealsContent featured={featured} nonFeatured={nonFeatured} />
    </main>
  );
}
