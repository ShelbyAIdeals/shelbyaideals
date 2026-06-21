import type { Metadata } from 'next';
import ToolFinder, { type FinderGoal } from '@/components/ToolFinder';
import { useCaseData } from '@/lib/use-case-data';
import { getAllReviews } from '@/lib/content';

export const metadata: Metadata = {
  title: 'AI Tool Finder — Get a Personalized Recommendation in 30 Seconds',
  description:
    'Answer 2 quick questions and get a hands-on-tested AI tool recommendation matched to your goal and budget. Covers AI video, voice, writing, SEO and marketing tools.',
  alternates: { canonical: 'https://www.shelby-ai.com/finder/' },
  openGraph: {
    title: 'AI Tool Finder — Personalized AI Tool Recommendations',
    description: 'Answer 2 quick questions, get a tested AI tool match for your goal and budget.',
    type: 'website',
    url: 'https://www.shelby-ai.com/finder/',
  },
};

/** Lowest monthly dollar figure in a pricing string. "Free…" with no number → 0. */
function parseMinPrice(pricing: string): number {
  const nums = (pricing.match(/\$\s?(\d+(?:\.\d+)?)/g) ?? []).map((m) => parseFloat(m.replace(/[^0-9.]/g, '')));
  if (nums.length > 0) return Math.min(...nums);
  return /free/i.test(pricing) ? 0 : Number.POSITIVE_INFINITY;
}

// Goals map to existing, hand-curated use-case pages so recommendations stay editorial + real.
const GOAL_MAP: { id: string; label: string; emoji: string; useCaseSlug: string }[] = [
  { id: 'video', label: 'Create & edit videos', emoji: '🎬', useCaseSlug: 'video-creators' },
  { id: 'writing', label: 'Write content & blog posts', emoji: '✍️', useCaseSlug: 'content-writers' },
  { id: 'seo', label: 'Rank on Google (SEO)', emoji: '📈', useCaseSlug: 'seo' },
  { id: 'marketing', label: 'Run marketing campaigns', emoji: '📣', useCaseSlug: 'marketing-teams' },
  { id: 'smallbiz', label: 'Run my small business', emoji: '🏪', useCaseSlug: 'small-business' },
  { id: 'freelance', label: 'Work as a freelancer', emoji: '💼', useCaseSlug: 'freelancers' },
];

export default function FinderPage() {
  const ratingBySlug = new Map(
    getAllReviews()
      .filter((r) => typeof r.rating === 'number' && r.rating > 0)
      .map((r) => [r.slug, r.rating]),
  );

  const goals: FinderGoal[] = GOAL_MAP.map((g) => {
    const page = useCaseData.find((p) => p.slug === g.useCaseSlug);
    const tools = (page?.tools ?? []).map((t) => ({
      name: t.name,
      pricing: t.pricing,
      minPrice: parseMinPrice(t.pricing),
      standoutFeature: t.standoutFeature,
      reviewSlug: t.reviewSlug,
      affiliateUrl: t.affiliateUrl,
      rating: t.reviewSlug ? ratingBySlug.get(t.reviewSlug) : undefined,
    }));
    return { id: g.id, label: g.label, emoji: g.emoji, useCaseSlug: g.useCaseSlug, tools };
  }).filter((g) => g.tools.length > 0);

  return (
    <main className="min-h-screen">
      <div className="container-main pt-44 sm:pt-52 pb-16">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 font-heading mb-4">
            AI Tool Finder
          </h1>
          <p className="text-lg text-void-300 leading-relaxed">
            Answer 2 quick questions and get a hands-on-tested AI tool matched to your goal and budget.
            No fluff, no pay-to-rank — just our honest top pick.
          </p>
        </div>
        <ToolFinder goals={goals} />
      </div>
    </main>
  );
}
