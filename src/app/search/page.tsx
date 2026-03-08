import { Suspense } from 'react';
import { getAllArticles } from '@/lib/content';
import SearchResults from '@/components/SearchResults';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search AI Tools',
  description: 'Search our AI tool reviews, comparisons, and guides.',
  openGraph: {
    title: 'Search AI Tools',
    description: 'Search our AI tool reviews, comparisons, and guides.',
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
    title: 'Search AI Tools',
    description: 'Search our AI tool reviews, comparisons, and guides.',
    images: ['https://shelby-ai.com/images/og-thumbnail.png'],
  },
};

export default function SearchPage() {
  const articles = getAllArticles().map((a) => ({
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    type: a.type,
    category: a.category,
    date: a.date,
    readingTime: a.readingTime,
  }));

  return (
    <main className="pt-48 sm:pt-52 pb-12 sm:pb-16">
      <div className="container-main">
        <Suspense fallback={<p className="text-void-500">Loading search...</p>}>
          <SearchResults articles={articles} />
        </Suspense>
      </div>
    </main>
  );
}
