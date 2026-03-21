# Schema & Structured Data Audit -- www.shelby-ai.com

**Audit Date:** 2026-03-21
**Schema Score: 38/100** -- Poor

---

## Executive Summary

The site has a solid foundation with WebSite + SearchAction and Organization schemas present on every page, plus page-specific Review, Article, BreadcrumbList, and FAQPage schemas on content pages. However, critical gaps exist that severely limit AI discoverability and rich result eligibility:

1. **Organization sameAs links only X/Twitter** -- no Wikipedia, LinkedIn, YouTube, Crunchbase, or Wikidata
2. **Author is typed as Organization, not Person** -- this kills E-E-A-T signals and author rich results
3. **No Person schema exists anywhere** -- Frank Shelby has zero structured identity for AI models
4. **No speakable property** on any page
5. **No image property** in Article or Review schemas
6. **No mainEntityOfPage** linking schemas to their canonical URLs
7. **No AggregateRating** for community reviews (Supabase has user review data)
8. **Missing Article schema on multiple content page types** (about, how-we-review)
9. **Pricing pages lack Product/Offer schema** -- missed rich result opportunity

---

## Pages Analyzed

| # | Page | URL | Status |
|---|------|-----|--------|
| 1 | Homepage | https://www.shelby-ai.com | 200 OK |
| 2 | Review (Pictory) | https://www.shelby-ai.com/reviews/pictory-review/ | 200 OK |
| 3 | Review (Jasper AI) | https://www.shelby-ai.com/reviews/jasper-ai-review/ | 200 OK |
| 4 | Review (ElevenLabs) | https://www.shelby-ai.com/reviews/elevenlabs-review/ | 200 OK |
| 5 | Comparison | https://www.shelby-ai.com/comparisons/chatgpt-vs-claude-for-business/ | 200 OK |
| 6 | Guide | https://www.shelby-ai.com/guides/ai-content-workflow/ | 200 OK |
| 7 | Best-Of | https://www.shelby-ai.com/best/best-ai-writing-tools-freelancers/ | 200 OK |
| 8 | Alternatives | https://www.shelby-ai.com/alternatives/jasper-ai/ | 200 OK |
| 9 | Pricing | https://www.shelby-ai.com/pricing/elevenlabs/ | 200 OK |
| 10 | FAQ | https://www.shelby-ai.com/faq/ | 200 OK |
| 11 | About | https://www.shelby-ai.com/about/ | 200 OK |
| 12 | How We Review | https://www.shelby-ai.com/how-we-review/ | 200 OK |

---

## Detected Structured Data

### Global Schemas (Present on Every Page)

**Total Global Blocks:** 2 per page

| # | Type | Format | Valid | Rich Result Eligible |
|---|------|--------|-------|---------------------|
| 1 | WebSite + SearchAction | JSON-LD | Yes | Yes (Sitelinks Search Box) |
| 2 | Organization | JSON-LD | Partial | No (missing required sameAs breadth) |

### Page-Specific Schemas

| Page Type | Schemas Found | Blocks | Missing Critical Schemas |
|-----------|--------------|--------|--------------------------|
| **Homepage** | WebSite, Organization | 2 | None expected beyond global |
| **Reviews** | WebSite, Organization, Review (with SoftwareApplication + Rating), BreadcrumbList, FAQPage | 5 | Article, Person (author), AggregateRating, image |
| **Comparisons** | WebSite, Organization, Article, BreadcrumbList | 4 | ItemList (for compared products), Person (author), image |
| **Guides** | WebSite, Organization, Article, BreadcrumbList | 4 | Person (author), image, HowTo (if step-by-step) |
| **Best-Of** | WebSite, Organization, Article, BreadcrumbList | 4 | ItemList (for ranked tools), Person (author), image |
| **Alternatives** | WebSite, Organization, BreadcrumbList, ItemList | 4 | Article, Person (author) |
| **Pricing** | WebSite, Organization, BreadcrumbList, FAQPage | 4 | Article, Product/Offer/PriceSpecification |
| **FAQ** | WebSite, Organization, FAQPage | 3 | BreadcrumbList |
| **About** | WebSite, Organization | 2 | AboutPage, Person, BreadcrumbList |
| **How We Review** | WebSite, Organization | 2 | Article, BreadcrumbList |

---

## Validation Results

### Global: WebSite Schema
**Status:** Valid

