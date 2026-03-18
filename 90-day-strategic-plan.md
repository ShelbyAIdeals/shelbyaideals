# Shelby AI Deals: 90-Day Strategic Plan
## Saved: 2026-03-18

## Quick Reference

### Niche Focus
- **Primary:** AI Video & Audio tools for small business content
- **Secondary:** Marketing Automation AI + AI SEO Tools
- **De-emphasize:** Content/Writing AI (too competitive, no affiliate programs on major tools)

### Affiliate Tiers
| Tier | Tools | Action |
|---|---|---|
| **Tier 1 (invest)** | Pictory (30%), Mangools (30%), Frase, ElevenLabs, Synthesia | Rewrite to quality floor, add tutorials |
| **Tier 2 (maintain)** | Rytr, Fliki, Easy Peasy AI, Simplified, Mubert, Mixo, Decktopus, Julius AI | Keep updated |
| **Tier 3 (chase)** | Writesonic (30%), Surfer SEO (25%), Descript (15-20%), Semrush ($200) | Reapply for programs |
| **Tier 4 (freeze)** | Jasper, Copy.ai, ChatGPT, Claude, Midjourney, Gemini, Grok, Perplexity, Runway ML | No more investment |

### Category Restructure (6 -> 3)
| New Category | Slug | Contains |
|---|---|---|
| AI Video & Audio | ai-video-audio | Pictory, Synthesia, ElevenLabs, Descript, Fliki, Runway ML, Mubert, Leonardo |
| AI Marketing & SEO | ai-marketing-seo | Surfer SEO, Frase, Mangools, Semrush, Grammarly, Make.com |
| AI Content & Productivity | ai-content-productivity | Jasper, Copy.ai, Writesonic, Rytr, ChatGPT, Claude, Otter.ai, etc. |

---

## Days 1-30: Foundation Reset

### Week 1: Trust & Identity
- [ ] Create named author persona with bio page, photo, social links
- [ ] Update all 31 review MDX files: change author from "ShelbyAI Team" to named author
- [ ] Add lastTested dates to all reviews missing it
- [ ] Add testDuration field to ReviewMeta type and populate for all reviews
- [ ] Remove ai-coding-tools from CATEGORIES array
- [ ] Hide empty UserReviewsSection (conditional render when count > 0)

### Week 2: Positioning
- [ ] Rewrite Hero.tsx: new headline, subheadline, trust strip, trending tools
- [ ] Update About page with narrowed positioning
- [ ] Update "How We Review" page with specific testing examples
- [ ] Merge 6 categories into 3 in types.ts and navigation
- [ ] Remove "Deals" from navigation (or redesign with real deals)

### Week 3-4: Programmatic SEO Expansion
- [ ] Add alternatives data for remaining 24 tools in alternatives-data.ts
- [ ] Add pricing data for remaining ~16 tools in pricing-data.ts
- [ ] Verify all new pages render correctly and have proper schema
- [ ] Submit updated sitemap to Google Search Console

**Target: ~130 indexed pages (up from ~90)**

---

## Days 31-60: Content Quality & Conversion

### Week 5-6: Content Standards
- [ ] Rewrite 5 highest-priority Tier 1 reviews to Pictory-standard quality: ElevenLabs, Mangools, Frase, Fliki, Rytr
- [ ] Ensure each rewritten review has: 3+ screenshots, specific test metrics, 4+ internal links, testing badge, "not for" section
- [ ] Add internal links to all batch-2 reviews (minimum 4 per review)
- [ ] Create lead magnet: "2026 AI Video Tools Comparison Sheet" PDF
- [ ] Update InlineNewsletterCTA to offer lead magnet with contextual copy

### Week 7-8: New Commercial Content
- [ ] Write 3 new comparisons: Pictory vs Lumen5 vs InVideo, ElevenLabs vs Murf vs Play.ht, Frase vs MarketMuse
- [ ] Write 2 new tutorial guides: "Blog Post to Video with Pictory", "AI Voiceovers for Marketing with ElevenLabs"
- [ ] Adjust StickyCTA scroll trigger from 40% to 60%
- [ ] Replace Tier 4 tool CTAs with newsletter signup

**Target: 135+ indexed pages, all Tier 1 reviews at production quality, lead magnet live**

---

## Days 61-90: Niche Expansion & Revenue

### Week 9-10: Cluster Expansion
- [ ] Write 4 new video tool reviews: Lumen5, InVideo, Heygen, Opus Clip
- [ ] Write 2 new best-of roundups: "Best AI Video Tools for Small Business", "Best AI Voiceover Tools"
- [ ] Create corresponding alternatives + pricing pages for each new tool
- [ ] Implement content freshness system (build-time banner for reviews >90 days old)

### Week 11-12: Revenue Acceleration
- [ ] Reapply to Tier 3 affiliate programs: Writesonic, Surfer SEO, Descript, Semrush
- [ ] Negotiate higher rates with Tier 1 partners (share traffic data)
- [ ] Create "Small Business AI Stack" recommendation page bundling Tier 1 tools
- [ ] Launch 1 Twitter/X thread per week featuring specific video tool tests
- [ ] Publish 1 new comparison per week going forward

**Target: 150+ indexed pages, $200-500/month affiliate revenue, 500+ newsletter subscribers**

---

## Revenue Projections
- Month 1-3: $0-200/month (foundation work)
- Month 4-6: $200-800/month (Pictory + Mangools recurring)
- Month 7-12: $800-2,000/month (pending affiliates activate)
- Year 2: $2,000-5,000/month (niche authority established)

---

## Key Files to Modify
- `src/lib/types.ts` — Category restructure, new ReviewMeta fields
- `src/components/Hero.tsx` — New positioning/messaging
- `src/lib/affiliate.ts` — URL audit, tier tagging
- `src/lib/alternatives-data.ts` — Expand to 31 entries
- `src/lib/pricing-data.ts` — Expand to 31 entries
- `src/components/StickyCTA.tsx` — Scroll trigger 40% -> 60%
- `src/components/UserReviewsSection.tsx` — Conditional render
- All 31 review MDX files — Author, lastTested, testDuration, internal links
- `src/app/reviews/[slug]/page.tsx` — AuthorCard, testing badge, "not for"
- `src/app/about/page.tsx` — Narrow positioning, author profile

## Full Strategic Plan
See: `~/.claude/plans/warm-conjuring-lake.md` for the complete 12-section analysis.
