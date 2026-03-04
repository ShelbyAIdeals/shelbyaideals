# Run Shelby AI Deals Checklist

Execute all pending checklist items for the Shelby AI Deals project. This is an autonomous workflow that covers the full Day 1-7 execution plan.

## Steps

1. **Read the checklist** from `PLAN.md` — find all unchecked `- [ ]` items
2. **Read project state** — check `scripts/content-queue.json` for published vs pending articles
3. **For each pending checklist item that can be done technically:**
   - Cross-link published articles (add internal links in MDX files)
   - Quality-check all published content (keywords, excerpts, affiliate disclosures, broken links)
   - Generate/update sitemap and RSS (`npx tsx scripts/generate-sitemap.ts` and `generate-rss.ts` from WSL-native path `/home/sprljo/claudee/PROJECTS/shelby-deals`)
   - Schedule content calendar (add `scheduledDate` to pending items in content-queue.json, Mon/Wed/Fri cadence)
   - Create/update lead magnet cheatsheet (`public/ai-tool-stack-cheatsheet.html`)
   - Wire newsletter to Beehiiv (update `NewsletterSignup.tsx` with `NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID`)
4. **Mark completed items** as `- [x]` in `PLAN.md`
5. **List remaining items** that need user action (domain, deployment, affiliate signups, social accounts)

## Arguments
$ARGUMENTS — Optional: specific checklist section to run (e.g., "day3", "quality-check", "content-calendar")

## Key Paths
- Project: `/mnt/c/Users/Uporabni/Desktop/PROJECT/claudee/PROJECTS/shelby-deals/`
- WSL-native (for npm): `/home/sprljo/claudee/PROJECTS/shelby-deals`
- Content: `src/content/{reviews,comparisons,best,guides}/*.mdx`
- Queue: `scripts/content-queue.json`
- Plan: `PLAN.md`
