import Link from 'next/link';
import { DollarSign, ArrowLeftRight, Layers, Bookmark } from 'lucide-react';
import { alternativesData } from '@/lib/alternatives-data';
import { pricingData } from '@/lib/pricing-data';

interface ToolHubLinksProps {
  toolSlug: string;
  toolName: string;
  category: string;
}

export default function ToolHubLinks({ toolSlug, toolName, category }: ToolHubLinksProps) {
  // Strip -review suffix to get the base tool slug for data lookups
  const baseSlug = toolSlug.replace(/-review$/, '');

  const hasAlternatives = alternativesData.some((a) => a.slug === baseSlug);
  const hasPricing = pricingData.some((p) => p.slug === baseSlug);

  // Map category to best-for slugs
  const categoryBestFor: Record<string, { slug: string; label: string }[]> = {
    'ai-video-audio': [
      { slug: 'video-creators', label: 'Best for Video Creators' },
      { slug: 'small-business', label: 'Best for Small Business' },
    ],
    'ai-marketing-seo': [
      { slug: 'marketing-teams', label: 'Best for Marketing Teams' },
      { slug: 'seo', label: 'Best for SEO' },
      { slug: 'content-writers', label: 'Best for Content Writers' },
    ],
    'ai-content-productivity': [
      { slug: 'freelancers', label: 'Best for Freelancers' },
      { slug: 'solopreneurs', label: 'Best for Solopreneurs' },
      { slug: 'small-business', label: 'Best for Small Business' },
    ],
  };

  const bestForLinks = categoryBestFor[category] ?? [
    { slug: 'small-business', label: 'Best for Small Business' },
  ];

  const links = [
    hasAlternatives && {
      href: `/alternatives/${baseSlug}`,
      icon: ArrowLeftRight,
      label: `${toolName} Alternatives`,
    },
    hasPricing && {
      href: `/pricing/${baseSlug}`,
      icon: DollarSign,
      label: `${toolName} Pricing`,
    },
    ...bestForLinks.slice(0, 2).map((bf) => ({
      href: `/best-for/${bf.slug}`,
      icon: Bookmark,
      label: bf.label,
    })),
  ].filter(Boolean) as { href: string; icon: typeof DollarSign; label: string }[];

  if (links.length === 0) return null;

  return (
    <section className="mt-10 rounded-xl border border-void-700/50 bg-void-900/50 p-6">
      <h2 className="text-lg font-semibold text-void-100 mb-4 flex items-center gap-2">
        <Layers size={18} className="text-signal-400" />
        Explore More
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-void-700/40 bg-void-800/40 text-void-200 hover:text-signal-300 hover:border-signal-500/30 hover:bg-void-800/70 transition-all no-underline group"
          >
            <link.icon size={16} className="text-void-400 group-hover:text-signal-400 transition-colors shrink-0" />
            <span className="text-sm font-medium">{link.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
