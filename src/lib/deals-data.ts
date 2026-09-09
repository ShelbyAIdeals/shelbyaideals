/**
 * Deals page data — curated AI tool deals with affiliate CTAs.
 * Featured deals are tools with active affiliate programs.
 *
 * Affiliate URLs are fallbacks — accessor functions resolve
 * through the centralized affiliate.ts for tracked links when available.
 */

import { resolveAffiliateUrl } from './affiliate';

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
  /**
   * Date this offer was checked against the vendor's own site (YYYY-MM-DD).
   * A deals page whose only date is "page updated in March" tells a reader —
   * and an AI assistant — nothing about whether an individual offer is live.
   * Deals without this date render with an explicit "not re-verified" note.
   */
  dateVerified?: string;
  /** The vendor page the offer was verified against. */
  sourceUrl?: string;
  /** Trial length where the deal is a trial, e.g. "7 days". */
  trialLength?: string;
  /** Eligibility constraints, e.g. "New customers only". */
  eligibility?: string;
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
    regularPrice: '$29/mo ($25 annual)',
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
    featured: false,
    dateVerified: '2026-09-09',
    sourceUrl: 'https://pictory.ai/pricing',
  },
  {
    slug: 'synthesia',
    tool: 'Synthesia',
    toolSlug: 'synthesia',
    tagline: 'Create AI avatar videos without cameras, actors, or studios.',
    dealType: 'free-tier',
    dealLabel: 'Free Plan (10 min/mo)',
    regularPrice: '$29/mo ($18 annual)',
    dealPrice: '$0 to start',
    features: [
      '10 free video minutes every month',
      '125+ AI avatars on paid plans',
      'Text-to-video in 120+ languages',
      'No filming required',
    ],
    affiliateUrl: 'https://www.synthesia.io/?via=shelbyai',
    reviewSlug: 'synthesia-review',
    category: 'AI Video & Design',
    featured: true,
    dateVerified: '2026-09-09',
    sourceUrl: 'https://www.synthesia.io/pricing',
    eligibility: 'No credit card required for the free plan',
  },
  {
    slug: 'elevenlabs',
    tool: 'ElevenLabs',
    toolSlug: 'elevenlabs',
    tagline: 'Ultra-realistic AI voice generation and text-to-speech.',
    dealType: 'free-tier',
    dealLabel: 'Free Tier (10k credits/mo)',
    regularPrice: '$6/mo',
    dealPrice: '$0 to start',
    features: [
      'Human-quality AI voices',
      'Voice cloning from Starter ($6/mo)',
      'Full toolset: TTS, STT, music, SFX',
      'Commercial license on paid plans',
    ],
    affiliateUrl: 'https://try.elevenlabs.io/3vu715wo9f9y',
    category: 'AI Audio & Voice',
    featured: false,
    dateVerified: '2026-09-09',
    sourceUrl: 'https://elevenlabs.io/pricing',
    eligibility: 'Free tier is non-commercial use only',
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
    affiliateUrl: 'https://mangools.com#a69b085f86aee0888864a82a9',
    category: 'AI SEO Tools',
    featured: true,
    dateVerified: '2026-09-09',
    sourceUrl: 'https://mangools.com/plans-and-pricing',
    trialLength: '10 days',
    eligibility: 'No credit card required; 48-hour money-back guarantee on paid plans',
  },
  {
    slug: 'frase',
    tool: 'Frase',
    toolSlug: 'frase',
    tagline: 'AI content briefs and SERP-optimized writing that actually ranks.',
    dealType: 'free-trial',
    dealLabel: '7-Day Free Trial',
    regularPrice: '$49/mo ($39 annual)',
    dealPrice: 'Try Free for 7 Days',
    features: [
      'AI-driven content briefs',
      'SERP analysis & SEO scoring',
      'Built-in AI writing assistant',
      'Existing content optimization',
    ],
    affiliateUrl: 'https://www.frase.io/?via=shelby-ai',
    reviewSlug: 'frase-review',
    category: 'AI SEO Tools',
    featured: true,
    dateVerified: '2026-09-09',
    sourceUrl: 'https://www.frase.io/pricing/',
    trialLength: '7 days',
    eligibility: 'No credit card required',
  },

  // ── More Deals (Pending/Other Affiliates) ──────────────
  {
    slug: 'jasper-ai',
    tool: 'Jasper AI',
    toolSlug: 'jasper',
    tagline: 'Enterprise-grade AI writing for marketing teams at scale.',
    dealType: 'free-trial',
    dealLabel: '7-Day Free Trial',
    regularPrice: '$69/mo ($59 annual)',
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
    dateVerified: '2026-09-09',
    sourceUrl: 'https://www.jasper.ai/pricing',
    trialLength: '7 days',
  },
  {
    slug: 'writesonic',
    tool: 'Writesonic',
    toolSlug: 'writesonic',
    tagline: 'Budget AI writer for SEO articles, ads, and social content.',
    dealType: 'free-trial',
    dealLabel: 'Free Trial (no card)',
    regularPrice: '$79/mo',
    dealPrice: 'Try Free',
    features: [
      'SEO article pipeline (15/mo on Starter)',
      'Site audits included',
      'Brand voice customization',
      '25+ languages',
    ],
    affiliateUrl: 'https://writesonic.com',
    reviewSlug: 'writesonic-review',
    category: 'AI Writing Tools',
    dateVerified: '2026-09-09',
    sourceUrl: 'https://writesonic.com/pricing',
    eligibility: 'No credit card needed',
  },
  {
    slug: 'surfer-seo',
    tool: 'Surfer SEO',
    toolSlug: 'surfer',
    tagline: 'Data-driven content optimization to rank higher on Google.',
    dealType: 'free-trial',
    dealLabel: '7-Day Money-Back',
    regularPrice: '€49/mo (Discovery)',
    dealPrice: 'Risk-Free Trial',
    features: [
      'Content Editor with NLP scoring',
      'SERP Analyzer & keyword research',
      'AI-visibility tracking (Standard+)',
      'Audit existing content',
    ],
    affiliateUrl: 'https://surferseo.com',
    reviewSlug: 'surfer-seo-review',
    category: 'AI SEO Tools',
    dateVerified: '2026-09-09',
    sourceUrl: 'https://surferseo.com/pricing/',
    eligibility:
      'Surfer replaced its free trial with a 7-day money-back guarantee: you pay up front and request a refund within 7 days. Excludes add-ons, overage fees, renewals, and per-article Surfer AI charges.',
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
    dateVerified: '2026-09-09',
    sourceUrl: 'https://www.semrush.com/prices/',
    trialLength: '7 days',
    eligibility:
      'Price shown is the classic SEO Pro plan. Semrush also sells "Semrush One" bundles (SEO plus AI visibility) from $199/mo.',
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
    dateVerified: '2026-09-09',
    sourceUrl: 'https://www.grammarly.com/plans',
    eligibility: 'Free plan is permanent, no card required. Paid tier is now named Pro.',
  },
  {
    slug: 'descript',
    tool: 'Descript',
    toolSlug: 'descript',
    tagline: 'Edit video and audio by editing text — AI-powered production studio.',
    dealType: 'free-tier',
    dealLabel: 'Free Plan (60 min/mo)',
    regularPrice: '$24/mo ($16 annual)',
    dealPrice: '$0 to start',
    features: [
      'Edit video by editing text',
      'AI transcription & captions',
      'Screen recording & webcam',
      '100 one-time AI credits free',
    ],
    affiliateUrl: 'https://www.descript.com',
    reviewSlug: 'descript-review',
    category: 'AI Video & Design',
    dateVerified: '2026-09-09',
    sourceUrl: 'https://www.descript.com/pricing',
  },
  {
    slug: 'otter-ai',
    tool: 'Otter.ai',
    toolSlug: 'otter-ai',
    tagline: 'AI meeting assistant — real-time transcription, notes, and summaries.',
    dealType: 'free-tier',
    dealLabel: 'Free Plan (300 min/mo)',
    regularPrice: '$8.33/mo (annual)',
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
    dateVerified: '2026-09-09',
    sourceUrl: 'https://otter.ai/pricing',
  },
  {
    slug: 'canva',
    tool: 'Canva',
    toolSlug: 'canva',
    tagline: 'Design anything — social posts, presentations, and more with AI magic.',
    dealType: 'free-tier',
    dealLabel: 'Free Forever Plan',
    regularPrice: '$18/mo Pro ($144/yr)',
    dealPrice: '$0 to start',
    features: [
      'AI image generation (Magic Media)',
      'Thousands of templates',
      'Brand Kit for consistency',
      'Real-time collaboration',
    ],
    affiliateUrl: 'https://www.canva.com',
    category: 'AI Design',
    dateVerified: '2026-09-09',
    sourceUrl: 'https://www.canva.com/pricing/',
    eligibility:
      'Free plan is permanent, no card required. Canva Pro rose to $18/mo; Business is $25/user/mo.',
  },
  {
    slug: 'appsumo',
    tool: 'AppSumo',
    toolSlug: 'appsumo',
    tagline: 'Lifetime deals on vetted AI and software tools — pay once, use forever.',
    dealType: 'discount',
    dealLabel: 'Lifetime Deals',
    dealPrice: 'Pay once',
    features: [
      'Lifetime access — no subscriptions',
      'New AI tool deals every week',
      '60-day money-back guarantee',
      'Vetted, launch-stage software',
    ],
    affiliateUrl: 'https://appsumo.8odi.net/NG9YMP',
    category: 'Deals Marketplace',
    featured: true,
    dateVerified: '2026-09-09',
    sourceUrl: 'https://help.appsumo.com/article/32-refund-faq',
    eligibility:
      '60-day money-back guarantee on most Marketplace products; digital books and some products are excluded or carry shorter windows.',
  },
  {
    slug: 'scalenut',
    tool: 'Scalenut',
    toolSlug: 'scalenut',
    tagline: 'AI SEO content platform — keyword planning, briefs, and articles in one flow.',
    dealType: 'free-trial',
    dealLabel: '7-Day Free Trial',
    regularPrice: '$59/mo (Starter)',
    dealPrice: 'Try Free for 7 Days',
    features: [
      'Keyword clusters & content plans',
      'SEO-optimized article writer',
      'NLP terms from top SERP results',
      'Content briefs for writers',
    ],
    affiliateUrl: 'https://scalenut.com/?fpr=shelby-ai',
    category: 'AI Marketing & SEO',
    featured: true,
    dateVerified: '2026-09-09',
    sourceUrl: 'https://scalenut.com/pricing',
    trialLength: '7 days',
    eligibility:
      'Annual billing was discounted to $24/mo on Starter under a limited-time 60% offer at time of checking — confirm it is still running before you buy.',
  },
];

/** Resolve affiliate URL through centralized affiliate.ts */
function withResolvedDealUrl(deal: Deal): Deal {
  return {
    ...deal,
    affiliateUrl: resolveAffiliateUrl(deal.toolSlug, deal.affiliateUrl),
  };
}

export function getFeaturedDeals(): Deal[] {
  return deals.filter((d) => d.featured).map(withResolvedDealUrl);
}

export function getAllDeals(): Deal[] {
  return deals.map(withResolvedDealUrl);
}
