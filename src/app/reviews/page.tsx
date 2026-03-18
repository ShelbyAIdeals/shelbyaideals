import type { Metadata } from 'next';
import { getAllReviews } from '@/lib/content';
import ToolsPageContent from '@/components/ToolsPageContent';
import { CATEGORIES } from '@/lib/types';

export const metadata: Metadata = {
  title: 'AI Video, Audio & Marketing Tools — Tested & Reviewed',
  description:
    'Browse 31 AI tools tested hands-on for small businesses. Video creators, SEO tools, and marketing automation — reviewed, rated, and ranked.',
  openGraph: {
    title: 'AI Video, Audio & Marketing Tools — Tested & Reviewed',
    description:
      'Browse 31 AI tools tested hands-on for small businesses. Video creators, SEO tools, and marketing automation — reviewed, rated, and ranked.',
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
    title: 'AI Tools Directory — Browse & Compare',
    description:
      'Browse and compare the best AI tools — reviewed, rated, and ranked for creators and small teams.',
    images: ['https://shelby-ai.com/images/og-thumbnail.png'],
  },
};

export default async function ReviewsPage() {
  const reviews = getAllReviews();

  const categoriesWithCount = CATEGORIES.map((cat) => ({
    ...cat,
    articleCount: reviews.filter((r) => r.category === cat.slug).length,
  }));

  return (
    <main className="min-h-screen">
      <ToolsPageContent reviews={reviews} categoriesWithCount={categoriesWithCount} />
    </main>
  );
}
