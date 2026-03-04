# Shelby AI Deals — Project Summary

## Overview
Niche affiliate/content site reviewing AI tools for creators, freelancers, and small marketing teams (1-10 people).

## Tech Stack
- **Framework:** Next.js 15 (App Router, static export)
- **UI:** React 19 + TailwindCSS 4
- **Content:** MDX files with gray-matter frontmatter + next-mdx-remote/rsc rendering
- **Icons:** Lucide React
- **Language:** TypeScript
- **Deployment:** Static export (`next build` → `out/` directory)

## Theme
- **Primary:** "Matcha Mist" — soft sage greens (matcha-50 through matcha-950)
- **Secondary:** "Dusty Coal" — warm dark grays (coal-50 through coal-950)
- **Background:** matcha-50 (#f5f8f0)
- **Text:** coal-800 (#3e4340)
- **CTAs:** matcha-500 (#7a9960)
- **Dark sections:** coal-900 (#2e302d)

## Site Architecture
```
/                         → Homepage
/reviews/                 → All reviews index
/reviews/[slug]/          → Individual tool review
/comparisons/             → All comparisons index
/comparisons/[slug]/      → Individual comparison
/best/                    → Best-of roundups index
/best/[slug]/             → Individual roundup
/guides/                  → Guides index
/guides/[slug]/           → Individual guide
/categories/[slug]/       → Category hub page
/about/                   → About page
/affiliate-disclosure/    → FTC disclosure
/privacy-policy/          → Privacy policy
```

## Content Categories
1. AI Writing Tools
2. AI Design & Video Tools
3. AI Coding Tools
4. AI Automation
5. AI SEO Tools
6. AI Productivity

## Launch Content (5 articles)
1. **Guide:** The Solopreneur AI Stack: Every Tool You Need for Under $100/mo
2. **Review:** Jasper AI Review 2026
3. **Review:** Copy.ai Review 2026
4. **Comparison:** Jasper vs Copy.ai
5. **Best-of:** 7 Best AI Writing Tools for Freelancers

## Key Components
- Header (sticky nav, mobile menu)
- Footer (4-column, newsletter signup)
- Hero (homepage hero with CTAs)
- ReviewCard, ToolCard, CategoryCard (content cards)
- PricingTable, ComparisonTable (data tables)
- ProsCons, VerdictBox, QuickVerdict, WinnerBox (review/comparison widgets)
- CTAButton (affiliate-aware with rel="nofollow sponsored")
- AffiliateDisclosure (FTC compliance box)
- NewsletterSignup (email capture, inline + section variants)
- TableOfContents (sticky sidebar with scroll tracking)
- MDXContent (renders MDX with custom component mapping)
- ArticleLayout (shared article page wrapper)

## Monetization
- Affiliate links centrally managed in `src/lib/affiliate.ts`
- Placeholder URLs (replace with real affiliate links once approved)
- Top programs to pursue: Jasper, Copy.ai, Writesonic, Surfer SEO, SEMrush, Grammarly, Descript

## Key Decisions
- **Static export** for easy deployment (Vercel, Netlify, Cloudflare Pages, or any static host)
- **MDX for content** — easy to edit, supports embedded React components
- **No backend/database** — all content is file-based
- **"We" editorial voice** — sounds authoritative, scales when team grows
- **Honest reviews include no-affiliate tools** (ChatGPT) to build reader trust
- **FTC-compliant** — disclosure on every affiliate page, dedicated disclosure page

## Running Locally
```bash
cd /home/sprljo/claudee/PROJECTS/shelby-deals
npm run dev    # Dev server at localhost:3000
npm run build  # Static export to out/
```

## Next Steps
- ~~Register domain~~ — shelby-ai.com registered
- Deploy to Vercel/Netlify
- Apply to affiliate programs (see PLAN.md for full list)
- Set up GA4 + Google Search Console
- Set up email provider (ConvertKit/Beehiiv)
- Follow the 30-day content calendar in PLAN.md
