import type { Metadata } from 'next';
import { getAllGuides } from '@/lib/content';
import GuidesContent from '@/components/GuidesContent';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'AI Guides & Tutorials',
  description:
    'Step-by-step guides to building AI-powered workflows that save time and grow your business.',
  openGraph: {
    title: 'AI Guides & Tutorials',
    description:
      'Step-by-step guides to building AI-powered workflows that save time and grow your business.',
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
    title: 'AI Guides & Tutorials',
    description:
      'Step-by-step guides to building AI-powered workflows that save time and grow your business.',
    images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
  },
  alternates: {
    canonical: 'https://www.shelby-ai.com/guides/',
  },
};

export default async function GuidesPage() {
  const guides = getAllGuides();

  return (
    <main className="min-h-screen">
      <JsonLd
        type="collectionpage"
        data={{
          name: 'AI Tool Guides',
          description:
            'Step-by-step guides to building AI-powered workflows that save time and grow your business.',
          url: 'https://www.shelby-ai.com/guides/',
        }}
      />
      <JsonLd
        type="itemlist"
        data={{
          name: 'AI Guides & Tutorials',
          items: guides.map((g) => ({
            name: g.title,
            url: `https://www.shelby-ai.com/guides/${g.slug}/`,
          })),
        }}
      />
      <GuidesContent guides={guides} />
    </main>
  );
}
