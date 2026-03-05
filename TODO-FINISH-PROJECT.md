# Shelby AI Deals — What Needs To Be Done

## Status: 10/40 articles published, site built, not yet deployed

---

## CRITICAL PATH (Do These First)

### 1. Deploy the Website
- [ ] Create GitHub repository (github.com/shelbyaideals/shelbyaideals)
- [ ] Push code to GitHub
- [ ] Connect repo to Vercel
- [ ] Add custom domain shelby-ai.com
- [ ] Verify DNS + SSL working
- [ ] Test all pages load correctly

### 2. Set Up Analytics
- [ ] Create GA4 property for shelby-ai.com
- [ ] Add GA4 tracking code (NEXT_PUBLIC_GA4_ID in .env)
- [ ] Set up Google Search Console
- [ ] Submit sitemap (already generated at /sitemap.xml)
- [ ] Verify domain ownership in GSC
- [ ] Set up event tracking for affiliate link clicks

### 3. Apply for Affiliate Programs (Tier 1 — Highest Priority)
| Program | Commission | Apply At |
|---------|-----------|----------|
| Jasper AI | 30% recurring | jasper.ai/partners |
| Copy.ai | 20-45% recurring | copy.ai/affiliates |
| Writesonic | 30% recurring | writesonic.com/affiliates |
| Surfer SEO | 25% recurring | surferseo.com/affiliate |
| SEMrush | $200 CPA + $10/trial | semrush.com/affiliate-program |
| Grammarly | $0.20 free / $20 premium | grammarly.com/affiliates |
| Descript | 15-20% recurring | descript.com/affiliates |

### 4. Replace Placeholder Affiliate Links
- [ ] Update src/lib/affiliate.ts with real URLs for each approved program
- [ ] Rebuild and redeploy after updating links

---

## CONTENT (Auto-publishing ready, needs API key)

### 5. Set Up Auto-Publishing
- [ ] Get Anthropic API key (ANTHROPIC_API_KEY)
- [ ] Set GitHub Secrets: ANTHROPIC_API_KEY
- [ ] Test generate-article.ts locally first
- [ ] Enable GitHub Actions workflow
- [ ] Verify Mon/Wed/Fri 8am UTC publishing works

### 6. Remaining Content (30 articles queued)
Articles auto-publish in this order:
- Mar 9: Zapier vs Make.com
- Mar 11: Surfer SEO vs Clearscope vs Frase
- Mar 13: Descript vs Riverside vs CapCut
- Mar 16: ChatGPT vs Jasper vs Claude
- ... (through May 15)

---

## MARKETING (Start Week 1)

### 7. Social Media Accounts
- [ ] Twitter/X: Create @ShelbyDeals account
- [ ] Reddit: Create account, join r/Entrepreneur, r/SaaS, r/ArtificialIntelligence, r/marketing, r/freelance
- [ ] LinkedIn: Personal or brand page
- [ ] Pinterest: Business account
- [ ] YouTube: Channel for tool walkthroughs
- [ ] Quora: Account to answer AI tool questions

### 8. Newsletter
- [ ] Create Beehiiv account
- [ ] Set publication ID in .env (NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID)
- [ ] Design welcome email sequence
- [ ] Write first newsletter (toolstack cheatsheet)

### 9. Community Marketing (Weeks 1-2)
- [ ] Post value-first content on Reddit (no links initially)
- [ ] Answer 3-5 Quora questions about AI tools
- [ ] Write first LinkedIn thought-leadership post
- [ ] Create 5 Pinterest pins for top articles
- [ ] Share in 2-3 relevant communities

### 10. Content Marketing (Weeks 2-4)
- [ ] First Twitter thread (review summary)
- [ ] First Reddit thread with review link (after building karma)
- [ ] 2 more LinkedIn posts
- [ ] Send first newsletter
- [ ] 5 more Quora answers with embedded links

---

## MEDIA (Images & Videos)

### 11. Images (see MEDIA-STRATEGY.md for full details)
- [ ] Create Canva thumbnail template (dark theme, matcha accent)
- [ ] Screenshot each tool's UI (sign up for free trials)
- [ ] Create thumbnails for all 10 published articles
- [ ] Create comparison infographic for Jasper vs Copy.ai
- [ ] Create social share images for each article

### 12. Videos
- [ ] Set up screen recording (OBS or Loom)
- [ ] Record Jasper AI 2-min walkthrough
- [ ] Record Copy.ai 2-min walkthrough
- [ ] Record Writesonic walkthrough
- [ ] Record Surfer SEO walkthrough
- [ ] Upload to YouTube, embed in articles

---

## TECHNICAL (Claude can help with these)

### 13. Technical Improvements
- [ ] Add Open Graph images to all articles (og:image)
- [ ] Implement click tracking on affiliate links (GA4 events)
- [ ] Add structured data (JSON-LD) for reviews (star ratings in Google)
- [ ] Set up 301 redirects if any URLs change
- [ ] Add canonical URLs to prevent duplicate content
- [ ] Optimize Core Web Vitals (LCP, CLS, FID)

### 14. Monitoring
- [ ] Set up uptime monitoring (UptimeRobot free tier)
- [ ] Monitor Google Search Console for indexing issues
- [ ] Track keyword rankings weekly
- [ ] Monitor affiliate dashboard daily for first conversions

---

## EXPANSION (Months 2-3)

### 15. Apply for Tier 2 & 3 Affiliate Programs
| Program | Commission | Category |
|---------|-----------|----------|
| Pictory | 30% recurring | AI Video |
| Synthesia | 25% per sale | AI Video |
| Canva | $36/Pro sub | AI Design |
| Rytr | 30% recurring | AI Writing |
| Frase.io | 30% recurring | AI SEO |
| ElevenLabs | 22% recurring | AI Voice |
| Notion AI | 50% first payment | AI Productivity |
| HubSpot | $250-$1000 CPA | AI Marketing |
| Adobe Firefly | 85% first month | AI Design |
| Buffer | 20% recurring | Social Media |
| Riverside.fm | 20% recurring | AI Video |
| Beehiiv | 20% recurring (24mo) | AI Marketing |
| ClickUp | 20% recurring | AI Productivity |
| Otter.ai | 25% recurring | AI Productivity |

### 16. More Content Types
- [ ] Tool comparison videos (YouTube)
- [ ] "How to" tutorial series
- [ ] Monthly "new AI tools" roundup
- [ ] Email course: "Build Your AI Stack in 7 Days"
- [ ] Guest posts on marketing blogs

---

## REVENUE MILESTONES

| Milestone | Target | Estimated Timeline |
|-----------|--------|-------------------|
| First affiliate click | 1 click | Week 1 after deploy |
| First conversion | 1 sale | Month 1 |
| $100/month | ~3-5 sales | Month 2-3 |
| $500/month | ~15-20 sales | Month 4-6 |
| $1000/month | ~30-40 sales | Month 6-12 |

---

## Quick Reference

- **Site**: shelby-ai.com
- **Code**: PROJECTS/shelby-deals/
- **Dashboard**: Main dashboard > Shelby AI Deals module
- **Content queue**: scripts/content-queue.json
- **Affiliate links**: src/lib/affiliate.ts
- **Automation**: .github/workflows/ (auto-publish)
