import type { Metadata } from 'next';
import ToolCompare from '@/components/ToolCompare';
import { getToolSummaries } from '@/lib/tool-summary';

export const metadata: Metadata = {
  title: 'Compare AI Tools Side by Side — Ratings, Pricing & Pros/Cons',
  description:
    'Pick any 2–3 AI tools and compare them side by side: our hands-on rating, starting price, and the real pros and cons from our testing. Free interactive comparison.',
  alternates: { canonical: 'https://www.shelby-ai.com/compare/' },
  openGraph: {
    title: 'Compare AI Tools Side by Side | ShelbyAI',
    description: 'Pick 2–3 AI tools and compare ratings, pricing, and pros/cons from hands-on testing.',
    type: 'website',
    url: 'https://www.shelby-ai.com/compare/',
  },
};

export default function ComparePage() {
  const tools = getToolSummaries();
  return (
    <main className="min-h-screen">
      <div className="container-main pt-44 sm:pt-52 pb-16">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 font-heading mb-4">
            Compare AI Tools Side by Side
          </h1>
          <p className="text-lg text-void-300 leading-relaxed">
            Pick 2 or 3 tools and see our hands-on rating, starting price, and the real pros and
            cons next to each other. No fluff, no pay-to-rank.
          </p>
        </div>
        <ToolCompare tools={tools} />
      </div>
    </main>
  );
}
