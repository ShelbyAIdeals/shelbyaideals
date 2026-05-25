import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.shelby-ai.com/newsletter/' },
};

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
