# GEO Audit Report: ShelbyAI

**Audit Date:** 2026-03-21
**URL:** https://www.shelby-ai.com
**Business Type:** Publisher / Affiliate (AI Tool Reviews)
**Pages Analyzed:** 177 in sitemap (8 deep-analyzed, 50+ sampled)

---

## Executive Summary

**Overall GEO Score: 48/100 (Poor)**

ShelbyAI has strong on-site foundations — well-structured content, excellent SSR, clean URL architecture, and high-quality review/comparison articles that score well for AI citability. However, the site is severely undermined by near-zero off-site authority: Google appears to have indexed zero pages, there are no third-party backlinks or mentions, the author identity is unverifiable, and the brand has almost no presence on platforms that AI systems use for entity recognition. The site is a "walled garden" — excellent content that AI systems cannot discover, trust, or cite because external validation signals are absent.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 76/100 | 25% | 19.0 |
| Brand Authority | 8/100 | 20% | 1.6 |
| Content E-E-A-T | 52/100 | 20% | 10.4 |
| Technical GEO | 82/100 | 15% | 12.3 |
| Schema & Structured Data | 38/100 | 10% | 3.8 |
| Platform Optimization | 8/100 | 10% | 0.8 |
| **Overall GEO Score** | | | **47.9/100** |

### Score Interpretation

| Score Range | Rating | Your Position |
|---|---|---|
| 90-100 | Excellent | |
| 75-89 | Good | |
| 60-74 | Fair | |
| 40-59 | **Poor** | **<-- You are here (48)** |
| 0-39 | Critical | |

---

## Critical Issues (Fix Immediately)

### 1. Google Has Not Indexed the Site
**Severity:** CRITICAL
**Evidence:** `site:www.shelby-ai.com` and `site:shelby-ai.com` return zero Google results despite 192 URLs in the sitemap.
**Impact:** Without indexation, the site is invisible to Google Search, Google AI Overviews, and any AI system that relies on Google's index.
**Fix:**
- Verify Google Search Console property is correctly set up for `www.shelby-ai.com` (not `shelby-ai.com`)
- Submit sitemap.xml via Google Search Console
- Use "Request Indexing" on the top 20-30 most important pages
- Submit to Bing IndexNow API
- Check for any server-side rendering issues that might prevent Googlebot from seeing content

### 2. Author Identity Is Unverifiable
**Severity:** CRITICAL
**Evidence:** "Frank Shelby" has no verifiable credentials, no linked personal LinkedIn profile (the LinkedIn link goes to a company page), no author page, no external presence on industry sites, conferences, or publications. Google's Quality Rater Guidelines specifically assess author credibility for YMYL-adjacent content.
**Impact:** AI systems and search engines cannot assess author expertise. This is the single biggest E-E-A-T deficit.
**Fix:**
- Create a dedicated `/author/frank-shelby/` page with professional photo, detailed biography, work history, and credentials
- Create or fix a personal LinkedIn profile (separate from the company page)
- Add Person schema markup with `sameAs` links to all author profiles
- If Frank Shelby is a persona, consider transparent institutional authorship instead

### 3. Zero Third-Party Backlinks or Mentions
**Severity:** CRITICAL
**Evidence:** Searching `"www.shelby-ai.com"` and `"shelby-ai.com"` returns zero results outside the site itself. No directory listings, no blog references, no forum mentions.
**Impact:** Domain authority is effectively zero. AI systems have no external signal to trust this source.
**Fix:**
- Submit to AI tool directories: futurepedia.io, theresanaiforthat.com, toolify.ai
- Publish 2-3 articles on Medium with canonical pointing back to shelby-ai.com
- Begin HARO/Connectively outreach for journalist queries about AI tools
- Create a Product Hunt "upcoming" page for the review site itself

### 4. Schema Author Is Organization Instead of Person
**Severity:** CRITICAL
**Evidence:** On all 76+ content pages, the author is `{"@type": "Organization", "name": "ShelbyAIDeals"}` instead of `{"@type": "Person", "name": "Frank Shelby"}`.
**Impact:** Google and AI models cannot identify who wrote the content or assess author expertise. This completely breaks E-E-A-T signaling in structured data.
**Fix:** Single code change in the schema generation logic — change `@type` from `Organization` to `Person` and add `url`, `jobTitle`, `knowsAbout`, and `sameAs` properties.

