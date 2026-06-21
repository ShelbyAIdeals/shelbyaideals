import type { Metadata } from 'next';
import CostCalculator from '@/components/CostCalculator';
import { getToolSummaries } from '@/lib/tool-summary';

export const metadata: Metadata = {
  title: 'AI Tool Stack Cost Calculator — What Your AI Tools Really Cost Per Month',
  description:
    'Add up the monthly cost of your AI tool stack and see cheaper, hands-on-tested alternatives. Free interactive calculator covering AI video, voice, writing, and SEO tools.',
  alternates: { canonical: 'https://www.shelby-ai.com/calculator/' },
  openGraph: {
    title: 'AI Tool Stack Cost Calculator | ShelbyAI',
    description: 'Add up your AI stack cost per month and find cheaper tested alternatives.',
    type: 'website',
    url: 'https://www.shelby-ai.com/calculator/',
  },
};

export default function CalculatorPage() {
  const tools = getToolSummaries();
  return (
    <main className="min-h-screen">
      <div className="container-main pt-44 sm:pt-52 pb-16">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 font-heading mb-4">
            AI Tool Stack Cost Calculator
          </h1>
          <p className="text-lg text-void-300 leading-relaxed">
            Tick the AI tools you use (or are considering) and see what your stack really costs per
            month and per year — plus cheaper, tested alternatives where they exist.
          </p>
        </div>
        <CostCalculator tools={tools} />
      </div>
    </main>
  );
}
