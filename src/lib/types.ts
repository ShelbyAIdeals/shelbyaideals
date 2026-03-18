export interface ArticleMeta {
  title: string;
  slug: string;
  excerpt: string;
  description?: string;
  category: Category;
  type: 'review' | 'comparison' | 'best' | 'guide';
  author: string;
  date: string;
  lastUpdated: string;
  lastTested?: string;
  readingTime?: string;
  featured?: boolean;
  featuredImage?: string;
}

export interface SocialLinks {
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  tiktok?: string;
  discord?: string;
}

export interface ReviewMeta extends ArticleMeta {
  type: 'review';
  tool: string;
  rating: number; // 0-5 scale
  toolSlug?: string;
  bestFor: string;
  notFor?: string;             // Who should NOT use this tool
  pricing: PricingTier[];
  pros: string[];
  cons: string[];
  verdict: string;
  affiliateUrl: string;
  affiliateLabel: string;
  // Trust & testing fields
  testDuration?: string;       // e.g. "14 days"
  testType?: string;           // e.g. "Full hands-on review"
  authorBio?: string;          // Short author bio for review context
  authorImage?: string;        // Author headshot path
  // Tool profile fields
  toolLogo?: string;           // e.g. "/logos/pictory.svg"
  socialLinks?: SocialLinks;
  youtubeUrl?: string;         // YouTube embed URL for quick review
  // Video review fields (optional — only present when video exists)
  videoUrl?: string;
  videoPosterUrl?: string;
  videoDuration?: string; // ISO 8601 (e.g. "PT2M30S")
  videoTitle?: string;
  videoDescription?: string;
  videoUploadDate?: string;
  videoPinterestUrl?: string;
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
  | 'ai-video-audio'
  | 'ai-marketing-seo'
  | 'ai-content-productivity'
  // Legacy slugs — mapped to new categories in content.ts
  | 'ai-writing-tools'
  | 'ai-design-tools'
  | 'ai-coding-tools'
  | 'ai-automation'
  | 'ai-seo-tools'
  | 'ai-productivity';

/** Maps legacy category slugs to new consolidated categories */
export const CATEGORY_MAP: Record<string, Category> = {
  'ai-writing-tools': 'ai-content-productivity',
  'ai-design-tools': 'ai-video-audio',
  'ai-coding-tools': 'ai-content-productivity',
  'ai-automation': 'ai-marketing-seo',
  'ai-seo-tools': 'ai-marketing-seo',
  'ai-productivity': 'ai-content-productivity',
  // New slugs map to themselves
  'ai-video-audio': 'ai-video-audio',
  'ai-marketing-seo': 'ai-marketing-seo',
  'ai-content-productivity': 'ai-content-productivity',
};

export interface CategoryInfo {
  slug: Category;
  name: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: 'ai-video-audio',
    name: 'AI Video & Audio',
    description: 'AI video creators, voiceover generators, audio tools, and content repurposing platforms tested for small businesses.',
    icon: 'video',
  },
  {
    slug: 'ai-marketing-seo',
    name: 'AI Marketing & SEO',
    description: 'AI-powered SEO, content optimization, workflow automation, and marketing tools for small teams that want to rank and convert.',
    icon: 'trending-up',
  },
  {
    slug: 'ai-content-productivity',
    name: 'AI Content & Productivity',
    description: 'AI writing assistants, transcription tools, and productivity platforms for creating content faster.',
    icon: 'pen-tool',
  },
];