| Property | Status | Value/Issue |
|----------|--------|-------------|
| @context | OK | https://schema.org |
| @type | OK | WebSite |
| name | OK | "ShelbyAIDeals" |
| url | OK | https://www.shelby-ai.com |
| description | OK | Present |
| potentialAction | OK | SearchAction with proper target template |
| query-input | OK | "required name=search_term_string" |

**Rich Result:** Eligible for Sitelinks Search Box.

### Global: Organization Schema
**Status:** Errors Found

| Property | Status | Value/Issue |
|----------|--------|-------------|
| @context | OK | https://schema.org |
| @type | OK | Organization |
| name | OK | "ShelbyAIDeals" |
| url | OK | https://www.shelby-ai.com |
| logo | WARNING | URL string, should be ImageObject with width/height for best results |
| description | OK | Present |
| sameAs | CRITICAL | Only 1 platform (X/Twitter) -- need 5+ for AI entity linking |
| contactPoint | MISSING | No contact information structured |
| foundingDate | MISSING | Not present |
| founder | MISSING | Not linked to Person schema |
| address | MISSING | No physical/mailing address |

**Rich Result:** Not eligible -- Organization needs logo as ImageObject for knowledge panel consideration.

### Review Pages (Pictory, Jasper AI, ElevenLabs)
**Status:** Errors Found

| Property | Status | Value/Issue |
|----------|--------|-------------|
| @type | OK | Review |
| name | OK | Present (headline) |
| description | OK | Present |
| datePublished | OK | ISO 8601 format |
| dateModified | WARNING | Same as datePublished on all reviews -- not updating after edits |
| author | CRITICAL ERROR | @type is Organization, should be Person (Frank Shelby) |
| publisher | OK | Organization |
| itemReviewed | OK | SoftwareApplication with name, offers |
| itemReviewed.applicationCategory | WARNING | Generic "AI Tool" -- should be more specific (e.g., "Multimedia Application", "Business Application") |
| itemReviewed.offers | WARNING | Missing availability property (InStock/PreOrder/etc.) |
| itemReviewed.image | MISSING | No product image |
| itemReviewed.operatingSystem | MISSING | Recommended for SoftwareApplication |
| reviewRating | OK | ratingValue, bestRating, worstRating present |
| image | MISSING | No review/article featured image |
| mainEntityOfPage | MISSING | Should link to canonical URL |
| aggregateRating | MISSING | No community/user ratings (Supabase has this data) |

**Rich Result Eligibility:**
- Review snippet: PARTIAL -- has reviewRating and itemReviewed, but author as Organization is non-standard
- Software App: PARTIAL -- missing image and specific applicationCategory
- Article: NOT ELIGIBLE -- no Article schema present on review pages

### Article Schema (Comparisons, Guides, Best-Of)
**Status:** Errors Found

| Property | Status | Value/Issue |
|----------|--------|-------------|
| @type | OK | Article |
| headline | OK | Present |
| description | OK | Present |
| datePublished | OK | ISO 8601 |
| dateModified | WARNING | Same as datePublished |
| author | CRITICAL ERROR | @type is Organization, not Person |
| publisher | PARTIAL | Organization with name and url, but missing logo |
| image | MISSING | Required for Article rich results |
| mainEntityOfPage | MISSING | Should be present |
| articleSection | MISSING | No topic categorization |
| wordCount | MISSING | No content length signal |
| articleBody | MISSING | No content excerpt |

**Rich Result Eligibility:** NOT ELIGIBLE -- missing image (required) and author should be Person with name and url.

### BreadcrumbList Schema
**Status:** Valid (where present)

| Property | Status | Value/Issue |
|----------|--------|-------------|
| @type | OK | BreadcrumbList |
| itemListElement | OK | Proper ListItem array with position, name, item |
| URLs | OK | Fully qualified absolute URLs |

**Rich Result:** Eligible where present. Missing on FAQ, About, How We Review pages.

### FAQPage Schema
**Status:** Valid

| Property | Status | Value/Issue |
|----------|--------|-------------|
| @type | OK | FAQPage |
| mainEntity | OK | Array of Question objects |
| Question.name | OK | Present |
| acceptedAnswer | OK | Answer objects with text |

**Note:** FAQPage rich results are RESTRICTED since Aug 2023 -- only shown for well-known government and health authority sites. The schema is harmless and may still help AI models understand Q&A structure. Keep it.

