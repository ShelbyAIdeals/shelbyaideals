/**
 * Programmatic SEO data for "[Tool] Pricing [Year]" pages.
 * Each entry generates a static page at /pricing/[slug].
 * High-intent search queries — people searching pricing are close to buying.
 */

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  affiliateUrl: string;
}

export interface PricingPage {
  slug: string;
  tool: string;
  title: string;
  description: string;
  intro: string;
  lastUpdated: string;
  reviewSlug?: string;
  freeTrialAvailable: boolean;
  freeTrialDays?: number;
  moneyBackGuarantee?: string;
  plans: PricingPlan[];
  faqs: { question: string; answer: string }[];
}

export const pricingData: PricingPage[] = [
  // ── Jasper AI Pricing ──────────────────────────────────
  {
    slug: 'jasper-ai',
    tool: 'Jasper AI',
    title: 'Jasper AI Pricing 2026: Plans, Costs & Which One Is Worth It',
    description:
      'Complete breakdown of Jasper AI pricing in 2026. Compare Creator, Pro, and Business plans. Find out which Jasper plan gives you the best value for your needs.',
    intro:
      'Jasper AI offers three main pricing tiers aimed at different team sizes and use cases. Here is a detailed breakdown of what each plan costs, what you get, and which one makes sense for your situation. All prices are based on annual billing — monthly billing costs more.',
    lastUpdated: '2026-03-01',
    reviewSlug: 'jasper-ai-review',
    freeTrialAvailable: true,
    freeTrialDays: 7,
    plans: [
      {
        name: 'Pro',
        price: '$69',
        period: '/month per seat',
        description: 'Powerful AI to stay on-brand, even at scale.',
        features: [
          '1 seat included',
          'Canvas platform for accelerated, on-brand content creation',
          'Essential Apps for core marketing workflows',
          '2 Brand Voices',
          '5 Knowledge Items',
          '3 Audiences',
          'Smart customization',
        ],
        highlighted: true,
        affiliateUrl: 'https://www.jasper.ai',
      },
      {
        name: 'Business',
        price: 'Custom',
        period: 'contact sales',
        description: 'The AI platform built to elevate your brand and accelerate the impact of your team.',
        features: [
          'Everything in Pro',
          'Advanced Apps for complex campaign orchestration',
          'No-code AI App Builder for custom Apps',
          'Jasper Grid for scaled systematic content execution',
          'Purpose-built marketing Agents',
          'Unlimited Brand Voices, Knowledge & Audiences',
          'API access',
          'Enterprise governance: Admin controls & Groups',
          'Dedicated account management & priority support',
          'Secure and flexible deployment options',
        ],
        affiliateUrl: 'https://www.jasper.ai',
      },
    ],
    faqs: [
      { question: 'Does Jasper AI offer a free trial?', answer: 'Yes, Jasper offers a 7-day free trial on the Pro plan. You can test the full platform before committing to a paid subscription.' },
      { question: 'Is Jasper AI worth the price?', answer: 'At $69/month per seat, Jasper is aimed at marketing teams and content creators who publish frequently. The brand voice, Canvas platform, and marketing Apps can justify the cost if you produce content at scale.' },
      { question: 'Can I cancel Jasper AI anytime?', answer: 'Yes. Monthly plans can be cancelled anytime. You keep access until the end of your current billing period.' },
      { question: 'What is the cheapest Jasper AI plan?', answer: 'The Pro plan at $69/month per seat is the only self-serve option. There is no free plan — only a 7-day free trial. The Business plan requires contacting sales for custom pricing.' },
    ],
  },

  // ── Copy.ai Pricing ────────────────────────────────────
  {
    slug: 'copy-ai',
    tool: 'Copy.ai',
    title: 'Copy.ai Pricing 2026: Free vs Pro vs Enterprise Plans Compared',
    description:
      'Detailed Copy.ai pricing comparison for 2026. See what you get on Free, Pro, and Enterprise plans. Find the best Copy.ai plan for your marketing needs.',
    intro:
      'Copy.ai stands out by offering a generous free plan alongside paid tiers. Here is exactly what each plan costs and what you get, so you can decide whether upgrading makes sense for your workflow.',
    lastUpdated: '2026-03-01',
    reviewSlug: 'copy-ai-review',
    freeTrialAvailable: false,
    plans: [
      {
        name: 'Free',
        price: '$0',
        period: '/month',
        description: 'For individuals exploring AI copywriting with basic needs.',
        features: [
          '1 user seat',
          '2,000 words per month',
          '90+ copywriting tools',
          'Blog wizard',
          'Limited chat credits',
          'Community support',
        ],
        affiliateUrl: 'https://www.copy.ai',
      },
      {
        name: 'Pro',
        price: '$49',
        period: '/month (billed annually)',
        description: 'For marketers and teams who need unlimited AI content generation.',
        features: [
          '5 user seats',
          'Unlimited words',
          'All 90+ tools',
          'Workflow automations',
          'Brand voices',
          'API access',
          'Priority email support',
          '29+ languages',
        ],
        highlighted: true,
        affiliateUrl: 'https://www.copy.ai',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: 'contact sales',
        description: 'For larger organizations needing advanced controls and support.',
        features: [
          'Unlimited user seats',
          'Everything in Pro',
          'Custom AI workflows',
          'SOC 2 compliance',
          'SSO/SAML',
          'Dedicated CSM',
          'Custom integrations',
          'SLA guarantees',
        ],
        affiliateUrl: 'https://www.copy.ai',
      },
    ],
    faqs: [
      { question: 'Is Copy.ai free?', answer: 'Yes, Copy.ai has a free plan with 2,000 words per month and access to 90+ copywriting tools. It is enough to test the platform but most serious users will need Pro.' },
      { question: 'How much does Copy.ai Pro cost?', answer: 'Copy.ai Pro costs $49/month when billed annually, or $69/month on monthly billing. It includes unlimited words and up to 5 user seats.' },
      { question: 'Is Copy.ai cheaper than Jasper?', answer: 'At the same $49/month base price they are comparable, but Copy.ai includes a free plan and more seats on Pro (5 vs 1). For teams, Copy.ai is better value.' },
      { question: 'Does Copy.ai offer refunds?', answer: 'Copy.ai offers a satisfaction-based approach. Contact support if you are unhappy within the first few days. Annual plans are non-refundable after 14 days.' },
    ],
  },

  // ── Writesonic Pricing ─────────────────────────────────
  {
    slug: 'writesonic',
    tool: 'Writesonic',
    title: 'Writesonic Pricing 2026: Plans, Word Limits & Value Breakdown',
    description:
      'Complete Writesonic pricing guide for 2026. Compare Free, Pro, and Enterprise plans. See word limits, features, and which plan delivers the best value.',
    intro:
      'Writesonic is one of the more affordable AI writing platforms, with plans starting at just $20/month. Here is what each tier includes and how the pricing compares to competitors like Jasper and Copy.ai.',
    lastUpdated: '2026-03-01',
    reviewSlug: 'writesonic-review',
    freeTrialAvailable: false,
    plans: [
      {
        name: 'Free Trial',
        price: '$0',
        period: '',
        description: 'Try Writesonic with limited credits to test the platform.',
        features: [
          '10,000 words (one-time)',
          'Access to all features',
          '1 user seat',
          'Chatsonic access',
          '70+ AI templates',
        ],
        affiliateUrl: 'https://writesonic.com',
      },
      {
        name: 'Pro',
        price: '$20',
        period: '/month (billed annually)',
        description: 'For individual writers and content creators.',
        features: [
          '1 user seat',
          'Unlimited words (GPT-3.5)',
          'Limited premium words (GPT-4)',
          'Brand voice',
          'Chatsonic',
          'SEO tools integration',
          'API access',
          '70+ templates',
        ],
        highlighted: true,
        affiliateUrl: 'https://writesonic.com',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: 'contact sales',
        description: 'For teams and organizations with advanced requirements.',
        features: [
          'Unlimited seats',
          'Unlimited premium words',
          'Custom AI model training',
          'SSO/SAML',
          'Dedicated account manager',
          'Priority support',
          'Custom integrations',
        ],
        affiliateUrl: 'https://writesonic.com',
      },
    ],
    faqs: [
      { question: 'Is Writesonic free?', answer: 'Writesonic offers a free trial with 10,000 words. After that, you need a paid plan. The Pro plan starts at $20/month (annual billing).' },
      { question: 'Is Writesonic cheaper than Jasper?', answer: 'Yes. Writesonic Pro starts at $20/month vs Jasper Creator at $49/month. Writesonic is significantly more affordable for individual users.' },
      { question: 'Does Writesonic have word limits?', answer: 'The Pro plan offers unlimited GPT-3.5 words but limited GPT-4/premium words. The exact premium word allocation depends on your plan tier.' },
      { question: 'Can I cancel Writesonic anytime?', answer: 'Yes, you can cancel your subscription at any time. If on an annual plan, you keep access until the end of the billing period.' },
    ],
  },

  // ── Surfer SEO Pricing ─────────────────────────────────
  {
    slug: 'surfer-seo',
    tool: 'Surfer SEO',
    title: 'Surfer SEO Pricing 2026: Plans, Limits & ROI Analysis',
    description:
      'Detailed Surfer SEO pricing breakdown for 2026. Compare Essential, Scale, and Enterprise plans. Find out which tier delivers the best ROI for your content strategy.',
    intro:
      'Surfer SEO is a premium content optimization tool, and the pricing reflects that. Here is a complete breakdown of each plan so you can decide whether the investment makes sense for your content volume and SEO goals.',
    lastUpdated: '2026-03-01',
    reviewSlug: 'surfer-seo-review',
    freeTrialAvailable: false,
    moneyBackGuarantee: '7-day money-back guarantee',
    plans: [
      {
        name: 'Essential',
        price: '$89',
        period: '/month (billed annually)',
        description: 'For freelancers and small content teams getting started with content optimization.',
        features: [
          '30 articles/month',
          'Content Editor',
          'SERP Analyzer',
          'Keyword Research',
          'Audit tool',
          'NLP sentiment analysis',
          'Plagiarism checker (limited)',
        ],
        affiliateUrl: 'https://surferseo.com',
      },
      {
        name: 'Scale',
        price: '$129',
        period: '/month (billed annually)',
        description: 'For growing teams that publish content at scale.',
        features: [
          '100 articles/month',
          'Everything in Essential',
          'Surfer AI (auto-write articles)',
          'Content audit',
          'Internal linking suggestions',
          'SERP similarity score',
          'Team collaboration',
        ],
        highlighted: true,
        affiliateUrl: 'https://surferseo.com',
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: 'contact sales',
        description: 'For agencies and large teams with high-volume needs.',
        features: [
          'Unlimited articles',
          'Everything in Scale',
          'API access',
          'White-label reports',
          'Custom onboarding',
          'Dedicated account manager',
          'Priority support',
        ],
        affiliateUrl: 'https://surferseo.com',
      },
    ],
    faqs: [
      { question: 'Is Surfer SEO worth the price?', answer: 'For teams publishing 10+ SEO articles per month, Surfer typically pays for itself through improved rankings. For occasional content creators, the $89+/month price tag may be hard to justify.' },
      { question: 'Does Surfer SEO offer a free trial?', answer: 'Surfer does not offer a traditional free trial, but they have a 7-day money-back guarantee. You can test the platform risk-free within that window.' },
      { question: 'How does Surfer SEO pricing compare to Clearscope?', answer: 'Surfer is significantly cheaper. Clearscope starts at $170/month vs Surfer at $89/month, and Surfer includes more features at the base tier.' },
      { question: 'Can I use Surfer SEO for free?', answer: 'There is no free plan. Surfer offers a limited free Chrome extension for basic SERP analysis, but the full platform requires a paid subscription.' },
    ],
  },

  // ── Descript Pricing ───────────────────────────────────
  {
    slug: 'descript',
    tool: 'Descript',
    title: 'Descript Pricing 2026: Free vs Pro vs Business Plans Compared',
    description:
      'Complete Descript pricing guide for 2026. Compare Free, Hobbyist, Pro, and Business plans. Find the best plan for video and podcast editing.',
    intro:
      'Descript offers a generous free plan and competitive paid tiers for video and podcast editing. Here is what each plan costs and exactly what you get, including transcription limits and AI feature access.',
    lastUpdated: '2026-03-01',
    reviewSlug: 'descript-review',
    freeTrialAvailable: false,
    plans: [
      {
        name: 'Free',
        price: '$0',
        period: '/month',
        description: 'For trying out text-based editing with basic projects.',
        features: [
          '1 hour transcription',
          'Text-based video editing',
          'Screen recording',
          'Basic AI tools',
          '720p export',
          '1 watermark-free export',
        ],
        affiliateUrl: 'https://www.descript.com',
      },
      {
        name: 'Hobbyist',
        price: '$8',
        period: '/month (billed annually)',
        description: 'For casual creators who need more transcription and export quality.',
        features: [
          '10 hours transcription/month',
          'All editing tools',
          'Filler word removal',
          'Studio Sound',
          '4K export',
          'No watermarks',
        ],
        affiliateUrl: 'https://www.descript.com',
      },
      {
        name: 'Pro',
        price: '$24',
        period: '/month (billed annually)',
        description: 'For professional creators and podcasters who publish regularly.',
        features: [
          '30 hours transcription/month',
          'Everything in Hobbyist',
          'AI Green Screen',
          'Eye Contact correction',
          'Custom templates',
          'Multi-track editing',
          'Priority support',
        ],
        highlighted: true,
        affiliateUrl: 'https://www.descript.com',
      },
      {
        name: 'Business',
        price: '$40',
        period: '/month (billed annually)',
        description: 'For teams that need collaboration and brand management.',
        features: [
          '40 hours transcription/month',
          'Everything in Pro',
          'Team workspace',
          'Brand kit',
          'Advanced permissions',
          'Analytics',
          'Dedicated support',
        ],
        affiliateUrl: 'https://www.descript.com',
      },
    ],
    faqs: [
      { question: 'Is Descript free?', answer: 'Yes, Descript has a free plan with 1 hour of transcription and basic editing tools. It is enough to test the workflow but most creators will need a paid plan.' },
      { question: 'Is Descript worth paying for?', answer: 'For podcasters and video creators who edit regularly, the Pro plan at $24/month is excellent value. The text-based editing workflow alone can save hours per episode.' },
      { question: 'How does Descript pricing compare to Adobe Premiere?', answer: 'Descript Pro ($24/mo) is comparable to Adobe Premiere Pro ($22.99/mo), but Descript is far easier to learn and includes transcription, which Premiere charges extra for.' },
      { question: 'Does Descript charge for transcription?', answer: 'Transcription hours are included with each plan. Free gets 1 hour, Hobbyist gets 10, Pro gets 30, and Business gets 40 hours per month.' },
    ],
  },

  // ── Make.com Pricing ───────────────────────────────────
  {
    slug: 'make-com',
    tool: 'Make.com',
    title: 'Make.com Pricing 2026: Operations, Plans & Cost Calculator',
    description:
      'Complete Make.com pricing guide for 2026. Understand operations-based billing, compare Free, Core, Pro, and Teams plans. Find the best value for your automation needs.',
    intro:
      'Make.com (formerly Integromat) uses operations-based pricing, which can be confusing at first. Each action in your automation counts as an operation, and your plan determines how many operations you get per month. Here is the full breakdown.',
    lastUpdated: '2026-03-01',
    reviewSlug: 'make-review',
    freeTrialAvailable: false,
    plans: [
      {
        name: 'Free',
        price: '$0',
        period: '/month',
        description: 'For testing automations and simple personal workflows.',
        features: [
          '1,000 operations/month',
          '2 active scenarios',
          '100 MB data transfer',
          '15-minute scheduling',
          'Community support',
        ],
        affiliateUrl: 'https://www.make.com',
      },
      {
        name: 'Core',
        price: '$10.59',
        period: '/month (billed annually)',
        description: 'For individuals who need more operations and faster scheduling.',
        features: [
          '10,000 operations/month',
          'Unlimited scenarios',
          '1 GB data transfer',
          '1-minute scheduling',
          'API access',
        ],
        affiliateUrl: 'https://www.make.com',
      },
      {
        name: 'Pro',
        price: '$18.82',
        period: '/month (billed annually)',
        description: 'For teams needing advanced features and higher limits.',
        features: [
          '10,000 operations/month',
          'Everything in Core',
          'Custom variables',
          'Full-text log search',
          'Operations priority',
          'Custom functions',
          '2-factor auth',
        ],
        highlighted: true,
        affiliateUrl: 'https://www.make.com',
      },
      {
        name: 'Teams',
        price: '$34.12',
        period: '/month (billed annually)',
        description: 'For organizations needing team management and advanced security.',
        features: [
          '10,000 operations/month',
          'Everything in Pro',
          'Team roles & permissions',
          'Shared connections',
          'High-priority execution',
          'SSO ready',
        ],
        affiliateUrl: 'https://www.make.com',
      },
    ],
    faqs: [
      { question: 'What is a Make.com operation?', answer: 'An operation is each action performed in your automation scenario. For example, a scenario that gets a row from Google Sheets, transforms it, and sends a Slack message uses 3 operations per execution.' },
      { question: 'Is Make.com cheaper than Zapier?', answer: 'Yes. Make.com is typically 3-5x cheaper than Zapier for the same automation volume. Make Core at $10.59/mo with 10,000 operations beats Zapier Starter at $19.99/mo with just 750 tasks.' },
      { question: 'Can I use Make.com for free?', answer: 'Yes. The free plan includes 1,000 operations per month and 2 active scenarios. It is enough for basic personal automations.' },
      { question: 'How many operations do I need?', answer: 'It depends on your automation complexity. A simple 3-step automation running hourly uses about 2,160 operations/month. Most small businesses start with 10,000-20,000 operations.' },
    ],
  },

  // ── Pictory Pricing ────────────────────────────────────
  {
    slug: 'pictory',
    tool: 'Pictory',
    title: 'Pictory Pricing 2026: Plans, Video Limits & Best Value',
    description:
      'Detailed Pictory pricing breakdown for 2026. Compare Starter, Professional, and Teams plans. Find out which plan gives you the best value for AI video creation.',
    intro:
      'Pictory is an AI-powered video creation tool that turns text into videos. Here is what each plan costs, how many videos you can create, and which tier makes sense for your content volume.',
    lastUpdated: '2026-03-01',
    reviewSlug: 'pictory-review',
    freeTrialAvailable: true,
    freeTrialDays: 14,
    plans: [
      {
        name: 'Starter',
        price: '$19',
        period: '/month (billed annually)',
        description: 'For individuals creating occasional video content.',
        features: [
          '30 videos/month',
          '10-minute max video length',
          '1080p resolution',
          'Text-to-video',
          'Blog-to-video',
          'Auto-captions',
          '15M+ stock assets',
        ],
        affiliateUrl: 'https://pictory.ai?ref=fran26',
      },
      {
        name: 'Professional',
        price: '$39',
        period: '/month (billed annually)',
        description: 'For regular content creators and marketers.',
        features: [
          '60 videos/month',
          '20-minute max video length',
          'Everything in Starter',
          'Custom branding',
          'Hootsuite integration',
          'Priority rendering',
          'Bulk video creation',
        ],
        highlighted: true,
        affiliateUrl: 'https://pictory.ai?ref=fran26',
      },
      {
        name: 'Teams',
        price: '$99',
        period: '/month (billed annually)',
        description: 'For teams producing video content at scale.',
        features: [
          '90 videos/month',
          '30-minute max video length',
          'Everything in Professional',
          'Team collaboration',
          'Shared brand kits',
          'API access',
          'Dedicated support',
        ],
        affiliateUrl: 'https://pictory.ai?ref=fran26',
      },
    ],
    faqs: [
      { question: 'Does Pictory have a free plan?', answer: 'No, but Pictory offers a 14-day free trial with 3 video projects. No credit card required to start.' },
      { question: 'Is Pictory worth the price?', answer: 'For content marketers who need to turn blog posts into video at scale, Pictory is great value. The Professional plan at $39/month is competitive for what you get.' },
      { question: 'How does Pictory compare to Lumen5 pricing?', answer: 'Pictory Starter ($19/mo) is cheaper than Lumen5 Basic ($29/mo). Pictory also includes more videos per month at the base tier.' },
      { question: 'Can I cancel Pictory anytime?', answer: 'Yes. Monthly plans can be cancelled anytime. Annual plans are billed upfront but you keep access until the period ends.' },
    ],
  },
];

/** Get all pricing page slugs for generateStaticParams */
export function getPricingSlugs(): string[] {
  return pricingData.map((page) => page.slug);
}

/** Get a single pricing page by slug */
export function getPricingPage(slug: string): PricingPage | undefined {
  return pricingData.find((page) => page.slug === slug);
}

/** Get all pricing pages */
export function getAllPricingPages(): PricingPage[] {
  return pricingData;
}
