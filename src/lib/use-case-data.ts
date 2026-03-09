/**
 * Programmatic SEO data for "Best AI Tools for [Use Case]" pages.
 * Each entry generates a static page at /best-for/[slug].
 * Targets use-case and audience-specific search queries.
 */

export interface UseCaseTool {
  name: string;
  slug: string;
  description: string;
  pricing: string;
  standoutFeature: string;
  reviewSlug?: string;
  affiliateUrl: string;
}

export interface UseCasePage {
  slug: string;
  useCase: string;
  title: string;
  description: string;
  intro: string;
  tools: UseCaseTool[];
}

export const useCaseData: UseCasePage[] = [
  // ── Best AI Tools for Content Writers ──────────────────
  {
    slug: 'content-writers',
    useCase: 'Content Writers',
    title: 'Best AI Tools for Content Writers in 2026',
    description:
      'We tested 20+ AI writing tools to find the best ones for content writers. From blog posts to copywriting — these tools actually save time and improve quality.',
    intro:
      'Content writing has been transformed by AI tools. Whether you write blog posts, articles, or web copy, the right AI assistant can cut your drafting time in half while maintaining your voice. We tested each of these tools on real writing projects to separate the hype from the genuinely useful.',
    tools: [
      {
        name: 'Jasper AI',
        slug: 'jasper-ai',
        description: 'The most feature-rich AI writing platform with brand voice, templates, and campaign-level content management.',
        pricing: 'From $49/mo',
        standoutFeature: 'Brand voice that learns your style',
        reviewSlug: 'jasper-ai-review',
        affiliateUrl: '#jasper-affiliate',
      },
      {
        name: 'Copy.ai',
        slug: 'copy-ai',
        description: 'AI writing combined with workflow automation. Great for marketing copy, sales emails, and social content at scale.',
        pricing: 'Free plan, Pro $49/mo',
        standoutFeature: 'Marketing workflow automation',
        reviewSlug: 'copy-ai-review',
        affiliateUrl: '#copyai-affiliate',
      },
      {
        name: 'Writesonic',
        slug: 'writesonic',
        description: 'Affordable AI writer with built-in SEO tools and real-time web research for factual, up-to-date content.',
        pricing: 'Free trial, Pro $20/mo',
        standoutFeature: 'Built-in SEO scoring',
        reviewSlug: 'writesonic-review',
        affiliateUrl: '#writesonic-affiliate',
      },
      {
        name: 'Surfer SEO',
        slug: 'surfer-seo',
        description: 'Not a writer itself, but the best content optimization tool. Tells you exactly what to include to rank on Google.',
        pricing: 'From $89/mo',
        standoutFeature: 'SERP-based content optimization',
        reviewSlug: 'surfer-seo-review',
        affiliateUrl: '#surfer-affiliate',
      },
      {
        name: 'Grammarly',
        slug: 'grammarly',
        description: 'Beyond grammar checking — Grammarly now includes AI writing suggestions, tone detection, and full paragraph rewriting.',
        pricing: 'Free plan, Premium $12/mo',
        standoutFeature: 'Real-time writing quality scoring',
        affiliateUrl: '#grammarly-affiliate',
      },
    ],
  },

  // ── Best AI Tools for Freelancers ──────────────────────
  {
    slug: 'freelancers',
    useCase: 'Freelancers',
    title: 'Best AI Tools for Freelancers in 2026',
    description:
      'The top AI tools that actually help freelancers earn more and work less. Tested by real freelancers — writing, design, automation, and productivity tools included.',
    intro:
      'As a freelancer, every hour counts. AI tools can handle the repetitive parts of your work so you can focus on what clients pay you for. Here are the tools that deliver the most value for independent professionals, tested across real freelance workflows.',
    tools: [
      {
        name: 'Copy.ai',
        slug: 'copy-ai',
        description: 'The best all-around AI writing tool for freelancers. Free plan for testing, Pro for unlimited content generation across any project type.',
        pricing: 'Free plan, Pro $49/mo',
        standoutFeature: 'Free plan with 2,000 words/month',
        reviewSlug: 'copy-ai-review',
        affiliateUrl: '#copyai-affiliate',
      },
      {
        name: 'Writesonic',
        slug: 'writesonic',
        description: 'Most affordable paid AI writer. Great for freelance writers who need SEO content and blog posts at a fraction of Jasper pricing.',
        pricing: 'Pro from $20/mo',
        standoutFeature: 'Best value for solo writers',
        reviewSlug: 'writesonic-review',
        affiliateUrl: '#writesonic-affiliate',
      },
      {
        name: 'Make.com',
        slug: 'make-com',
        description: 'Automate client onboarding, invoicing, reporting, and more. The free plan handles basic automations that save hours every week.',
        pricing: 'Free plan, Core $10.59/mo',
        standoutFeature: '1,000 free operations/month',
        reviewSlug: 'make-review',
        affiliateUrl: '#make-affiliate',
      },
      {
        name: 'Descript',
        slug: 'descript',
        description: 'If you do any video or podcast work for clients, Descript text-based editing cuts editing time dramatically. Free plan to start.',
        pricing: 'Free plan, Pro $24/mo',
        standoutFeature: 'Edit video by editing text',
        reviewSlug: 'descript-review',
        affiliateUrl: '#descript-affiliate',
      },
      {
        name: 'Grammarly',
        slug: 'grammarly',
        description: 'Essential for any freelancer who writes. Catches errors, improves clarity, and ensures your client deliverables are polished.',
        pricing: 'Free plan, Premium $12/mo',
        standoutFeature: 'Works everywhere you write',
        affiliateUrl: '#grammarly-affiliate',
      },
    ],
  },

  // ── Best AI Tools for Small Business ───────────────────
  {
    slug: 'small-business',
    useCase: 'Small Business',
    title: 'Best AI Tools for Small Business in 2026',
    description:
      'AI tools that actually help small businesses grow. Marketing, content, automation, and video tools tested for teams of 1-20 people. Real pricing, real results.',
    intro:
      'Small businesses need AI tools that deliver results without enterprise complexity or pricing. These tools were selected specifically for teams of 1-20 people who need to do more with less. Each one has been tested in real small business workflows.',
    tools: [
      {
        name: 'Jasper AI',
        slug: 'jasper-ai',
        description: 'The best AI writing platform for small marketing teams. Brand voice ensures consistent content across all channels.',
        pricing: 'From $49/mo',
        standoutFeature: 'Team collaboration + brand voice',
        reviewSlug: 'jasper-ai-review',
        affiliateUrl: '#jasper-affiliate',
      },
      {
        name: 'Make.com',
        slug: 'make-com',
        description: 'Connect your business apps and automate repetitive tasks. CRM to email, forms to spreadsheets, social to analytics — all automated.',
        pricing: 'Free plan, Core $10.59/mo',
        standoutFeature: 'Visual automation builder',
        reviewSlug: 'make-review',
        affiliateUrl: '#make-affiliate',
      },
      {
        name: 'Copy.ai',
        slug: 'copy-ai',
        description: 'Generate marketing copy, sales emails, product descriptions, and social posts. The workflow engine chains tasks for end-to-end marketing.',
        pricing: 'Free plan, Pro $49/mo',
        standoutFeature: 'Marketing workflow automation',
        reviewSlug: 'copy-ai-review',
        affiliateUrl: '#copyai-affiliate',
      },
      {
        name: 'Pictory',
        slug: 'pictory',
        description: 'Turn blog posts and scripts into marketing videos without video editing skills. Great for social media and product demos.',
        pricing: 'From $19/mo',
        standoutFeature: 'Blog-to-video in minutes',
        reviewSlug: 'pictory-review',
        affiliateUrl: '#pictory-affiliate',
      },
      {
        name: 'Surfer SEO',
        slug: 'surfer-seo',
        description: 'Optimize your website content to rank higher on Google. Data-driven recommendations tell you exactly what to write.',
        pricing: 'From $89/mo',
        standoutFeature: 'Content optimization for rankings',
        reviewSlug: 'surfer-seo-review',
        affiliateUrl: '#surfer-affiliate',
      },
    ],
  },

  // ── Best AI Tools for Marketing Teams ──────────────────
  {
    slug: 'marketing-teams',
    useCase: 'Marketing Teams',
    title: 'Best AI Tools for Marketing Teams in 2026',
    description:
      'The top AI tools for marketing teams that want to produce more content, optimize campaigns, and automate workflows. Tested by marketers, for marketers.',
    intro:
      'Marketing teams are under pressure to produce more content across more channels with the same (or fewer) resources. These AI tools help marketing teams scale output without sacrificing quality. Every tool here has been evaluated for team collaboration, brand consistency, and real-world marketing workflows.',
    tools: [
      {
        name: 'Jasper AI',
        slug: 'jasper-ai',
        description: 'Built specifically for marketing teams. Campaign management, brand voice, and templates designed for marketing workflows.',
        pricing: 'From $49/mo',
        standoutFeature: 'Campaign-level content management',
        reviewSlug: 'jasper-ai-review',
        affiliateUrl: '#jasper-affiliate',
      },
      {
        name: 'Surfer SEO',
        slug: 'surfer-seo',
        description: 'Data-driven content optimization that helps your team create content that actually ranks. SERP analysis and NLP-powered recommendations.',
        pricing: 'From $89/mo',
        standoutFeature: 'Content score for ranking potential',
        reviewSlug: 'surfer-seo-review',
        affiliateUrl: '#surfer-affiliate',
      },
      {
        name: 'Copy.ai',
        slug: 'copy-ai',
        description: 'AI-powered marketing workflows that chain writing, research, and distribution tasks. 5 seats included on Pro for team collaboration.',
        pricing: 'Free plan, Pro $49/mo',
        standoutFeature: 'Workflow automation engine',
        reviewSlug: 'copy-ai-review',
        affiliateUrl: '#copyai-affiliate',
      },
      {
        name: 'Pictory',
        slug: 'pictory',
        description: 'Repurpose blog content into video for social media. Marketing teams can create 30-60 videos per month without a videographer.',
        pricing: 'From $19/mo',
        standoutFeature: 'Bulk video creation from text',
        reviewSlug: 'pictory-review',
        affiliateUrl: '#pictory-affiliate',
      },
      {
        name: 'Make.com',
        slug: 'make-com',
        description: 'Connect your marketing stack and automate reporting, lead routing, social posting, and campaign workflows.',
        pricing: 'Free plan, Core $10.59/mo',
        standoutFeature: '1,800+ app integrations',
        reviewSlug: 'make-review',
        affiliateUrl: '#make-affiliate',
      },
    ],
  },

  // ── Best AI Tools for Video Creators ───────────────────
  {
    slug: 'video-creators',
    useCase: 'Video Creators',
    title: 'Best AI Tools for Video Creators in 2026',
    description:
      'Top AI video tools for creators, editors, and podcasters. From text-based editing to AI-generated videos — tested on real video projects.',
    intro:
      'AI has made video creation accessible to everyone. Whether you are a YouTuber, podcaster, or social media creator, these tools can dramatically speed up your editing workflow and help you create more polished content. Each one has been tested on real video projects.',
    tools: [
      {
        name: 'Descript',
        slug: 'descript',
        description: 'Edit video and podcasts by editing text. Transcription, filler word removal, AI green screen, and eye contact correction.',
        pricing: 'Free plan, Pro $24/mo',
        standoutFeature: 'Text-based video editing',
        reviewSlug: 'descript-review',
        affiliateUrl: '#descript-affiliate',
      },
      {
        name: 'Pictory',
        slug: 'pictory',
        description: 'Turn scripts and blog posts into videos with AI-selected visuals, auto-captions, and branding. No editing skills needed.',
        pricing: 'From $19/mo',
        standoutFeature: 'Text-to-video automation',
        reviewSlug: 'pictory-review',
        affiliateUrl: '#pictory-affiliate',
      },
      {
        name: 'Jasper AI',
        slug: 'jasper-ai',
        description: 'Generate video scripts, YouTube descriptions, social captions, and show notes. Pairs perfectly with video editing tools.',
        pricing: 'From $49/mo',
        standoutFeature: 'Video script templates',
        reviewSlug: 'jasper-ai-review',
        affiliateUrl: '#jasper-affiliate',
      },
      {
        name: 'Writesonic',
        slug: 'writesonic',
        description: 'Affordable scriptwriting assistant with YouTube-specific templates. Generate scripts, titles, and descriptions at scale.',
        pricing: 'Free trial, Pro $20/mo',
        standoutFeature: 'YouTube content templates',
        reviewSlug: 'writesonic-review',
        affiliateUrl: '#writesonic-affiliate',
      },
      {
        name: 'Make.com',
        slug: 'make-com',
        description: 'Automate video distribution. Auto-post to social platforms, sync with your CMS, and trigger workflows when videos are published.',
        pricing: 'Free plan, Core $10.59/mo',
        standoutFeature: 'Video distribution automation',
        reviewSlug: 'make-review',
        affiliateUrl: '#make-affiliate',
      },
    ],
  },

  // ── Best AI Tools for SEO ──────────────────────────────
  {
    slug: 'seo',
    useCase: 'SEO',
    title: 'Best AI Tools for SEO in 2026',
    description:
      'The top AI-powered SEO tools for content optimization, keyword research, and ranking analysis. Tested on real SEO campaigns with measurable results.',
    intro:
      'SEO has always been data-driven, and AI tools have made it smarter. From content optimization to keyword research to link building, these tools use AI to give you a competitive edge in search rankings. Each has been tested on live campaigns.',
    tools: [
      {
        name: 'Surfer SEO',
        slug: 'surfer-seo',
        description: 'The leading AI content optimization platform. Analyzes top-ranking pages and tells you exactly what to include in your content.',
        pricing: 'From $89/mo',
        standoutFeature: 'SERP-based content scoring',
        reviewSlug: 'surfer-seo-review',
        affiliateUrl: '#surfer-affiliate',
      },
      {
        name: 'Writesonic',
        slug: 'writesonic',
        description: 'AI writer with built-in SEO tools. Generate SEO-optimized blog posts with real-time keyword integration and search intent analysis.',
        pricing: 'Free trial, Pro $20/mo',
        standoutFeature: 'AI writing + SEO in one tool',
        reviewSlug: 'writesonic-review',
        affiliateUrl: '#writesonic-affiliate',
      },
      {
        name: 'Jasper AI',
        slug: 'jasper-ai',
        description: 'AI content creation with SEO mode that integrates with Surfer SEO for data-driven content optimization during the writing process.',
        pricing: 'From $49/mo',
        standoutFeature: 'Surfer SEO integration',
        reviewSlug: 'jasper-ai-review',
        affiliateUrl: '#jasper-affiliate',
      },
      {
        name: 'Copy.ai',
        slug: 'copy-ai',
        description: 'Generate SEO-focused content at scale with AI workflows. Great for creating meta descriptions, title tags, and supporting content.',
        pricing: 'Free plan, Pro $49/mo',
        standoutFeature: 'Bulk SEO content generation',
        reviewSlug: 'copy-ai-review',
        affiliateUrl: '#copyai-affiliate',
      },
      {
        name: 'Make.com',
        slug: 'make-com',
        description: 'Automate SEO workflows — rank tracking alerts, content publishing pipelines, reporting dashboards, and competitor monitoring.',
        pricing: 'Free plan, Core $10.59/mo',
        standoutFeature: 'SEO workflow automation',
        reviewSlug: 'make-review',
        affiliateUrl: '#make-affiliate',
      },
    ],
  },

  // ── Best AI Tools for Solopreneurs ─────────────────────
  {
    slug: 'solopreneurs',
    useCase: 'Solopreneurs',
    title: 'Best AI Tools for Solopreneurs in 2026',
    description:
      'The essential AI tool stack for solopreneurs. Write content, create videos, automate tasks, and optimize for SEO — all without a team.',
    intro:
      'As a solopreneur, you are the marketing team, the content team, the ops team, and the sales team. AI tools give you leverage by handling the tasks that would otherwise require hiring. Here are the tools that deliver the most impact for one-person businesses.',
    tools: [
      {
        name: 'Writesonic',
        slug: 'writesonic',
        description: 'The best value AI writer for solopreneurs. At $20/month, it covers blog posts, social content, and marketing copy with SEO optimization.',
        pricing: 'Free trial, Pro $20/mo',
        standoutFeature: 'Best price-to-value ratio',
        reviewSlug: 'writesonic-review',
        affiliateUrl: '#writesonic-affiliate',
      },
      {
        name: 'Make.com',
        slug: 'make-com',
        description: 'Replace manual busywork with automated workflows. Email sequences, social posting, data syncing, and reporting on autopilot.',
        pricing: 'Free plan, Core $10.59/mo',
        standoutFeature: 'Free tier for basic automations',
        reviewSlug: 'make-review',
        affiliateUrl: '#make-affiliate',
      },
      {
        name: 'Descript',
        slug: 'descript',
        description: 'Create podcast episodes and video content without editing expertise. Text-based editing makes it as easy as writing a document.',
        pricing: 'Free plan, Pro $24/mo',
        standoutFeature: 'No video editing skills needed',
        reviewSlug: 'descript-review',
        affiliateUrl: '#descript-affiliate',
      },
      {
        name: 'Copy.ai',
        slug: 'copy-ai',
        description: 'Free plan gets you started with AI copywriting. Upgrade to Pro when you need unlimited words and marketing automation workflows.',
        pricing: 'Free plan, Pro $49/mo',
        standoutFeature: 'Generous free plan to start',
        reviewSlug: 'copy-ai-review',
        affiliateUrl: '#copyai-affiliate',
      },
      {
        name: 'Surfer SEO',
        slug: 'surfer-seo',
        description: 'The investment that drives organic traffic. Content optimization based on what actually ranks, so your blog posts get found.',
        pricing: 'From $89/mo',
        standoutFeature: 'Data-driven SEO optimization',
        reviewSlug: 'surfer-seo-review',
        affiliateUrl: '#surfer-affiliate',
      },
    ],
  },

  // ── Best AI Tools for Startups ─────────────────────────
  {
    slug: 'startups',
    useCase: 'Startups',
    title: 'Best AI Tools for Startups in 2026',
    description:
      'AI tools that help startups move fast and punch above their weight. Content marketing, automation, video, and SEO tools tested for early-stage teams.',
    intro:
      'Startups need to move fast and do a lot with limited resources. AI tools give early-stage teams the ability to produce content, automate workflows, and compete with established players. Here are the tools that provide the most startup-friendly value.',
    tools: [
      {
        name: 'Copy.ai',
        slug: 'copy-ai',
        description: 'Start free, scale to Pro. Perfect for startup marketing teams that need to produce landing pages, emails, ads, and social content quickly.',
        pricing: 'Free plan, Pro $49/mo',
        standoutFeature: '5 seats on Pro (team-friendly)',
        reviewSlug: 'copy-ai-review',
        affiliateUrl: '#copyai-affiliate',
      },
      {
        name: 'Make.com',
        slug: 'make-com',
        description: 'Connect your startup tech stack and automate everything from lead routing to onboarding emails to reporting. Free plan to start.',
        pricing: 'Free plan, Core $10.59/mo',
        standoutFeature: 'Replace manual ops with automation',
        reviewSlug: 'make-review',
        affiliateUrl: '#make-affiliate',
      },
      {
        name: 'Jasper AI',
        slug: 'jasper-ai',
        description: 'When you are ready to invest in content marketing, Jasper brand voice and campaign features help maintain consistency as your team grows.',
        pricing: 'From $49/mo',
        standoutFeature: 'Scale content with brand consistency',
        reviewSlug: 'jasper-ai-review',
        affiliateUrl: '#jasper-affiliate',
      },
      {
        name: 'Pictory',
        slug: 'pictory',
        description: 'Create product demos, explainer videos, and social clips without hiring a video team. Turn your blog content into video assets.',
        pricing: 'From $19/mo',
        standoutFeature: 'Product demo videos from text',
        reviewSlug: 'pictory-review',
        affiliateUrl: '#pictory-affiliate',
      },
      {
        name: 'Writesonic',
        slug: 'writesonic',
        description: 'Budget-friendly AI writing for lean startups. Get blog posts, landing page copy, and ad text at a fraction of Jasper pricing.',
        pricing: 'Free trial, Pro $20/mo',
        standoutFeature: 'Most affordable paid tier',
        reviewSlug: 'writesonic-review',
        affiliateUrl: '#writesonic-affiliate',
      },
    ],
  },
];

/** Get all use-case page slugs for generateStaticParams */
export function getUseCaseSlugs(): string[] {
  return useCaseData.map((page) => page.slug);
}

/** Get a single use-case page by slug */
export function getUseCasePage(slug: string): UseCasePage | undefined {
  return useCaseData.find((page) => page.slug === slug);
}

/** Get all use-case pages */
export function getAllUseCasePages(): UseCasePage[] {
  return useCaseData;
}