### ItemList Schema (Alternatives pages)
**Status:** Valid

| Property | Status | Value/Issue |
|----------|--------|-------------|
| @type | OK | ItemList |
| name | OK | Present |
| description | OK | Present |
| numberOfItems | OK | Present |
| itemListElement | OK | ListItem with position, name, url |

**Note:** Good implementation. Missing on Best-Of and Comparison pages where it would also be valuable.

---

## GEO-Critical Schema Assessment

| Schema | Status | GEO Impact | Notes |
|--------|--------|-----------|-------|
| Organization + sameAs | PARTIAL | Critical | Only X/Twitter linked. Wikipedia, LinkedIn, YouTube, Crunchbase, Wikidata, Pinterest all missing. AI models cannot build entity graph. |
| Person (author) | MISSING | Critical | Frank Shelby has zero Person schema. Author is typed as Organization everywhere. This completely breaks E-E-A-T signaling and author knowledge panel eligibility. |
| Article + dateModified | PARTIAL | High | Article exists on comparisons/guides/best-of but NOT on review pages. dateModified always equals datePublished (never updated). |
| speakable | MISSING | Medium | No speakable property on any page. Site content (review verdicts, FAQ answers) is ideal for voice/AI assistant consumption. |
| BreadcrumbList | PARTIAL | Low | Present on review, comparison, guide, best-of, alternatives, pricing pages. Missing on FAQ, About, How We Review. |
| WebSite + SearchAction | PRESENT | Low | Properly implemented on all pages. |

---

## sameAs Entity Linking

**Current sameAs links found:** 1

| Platform | Linked | URL |
|----------|--------|-----|
| Wikipedia | No | Not linked |
| Wikidata | No | Not linked |
| LinkedIn | No | Not linked (linkedin.com/in/shelby-ai-1bb38a3b6/ exists per About page) |
| YouTube | No | Not linked |
| Crunchbase | No | Not linked |
| Twitter/X | Yes | https://x.com/ShelbyAIDeals |
| Pinterest | No | Not linked (pinterest.com/shelbyaideals exists per About page) |
| GitHub | No | Not linked (github.com/ShelbyAIdeals exists) |

**Assessment:** Catastrophically incomplete. Only 1 of 8+ platforms linked. AI models have almost zero ability to perform cross-platform entity resolution for ShelbyAIDeals. The LinkedIn and Pinterest profiles visible on the About page are not in the sameAs array. This is the single highest-impact fix available.

---

## Deprecated/Restricted Schemas

| Schema | Status | Found On | Recommendation |
|--------|--------|----------|----------------|
| FAQPage | RESTRICTED (Aug 2023) | Reviews, FAQ, Pricing pages | Keep -- provides semantic value for AI models, not harmful |
| HowTo | Not present | N/A | Correct -- not used anywhere |

No deprecated schemas found. The site correctly avoids HowTo schema.

---

## JavaScript Rendering Risk

**Schema Delivery Method:** Server-rendered (Next.js SSR/RSC)

The JSON-LD `<script>` tags are present in the initial HTML response within the `<head>` section. They are NOT injected by client-side JavaScript. This is the correct approach.

- Google will process these schemas immediately (no delayed processing risk)
- AI crawlers (GPTBot, ClaudeBot, PerplexityBot) that do not execute JavaScript WILL see the schemas
- The site uses Next.js with React Server Components, which properly server-renders the structured data

**Risk Level:** Low -- schema delivery is correctly implemented.

---

## Schema Score Breakdown

| Component | Points Available | Points Earned | Details |
|-----------|-----------------|---------------|---------|
| Organization/LocalBusiness | 20 | 10 | Present (10), but sameAs has only 1 platform (need 3+ for full 20) |
| Article/content schema | 15 | 8 | Present on some pages (8), but author is Organization not Person (miss 4), dateModified never updates (miss 3) |
| Person schema for author | 15 | 0 | Completely missing. Author is Organization everywhere. |
| sameAs completeness | 15 | 2 | Only 1 platform (X/Twitter). Need 5+ including Wikipedia for full score. |
| speakable property | 10 | 0 | Not present on any page |
| BreadcrumbList | 5 | 3 | Present on most content pages but missing on FAQ, About, How We Review |
| WebSite + SearchAction | 5 | 5 | Properly implemented on all pages |
| No deprecated schemas | 5 | 5 | No deprecated/removed schemas found |
| JSON-LD format | 5 | 5 | All schemas use JSON-LD exclusively |
| Validation (no errors) | 5 | 0 | Author-as-Organization error affects all content schemas; missing required image on Articles |
| **TOTAL** | **100** | **38** | **Poor** |

