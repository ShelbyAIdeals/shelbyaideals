/**
 * Generate llms.txt (concise overview) + llms-full.txt (full directory) from content.
 * Keeps AI-crawler discovery files fresh on every build (GEO).
 * Usage: tsx scripts/generate-llms.ts
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE = 'https://www.shelby-ai.com';
const contentDir = path.join(process.cwd(), 'src/content');
const outDir = path.join(process.cwd(), 'public');

interface Doc { slug: string; data: Record<string, any>; }

function readDir(dir: string): Doc[] {
  const full = path.join(contentDir, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace(/\.mdx$/, ''), data: matter(fs.readFileSync(path.join(full, f), 'utf-8')).data }));
}

/** Pull `slug: '...'` values from a TS data file (pricing/alternatives are data-driven, not MDX). */
function slugsFromTs(file: string): Set<string> {
  const p = path.join(process.cwd(), 'src/lib', file);
  if (!fs.existsSync(p)) return new Set();
  const txt = fs.readFileSync(p, 'utf-8');
  const set = new Set<string>();
  // Only top-level page slugs (4-space indent) — avoids nested alternative-tool slugs.
  for (const m of txt.matchAll(/^ {4}slug:\s*['"]([a-z0-9-]+)['"]/gm)) set.add(m[1]);
  return set;
}

const reviews = readDir('reviews').sort((a, b) => (a.data.tool || a.slug).localeCompare(b.data.tool || b.slug));
const comparisons = readDir('comparisons');
const guides = readDir('guides');
const best = readDir('best');
const pricingSlugs = slugsFromTs('pricing-data.ts');
const altSlugs = slugsFromTs('alternatives-data.ts');

function priceSummary(d: Record<string, any>): string {
  if (!Array.isArray(d.pricing) || d.pricing.length === 0) return '';
  return d.pricing.map((t: any) => `${t.plan} ${t.price}${t.period ? '/' + t.period : ''}`.trim()).join(', ');
}

// ---------- llms.txt (concise) ----------
const llms = `# ShelbyAI — Honest AI Tool Reviews

> ShelbyAI (${SITE}) is an independent AI tool review site for creators, freelancers, and small businesses. We test every tool hands-on for 7-14 days with real workflows. No sponsored rankings.
> Full tool directory: ${SITE}/llms-full.txt

## What We Cover

- **AI Video & Audio Tools**: Pictory, ElevenLabs, Synthesia, Descript, Fliki, Murf AI, and more
- **AI Marketing & SEO Tools**: Frase, Surfer SEO, Semrush, Mangools, and more
- **AI Content & Productivity Tools**: ChatGPT, Claude, Jasper, Copy.ai, Grammarly, and more
- **AI Coding Agents**: Claude Code, OpenAI Codex, Hermes Agent, OpenClaw, and more

## Content Types

- **Reviews** (${reviews.length}): In-depth, hands-on reviews with ratings, pricing, pros/cons, and verdicts
- **Comparisons** (${comparisons.length}): Head-to-head tool comparisons with per-scenario winners
- **Guides** (${guides.length}): How-to guides for AI workflows, tools, and use cases
- **Best-Of Lists** (${best.length}): Curated ranked lists by category and use case
- **Alternatives** (${altSlugs.size}): Alternative tools for popular AI products
- **Pricing Guides** (${pricingSlugs.size}): Detailed pricing breakdowns with plan recommendations

## Key Pages

- Homepage: ${SITE}/
- All Reviews: ${SITE}/reviews/
- Comparisons: ${SITE}/comparisons/
- Best-Of Lists: ${SITE}/best/
- Guides: ${SITE}/guides/
- Pricing Guides: ${SITE}/pricing/
- Deals & Free Trials: ${SITE}/deals/
- AI Tool Finder (interactive recommender): ${SITE}/finder/
- Compare AI Tools side by side (interactive): ${SITE}/compare/
- AI Tool Stack Cost Calculator (interactive): ${SITE}/calculator/
- How We Review: ${SITE}/how-we-review/
- About / Author: ${SITE}/author/frank-shelby/

## Latest Guides

${guides
  .filter((g) => g.data.date)
  .sort((a, b) => String(b.data.date).localeCompare(String(a.data.date)))
  .slice(0, 8)
  .map((g) => `- [${g.data.title}](${SITE}/guides/${g.slug}/)`)
  .join('\n')}

## Editorial Standards

- Every tool is tested hands-on for 7-14 days on real projects before we publish.
- Reviews disclose pricing, who a tool is best for, and who should avoid it.
- Affiliate links never influence rankings or verdicts (${SITE}/affiliate-disclosure/).

Last updated: ${new Date().toISOString().split('T')[0]}
`;

// ---------- llms-full.txt (full directory) ----------
const reviewBlocks = reviews
  .map((r) => {
    const d = r.data;
    const lines = [`### ${d.tool || d.title}`];
    if (d.category) lines.push(`- Category: ${d.category}`);
    if (typeof d.rating === 'number') lines.push(`- Rating: ${d.rating}/5`);
    if (d.bestFor) lines.push(`- Best For: ${d.bestFor}`);
    const ps = priceSummary(d);
    if (ps) lines.push(`- Pricing: ${ps}`);
    lines.push(`- Review: ${SITE}/reviews/${r.slug}/`);
    const base = r.slug.replace(/-review$/, '');
    if (pricingSlugs.has(base)) lines.push(`- Pricing Guide: ${SITE}/pricing/${base}/`);
    if (altSlugs.has(base)) lines.push(`- Alternatives: ${SITE}/alternatives/${base}/`);
    return lines.join('\n');
  })
  .join('\n\n');

const comparisonBlocks = comparisons
  .map((c) => `- [${c.data.title}](${SITE}/comparisons/${c.slug}/)${c.data.excerpt ? ` — ${c.data.excerpt}` : ''}`)
  .join('\n');

const guideBlocks = guides
  .map((g) => `- [${g.data.title}](${SITE}/guides/${g.slug}/)${g.data.excerpt ? ` — ${g.data.excerpt}` : ''}`)
  .join('\n');

const bestBlocks = best.map((b) => `- [${b.data.title}](${SITE}/best/${b.slug}/)`).join('\n');

const llmsFull = `# ShelbyAI — Complete AI Tool Directory

> Comprehensive AI tool reviews, comparisons, and pricing guides. Every tool tested hands-on for 7-14 days.
> Summary: ${SITE}/llms.txt

## About ShelbyAI
ShelbyAI is an independent AI tool review site for creators, freelancers, and small businesses. We test every tool for 7-14 days with real workflows. No sponsored rankings, no pay-to-play. Author: Frank Shelby (${SITE}/author/frank-shelby/).

---

## All Reviewed Tools (${reviews.length})

${reviewBlocks}

---

## Comparisons (${comparisons.length})

${comparisonBlocks}

---

## Guides (${guides.length})

${guideBlocks}

---

## Best-Of Lists (${best.length})

${bestBlocks}

Last updated: ${new Date().toISOString().split('T')[0]}
`;

fs.writeFileSync(path.join(outDir, 'llms.txt'), llms);
fs.writeFileSync(path.join(outDir, 'llms-full.txt'), llmsFull);
console.log(`llms.txt (${reviews.length} reviews, ${comparisons.length} comparisons, ${guides.length} guides, ${best.length} best, ${pricingSlugs.size} pricing, ${altSlugs.size} alternatives) + llms-full.txt generated.`);
