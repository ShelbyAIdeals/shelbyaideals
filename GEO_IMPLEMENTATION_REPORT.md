# GEO Implementation Report — ShelbyAI (shelby-ai.com)

Date: 2026-08-18
Scope: GEO/SEO overhaul per the 2026 GEO brief — pricing freshness first, then data architecture, existing-page fixes, and the P1 content clusters.

**Note on the research workbook:** `ShelbyAI_GEO_Research_2026.xlsx` was not found anywhere on this machine (searched the project tree, Downloads, Desktop, Documents). Implementation followed the brief's inline strategy (clusters A–I, phases, priorities), which mirrors the workbook's conclusions. If the workbook contains additional prompt/fan-out data, drop it into the repo and the remaining priorities below can be refined against it.

---

## Completed

### 1. Pricing freshness — verified against vendor pages (the #1 priority)

Live-verified on **2026-08-18** against each vendor's own pricing page, and recorded with `pricingVerified` + `pricingSourceUrl` in `src/lib/pricing-data.ts`:

| Tool | What changed since our March data |
|---|---|
| **Frase** | Repriced completely: $15 Solo is gone; now $49/mo Starter ($39 annual), $129 Professional, $299 Scale. The site-wide "Frase is the budget pick" narrative was false — corrected everywhere it appeared. |
| **Writesonic** | Repositioned: $16-20 tiers gone; now $79/$199/$399 as an SEO article pipeline. Review retitled and re-verdicted. |
| **Copy.ai** | Free plan and $49 Pro no longer listed; now Chat $29/mo ($24 annual, 5 seats) + $1,000+/mo platform tiers. |
| **ElevenLabs** | Character plans → credit plans bundling the full toolset; Starter now $6/mo (30k credits). |
| **Synthesia** | Free plan now recurring 10 min/month; Starter $29 ($18 annual, 120 min/year); Creator $89 ($64). |
| **Surfer SEO** | Relaunched in EUR: Discovery €49, Standard €99, Pro €182, Peace of Mind €299 — plus AI-visibility tracking (25-100 prompts) and a standalone AI Search Analytics plan (€158). |
| **Pictory** | Now minute-metered: $29/$59/$199 (annual $25/$35/$119). |
| **Otter.ai** | Annual Pro is $8.33/mo (monthly $16.99 — our data had these reversed); Business $19.99 annual. |
| **Make.com** | Core $9 / Pro $16 / Teams $29 (annual), credits terminology. |
| **Jasper** | $69/mo confirmed; added $59 annual rate. |
| **Descript** | Confirmed current (was already refreshed in March). |

New pricing pages created with verified data: **HeyGen, n8n, Cursor, Fathom, Fireflies, Creatify, Otterly, Profound** — and **Gamma** (flagged `pricingNeedsVerification`: its pricing page blocks bots; data is from cross-checked secondary sources and labeled as such on-page).

### 2. Data architecture

- `PricingPage` interface extended: `pricingVerified`, `pricingSourceUrl`, `pricingNeedsVerification`, `currency` (USD/EUR).
- `pricing-index.ts`: rows now carry currency + verification metadata; EUR-listed vendors are excluded from USD medians (no mixed-currency stats); new categories `AI Meetings`, `AI Coding`, `GEO & AI Visibility`.
- **Machine-readable exports**: `scripts/generate-pricing-index-data.ts` (wired into `npm run build`) emits `/data/ai-pricing-index.json` and `.csv` from the same module the page renders — downloadable data can never disagree with the published table. Download buttons added on `/ai-pricing-index`.
- `Deal` interface extended: `dateVerified`, `sourceUrl`, `trialLength`, `eligibility`. Verified deals stamped 2026-08-18; unverified ones now render an explicit "not recently re-verified" note instead of implying freshness.
- **Research-only review mode**: `ReviewMeta.researchOnly`. Enforced in `content.ts` (rating forced to 0), rendered as: visible "researched profile, test pending" banner, facts box instead of star verdict, `Article` schema instead of `Review` schema, no score badge on cards. This is the mechanism that lets P1 entity pages exist without fabricated testing.

### 3. Existing pages updated