---

## Recommended JSON-LD Templates

### Template 1: Enhanced Organization (Replace Existing)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ShelbyAIDeals",
  "alternateName": "ShelbyAI",
  "url": "https://www.shelby-ai.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.shelby-ai.com/images/og-thumbnail.png",
    "width": 1200,
    "height": 630
  },
  "description": "Honest AI tool reviews for creators, freelancers, and small teams. 31+ tools tested hands-on.",
  "foundingDate": "2026",
  "founder": {
    "@type": "Person",
    "name": "Frank Shelby",
    "url": "https://www.shelby-ai.com/about/"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@shelby-ai.com"
    },
    {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "partners@shelby-ai.com"
    }
  ],
  "sameAs": [
    "https://x.com/ShelbyAIDeals",
    "https://www.linkedin.com/in/shelby-ai-1bb38a3b6/",
    "https://www.pinterest.com/shelbyaideals/",
    "https://github.com/ShelbyAIdeals"
  ]
}
```

**Implementation:** Replace the existing Organization JSON-LD block in the site's global layout component. Add Wikipedia and Crunchbase URLs to sameAs when those pages exist.

---

### Template 2: Person Schema for Frank Shelby (NEW -- Add to Global Layout or Author Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Frank Shelby",
  "url": "https://www.shelby-ai.com/about/",
  "jobTitle": "Founder & Lead Reviewer",
  "worksFor": {
    "@type": "Organization",
    "name": "ShelbyAIDeals",
    "url": "https://www.shelby-ai.com"
  },
  "description": "[REPLACE: Brief 1-2 sentence bio about Frank Shelby's expertise in AI tools and content creation]",
  "knowsAbout": [
    "AI Writing Tools",
    "AI Video Tools",
    "AI Voice Generators",
    "AI SEO Tools",
    "AI Marketing Automation",
    "Content Creation",
    "AI Tool Reviews"
  ],
  "sameAs": [
    "https://x.com/ShelbyAIDeals",
    "https://www.linkedin.com/in/shelby-ai-1bb38a3b6/",
    "[REPLACE: Any personal social profiles for Frank Shelby]"
  ]
}
```

**Implementation:** Add as a separate JSON-LD block on the About page AND as the author reference in all Article/Review schemas.

---

### Template 3: Review Page Schema (Replace Existing Review Block)

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "name": "[REPLACE: Review headline]",
  "description": "[REPLACE: Review meta description]",
  "datePublished": "[REPLACE: ISO 8601 date]",
  "dateModified": "[REPLACE: ISO 8601 date -- must reflect actual last edit, not copy of datePublished]",
  "url": "[REPLACE: Canonical URL of the review page]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "[REPLACE: Canonical URL of the review page]"
  },
  "author": {
    "@type": "Person",
    "name": "Frank Shelby",
    "url": "https://www.shelby-ai.com/about/",
    "jobTitle": "Founder & Lead Reviewer",
    "worksFor": {
      "@type": "Organization",
      "name": "ShelbyAIDeals"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "ShelbyAIDeals",
    "url": "https://www.shelby-ai.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.shelby-ai.com/images/og-thumbnail.png"
    }
  },
  "image": {
    "@type": "ImageObject",
    "url": "[REPLACE: Featured image URL for this review]",
    "width": 1200,
    "height": 630
  },
  "itemReviewed": {
    "@type": "SoftwareApplication",
    "name": "[REPLACE: Tool name]",
    "applicationCategory": "[REPLACE: e.g., 'Multimedia Application', 'Business Application', 'DeveloperApplication']",
    "operatingSystem": "Web",
    "image": "[REPLACE: Tool logo/screenshot URL]",
    "offers": {
      "@type": "Offer",
      "price": "[REPLACE: Starting price number]",
      "priceCurrency": "USD",
      "availability": "https://schema.org/OnlineOnly"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "[REPLACE: e.g., 4.1]",
    "bestRating": 5,
    "worstRating": 1
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".review-verdict", ".review-summary", ".pros-cons"]
  }
}
```

**Implementation:** Replace the existing Review JSON-LD block on all review pages. The key changes are: author as Person (not Organization), added image, mainEntityOfPage, speakable, and operatingSystem.

---

### Template 4: Article Schema for Comparisons (Replace Existing)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[REPLACE: Comparison headline]",
  "description": "[REPLACE: Meta description]",
  "datePublished": "[REPLACE: ISO 8601]",
  "dateModified": "[REPLACE: ISO 8601 -- actual last edit date]",
  "url": "[REPLACE: Canonical URL]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "[REPLACE: Canonical URL]"
  },
  "author": {
    "@type": "Person",
    "name": "Frank Shelby",
    "url": "https://www.shelby-ai.com/about/",
    "jobTitle": "Founder & Lead Reviewer"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ShelbyAIDeals",
    "url": "https://www.shelby-ai.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.shelby-ai.com/images/og-thumbnail.png"
    }
  },
  "image": {
    "@type": "ImageObject",
    "url": "[REPLACE: Featured image URL]",
    "width": 1200,
    "height": 630
  },
  "articleSection": "[REPLACE: e.g., 'AI Writing Tools', 'AI Video Tools']",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".comparison-verdict", ".comparison-summary"]
  }
}
```

