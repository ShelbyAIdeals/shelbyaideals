import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/motion/ScrollProgress';
import MistEffect from '@/components/MistEffect';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ShelbyAIDeals — Honest AI Tool Reviews for Creators & Small Teams',
    template: '%s | ShelbyAIDeals',
  },
  description:
    'We test AI tools the way you actually use them. Honest reviews, real comparisons, and workflow-first recommendations for creators, freelancers, and small teams.',
  keywords: [
    'AI tools',
    'AI tool reviews',
    'best AI tools',
    'AI writing tools',
    'AI productivity',
    'AI for freelancers',
    'AI for small teams',
  ],
  authors: [{ name: 'ShelbyAIDeals' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ShelbyAIDeals',
    title: 'ShelbyAIDeals — Honest AI Tool Reviews for Creators & Small Teams',
    description:
      'We test AI tools the way you actually use them. Honest reviews, real comparisons, and workflow-first recommendations.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShelbyAIDeals',
    description:
      'Honest AI tool reviews for creators, freelancers, and small teams.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <MistEffect />
        <ScrollProgress />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