- `/ai-pricing-index` — Free-trial + Verified columns (dates link to vendor sources), currency-aware prices, footnote explaining `*`-dates, JSON/CSV downloads, tool count now computed (title had hardcoded "31"; index now covers 40 tools).
- `/pricing/[slug]` — "Pricing verified: DATE · official pricing page" trust line; secondary-source warning for flagged tools; SoftwareApplication offers now use the right currency and skip non-numeric plans (no more $0 offers for "Custom").
- `/deals` — per-offer verification dates + sources + eligibility; hero badge computes "Offers verified {date}" instead of hardcoded "Updated March 2026"; Frase deal corrected (free plan → 7-day trial, $49), Writesonic corrected, ElevenLabs/Synthesia/Pictory/Descript/Otter/Jasper stamped.
- `/calculator` — role presets (9 roles → curated 3-4 tool starter stacks from reviewed tools), budget presets (Free/$20/$50/$100/$200) with over/under budget feedback, same-category overlap warnings, free-plan highlighting, pricing-source note.
- `/comparisons/frase-vs-surfer-seo` — the "$15 vs $89, Frase 6x cheaper" spine replaced with verified converged pricing; new GEO-visibility winner scenario; pricing table rebuilt.
- `/comparisons/otter-vs-fireflies-vs-fathom` — pricing table was substantially wrong (claimed Fathom has no free tier); rebuilt with verified data, links to the new Fathom/Fireflies reviews.
- `/comparisons/zapier-vs-make` — date-bumped; prices were already correct ($9 vs $19.99 verified).
- **Alternatives pages** (`alternatives-data.ts`): ElevenLabs (added verified-pricing FAQ, Reddit-signal wording per the community-evidence rule), Synthesia (outdated "out of reach" framing replaced; HeyGen entry verified + linked to new review), Surfer/Frase/Mangools entries corrected for the Frase repricing.
- **Reviews** (frase, writesonic, copy-ai, elevenlabs, synthesia, pictory, surfer-seo, jasper, otter): frontmatter pricing arrays replaced with verified plans; prominent "Pricing update — verified 2026-08-18" callout at the top of each affected body distinguishing preserved hands-on findings from changed prices; stale verdicts/pros/excerpts rewritten where they quoted dead prices (Writesonic's "best budget writer" positioning retired). `lastUpdated` bumped only on pages whose facts actually changed; `lastTested` untouched everywhere.
- **Guides**: ElevenLabs $5→$6 and allowance wording fixed across `ai-marketing-stack-solopreneurs`, `ai-tools-for-service-businesses`, `ai-video-tools-ecommerce`, `best-ai-tools-for-agencies`; Copy.ai $36 → Chat $29.
- `/how-we-review` — added **Category-Specific Test Protocols** (voice, video/avatars, automation, coding, SEO/GEO — fixed inputs per category) and **Researched Profiles vs Hands-On Reviews** explaining the two-date system (last fact-checked vs last hands-on tested) and the no-fabrication policy.

### 4. New pages created

| URL | Type | Purpose |
|---|---|---|
| `/reviews/heygen-review` | Research profile | P1 entity; avatar video cluster anchor |
| `/reviews/n8n-review` | Research profile | P1 entity; automation cluster anchor |
| `/reviews/cursor-review` | Research profile | P1 entity; coding-agents cluster anchor |
| `/reviews/fathom-review` | Research profile | Meeting-AI cluster |
| `/reviews/fireflies-review` | Research profile | Meeting-AI cluster |
| `/comparisons/heygen-vs-synthesia` | Comparison | Top fan-out query; scenario winners + verified pricing/metering analysis |
| `/comparisons/n8n-vs-make-vs-zapier` | Comparison | Automation decision page; billing-model worked examples |
| `/comparisons/cursor-vs-claude-code-vs-codex` | Comparison | Coding-agent form-factor decision; entity disambiguation (Claude vs Claude Code, ChatGPT vs Codex) |
| `/guides/best-geo-tools` | Guide (pillar) | GEO cluster pillar: what GEO software does, prompt/mention/citation tracking explained, Otterly/Profound/Peec/Surfer compared with verified pricing, bundled-vs-standalone guidance, FAQ |
| `/pricing/{heygen,n8n,cursor,fathom,fireflies,creatify,otterly,profound,gamma}` | Pricing | Verified plan pages feeding the index, hub links, and schema |

All new reviews use the research-only mode: no scores, no testing claims, explicit pending-test notices, and "what we will measure when we test" pointers to the methodology page. Every price states its verification date and source.

### 5. Internal linking / entity graph

- `ToolHubLinks` automatically connects each new review to its pricing page and best-for pages (data-driven — no template changes needed).
- Cluster wiring: HeyGen review ↔ HeyGen pricing ↔ HeyGen vs Synthesia ↔ Synthesia review/alternatives; n8n review ↔ n8n pricing ↔ n8n vs Make vs Zapier ↔ Make review / Zapier vs Make; Cursor review ↔ Cursor pricing ↔ three-way comparison ↔ Claude Code / Codex guides; Fathom/Fireflies reviews ↔ pricing ↔ Otter vs Fireflies vs Fathom; best-geo-tools ↔ Otterly/Profound/Surfer pricing ↔ Surfer review ↔ frase-vs-surfer (GEO winner row).
- Sitemap and RSS regenerated (190 URLs); `llms.txt`/`llms-full.txt` regenerate at build and already group every new entity with its review + pricing links.

### 6. Technical checks

- `tsc --noEmit`: clean.
- `npm run build` (includes reviews.json, pricing-index JSON/CSV, llms generation, Next static export): **206 pages exported, zero errors**.
- Built-output spot checks: heygen-review renders Article (not Review) schema + FAQ schema + research banner; frase pricing page renders the verified date + source link; sitemap contains all new URLs; `/data/ai-pricing-index.{json,csv}` present in the export.
- ESLint: **not configured in this project** (`next lint` prompts for initial setup). Left untouched — setting up a linter mid-overhaul would create noise across the whole codebase; do it as a standalone chore.

---

## Remaining manual work

1. **Hands-on tests pending** for all research-only profiles: HeyGen, n8n, Cursor, Fathom, Fireflies (plus Creatify/Otterly/Profound/Gamma which have pricing pages only). When tested: set a rating, remove `researchOnly`, add `lastTested`, fill results per the new methodology protocols.
2. **Gamma pricing** needs a human check of gamma.app/pricing (bot-blocked; currently flagged on-page as secondary-sourced).
3. **Peec pricing** is not public — get a sales quote before any Profound-vs-Peec-vs-Otterly comparison page.
4. **Unverified competitor prices** inside alternatives lists (Murf, Play.ht, Speechify, WellSaid, Colossyan, Elai, InVideo, NeuronWriter, Clearscope, MarketMuse…) retain their March values — sweep them the same way when touched.
5. **Deals without verification dates** (Mangools, Semrush, Grammarly, Canva, AppSumo, Scalenut, Surfer's money-back claim) now display the honest "not recently re-verified" note; verify and stamp them.
6. **Screenshots/logos** for the five new review entities (`public/images/tools/{heygen,n8n,cursor,fathom,fireflies}/hero.webp`, `screenshot-N.webp`) — the template auto-detects them once dropped in.
7. **ESLint setup** (see above).

## Deferred opportunities (deliberately not built yet)

- **Cluster B (UGC/ads)**: Creatify review + Creatify vs Arcads + Best AI UGC Ad Generators — Creatify pricing page exists as the anchor; Arcads facts unverified, so the comparison would be hollow until researched or tested.
- **Cluster F/H/I depth**: Gamma review + presentation comparison (blocked on pricing verification); Photoroom (its pricing page hides monthly rates — needs manual verification before a page can quote numbers); NotebookLM/Julius research cluster.
- **Best-for additions** (employee training video, YouTube Shorts, large codebases, solo developers): higher value once the anchor entities have hands-on data — a Best-For page of untested tools would be exactly the thin content the brief bans.
- **Profound vs Peec vs Otterly** standalone comparison — blocked on Peec pricing; the best-geo-tools pillar carries the three-way guidance meanwhile.
- **Role-page overhaul (§19) and Tool Finder decision filters (§20)**: the calculator got the role/budget mechanics first (smaller surface, immediate GEO answer value); porting the same preset data into `/finder` and `/best-for` pages is a clean follow-up.
- **"What Changed Since Our Last Review?" component (§15)**: the pricing-update callouts on the nine refreshed reviews serve this need today; a structured changelog component is worth adding when there are two dated entries per tool to show.
