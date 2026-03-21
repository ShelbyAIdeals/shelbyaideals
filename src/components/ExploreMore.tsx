import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Variant = 'static' | 'pricing' | 'alternatives' | 'bestfor' | 'legal';

interface ExploreLink {
  label: string;
  description: string;
  href: string;
}

const linkSets: Record<Variant, ExploreLink[]> = {
  static: [
    { label: 'Browse All Reviews', description: 'Honest, hands-on AI tool reviews with real test results.', href: '/reviews' },
    { label: 'Tool Comparisons', description: 'Side-by-side comparisons to help you choose the right tool.', href: '/comparisons' },
    { label: 'Guides & Tutorials', description: 'Practical guides for getting the most out of AI tools.', href: '/guides' },
    { label: 'Deals & Free Trials', description: 'Curated discounts and extended trials on top AI tools.', href: '/deals' },
  ],
  pricing: [
    { label: 'Tool Alternatives', description: 'Find similar tools and compare your options.', href: '/alternatives' },
    { label: 'Best Tools by Role', description: 'Curated picks for writers, marketers, freelancers, and more.', href: '/best-for' },
    { label: 'All Tool Reviews', description: 'In-depth reviews with real testing and honest verdicts.', href: '/reviews' },
    { label: 'Deals & Free Trials', description: 'Save on top AI tools with exclusive discounts.', href: '/deals' },
  ],
  alternatives: [
    { label: 'Pricing Guides', description: 'Detailed pricing breakdowns for every tool we review.', href: '/pricing' },
    { label: 'Best Tools by Role', description: 'Find the right AI tool based on what you do.', href: '/best-for' },
    { label: 'All Tool Reviews', description: 'Honest reviews backed by hands-on testing.', href: '/reviews' },
    { label: 'Tool Comparisons', description: 'Head-to-head comparisons of popular AI tools.', href: '/comparisons' },
  ],
  bestfor: [
    { label: 'Pricing Guides', description: 'Compare plans and find the best value for your budget.', href: '/pricing' },
    { label: 'Tool Alternatives', description: 'Explore alternatives to popular AI tools.', href: '/alternatives' },
    { label: 'All Tool Reviews', description: 'Every AI tool we have tested, reviewed in depth.', href: '/reviews' },
    { label: 'Guides & Tutorials', description: 'Learn how to get the most from your AI tools.', href: '/guides' },
  ],
  legal: [
    { label: 'Browse All Reviews', description: 'See every AI tool we have tested and reviewed.', href: '/reviews' },
    { label: 'How We Review', description: 'Our testing methodology and editorial standards.', href: '/how-we-review' },
    { label: 'About Us', description: 'Meet the team behind ShelbyAIDeals.', href: '/about' },
    { label: 'FAQ', description: 'Answers to common questions about our site and process.', href: '/faq' },
  ],
};

export default function ExploreMore({ variant }: { variant: Variant }) {
  const links = linkSets[variant];

  return (
    <section className="mt-16 pt-12 border-t border-void-800/60">
      <h2 className="text-xl font-bold text-void-100 mb-6 font-heading">
        Continue Exploring
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex items-start gap-3 p-4 rounded-xl border border-void-700/50 bg-void-900/40 hover:border-signal-500/40 no-underline transition-all"
          >
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold text-void-100 group-hover:text-signal-400 transition-colors">
                {link.label}
              </span>
              <p className="text-xs text-void-400 mt-1 leading-relaxed">
                {link.description}
              </p>
            </div>
            <ArrowRight
              size={16}
              className="text-void-600 group-hover:text-signal-400 transition-colors mt-0.5 flex-shrink-0"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
