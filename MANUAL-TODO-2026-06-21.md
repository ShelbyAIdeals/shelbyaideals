# Shelby AI Deals — Manual Work To Do (2026-06-21)

Everything below is work **only you can do** — it needs dashboard access, real testing data, or
real asset creation that I can't (and shouldn't) fabricate. Ordered by money impact.

Context: this session shipped (all live on shelby-ai.com via Vercel) — GEO retrofit (TL;DR + FAQ +
ratings/schema), brand unification, GA conversion events, pricing-page commissionable cross-sell,
3 interactive tools (/finder, /compare, /calculator), 4 new /best-for pages, earlier StickyCTA.

---

## 🔴 P0 — Turn on conversion tracking (5 min, do FIRST)
Without this, GA4 shows **zero conversions** (confirmed in your report) and you're optimizing blind.
The events now fire from the site; you just need to mark them as conversions:

1. Go to **GA4 → Admin (bottom-left gear) → Property column → Events**.
2. Wait until you see `affiliate_click` and `newsletter_signup` in the list (they appear within
   ~24h after the new deploy gets a little real traffic — click an affiliate link / subscribe
   yourself to seed them faster).
3. Toggle **"Mark as key event"** ON for both.
4. (Optional) Admin → **Key events** → confirm both are listed.

Now affiliate clicks + signups will show as conversions and you can finally measure money.

---

## 🔴 P1 — Filter out bot/datacenter traffic (10 min)
~71% of your "users" are bots (Singapore was 44% alone, plus China farms + AWS/Google datacenter
towns). They wreck every metric. Two things:

1. **Admin → Data Settings → Data collection → "Bot filtering"** — confirm it's ON (it excludes
   *known* bots only).
2. Build a clean **Exploration** for real reporting:
   - GA4 → **Explore → blank** → add dimension **City** and **Region**, metric **Active users**.
   - Add a **filter** excluding: Singapore, Shanghai, Beijing, Guangzhou, Hangzhou, and the US
     datacenter towns **Council Bluffs, Ashburn, The Dalles, Boardman**.
   - Save it as "Real humans" and use THAT for decisions, not the default reports.

---

## 🟠 P2 — Apply to more affiliate programs (biggest revenue unlock)
Your highest-traffic pages are big-brand AI tools you earn **nothing** from. The new pricing-page
cross-sell + calculator swaps only suggest tools with an **active** affiliate program. Right now
that's just: Pictory, Synthesia, ElevenLabs, Frase, Mangools, Chatbase, Scalenut.
**Apply to these `pending` programs** (already coded, just flip status once approved):

| Tool | Why it matters | Apply at |
|---|---|---|
| Descript | Used in 3 new /best-for pages (YouTubers, podcasters, courses) | descript.com/affiliates |
| Surfer SEO | High-intent SEO buyers | surferseo.com/affiliate (PartnerStack) |
| Semrush | $50–300 CPA, 120-day cookie | semrush.com/partner |
| Writesonic | 30% recurring | writesonic.com/affiliate |
| Otter.ai | Used in podcasters page | partner program / Impact |
| Fliki, Rytr, Mubert, Simplified | recurring, low effort | each vendor's affiliate page |

**After approval:** tell me the tracking URL + I'll set `status: 'active'` and the real URL in
`src/lib/affiliate.ts` (1-line each). Until then those tools link to plain URLs = $0.

---

## 🟠 P3 — Give me real test data for flagship reviews (then I add it)
The research's #1 defensible moat is **original, hard-to-summarize testing data**. I will NOT
fabricate numbers (your own rule). For each flagship tool you've actually used, send me real figures
and I'll add a structured "test metrics" block to the review:

- **Pictory / Synthesia / Fliki:** e.g. "rendered a 60s video in X minutes, cost $Y per video, Z%
  caption accuracy."
- **ElevenLabs:** "generated X minutes of voiceover, $Y per 1,000 characters, which voices."
- **Frase / Mangools / Surfer:** "optimized X articles, ranking movement, time saved per piece."

Even rough real numbers from your hands-on use are enough.

---

## 🟡 P4 — Create context-specific lead-magnet PDFs (optional, lifts signups)
You have ONE generic magnet (`/ai-tool-stack-cheatsheet.html`). Context-matched magnets convert
better. Create 2–3 real downloadables (Canva/Google Docs → PDF), e.g.:

- "2026 AI Video Tools Comparison Sheet" (show on video content)
- "AI Voice Tools Cheat Sheet" (show on voice/podcast content)

Drop the files in `/public/` and tell me the filenames — I'll wire the newsletter CTAs to offer the
relevant one by page topic (the code hook is ready to point at them).

---

## 🟡 P5 — Email deliverability check (Beehiiv)
Per project notes, the Beehiiv custom sending domain (newsletter@shelby-ai.com) may still be
**missing SPF/DKIM** — meaning welcome emails might not actually deliver. Verify in Beehiiv →
Settings → Email → sending domain, add the DNS records in Namecheap, OR switch to the default
Beehiiv sender to unblock delivery. (Signups are saving fine; the *email* is the risk.)

---

## 🟢 P6 — Post-deploy verification (15 min)
1. Visit and click through the 3 new tools: **/finder, /compare, /calculator** — confirm picks +
   affiliate links work on mobile.
2. Spot-check a new page: **/best-for/youtubers** (ratings show? links work?).
3. **Google Search Console → Sitemaps** → resubmit `https://www.shelby-ai.com/sitemap.xml`
   (now 166 URLs incl. the new tools + best-for pages).
4. Run a review + a guide URL through **Google Rich Results Test** to confirm FAQ/Review schema
   validates.

---

### What's already done in code (no action needed)
GEO TL;DR boxes, guide FAQs + schema, numerical ratings + aggregateRating on best-for/alternatives,
broadened homepage H1, ShelbyAI brand unification, `newsletter_signup` + `affiliate_click` events,
pricing-page commissionable cross-sell + Finder link, /finder /compare /calculator tools, 4 new
/best-for pages, StickyCTA at 30% scroll, dynamic sitemap. All committed + pushed to main.
