export interface ArticleMeta {
  title: string;
  slug: string;
  excerpt: string;
  category: Category;
  type: 'review' | 'comparison' | 'best' | 'guide';
  author: string;
  date: string;
  lastUpdated: string;
  readingTime?: string;
  featured?: boolean;
  featuredImage?: string;
}

export interface ReviewMeta extends ArticleMeta {
  type: 'review';
  tool: string;
  rating: number; // 0-5 scale
  toolSlug?: string;
  bestFor: string;
  pricing: PricingTier[];
  pros: string[];
  cons: string[];
  verdict: string;
  affiliateUrl: string;
  affiliateLabel: string;
}

export interface ComparisonMeta extends ArticleMeta {
  type: 'comparison';
  tools: string[];
  winners: WinnerScenario[];
  affiliateUrls: Record<string, string>;
}

export interface BestOfMeta extends ArticleMeta {
  type: 'best';
  tools: RankedTool[];
}

export interface GuideMeta extends ArticleMeta {
  type: 'guide';
  recommendedTools: RecommendedTool[];
}

export interface PricingTier {
  plan: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  affiliateUrl?: string;
}

export interface WinnerScenario {
  scenario: string;
  winner: string;
  reason: string;
}

export interface RankedTool {
  rank: number;
  name: string;
  tagline: string;
  rating: number; // 0-5 scale
  pricing: string;
  bestFor: string;
  affiliateUrl: string;
}

export interface RecommendedTool {
  name: string;
  category: string;
  pricing: string;
  affiliateUrl: string;
  description: string;
}

export type Category =
  | 'ai-writing-tools'
  | 'ai-design-tools'
  | 'ai-coding-tools'
  | 'ai-automation'
  | 'ai-seo-tools'
  | 'ai-productivity';

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'ai-writing-tools',
    name: 'AI Writing Tools',
    description: 'AI-powered writing, copywriting, and content generation tools reviewed for creators and small teams.',
    icon: 'pen-tool',
  },
  {
    slug: 'ai-design-tools',
    name: 'AI Design & Video Tools',
    description: 'AI image generators, graphic design tools, and video creation platforms for non-designers.',
    icon: 'palette',
  },
  {
    slug: 'ai-coding-tools',
    name: 'AI Coding Tools',
    description: 'AI code assistants, IDE integrations, and no-code AI builders for developers and non-technical founders.',
    icon: 'code',
  },
  {
    slug: 'ai-automation',
    name: 'AI Automation',
    description: 'Workflow automation tools, AI agents, and integration platforms to eliminate repetitive work.',
    icon: 'zap',
  },
  {
    slug: 'ai-seo-tools',
    name: 'AI SEO Tools',
    description: 'AI-powered SEO, content optimization, and keyword research tools for small sites and freelancers.',
    icon: 'search',
  },
  {
    slug: 'ai-productivity',
    name: 'AI Productivity',
    description: 'Meeting AI, transcription, note-taking, and project management tools that save hours every week.',
    icon: 'clock',
  },
];