---

## High Priority Issues

### 5. No llms.txt File
**Severity:** HIGH
**Evidence:** Both `/llms.txt` and `/.well-known/llms.txt` return 404.
**Impact:** AI systems have no machine-optimized summary of what ShelbyAI offers. For an AI tools review site, this is a significant missed opportunity.
**Fix:** Create a structured llms.txt file listing the site's purpose, content categories, and key pages. Reference: https://llmstxt.org

### 6. Missing Image Property in All Article/Review Schema
**Severity:** HIGH
**Evidence:** No Article or Review JSON-LD includes an `image` property.
**Impact:** Google requires `image` for Article rich results. Every content page fails this requirement.
**Fix:** Add the existing OG image URLs as the `image` property in all Article and Review schemas.

### 7. No Person Schema Exists Anywhere
**Severity:** HIGH
**Evidence:** Frank Shelby has zero structured identity — no `jobTitle`, no `knowsAbout`, no `sameAs` for the person (distinct from the organization).
**Fix:** Add Person schema to the About page and as the author on all content pages.

### 8. Organization sameAs Has Only Twitter/X
**Severity:** HIGH
**Evidence:** Organization schema links to just one platform (`sameAs: ["https://x.com/ShelbyAIDeals"]`).
**Impact:** AI models have almost zero ability to resolve this entity across platforms.
**Fix:** Add LinkedIn, Pinterest, GitHub URLs to sameAs immediately. Add YouTube once channel exists.

### 9. Content Lacks Visual Evidence of Testing
**Severity:** HIGH
**Evidence:** Homepage claims "Real screenshots & output samples" but most content (especially guides) has zero images. Only the Pictory review has meaningful visual evidence.
**Impact:** The "7-14 days tested per tool" claim is unsupported on most pages, weakening Experience signals.
**Fix:** Add 8-12 annotated screenshots per review, 5-8 per guide. Show actual tool interfaces, outputs, and side-by-side comparisons.

### 10. All Images Missing Width/Height Attributes (CLS Risk)
**Severity:** HIGH
**Evidence:** All 5 images on the homepage lack explicit `width` and `height` HTML attributes. No `srcset` found.
**Impact:** Causes Cumulative Layout Shift (CLS) as browsers cannot reserve space before images load.
**Fix:** Add `width` and `height` attributes to every `<img>` tag across all templates.

---

## Medium Priority Issues

### 11. Alternatives Pages Are Weak (Citability: 60/100)
**Evidence:** No definitive opening answer, no comparison tables, no FAQ sections. Reads as a gateway to other pages rather than authoritative content.
**Fix:** Add a bold opening answer ("The best Jasper AI alternative in 2026 is..."), a feature comparison table, cost savings calculations, and a FAQ section.

### 12. No External Editorial Citations in Content
**Evidence:** Nearly every external link is an affiliate link. No links to official documentation, research papers, industry reports, or third-party validation.
**Fix:** Add 5-8 editorial (non-affiliate) external links per article — official docs, G2/Capterra reviews, tech publication coverage.

### 13. dateModified Always Equals datePublished
**Evidence:** Reviews that show "Last Tested: March 15, 2026" still have dateModified matching the original publish date.
**Fix:** Update dateModified when content is actually updated to reflect freshness accurately.

### 14. Hreflang Tags May Be Client-Side Only
**Evidence:** Hreflang tags for en/es/de not found in raw HTML grep but reported by WebFetch (which executes JavaScript).
**Fix:** Move hreflang generation to server-rendered `<head>` using Next.js metadata API.

### 15. Non-www to www Redirect Chain (2 Hops)
**Evidence:** `http://shelby-ai.com` → `https://shelby-ai.com` → `https://www.shelby-ai.com` (should be 1 hop). Also uses 307 (Temporary) instead of 308 (Permanent) on one leg.
**Fix:** Configure DNS/Vercel to redirect directly in a single hop with 308.

### 16. FAQ Page Has Only Site-About Questions (Citability: 70/100)
**Evidence:** All 10 FAQ questions are about the site itself, not about AI tools. Nobody searches "How does ShelbyAIDeals make money?"
**Fix:** Expand to 25-30 questions including tool-specific FAQs matching high-volume search queries ("What is the best free AI writing tool?", "Is ElevenLabs better than Murf AI?").