**Implementation:** Replace existing Article blocks on comparison, guide, and best-of pages.

---

### Template 5: ItemList Schema for Best-Of and Comparison Pages (NEW)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "[REPLACE: e.g., '7 Best AI Writing Tools for Freelancers']",
  "description": "[REPLACE: Brief list description]",
  "numberOfItems": "[REPLACE: Number of items]",
  "itemListOrder": "https://schema.org/ItemListOrderDescending",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "[REPLACE: Tool name]",
      "url": "[REPLACE: Link to review page or tool site]"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[REPLACE: Tool name]",
      "url": "[REPLACE: Link to review page or tool site]"
    }
  ]
}
```

**Implementation:** Add to Best-Of pages (currently missing) and Comparison pages. Already present on Alternatives pages -- good.

---

### Template 6: AboutPage Schema (NEW -- for /about/)

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About ShelbyAI",
  "url": "https://www.shelby-ai.com/about/",
  "description": "We test AI tools the way you actually use them. Learn about our hands-on testing methodology, honest reviews, and workflow-first approach.",
  "mainEntity": {
    "@type": "Organization",
    "name": "ShelbyAIDeals",
    "url": "https://www.shelby-ai.com"
  }
}
```

**Implementation:** Add as a new JSON-LD block on the About page.

---

### Template 7: Pricing Page Product Schema (NEW)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[REPLACE: e.g., 'ElevenLabs']",
  "applicationCategory": "[REPLACE: e.g., 'Multimedia Application']",
  "operatingSystem": "Web",
  "offers": [
    {
      "@type": "Offer",
      "name": "[REPLACE: Plan name, e.g., 'Free']",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/OnlineOnly",
      "description": "[REPLACE: Plan description, e.g., '10,000 characters/month, 3 custom voices']"
    },
    {
      "@type": "Offer",
      "name": "[REPLACE: Plan name, e.g., 'Starter']",
      "price": "5",
      "priceCurrency": "USD",
      "availability": "https://schema.org/OnlineOnly",
      "description": "[REPLACE: Plan description]"
    }
  ]
}
```

**Implementation:** Add to all 15 pricing pages. This enables Product rich snippets showing pricing in search results.

---

### Template 8: BreadcrumbList for Missing Pages (NEW)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.shelby-ai.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[REPLACE: Section name -- e.g., 'FAQ', 'About', 'How We Review']",
      "item": "[REPLACE: Page URL]"
    }
  ]
}
```

**Implementation:** Add to FAQ, About, and How We Review pages (currently missing BreadcrumbList).

---

## Consistency Issues Across Page Types

| Issue | Affected Pages | Severity |
|-------|---------------|----------|
| Author is Organization, not Person | ALL content pages (reviews, comparisons, guides, best-of) | Critical |
| dateModified equals datePublished | ALL content pages | High |
| No image property in schemas | ALL content pages | High |
| No mainEntityOfPage | ALL content pages | Medium |
| No Article schema on review pages | All 31+ review pages | Medium |
| BreadcrumbList inconsistently applied | Missing on FAQ, About, How We Review | Low |
| ItemList missing on best-of pages | All 8 best-of pages | Medium |
| No Article schema on pricing pages | All 15 pricing pages | Low |
| worstRating is 0, should be 1 | All review pages | Low (but technically incorrect per convention) |
| FAQ answer has typo "$19//month" | Pictory review FAQPage | Low |
| Publisher missing logo ImageObject | All Article schemas | Medium |

