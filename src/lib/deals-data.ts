/**
 * Deals page data — curated AI tool deals with affiliate CTAs.
 * Featured deals are tools with active affiliate programs.
 */

export interface Deal {
  slug: string;
  tool: string;
  toolSlug: string;
  tagline: string;
  dealType: 'free-trial' | 'discount' | 'free-tier';
  dealLabel: string;
  regularPrice?: string;
  dealPrice?: string;
  features: string[];
  affiliateUrl: string;
  reviewSlug?: string;
  category: string;
  featured?: boolean;
}

export const deals: Deal[] = [
  // ── Featured Deals (Active Affiliates) ──────────────────
  {
    slug: 'pictory',
    tool: 'Pictory',
    toolSlug: 'pictory',
    tagline: 'Turn blog posts into branded videos in minutes — no editing skills needed.',
    dealType: 'free-trial',
    dealLabel: 'Free Trial',
    regularPrice: '$19/mo',
    dealPrice: 'Try Free',
    features: [
      'Blog-to-video in one click',
      'Auto-captions & branding',
      'Stock footage library',
      '10+ video templates',
    ],
    affiliateUrl: 'https://pictory.ai?ref=fran26',
    reviewSlug: 'pictory-review',
    category: 'AI Video & Design',
    featured: true,
  },
  {
    slug: 'synthesia',
    tool: 'Synthesia',
    toolSlug: 'synthesia',
    tagline: 'Create AI avatar videos without cameras, actors, or studios.',
    dealType: 'free-tier',
    dealLabel: 'Free Plan Available',
    regularPrice: '$29/mo',
    dealPrice: '$0 to start',
    features: [
      '90+ AI avatars',
      'Text-to-video in 120+ languages',
      'Custom brand kits',
      'No filming required',
    ],
    affiliateUrl: 'https://www.synthesia.io/?via=shelbyai',
    reviewSlug: 'synthesia-review',
    category: 'AI Video & Design',
    featured: true,
  },
  {
    slug: 'elevenlabs',
    tool: 'ElevenLabs',
    toolSlug: 'elevenlabs',
    tagline: 'Ultra-realistic AI voice generation and text-to-speech.',
    dealType: 'free-tier',
    dealLabel: 'Free Tier Available',
    regularPrice: '$5/mo',
    dealPrice: '$0 to start',
    features: [
      'Human-quality AI voices',
      'Voice cloning technology',
      '29+ languages supported',
      'API access for developers',
    ],
    affiliateUrl: 'https://try.elevenlabs.io/3vu715wo9f9y',
    category: 'AI Audio & Voice',
    featured: true,
  },
  {
    slug: 'mangools',
    tool: 'Mangools',
    toolSlug: 'mangools',
    tagline: 'Beginner-friendly SEO toolkit — keyword research, rank tracking, and more.',
    dealType: 'free-trial',
    dealLabel: '10-Day Free Trial',
    regularPrice: '$29.90/mo',
    dealPrice: 'Try Free for 10 Days',
    features: [
      'KWFinder keyword research',
      'SERPChecker & SERPWatcher',
      'LinkMiner backlink analysis',
      'SiteProfiler competitor intel',
    ],
    affiliateUrl: 'https://mangools.com/a/a69b085f86aee0888864a82a9',
    category: 'AI SEO Tools',
    featured: true,
  },

  // ── More Deals (Pending/Other Affiliates) ──────────────
  {
    slug: 'jasper-ai',
    tool: 'Jasper AI',
    toolSlug: 'jasper',
    tagline: 'Enterprise-grade AI writing for marketing teams at scale.',
    dealType: 'free-trial',
    dealLabel: '7-Day Free Trial',
    regularPrice: '$69/mo',
    dealPrice: 'Try Free for 7 Days',
    features: [
      'Brand voice & knowledge base',
      'Marketing campaign workflows',
      'SEO-optimized content',
      'Team collaboration tools',
    ],
    affiliateUrl: 'https://www.jasper.ai',
    reviewSlug: 'jasper-ai-review',
    category: 'AI Writing Tools',
  },
  {
    slug: 'writesonic',
    tool: 'Writesonic',
    toolSlug: 'writesonic',
    tagline: 'Budget AI writer for SEO articles, ads, and social content.',
    dealType: 'free-tier',
    dealLabel: 'Free Plan Available',
    regularPrice: '$16/mo',
    dealPrice: '$0 to start',
    features: [
      'SEO-optimized articles',
      'AI chat with web search',
      'Brand voice customization',
      '25+ languages',
    ],
    affiliateUrl: 'https://writesonic.com',
    reviewSlug: 'writesonic-review',
    category: 'AI Writing Tools',
  },
  {
    slug: 'surfer-seo',
    tool: 'Surfer SEO',
    toolSlug: 'surfer',
    tagline: 'Data-driven content optimization to rank higher on Google.',
    dealType: 'free-trial',
    dealLabel: '7-Day Money-Back',
    regularPrice: '$89/mo',
    dealPrice: 'Risk-Free Trial',
    features: [
      'Content Editor with NLP scoring',
      'SERP Analyzer & keyword research',
      'AI writing assistant (Surfer AI)',
      'Audit existing content',
    ],
    affiliateUrl: 'https://surferseo.com',
    reviewSlug: 'surfer-seo-review',
    category: 'AI SEO Tools',
  },
  {
    slug: 'semrush',
    tool: 'SEMrush',
    toolSlug: 'semrush',
    tagline: 'All-in-one marketing toolkit for SEO, PPC, and competitive research.',
    dealType: 'free-trial',
    dealLabel: 'Free Trial Available',
    regularPrice: '$139.95/mo',
    dealPrice: 'Try Free',
    features: [
      'Keyword research (billions of keywords)',
      'Competitor traffic analysis',
      'Site audit & backlink monitoring',
      'Content marketing toolkit',
    ],
    affiliateUrl: 'https://www.semrush.com',
    reviewSlug: 'semrush-review',
    category: 'AI SEO Tools',
  },
  {
    slug: 'grammarly',
    tool: 'Grammarly',
    toolSlug: 'grammarly',
    tagline: 'AI writing assistant for grammar, clarity, and tone — everywhere you write.',
    dealType: 'free-tier',
    dealLabel: 'Free Forever Plan',
    regularPrice: '$12/mo',
    dealPrice: '$0 to start',
    features: [
      'Grammar & spelling corrections',
      'Tone detection & clarity rewrites',
      'Plagiarism detection (Premium)',
      'Works in 500,000+ apps',
    ],
    affiliateUrl: 'https://www.grammarly.com',
    reviewSlug: 'grammarly-review',
    category: 'AI Writing Tools',
  },
  {
    slug: 'descript',
    tool: 'Descript',
    toolSlug: 'descript',
    tagline: 'Edit video and audio by editing text — AI-powered production studio.',
    dealType: 'free-tier',
    dealLabel: 'Free Plan Available',
    regularPrice: '$24/mo',
    dealPrice: '$0 to start',
    features: [
      'Edit video by editing text',
      'AI transcription & captions',
      'Screen recording & webcam',
      'AI voice cloning (Overdub)',
    ],
    affiliateUrl: 'https://www.descript.com',
    reviewSlug: 'descript-review',
    category: 'AI Video & Design',
  },
  {
    slug: 'otter-ai',
    tool: 'Otter.ai',
    toolSlug: 'otter-ai',
    tagline: 'AI meeting assistant — real-time transcription, notes, and summaries.',
    dealType: 'free-tier',
    dealLabel: 'Free Plan (300 min/mo)',
    regularPrice: '$8.33/mo',
    dealPrice: '$0 to start',
    features: [
      'Real-time meeting transcription',
      'AI Meeting Assistant for Zoom',
      'Custom vocabulary for accuracy',
      'Advanced search across notes',
    ],
    affiliateUrl: 'https://otter.ai',
    reviewSlug: 'otter-ai-review',
    category: 'AI Productivity',
  },
  {
    slug: 'canva',
    tool: 'Canva',
    toolSlug: 'canva',
    tagline: 'Design anything — social posts, presentations, and more with AI magic.',
    dealType: 'free-tier',
    dealLabel: 'Free Forever Plan',
    regularPrice: '$15/mo',
    dealPrice: '$0 to start',
    features: [
      'AI image generation (Magic Media)',
      'Thousands of templates',
      'Brand Kit for consistency',
      'Real-time collaboration',
    ],
    affiliateUrl: 'https://www.canva.com',
    category: 'AI Design',
  },
];

export function getFeaturedDeals(): Deal[] {
  return deals.filter((d) => d.featured);
}

export function getAllDeals(): Deal[] {
  return deals;
}
