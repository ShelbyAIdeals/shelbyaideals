# Changelog

## 2026-03-21 — Sitewide SEO, Trust & Conversion Upgrade

### Social Links (commit 791d6d1)
- Added socialLinks to all 24 review MDX files that were missing them
- All 31 tools now show social icons (Twitter/X, YouTube, LinkedIn, website + Discord/GitHub where applicable)

### SEO Internal Linking Fix (commit 4d71551)
- Created `ExploreMore` component with 5 contextual variants
- Added to 11 dead-end pages (contact, submit-tool, newsletter, privacy, terms, affiliate-disclosure, faq, pricing hub, alternatives hub, best-for hub)
- Added `/deals` to Footer navigation
- Added cross-linking sections to pricing/[slug], alternatives/[slug], best-for/[slug] detail pages
- Resolves 29 orphan + 29 dead-end pages from Frase audit

### Profile Save Bug Fix (commit e0d6988)
- Fixed "Lock broken by another request with the 'steal' option" error
- Used session from auth context instead of calling supabase.auth.getSession()

### Card Thumbnails (commit b2613e0)
- Downloaded og:image thumbnails for 24 tools from their official websites
- All 31 tools now have card thumbnails

### Favicon (commit c55158c, 6826b23)
- Created SVG favicon matching site branding (cyan Zap on rounded square)
- Added icons metadata to root layout
- Centered the lightning bolt

### Mangools Affiliate Link (commit 7224d83, 83b8bae)
- Fixed broken 404 affiliate link across 6 files
- Updated to working URL: mangools.com#a69b085f86aee0888864a82a9

### Homepage SEO Upgrade (this commit)
- Added "Best AI Tools by Use Case" Quick Picks section (3 columns: Writing, Video, Small Business)
- Added "How We Test AI Tools" trust section with 4 pillars (hands-on testing, weighted scoring, no sponsored rankings, regular updates)
- Links to /how-we-review for full methodology

### New Components
- `QuickPicks.tsx` — compact top picks box for best-of/best-for pages
- `RankingTable.tsx` — responsive tool ranking table (desktop table + mobile cards)

### Internal Linking Improvements
- Comparison pages now show "Find Tools by Role" section linking to best-for pages
- Guide pages now show "Read Review" links for recommended tools (matched against review database)
- Category pages now have JSON-LD breadcrumb + ItemList schema

### Documentation
- Created SEO_RECOMMENDATIONS.md with manual action items
- Created CHANGELOG.md (this file)
