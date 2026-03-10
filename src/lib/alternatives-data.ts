/**
 * Programmatic SEO data for "[Tool] Alternatives" pages.
 * Each entry generates a static page at /alternatives/[slug].
 */

export interface AlternativeTool {
  name: string;
  slug: string;
  description: string;
  pricing: string;
  bestFor: string;
  /** Internal review slug if we have a review published */
  reviewSlug?: string;
  /** External website URL */
  url: string;
}

export interface AlternativesPage {
  /** URL slug: /alternatives/[slug] */
  slug: string;
  /** The tool people are looking for alternatives to */
  tool: string;
  /** SEO title */
  title: string;
  /** Meta description */
  description: string;
  /** Intro paragraph shown on the page */
  intro: string;
  /** Our review slug if we've reviewed this tool */
  reviewSlug?: string;
  /** The alternatives list */
  alternatives: AlternativeTool[];
}

export const alternativesData: AlternativesPage[] = [
  // ── Jasper AI Alternatives ──────────────────────────────
  {
    slug: 'jasper-ai',
    tool: 'Jasper AI',
    title: 'Best Jasper AI Alternatives in 2026',
    description:
      'Looking for a Jasper AI alternative? We tested the top AI writing tools side-by-side. Here are the 6 best alternatives with real pricing, features, and use-case breakdowns.',
    intro:
      'Jasper AI is one of the most popular AI writing assistants, but it is not cheap and it is not for everyone. Whether you need better pricing, a different feature set, or a tool that fits your specific workflow, there are strong alternatives worth considering. We have tested each of these tools hands-on to help you find the right fit.',
    reviewSlug: 'jasper-ai-review',
    alternatives: [
      {
        name: 'Copy.ai',
        slug: 'copy-ai',
        description:
          'Copy.ai combines AI writing with workflow automation. Its GTM AI suite goes beyond content generation to handle sales copy, social posts, and marketing workflows in one platform.',
        pricing: 'Free plan available, Pro from $49/mo',
        bestFor: 'Marketing teams & sales copy',
        reviewSlug: 'copy-ai-review',
        url: 'https://copy.ai',
      },
      {
        name: 'Writesonic',
        slug: 'writesonic',
        description:
          'Writesonic offers AI writing with built-in SEO tools and a brand voice feature. It includes Chatsonic (their AI chat) and can generate long-form blog posts with factual, real-time data.',
        pricing: 'Free tier, Pro from $20/mo',
        bestFor: 'SEO content & blog writers',
        reviewSlug: 'writesonic-review',
        url: 'https://writesonic.com',
      },
      {
        name: 'ChatGPT (OpenAI)',
        slug: 'chatgpt',
        description:
          'ChatGPT is the most versatile AI writing tool available. With custom GPTs, plugins, and GPT-4o, it handles everything from blog posts to code to creative writing with unmatched flexibility.',
        pricing: 'Free tier, Plus $20/mo',
        bestFor: 'General-purpose AI writing',
        url: 'https://chat.openai.com',
      },
      {
        name: 'Claude (Anthropic)',
        slug: 'claude',
        description:
          'Claude excels at long-form, nuanced writing with a massive context window. It produces more natural, less "AI-sounding" prose and is excellent for research-heavy content and editing.',
        pricing: 'Free tier, Pro $20/mo',
        bestFor: 'Long-form & nuanced content',
        url: 'https://claude.ai',
      },
      {
        name: 'Rytr',
        slug: 'rytr',
        description:
          'Rytr is a budget-friendly AI writer with 40+ templates and a built-in plagiarism checker. It is simple, fast, and gets the job done for basic content needs without the enterprise complexity.',
        pricing: 'Free plan, Unlimited $9/mo',
        bestFor: 'Budget-conscious writers',
        url: 'https://rytr.me',
      },
      {
        name: 'Koala',
        slug: 'koala',
        description:
          'Koala (KoalaWriter) specializes in SEO-optimized long-form articles. It integrates real-time SERP data and produces publish-ready blog posts with proper structure, headings, and internal linking.',
        pricing: 'From $9/mo',
        bestFor: 'SEO blog content at scale',
        url: 'https://koala.sh',
      },
    ],
  },

  // ── Copy.ai Alternatives ────────────────────────────────
  {
    slug: 'copy-ai',
    tool: 'Copy.ai',
    title: 'Best Copy.ai Alternatives in 2026',
    description:
      'Exploring Copy.ai alternatives? We compared the top AI copywriting and marketing tools. Find the best fit for your workflow with real pricing and feature comparisons.',
    intro:
      'Copy.ai is a solid AI writing tool, especially for marketing teams, but its pricing and feature set do not work for everyone. If you need more SEO focus, better long-form capabilities, or just a lower price point, these alternatives deliver. Each one has been tested in real workflows.',
    reviewSlug: 'copy-ai-review',
    alternatives: [
      {
        name: 'Jasper AI',
        slug: 'jasper-ai',
        description:
          'Jasper is the enterprise-grade AI writing platform with brand voice controls, campaign management, and team collaboration features that go well beyond basic copywriting.',
        pricing: 'From $49/mo (Creator plan)',
        bestFor: 'Enterprise teams & brand consistency',
        reviewSlug: 'jasper-ai-review',
        url: 'https://jasper.ai',
      },
      {
        name: 'Writesonic',
        slug: 'writesonic',
        description:
          'Writesonic pairs AI writing with built-in SEO scoring and real-time web data. Its Chatsonic feature adds conversational AI capabilities alongside traditional content generation.',
        pricing: 'Free tier, Pro from $20/mo',
        bestFor: 'SEO-focused content creation',
        reviewSlug: 'writesonic-review',
        url: 'https://writesonic.com',
      },
      {
        name: 'ChatGPT (OpenAI)',
        slug: 'chatgpt',
        description:
          'ChatGPT with GPT-4o is incredibly versatile for copywriting. Custom instructions let you define brand voice, and it handles everything from ad copy to email sequences with minimal prompting.',
        pricing: 'Free tier, Plus $20/mo',
        bestFor: 'Flexible, general-purpose writing',
        url: 'https://chat.openai.com',
      },
      {
        name: 'Claude (Anthropic)',
        slug: 'claude',
        description:
          'Claude produces remarkably natural copy and excels at understanding context and nuance. Its large context window makes it ideal for maintaining brand voice across long projects.',
        pricing: 'Free tier, Pro $20/mo',
        bestFor: 'Natural-sounding, nuanced copy',
        url: 'https://claude.ai',
      },
      {
        name: 'Rytr',
        slug: 'rytr',
        description:
          'Rytr is the most affordable option with a generous free tier and unlimited plan at just $9/mo. It covers the basics well with 40+ templates for common marketing copy needs.',
        pricing: 'Free plan, Unlimited $9/mo',
        bestFor: 'Freelancers on a budget',
        url: 'https://rytr.me',
      },
    ],
  },

  // ── Writesonic Alternatives ─────────────────────────────
  {
    slug: 'writesonic',
    tool: 'Writesonic',
    title: 'Best Writesonic Alternatives in 2026',
    description:
      'Need a Writesonic alternative? We tested the best AI writing tools for SEO content, blog posts, and marketing copy. Real comparisons with pricing and features.',
    intro:
      'Writesonic is a capable AI writing tool with solid SEO features, but it has its limitations. Whether you need deeper SEO integration, better long-form quality, or different pricing, these alternatives are worth your time. We have used each one extensively before recommending them.',
    reviewSlug: 'writesonic-review',
    alternatives: [
      {
        name: 'Jasper AI',
        slug: 'jasper-ai',
        description:
          'Jasper offers a more polished enterprise experience with stronger brand voice features, campaign workflows, and team collaboration tools that Writesonic lacks at scale.',
        pricing: 'From $49/mo (Creator plan)',
        bestFor: 'Brand-controlled team content',
        reviewSlug: 'jasper-ai-review',
        url: 'https://jasper.ai',
      },
      {
        name: 'Copy.ai',
        slug: 'copy-ai',
        description:
          'Copy.ai focuses on marketing automation alongside AI writing. Its workflow engine chains multiple AI tasks together, making it better for end-to-end marketing processes.',
        pricing: 'Free plan available, Pro from $49/mo',
        bestFor: 'Marketing workflow automation',
        reviewSlug: 'copy-ai-review',
        url: 'https://copy.ai',
      },
      {
        name: 'ChatGPT (OpenAI)',
        slug: 'chatgpt',
        description:
          'ChatGPT with custom GPTs can replicate most of Writesonic features at a lower cost. It is more flexible and constantly improving, though it lacks the dedicated SEO scoring.',
        pricing: 'Free tier, Plus $20/mo',
        bestFor: 'Versatile writing at lower cost',
        url: 'https://chat.openai.com',
      },
      {
        name: 'Koala',
        slug: 'koala',
        description:
          'Koala (KoalaWriter) is purpose-built for SEO blog content. It uses real-time SERP analysis to create articles that are structured to rank, with better SEO integration than Writesonic.',
        pricing: 'From $9/mo',
        bestFor: 'SEO-first blog content',
        url: 'https://koala.sh',
      },
      {
        name: 'Rytr',
        slug: 'rytr',
        description:
          'Rytr offers similar core features to Writesonic at a fraction of the price. It is simpler and less feature-rich, but covers the basics perfectly for solo creators.',
        pricing: 'Free plan, Unlimited $9/mo',
        bestFor: 'Budget-friendly AI writing',
        url: 'https://rytr.me',
      },
    ],
  },

  // ── Surfer SEO Alternatives ─────────────────────────────
  {
    slug: 'surfer-seo',
    tool: 'Surfer SEO',
    title: 'Best Surfer SEO Alternatives in 2026',
    description:
      'Looking for Surfer SEO alternatives? We compared the top AI-powered SEO and content optimization tools. Find the best option for your content strategy and budget.',
    intro:
      'Surfer SEO is a leading content optimization platform, but its pricing can be steep for solo creators and small teams. If you need a different approach to SEO content, better value, or specific features Surfer does not offer, these alternatives deliver real results. Each has been tested on live SEO campaigns.',
    reviewSlug: 'surfer-seo-review',
    alternatives: [
      {
        name: 'Clearscope',
        slug: 'clearscope',
        description:
          'Clearscope is the premium alternative to Surfer with arguably the cleanest UI in the space. It uses IBM Watson NLP for content grading and integrates directly with Google Docs and WordPress.',
        pricing: 'From $170/mo',
        bestFor: 'Enterprise content teams',
        url: 'https://clearscope.io',
      },
      {
        name: 'Frase',
        slug: 'frase',
        description:
          'Frase combines content research, outlining, and optimization in one workflow. It is faster for creating briefs and outlines than Surfer and more affordable for small teams.',
        pricing: 'From $15/mo',
        bestFor: 'Content research & briefs',
        url: 'https://frase.io',
      },
      {
        name: 'MarketMuse',
        slug: 'marketmuse',
        description:
          'MarketMuse takes a topic-modeling approach to content strategy. It maps your entire site content authority and identifies gaps, offering a more strategic view than Surfer SERP analysis.',
        pricing: 'Free plan, Standard from $149/mo',
        bestFor: 'Content strategy & gap analysis',
        url: 'https://marketmuse.com',
      },
      {
        name: 'NeuronWriter',
        slug: 'neuronwriter',
        description:
          'NeuronWriter offers SERP-based content optimization similar to Surfer at a significantly lower price point. It includes NLP recommendations, competitor analysis, and a content planner.',
        pricing: 'From $23/mo',
        bestFor: 'Budget-friendly SEO optimization',
        url: 'https://neuronwriter.com',
      },
      {
        name: 'SurgeGraph',
        slug: 'surgegraph',
        description:
          'SurgeGraph generates long-form, SEO-optimized articles using SERP data and NLP analysis. It automates more of the writing process than Surfer, combining generation with optimization.',
        pricing: 'From $49/mo',
        bestFor: 'Automated SEO article generation',
        url: 'https://surgegraph.io',
      },
    ],
  },

  // ── Descript Alternatives ───────────────────────────────
  {
    slug: 'descript',
    tool: 'Descript',
    title: 'Best Descript Alternatives in 2026',
    description:
      'Searching for Descript alternatives? We tested the top video and podcast editing tools. Compare features, pricing, and workflows to find your best match.',
    intro:
      'Descript revolutionized video editing with its text-based approach, but it is not the only option for creators who want fast, AI-powered editing. Whether you need better recording features, more traditional editing control, or a lower price point, these alternatives each bring something unique to the table.',
    reviewSlug: 'descript-review',
    alternatives: [
      {
        name: 'Riverside',
        slug: 'riverside',
        description:
          'Riverside specializes in high-quality remote recording with local file capture. It produces studio-quality audio and 4K video from remote interviews, then offers AI-powered editing tools.',
        pricing: 'Free plan, Standard from $15/mo',
        bestFor: 'Remote podcast & video recording',
        url: 'https://riverside.fm',
      },
      {
        name: 'CapCut',
        slug: 'capcut',
        description:
          'CapCut (by ByteDance) is a free, full-featured video editor with powerful AI tools including auto-captions, background removal, and text-to-speech. It rivals Descript for social content.',
        pricing: 'Free, Pro from $7.99/mo',
        bestFor: 'Social media & short-form video',
        url: 'https://capcut.com',
      },
      {
        name: 'Adobe Premiere Pro',
        slug: 'adobe-premiere',
        description:
          'Adobe Premiere Pro is the industry-standard video editor now enhanced with AI features like text-based editing, auto-transcription, and generative AI fill. More powerful but steeper learning curve.',
        pricing: 'From $22.99/mo',
        bestFor: 'Professional video production',
        url: 'https://adobe.com/products/premiere.html',
      },
      {
        name: 'Kapwing',
        slug: 'kapwing',
        description:
          'Kapwing is a browser-based video editor with AI-powered features like auto-subtitles, smart cut, and repurposing tools. It is excellent for teams who want collaborative, cloud-based editing.',
        pricing: 'Free plan, Pro from $16/mo',
        bestFor: 'Browser-based team editing',
        url: 'https://kapwing.com',
      },
      {
        name: 'Veed.io',
        slug: 'veed-io',
        description:
          'Veed.io is a streamlined online video editor with auto-subtitles, screen recording, and AI avatars. It prioritizes simplicity and speed over advanced editing capabilities.',
        pricing: 'Free plan, Basic from $18/mo',
        bestFor: 'Quick online video editing',
        url: 'https://veed.io',
      },
    ],
  },

  // ── Make.com Alternatives ───────────────────────────────
  {
    slug: 'make-com',
    tool: 'Make.com',
    title: 'Best Make.com Alternatives in 2026',
    description:
      'Exploring Make.com alternatives? We compared the top workflow automation and integration platforms. Find the best automation tool for your team and budget.',
    intro:
      'Make.com (formerly Integromat) is a powerful visual automation platform, but its complexity and pricing structure do not suit every team. Whether you need simpler automations, self-hosted control, or different integration coverage, these alternatives each solve automation differently.',
    reviewSlug: 'make-review',
    alternatives: [
      {
        name: 'Zapier',
        slug: 'zapier',
        description:
          'Zapier is the most popular automation platform with 7,000+ app integrations. It is simpler than Make.com for basic automations and now includes AI-powered workflow building with Canvas.',
        pricing: 'Free plan, Starter from $19.99/mo',
        bestFor: 'Simple automations & app coverage',
        url: 'https://zapier.com',
      },
      {
        name: 'n8n',
        slug: 'n8n',
        description:
          'n8n is an open-source, self-hostable automation platform with a visual builder. It offers code-level flexibility with a no-code interface, making it the developer-friendly alternative to Make.',
        pricing: 'Free (self-hosted), Cloud from $20/mo',
        bestFor: 'Developers & self-hosted control',
        url: 'https://n8n.io',
      },
      {
        name: 'Pipedream',
        slug: 'pipedream',
        description:
          'Pipedream is a code-first automation platform that lets you write Node.js, Python, or Go steps alongside no-code connectors. It is ideal for technical teams who want full control.',
        pricing: 'Free tier, Advanced from $29/mo',
        bestFor: 'Code-first automation',
        url: 'https://pipedream.com',
      },
      {
        name: 'Activepieces',
        slug: 'activepieces',
        description:
          'Activepieces is an open-source automation alternative with a clean, modern UI. It can be self-hosted and offers a growing library of integrations with a focus on simplicity.',
        pricing: 'Free (self-hosted), Cloud from $5/mo',
        bestFor: 'Open-source & budget automation',
        url: 'https://activepieces.com',
      },
      {
        name: 'Tray.io',
        slug: 'tray-io',
        description:
          'Tray.io is an enterprise-grade integration platform with advanced data transformation, conditional logic, and API management. It handles complex enterprise workflows Make.com struggles with.',
        pricing: 'Custom pricing (enterprise)',
        bestFor: 'Enterprise integration & iPaaS',
        url: 'https://tray.io',
      },
    ],
  },

  // ── Pictory Alternatives ────────────────────────────────
  {
    slug: 'pictory',
    tool: 'Pictory',
    title: 'Best Pictory Alternatives in 2026',
    description:
      'Looking for Pictory alternatives? We tested the top AI video creation tools for turning text into video. Compare features, pricing, and output quality.',
    intro:
      'Pictory makes it easy to turn blog posts and scripts into videos, but it is not the only AI video tool worth considering. Whether you need higher production quality, more editing control, or AI avatars, these alternatives each take a different approach to automated video creation.',
    reviewSlug: 'pictory-review',
    alternatives: [
      {
        name: 'Lumen5',
        slug: 'lumen5',
        description:
          'Lumen5 transforms blog posts into engaging videos with AI-powered scene selection and a polished brand template system. It is more design-focused than Pictory with better visual output.',
        pricing: 'Free plan, Basic from $29/mo',
        bestFor: 'Blog-to-video with brand control',
        url: 'https://lumen5.com',
      },
      {
        name: 'InVideo',
        slug: 'invideo',
        description:
          'InVideo offers 5,000+ templates and a prompt-to-video AI that generates complete videos from text descriptions. It gives more creative control than Pictory with a larger template library.',
        pricing: 'Free plan, Business from $15/mo',
        bestFor: 'Template-based video creation',
        url: 'https://invideo.io',
      },
      {
        name: 'Synthesia',
        slug: 'synthesia',
        description:
          'Synthesia creates professional videos with AI avatars and text-to-speech in 140+ languages. It is ideal for training, explainer, and corporate videos where a human presenter is needed.',
        pricing: 'Starter from $22/mo',
        bestFor: 'AI avatar & training videos',
        url: 'https://www.synthesia.io/?via=shelbyai',
      },
      {
        name: 'Descript',
        slug: 'descript',
        description:
          'Descript is a full video and podcast editor with text-based editing, screen recording, and AI tools. It offers far more editing power than Pictory for creators who need to do more than text-to-video.',
        pricing: 'Free plan, Pro from $24/mo',
        bestFor: 'Full video & podcast editing',
        reviewSlug: 'descript-review',
        url: 'https://descript.com',
      },
      {
        name: 'FlexClip',
        slug: 'flexclip',
        description:
          'FlexClip is a straightforward online video maker with AI tools, stock media, and easy-to-use templates. It is simpler than Pictory for quick social media and marketing videos.',
        pricing: 'Free plan, Plus from $9.99/mo',
        bestFor: 'Quick marketing videos',
        url: 'https://flexclip.com',
      },
    ],
  },
];

/** Get all slugs for generateStaticParams */
export function getAlternativesSlugs(): string[] {
  return alternativesData.map((page) => page.slug);
}

/** Get a single alternatives page by slug */
export function getAlternativesPage(slug: string): AlternativesPage | undefined {
  return alternativesData.find((page) => page.slug === slug);
}

/** Get all alternatives pages */
export function getAllAlternativesPages(): AlternativesPage[] {
  return alternativesData;
}
