import type { Metadata } from 'next';
import { getAllReviews } from '@/lib/content';
import ReviewsContent from '@/components/ReviewsContent';

export const metadata: Metadata = {
  title: 'AI Tool Reviews',
  description:
    'In-depth, hands-on reviews of the AI tools that matter most for creators and small teams.',
  openGraph: {
    title: 'AI Tool Reviews',
    description:
      'In-depth, hands-on reviews of the AI tools that matter most for creators and small teams.',
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
    title: 'AI Tool Reviews',
    description:
      'In-depth, hands-on reviews of the AI tools that matter most for creators and small teams.',
    images: ['https://shelby-ai.com/images/og-thumbnail.png'],
  },
};

export default async function ReviewsPage() {
  const reviews = getAllReviews();

  return (
    <main className="min-h-screen">
      <ReviewsContent reviews={reviews} />
    </main>
  );
}
