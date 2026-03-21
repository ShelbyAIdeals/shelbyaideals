# SEO Recommendations — Items Requiring Manual Action

## High Priority

### 1. Google Search Console Verification
- Verify ownership at https://search.google.com/search-console
- Submit XML sitemap: https://www.shelby-ai.com/sitemap.xml
- Monitor indexing status and crawl errors

### 2. Bing Webmaster Tools
- Already verified (BingSiteAuth.xml deployed)
- Submit sitemap if not already done
- Monitor search performance

### 3. Core Web Vitals
- Monitor LCP, FID, CLS in Search Console
- Current risk: unoptimized images (PNG instead of WebP)
- Consider: image optimization build script (sharp/squoosh)

### 4. Image Optimization
- 31 tool thumbnails are PNG/JPG (some over 200KB)
- Convert to WebP with quality 80 for 3-5x size reduction
- Add width/height attributes to prevent CLS
- Implement Next.js Image component where possible (limited by static export)

## Medium Priority

### 5. Content Gaps (requires writing)
- Add "How to Use [Tool]" quick-start guides for top 10 tools
- Write 10+ new comparison articles targeting "[Tool A] vs [Tool B]" keywords
- Write 5+ "Best AI Tools for [Industry]" pages (e-commerce, real estate, education, healthcare, SaaS)
- Add scoring methodology breakdown section to each review

### 6. E-E-A-T Signals
- Add author bio with photo to review pages (authorBio/authorImage fields exist in schema but aren't rendered)
- Add "About the Author" section to articles
- Consider LinkedIn/Twitter profile links for author credibility
- Add "As Seen In" or trust badges if applicable

### 7. Backlink Strategy
- Guest post on 5+ AI/tech blogs
- Get listed on AI tool directories (meta-listing)
- Submit to Product Hunt, Hacker News for new features
- Reach out to tool makers for cross-promotion

## Low Priority

### 8. Technical Improvements
- Add Person schema for author (currently Organization only)
- Add Video schema to tool profile videos
- Consider hreflang on all article pages (currently homepage only)
- Add FAQ schema to more page types (currently auto-generated on reviews only)
- Monitor duplicate metadata across programmatic pages

### 9. Performance
- Lazy load below-fold images
- Reduce JS bundle for static pages (some are 200KB+ first load)
- Consider ISR instead of full static export if content update frequency increases

### 10. Monitoring
- Set up monthly KPI tracking (organic traffic, CTR, bounce rate, affiliate clicks)
- Monitor keyword rankings for target terms
- Track affiliate conversion rates per tool
