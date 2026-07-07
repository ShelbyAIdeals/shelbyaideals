# Shelby AI Deals — Full Money Review (2026-07-07)

Four parallel audits: monetization map, tracking/CRO funnel, live-site spot-check, SEO/content reality. Sources: codebase, GA4 export (Feb 1–Jun 21), GSC screenshots (90d to 2026-07-07), GSC CSVs (`research/gsc/*2026-05-24*`), live fetches of www.shelby-ai.com.

---

## 1. Reality check — the numbers, honestly

| Metric | Headline | Truth |
|---|---|---|
| GSC impressions 90d | 32.4K | Position 56 (page 6). CTR 0.2%. **81 clicks in 90 days ≈ 1/day.** Impressions rising since mid-May = Google sampling newly indexed pages (36→150 on 2026-05-16) at page 5–7, NOT progress. |
| GA active users 90d | 2.2K | ~75% bot-suspect (Singapore 44%, Chinese cities 23%, datacenter towns 8%). **Real humans ≈ 3–4/day.** |
| Key events | 6 | Tracking pipeline WORKS (verified end-to-end). 6 events in ~2 weeks post-wiring is the expected order of magnitude given traffic. Funnel + traffic problem, not a tracking bug. |
| Click composition | — | ~93% of organic clicks are branded ("shelby ai" pos 3.5). Non-branded Google ≈ zero. |
| Commissionable traffic | — | **Only ~8% of all pageviews land on a page whose primary tool has an active affiliate program.** |
| Freshness | — | Nothing shipped since 2026-06-21 (16 days) → matches early-July traffic decline. |

**Verdict:** impressions are a mirage. The bottleneck is (a) domain authority (position 56 needs backlinks, diagnosed 2026-05-24 in `docs/AUTHORITY-PLAYBOOK.md`, never executed) and (b) traffic landing on non-commissionable pages.

---

## 2. Strong links (real assets)