### 17. Missing BreadcrumbList on FAQ, About, How We Review Pages
**Evidence:** Schema audit found BreadcrumbList absent on informational pages.
**Fix:** Add BreadcrumbList schema to all pages site-wide.

### 18. No Speakable Schema on Any Page
**Evidence:** Zero speakable properties found, which signals AI assistant readiness.
**Fix:** Add speakable schema to key content blocks (verdicts, FAQ answers, pricing summaries).

### 19. Guide Content Feels AI-Generated (E-E-A-T: 52/100)
**Evidence:** Guides use generic phrasing ("In today's fast-moving AI landscape"), have zero images, contain no original test data, and follow a suspiciously uniform template. Quality is inconsistent — the Pictory review is excellent but guides are noticeably weaker.
**Fix:** Add original test data, screenshots, and expert-voice statements to all guides. Remove filler language.

### 20. Privacy Policy Missing GDPR/CCPA Language
**Evidence:** No explicit GDPR compliance section, data retention periods, or CCPA rights.
**Fix:** Add GDPR (lawful basis, data subject rights, DPO contact) and CCPA (right to know, delete, opt out) sections.

---

## Low Priority Issues

### 21. Missing og:url and og:type on Homepage
**Fix:** Add `og:url="https://www.shelby-ai.com/"` and `og:type="website"`.

### 22. Homepage Title 5 Characters Over Ideal (65 chars vs 60 max)
**Fix:** Shorten to "ShelbyAI — Best AI Tools Reviews & Comparisons" (48 chars).

### 23. Three Font Families Loaded (Heavy for Mobile)
**Evidence:** Inter, JetBrains Mono, Space Grotesk with multiple weights.
**Fix:** Reduce weight variants or use `font-display: optional` for non-critical fonts.

### 24. GitHub Repo Homepage Points to Vercel Subdomain
**Evidence:** `shelbyaideals.vercel.app` instead of `www.shelby-ai.com`.
**Fix:** Update GitHub repo homepage URL (5-minute fix).

### 25. No dns-prefetch Hints for Third-Party Domains
**Fix:** Add `<link rel="dns-prefetch">` for Supabase, Clarity, Beehiiv, Google Analytics.

### 26. /es/ Page Has Wrong Lang Attribute
**Evidence:** `<html lang="en">` on Spanish content page.
**Fix:** Set `lang="es"` on the /es/ page (low priority since page is noindexed).

---

## Category Deep Dives

### AI Citability (76/100)

**Strengths:**
- Reviews (88/100) and comparisons (89/100) are near-optimal — self-contained answer blocks, specific test data, structured tables, and clear verdicts
- Best-of roundups (87/100) have excellent ranked comparison tables and budget recommendations
- Pricing pages (77/100) have strong statistical density with exact plans and conversion metrics

**Weaknesses:**
- Alternatives pages (60/100) lack definitive answers, comparison tables, and FAQ sections
- Guides (69/100) use generic language and lack original test data
- FAQ page (70/100) only has site-about questions, missing tool-specific queries
- Homepage (67/100) has good trust signals but tool cards are too brief for AI citation

**Top Rewrite Priorities:**
1. Add bold opening answer to all alternatives pages: "The best [Tool] alternative in 2026 is [X] because [Y]"
2. Replace generic guide statements with specific, data-backed claims from testing
3. Add "Best Plan For" recommendations to all pricing pages
4. Expand FAQ to 25+ questions with tool-specific, high-search-volume queries
5. Add "Bottom Line" summary sentence at top of every review/comparison

### Brand Authority (8/100)

**Platform Presence Map:**

| Platform | Status | Quality |
|---|---|---|
| Google Search | NOT INDEXED | Critical |
| Twitter/X | Exists (@ShelbyAIDeals) | Unverifiable engagement |
| GitHub | Exists (1 star, 0 forks) | Minimal |
| LinkedIn | Restricted/suspended | None |
| YouTube | Does not exist | None |
| Reddit | 1 untraceable post | None |
| Pinterest | Unverifiable | Unknown |
| Product Hunt | Does not exist | None |
| Medium/Substack | Does not exist | None |
| AI Tool Directories | Not listed | None |
| Wikipedia | No mention | None |
| Trustpilot/G2 | Not listed | None |

