import type { Metadata } from 'next';
import { getAllGuides } from '@/lib/content';
import GuidesContent from '@/components/GuidesContent';

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
        url: 'https://shelby-ai.com/images/og-thumbnail.png',
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
    images: ['https://shelby-ai.com/images/og-thumbnail.png'],
  },
};

export default async function GuidesPage() {
  const guides = getAllGuides();

  return (
    <main className="min-h-screen">
      <GuidesContent guides={guides} />
    </main>
  );
}
