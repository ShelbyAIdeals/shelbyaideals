# Shelby AI Deals — CRO Plan (Phase 6)

**Created:** 2026-05-24

## The headline finding: diagnose before you change anything

GA (28 days): 826 users, but **~4-second avg engagement and ~97–100% bounce**, and the **404 page got 48 views**. Critically, only **~43 of those 826 users came from organic search** — so the vast majority is direct/referral/social/**possibly bot** traffic.

**A 4-second average across 826 "users" is the signature of bot or accidental low-intent traffic, not a UX failure.** Your conversion infrastructure is already strong (see below). Optimizing the UI against bot traffic = optimizing noise. So Phase 6 is **diagnosis first**, then targeted tweaks.

## What's already in place (you do NOT need to add these)
- Email capture: Header, Footer, in-article (InlineNewsletterCTA), Deals page, dedicated `/newsletter/`.
- **Exit-intent popup** (`ExitIntentPopup`).
- Clear Hero with search + value prop + primary/secondary CTAs.
- Article TOC, related articles, strong internal linking (improved in Phase 3).
- **Microsoft Clarity is already installed** (session recordings + heatmaps + bot filtering) — plus GA4.

## Step 1 — Diagnose traffic quality (do this first; ~30 min)
1. **Microsoft Clarity** (already collecting): watch 15–20 session recordings.
   - Real users? You'll see mouse movement, scroll, reading pauses.
   - Bots/junk? Instant bounces, no movement, identical patterns, odd geographies. Clarity also auto-flags bot traffic and shows "quick backs," "rage clicks," "dead clicks."
2. **GA4 → Reports → Acquisition → Traffic acquisition** (export to the reports folder): which channels drive the 826? If it's mostly "Direct" or one referral with ~0s engagement, it's bots/junk.
3. **GA4 → segment to Organic Search only** and re-check engagement/bounce. Judge UX on *real* visitors, not the aggregate.

**Decision gate:** If engagement is bot-skewed → the real CRO baseline is fine; focus on Phases 3–4 (traffic) and revisit CRO when organic grows. If *real* organic users also bounce in seconds → proceed to Step 2/3.

## Step 2 — Define the conversion goals (so we optimize the right thing)
For an affiliate/content site the funnel is: **land → engage → (a) click affiliate out, and/or (b) capture email** for return visits.
- **Primary micro-conversion: email signups** (compounding — most affiliate revenue comes from repeat/return visitors, not first session).
- **Secondary: affiliate outbound clicks** (track as GA events — verify these fire).
- Set both as GA4 key events and watch by landing page.

## Step 3 — Prioritized tweaks (apply once real-user data confirms a problem)
Ranked by expected impact, lowest-risk first:
1. **Above-the-fold answer-first content.** For review/comparison pages, ensure the verdict/winner + price is visible without scrolling (reduces quick-backs). Largely present via QuickVerdict/WinnerBox — verify on mobile.
2. **Email capture value prop.** Test the offer ("AI tool deals + honest reviews weekly" vs a lead magnet like "the $100/mo AI stack cheat-sheet" — you already have an AI-stack asset). A concrete lead magnet usually doubles signup rate.
3. **Internal-link "next step" at the decision point.** After the verdict, offer the obvious next click (pricing, alternative, related comparison) — Phase 3 added much of this; confirm it's above the related-articles fold.
4. **Core Web Vitals / mobile speed.** Static export with `images.unoptimized: true` — confirm LCP on mobile (hero image, featured images). WebP helps; check the hero isn't oversized. Mobile is ~93% of your impressions' devices in GSC distribution, so mobile speed matters most.
5. **Affiliate CTA clarity.** Ensure "Try [Tool]" buttons are visually dominant and the value ("free trial," "from $X/mo") is on the button/nearby.
6. **Exit-intent offer.** Make the exit popup a lead magnet, not a generic newsletter ask.

## Metrics to watch (GA4 + Clarity)
- Engagement rate & avg engagement time **(Organic Search segment only)**
- Scroll depth (Clarity) on review/comparison pages
- Email signup rate per landing page
- Affiliate outbound click-through rate
- Quick-back rate (Clarity)

## Honest expectation
With ~43 organic visitors/period, **CRO can't move revenue yet — there isn't enough real traffic to optimize or A/B test.** CRO ROI kicks in after Phases 3–4 grow organic sessions (rule of thumb: meaningful A/B testing needs ~1,000+ sessions/variant). Until then: (1) confirm tracking/events fire, (2) add one lead magnet to the email capture, (3) re-evaluate when organic traffic is 10×.
