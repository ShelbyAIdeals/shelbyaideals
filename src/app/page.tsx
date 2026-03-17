import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import HomeContent from '@/components/HomeContent';
import { getFeaturedArticles, getAllComparisons, getAllGuides, getArticlesByCategory } from '@/lib/content';
import { CATEGORIES } from '@/lib/types';
import type { ReviewMeta } from '@/lib/types';

export const metadata: Metadata = {
  description:
    'Honest AI tool reviews, comparisons, and guides for creators, freelancers, and small teams. Find the best AI tools for your workflow.',
  openGraph: {
    title: 'ShelbyAIDeals — Honest AI Tool Reviews for Creators & Small Teams',
    description:
      'Honest AI tool reviews, comparisons, and guides for creators, freelancers, and small teams. Find the best AI tools for your workflow.',
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
    title: 'ShelbyAIDeals — Honest AI Tool Reviews for Creators & Small Teams',
    description:
      'Honest AI tool reviews, comparisons, and guides for creators, freelancers, and small teams. Find the best AI tools for your workflow.',
    images: ['https://shelby-ai.com/images/og-thumbnail.png'],
  },
};

export default async function HomePage() {
  const featured = getFeaturedArticles();
  const comparisons = getAllComparisons();
  const guides = getAllGuides();

  const featuredReviews = featured
    .filter((a): a is ReviewMeta => a.type === 'review')
    .slice(0, 3);

  const latestComparisons = comparisons.slice(0, 3);
  const latestGuides = guides.slice(0, 3);

  const categoriesWithCount = CATEGORIES.map((cat) => ({
    ...cat,
    articleCount: getArticlesByCategory(cat.slug).length,
  }));

  return (
    <main>
      <Hero />
      <HomeContent
        featuredReviews={featuredReviews}
        latestComparisons={latestComparisons}
        latestGuides={latestGuides}
        categoriesWithCount={categoriesWithCount}
      />
    </main>
  );
}