**Critical Finding:** The brand name "ShelbyAI" has significant namespace collision with shelbyai.app (voice assistant), Shelby Heinecke PhD (AI researcher), Tommy Shelby AI voice generators, and Shelby Systems (church software). AI systems would not recognize ShelbyAI as an AI tool review publisher.

### Content E-E-A-T (52/100)

| Dimension | Score | Key Finding |
|---|---|---|
| Experience | 10/25 | Claims "7-14 days tested" but evidence is inconsistent. Pictory review has specific test data; guides have none. |
| Expertise | 9/25 | "Frank Shelby" is unverifiable. No credentials, no external presence, no author page. |
| Authoritativeness | 8/25 | New domain, zero external citations, no media mentions, no industry recognition. |
| Trustworthiness | 19/25 | Strongest dimension. Excellent affiliate disclosure, transparent methodology, contact info, content dating. |

**AI Content Assessment:** Likely human-edited AI content. Quality is inconsistent — Pictory review (8,500 words, specific tests) is substantially better than guides (generic, zero images). 133 URLs published within ~2-3 weeks is a bulk-publication pattern.

### Technical GEO (82/100)

**Strengths:**
- Excellent SSR via Next.js 15 — AI crawlers see full content without JavaScript
- All AI crawlers allowed (GPTBot, ClaudeBot, PerplexityBot, etc.)
- Strong security headers (HSTS, CSP, X-Frame-Options, Referrer-Policy)
- Clean URL structure with consistent trailing slashes
- 192-URL sitemap with lastmod dates

**Weaknesses:**
- No llms.txt file (404 at both locations)
- All images missing width/height (CLS risk)
- Hreflang tags possibly client-side only
- 2-hop redirect chain for non-www
- Missing og:url and og:type

### Schema & Structured Data (38/100)

**What Works:**
- JSON-LD format exclusively (correct choice)
- WebSite + SearchAction on every page
- Organization schema on every page
- BreadcrumbList on most content pages
- Review schema with SoftwareApplication + Rating on review pages
- FAQPage schema on review pages and pricing pages

**What's Broken:**
- Author is Organization everywhere (should be Person) — affects 76+ pages
- sameAs has only Twitter/X — AI models can't resolve the entity
- No Person schema exists anywhere
- No image property in Article/Review schemas
- dateModified always equals datePublished
- No speakable schema
- Missing schemas: no ItemList on best-of pages, no Product/Offer on pricing pages, no AboutPage schema

### Platform Optimization (8/100)

