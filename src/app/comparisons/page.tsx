import type { Metadata } from 'next';
import { getAllComparisons } from '@/lib/content';
import ComparisonsContent from '@/components/ComparisonsContent';

export const metadata: Metadata = {
  title: 'AI Tool Comparisons',
  description:
    'Head-to-head comparisons with real testing, side-by-side features, and clear winners by scenario.',
  openGraph: {
    title: 'AI Tool Comparisons',
    description:
      'Head-to-head comparisons with real testing, side-by-side features, and clear winners by scenario.',
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
    title: 'AI Tool Comparisons',
    description:
      'Head-to-head comparisons with real testing, side-by-side features, and clear winners by scenario.',
    images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
  },
};

export default async function ComparisonsPage() {
  const comparisons = getAllComparisons();

  return (
    <main className="min-h-screen">
      <ComparisonsContent comparisons={comparisons} />
    </main>
  );
}