1. **8 active affiliate programs**, several 30% recurring: Frase, Pictory (30%), Synthesia, ElevenLabs, Mangools (30%), Chatbase (30%, mis-wired — see leak #1), Scalenut, AppSumo.
2. **Tracking pipeline works**: `affiliate_click` via delegation on `rel*="sponsored"` (`src/app/layout.tsx:105`), `newsletter_signup` on 4 surfaces. Owner completed GA4 key-event config.
3. **On-site GEO is top-tier**: llms.txt + llms-full.txt auto-generated, 14 schema types, TL;DR boxes, FAQ+schema, 13 AI crawlers allowed. AI-assistant referrals already ~34 users — the ~5x-converting channel that needs no domain authority.
4. **84% of content is commercial intent** (~120 of 143 URLs: 32 reviews, 31 pricing, 17 comparisons, 15 alternatives, 12 best-for, 8 best-of).
5. **Conversion machinery built**: StickyCTA, QuickVerdict, VerdictBox, /finder, /compare, /calculator, DealOfTheWeek — all with tracked CTAs.
6. **Striking-distance pages exist**:
   - `/comparisons/descript-vs-riverside-vs-capcut/` — pos **8.8**, 348 impr (blocked by Descript = pending)
   - `/pricing/google-gemini/` — **933 impr**, "google gemini cost" pos 14.3 (monetize via cross-sell)
   - `/reviews/pictory-review/` — pos 31.5, active 30% recurring
   - `/pricing/descript/` — pos 31.5
7. **Beehiiv newsletter live** (real issues sent, referrals in GA), API integration solid.
8. Site is technically clean: no 404s, no broken pages, sitemap ~199 URLs OK.

---

## 3. Weak points (leaks), ranked by € impact

1. **Chatbase active-but-untracked** — `affiliate.ts` has bare `chatbase.co`, and because status=`active`, `resolveAffiliateUrl` OVERWRITES the real tracked link (`link.chatbase.co/shelby-ai`, present in review frontmatter) on /pricing/chatbase, /compare, /calculator. Active program, zero attribution. **1-line fix.**
2. **82% of pricing traffic non-commissionable** — pricing = 23% of all views at 89% bounce; top pages Runway (19% of pricing views, not even in affiliate.ts), Gemini, Midjourney, ChatGPT, Grok. Only monetization = one cross-sell block far below the fold. No StickyCTA on pricing pages.
3. **21 of 28 live CTAs are plain vendor URLs earning $0** — incl. all top-3 CTAs on /best-for/content-writers and homepage flagship Make.com review.
4. **34 highest-intent in-content MDX affiliate links untracked** — `MDXContent.tsx:55-68` renders external links without `rel="sponsored"` → delegation handler never fires; most point at ACTIVE programs. Also a Google-compliance gap (paid links must be rel=sponsored).
5. **8 programs have tracked refs in review frontmatter but `pending` in affiliate.ts** (rytr, fliki, easy-peasy, simplified, mubert, mixo, decktopus, julius) — if approved, every non-review surface leaks. `scripts/affiliate-monitor.ts` exists to reconcile (needs PartnerStack/Impact keys).
6. **ExitIntentPopup is dead code** — fully built, tracked, magnet-wired, mounted NOWHERE. On a ~90%-bounce site.
7. **Authority playbook zero execution** — `docs/AUTHORITY-PLAYBOOK.md` (2026-05-24): directories, HARO, vendor "as-featured" outreach, data study. No outreach log exists. This is THE cause of position 56.
8. **Affiliate applications not chased** — Descript (unblocks pos-8.8 page + 3 best-for pages), Semrush ($200 CPA), Surfer, Writesonic, Grammarly, Canva. Fastest external € unlock.
9. **Interactive tools get zero traffic** — /finder, /compare, /calculator: 0 GA rows; only entry = one bottom-of-page link on pricing pages.
10. **Best-of pages bypass affiliate resolution** — `src/app/best/[slug]/page.tsx:133` uses raw frontmatter; 7 tools have `""` (CTA hidden), rest untracked.
11. **Scalenut + AppSumo active but used nowhere** — no review, no cross-sell, no AppSumo deal on /deals; 8 of 13 deals on /deals have bare URLs.
12. **Trust/compliance risks live**: "Affiliate link" label on non-affiliate ChatGPT link (/pricing/chatgpt); visible "Last updated" March 2026 on money pages vs sitemap claiming 2026-06-21 (reads as manipulated lastmod); ChatGPT pricing missing $200 Pro tier.
13. **Pictory ref mismatch** — `ref=fran26` (affiliate.ts) vs `ref=shelby-ai` (pictory-review.mdx); one is likely dead.
14. **Newsletter loop leaks** — /newsletter page signup untracked; lead magnet is an ungated HTML page (not delivered by email, not PDF); stale `shelbyaideals.beehiiv.com` link (live pub = `shelby-ai.beehiiv.com`); SPF/DKIM unverified; 3.7% returning users.
15. **`/finder` imports raw `useCaseData`** (`finder/page.tsx:3`) instead of the resolving accessor — will drift from affiliate.ts.

---

## 4. Money plan

### Phase 1 — code fixes (Claude, this week; no new traffic needed)
1. affiliate.ts: chatbase → `https://link.chatbase.co/shelby-ai`; add otter-ai; unify Pictory ref.
2. `MDXContent.tsx`: add `sponsored` to rel for affiliate-domain links → tracks 34 top-intent links + compliance.
3. Pricing pages: cross-sell above the fold + StickyCTA variant; extend `classifyTool()` (chatbot→Chatbase; automation/design when programs land).
4. Port cross-sell block onto big-brand review pages (ChatGPT/Claude/Gemini/Midjourney/Grok/Perplexity).
5. Mount ExitIntentPopup (ArticleLayout or Providers).
6. Route /best/[slug] CTAs through `resolveAffiliateUrl`; fill 7 empty URLs.
7. Drive internal traffic to /finder + /calculator (header nav, homepage hero, in-article CTAs, pricing pages).
8. Newsletter: fire tracking on /newsletter page; fix Beehiiv subdomain; gate cheatsheet (or deliver via welcome email).
9. Freshness pass: visible lastUpdated bumps on money pages (only where content actually reviewed); remove false "Affiliate link" label on ChatGPT; add $200 Pro tier.
10. `/finder` → `getAllUseCasePages()`.
11. Add AppSumo featured deal; Scalenut cross-sell placement.

### Phase 2 — owner manual (only you can)
1. **Chase affiliate approvals**: Descript, Semrush ($200 CPA), Surfer, Writesonic, Grammarly, Canva + investigate Runway program (19% of pricing views).
2. Provide PartnerStack/Impact API keys → run `scripts/affiliate-monitor.ts` → flip approved programs active.
3. GA4: build "real humans" filter (exclude Singapore/CN/datacenter cities).
4. Beehiiv SPF/DKIM check.
5. Real test data for flagship reviews (Pictory/ElevenLabs) — unique citable facts for AI engines.

### Phase 3 — authority + GEO (the only lever for position 56)
- Execute `docs/AUTHORITY-PLAYBOOK.md` weekly: directory submissions, vendor "as-featured" outreach for the 8 active-affiliate tools, HARO/Qwoted, ONE original pricing data study.
- Effort split going forward: **40% off-site authority / 30% GEO corroboration / 20% striking-distance pages + affiliate plumbing / 10% freshness** (1 commercial long-tail piece per week on ACTIVE-affiliate tools only).
- STOP investing in Tier-4 head terms (jasper review, chatgpt review, ai seo tools, zapier vs make) — DR85+ SERPs, unwinnable in 6 months.

### Honest revenue expectation
- Google organic without authority work: €0–50/mo ceiling for 6 months.
- With approvals + Phase 1 plumbing + GEO: the ~5x-converting AI-referral channel plus striking-distance pages are the realistic near-term path; first commissions likely from Pictory/ElevenLabs/Mangools recurring + Semrush CPA once approved.