The site has near-zero presence on platforms that AI models use for training and citation:
- No YouTube channel (the #2 search engine and major AI training source)
- No Medium/Substack cross-publishing
- No AI tool directory listings
- No Product Hunt launch
- LinkedIn suspended
- Reddit presence untraceable
- GitHub presence minimal (1 star)

---

## Quick Wins (Implement This Week)

1. **Fix Google Search Console setup and request indexing** — Nothing else matters if Google can't find the site. Verify property, submit sitemap, request indexing on top 30 pages. (Impact: CRITICAL, Effort: 1 hour)

2. **Change schema author from Organization to Person** — Single code change in schema generation. Fixes E-E-A-T signaling across 76+ pages. (Impact: HIGH, Effort: 15 minutes)

3. **Add all social links to Organization schema sameAs** — Currently only Twitter. Add LinkedIn, Pinterest, GitHub. (Impact: HIGH, Effort: 15 minutes)

4. **Create llms.txt file** — Describe the site's purpose, content categories, and key pages for AI systems. (Impact: HIGH, Effort: 30 minutes)

5. **Add image property to all Article/Review schemas** — Use existing OG images. Unlocks Article rich result eligibility. (Impact: HIGH, Effort: 15 minutes)

6. **Fix GitHub repo homepage URL** — Change from shelbyaideals.vercel.app to www.shelby-ai.com. (Impact: LOW, Effort: 5 minutes)

7. **Submit to 5 AI tool directories** — futurepedia.io, theresanaiforthat.com, toolify.ai, aitoolsdirectory.com, alternativeto.net. (Impact: MEDIUM, Effort: 2 hours)

---

## 30-Day Action Plan

### Week 1: Foundation Fixes (Indexation + Schema)
- [ ] Verify Google Search Console for www.shelby-ai.com
- [ ] Submit sitemap and request indexing on top 30 pages
- [ ] Submit to Bing IndexNow API
- [ ] Fix schema author from Organization to Person (all pages)
- [ ] Add image property to all Article/Review schemas
- [ ] Expand Organization sameAs to all platforms
- [ ] Create and deploy llms.txt
- [ ] Add width/height to all images site-wide
- [ ] Fix GitHub repo homepage URL

### Week 2: Content Quality + Author Identity
- [ ] Create /author/frank-shelby/ page with photo, bio, credentials, Person schema
- [ ] Create or fix personal LinkedIn profile for author
- [ ] Add 8-12 screenshots to top 10 review pages
- [ ] Rewrite alternatives pages with opening answers and comparison tables
- [ ] Expand FAQ page to 25+ questions with tool-specific queries
- [ ] Add "Bottom Line" summary to all reviews and comparisons
- [ ] Add external editorial citations (5-8 per article) to top 10 articles

### Week 3: Off-Site Authority Building
- [ ] Submit to 10+ AI tool directories
- [ ] Create YouTube channel and upload 3 video reviews (from existing Remotion assets)
- [ ] Publish 2-3 articles on Medium (cross-post with canonical)
- [ ] Create Product Hunt upcoming page
- [ ] Begin HARO/Connectively outreach for AI tools queries
- [ ] Post value-add content on Reddit (r/SaaS, r/Entrepreneur, r/artificial) with profile link
- [ ] Resolve LinkedIn account restriction

### Week 4: Advanced Optimization + Monitoring
- [ ] Add speakable schema to key content blocks
- [ ] Add ItemList schema to best-of pages
- [ ] Add Product/Offer schema to pricing pages
- [ ] Fix hreflang to be server-rendered
- [ ] Fix non-www redirect chain (single hop, 308)
- [ ] Add GDPR/CCPA sections to privacy policy
- [ ] Publish first original research piece ("We tested X tools with Y methodology")
- [ ] Verify Google indexation progress (target: 50+ pages indexed)
- [ ] Run follow-up GEO audit to measure improvement

---

## Appendix: Pages Analyzed

| URL | Type | Citability | Key Issues |
|---|---|---|---|
| / | Homepage | 67 | Tool cards too brief, missing TL;DR blocks |
| /reviews/pictory-review | Review | 88 | Near-optimal; add Key Facts box |
| /comparisons/chatgpt-vs-claude-for-business/ | Comparison | 89 | Near-optimal; gold standard for the site |
| /guides/ai-content-workflow/ | Guide | 69 | Generic language, zero images, no original data |
| /best/best-ai-writing-tools-freelancers/ | Best-of | 87 | Strong; minor quotability improvements |
| /alternatives/jasper-ai/ | Alternatives | 60 | No definitive answer, no comparison table, thin |
| /pricing/elevenlabs/ | Pricing | 77 | Great data, missing "best plan for" recommendations |
| /faq/ | FAQ | 70 | Only site-about questions, needs tool-specific FAQs |
| /about | About | -- | No Person schema, no AboutPage schema |
| /how-we-review | Methodology | -- | Good transparency, needs Article schema |

### Subagent Reports

Detailed analysis files available:
- **Schema Audit:** `PROJECTS/shelby-deals/SCHEMA-AUDIT.md`
- **Citability, Brand, E-E-A-T, Technical:** Full transcripts in agent output logs

---

## Methodology

This audit was performed using a 5-parallel-subagent architecture:
1. **AI Citability** — 8 pages deep-analyzed for quotability, answer blocks, statistical density
2. **Brand Authority** — Cross-platform search across 12+ platforms for brand presence
3. **Technical GEO** — SSR verification, crawler access, headers, performance, URL structure
4. **Content E-E-A-T** — 7 pages analyzed for Experience, Expertise, Authoritativeness, Trustworthiness
5. **Schema & Structured Data** — 10 pages analyzed for JSON-LD completeness and validity

Scoring weights based on Georgia Tech / Princeton / IIT Delhi 2024 GEO study findings on AI citation factors.