---

## Priority Actions

### CRITICAL (Do First -- Highest Impact)

1. **Fix author type from Organization to Person on ALL content schemas.** Change `"author": {"@type": "Organization", "name": "ShelbyAIDeals"}` to `"author": {"@type": "Person", "name": "Frank Shelby", "url": "https://www.shelby-ai.com/about/"}` across all Review and Article schemas (76+ pages). This is the single biggest E-E-A-T fix and directly impacts how Google and AI models attribute content expertise.

2. **Expand Organization sameAs to include all known platforms.** Add LinkedIn (`https://www.linkedin.com/in/shelby-ai-1bb38a3b6/`), Pinterest (`https://www.pinterest.com/shelbyaideals/`), and GitHub (`https://github.com/ShelbyAIdeals`). When available, add Wikipedia and Crunchbase. This enables AI cross-platform entity resolution.

3. **Add a standalone Person schema for Frank Shelby.** Create a Person JSON-LD block with name, jobTitle, worksFor, knowsAbout, and sameAs. Add to the About page at minimum, ideally to all pages.

### HIGH (Do Next -- Significant Impact)

4. **Add image property to all Review and Article schemas.** Google requires `image` for Article rich results. Use the OG image or featured image for each page.

5. **Add mainEntityOfPage to all Review and Article schemas.** Links the structured data to its canonical URL, improving search engine understanding of page purpose.

6. **Ensure dateModified reflects actual edit dates.** Currently dateModified always equals datePublished. Track and surface real last-modified dates. This is an important freshness signal for AI models.

7. **Add ItemList schema to Best-Of pages.** The 8 best-of pages list ranked tools but have no ItemList schema. Alternatives pages already have this -- replicate the pattern.

8. **Add Article schema to Review pages.** Reviews currently only have a Review schema. Adding a parallel Article schema improves content classification for search engines.

### MEDIUM (Valuable Improvements)

9. **Add speakable property to Review and Article schemas.** Target CSS selectors like `.review-verdict`, `.review-summary`, and `.pros-cons` sections. This signals AI assistant readiness.

10. **Add BreadcrumbList to FAQ, About, and How We Review pages.** These 3 pages are the only ones missing breadcrumbs. Inconsistency looks like an oversight.

11. **Add SoftwareApplication + Offers schema to pricing pages.** The 15 pricing pages display detailed plan tiers and costs but have no Product/Offer structured data. This is a missed rich result opportunity.

12. **Add AboutPage schema to the About page.** Simple addition that explicitly marks the page purpose for AI models.

13. **Enhance logo from URL string to ImageObject.** Change `"logo": "url"` to `"logo": {"@type": "ImageObject", "url": "...", "width": ..., "height": ...}` in Organization schema.

### LOW (Nice to Have)

14. **Fix worstRating from 0 to 1.** Convention is 1-5 scale. 0 is technically valid but non-standard.

15. **Use more specific applicationCategory values.** Replace generic "AI Tool" with Schema.org-recognized categories like "Multimedia Application" or "Business Application".

16. **Fix FAQ answer typo.** Pictory FAQ shows "$19//month" (double slash).

17. **Add publisher.logo to Article schemas.** Currently Article publisher has name and url but no logo ImageObject.

18. **Consider adding AggregateRating to reviews.** If Supabase user reviews generate aggregate scores, surface them via AggregateRating schema. This shows star ratings from real users in search results.

---

## Estimated Impact of Fixes

If all CRITICAL and HIGH actions are implemented, the Schema Score would increase from **38/100 to approximately 75-80/100**. Adding MEDIUM items would push it to **85-90/100**. A perfect score requires Wikipedia/Wikidata sameAs links (which require those pages to exist first).

The highest-ROI single change is **fixing author from Organization to Person** -- it affects 76+ pages and directly impacts both E-E-A-T signals and AI author entity recognition.

The highest-ROI addition is **expanding sameAs** -- it takes 5 minutes to add 3 known platform URLs and immediately enables cross-platform entity linking for every AI model that processes the site.
