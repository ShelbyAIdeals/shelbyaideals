// Usage: npx tsx scripts/quality-scan.ts
// Scans all MDX content files for quality issues.
// Outputs PASS/WARN/FAIL per article with specific issues.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PROJECT_ROOT = path.resolve(path.join(__dirname, '..'));
const CONTENT_DIR = path.join(PROJECT_ROOT, 'src', 'content');

type Severity = 'FAIL' | 'WARN' | 'INFO';

interface Issue {
  severity: Severity;
  message: string;
}

interface ScanResult {
  file: string;
  type: string;
  status: 'PASS' | 'WARN' | 'FAIL';
  wordCount: number;
  issues: Issue[];
}

const CONTENT_DIRS = ['reviews', 'comparisons', 'best', 'guides'] as const;

const DIR_TO_TYPE: Record<string, string> = {
  reviews: 'review',
  comparisons: 'comparison',
  best: 'best',
  guides: 'guide',
};

// Collect all existing article slugs for internal link validation
function getAllSlugs(): Set<string> {
  const slugs = new Set<string>();
  for (const dir of CONTENT_DIRS) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;
    for (const file of fs.readdirSync(dirPath)) {
      if (file.endsWith('.mdx')) {
        const slug = file.replace('.mdx', '');
        slugs.add(`/${dir}/${slug}`);
      }
    }
  }
  return slugs;
}

// Check for valid internal links in content
function findBrokenLinks(content: string, validSlugs: Set<string>): string[] {
  const broken: string[] = [];
  // Match markdown links: [text](/path)
  const linkRegex = /\[([^\]]*)\]\((\/(reviews|comparisons|best|guides)\/[^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const linkPath = match[2];
    if (!validSlugs.has(linkPath)) {
      broken.push(linkPath);
    }
  }
  return broken;
}

function scanArticle(dir: string, filename: string, validSlugs: Set<string>): ScanResult {
  const filePath = path.join(CONTENT_DIR, dir, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const issues: Issue[] = [];
  const type = DIR_TO_TYPE[dir] || 'unknown';

  // 1. Parse frontmatter
  let data: Record<string, unknown>;
  let content: string;
  try {
    const parsed = matter(raw);
    data = parsed.data;
    content = parsed.content;
  } catch (err) {
    return {
      file: `${dir}/${filename}`,
      type,
      status: 'FAIL',
      wordCount: 0,
      issues: [{ severity: 'FAIL', message: `Frontmatter parse error: ${(err as Error).message}` }],
    };
  }

  // 2. Check for remaining code fences wrapping the entire content
  if (raw.trim().startsWith('```')) {
    issues.push({ severity: 'FAIL', message: 'Content wrapped in code fences (stripCodeFences failed)' });
  }

  // 3. Word count
  const words = content.trim().split(/\s+/).length;
  if (words < 500) {
    issues.push({ severity: 'FAIL', message: `Very low word count: ${words} (expected 2000-3500)` });
  } else if (words < 2000) {
    issues.push({ severity: 'WARN', message: `Low word count: ${words} (expected 2000-3500)` });
  } else if (words > 4000) {
    issues.push({ severity: 'WARN', message: `High word count: ${words} (expected 2000-3500)` });
  }

  // 4. Required base fields
  const baseFields = ['title', 'slug', 'excerpt', 'category', 'type', 'date'];
  for (const field of baseFields) {
    if (!data[field]) {
      issues.push({ severity: 'FAIL', message: `Missing required field: ${field}` });
    }
  }

  // 5. Excerpt length (SEO)
  const excerpt = (data.excerpt as string) || '';
  if (excerpt.length > 0 && excerpt.length < 80) {
    issues.push({ severity: 'WARN', message: `Excerpt too short: ${excerpt.length} chars (aim for 120-160)` });
  } else if (excerpt.length > 200) {
    issues.push({ severity: 'WARN', message: `Excerpt too long: ${excerpt.length} chars (aim for 120-160)` });
  }

  // 6. Type-specific checks
  if (type === 'review') {
    const reviewFields = ['tool', 'rating', 'bestFor', 'pricing', 'pros', 'cons', 'verdict', 'affiliateUrl'];
    for (const field of reviewFields) {
      if (data[field] === undefined || data[field] === null) {
        issues.push({ severity: 'FAIL', message: `Missing review field: ${field}` });
      }
    }
    if (typeof data.rating === 'number' && (data.rating < 1 || data.rating > 10)) {
      issues.push({ severity: 'WARN', message: `Unusual rating: ${data.rating} (expected 1-10)` });
    }
    if (Array.isArray(data.pros) && data.pros.length < 3) {
      issues.push({ severity: 'WARN', message: `Only ${data.pros.length} pros (expected 4-5)` });
    }
    if (Array.isArray(data.cons) && data.cons.length < 2) {
      issues.push({ severity: 'WARN', message: `Only ${data.cons.length} cons (expected 3-4)` });
    }
    if (Array.isArray(data.pricing) && data.pricing.length === 0) {
      issues.push({ severity: 'WARN', message: 'Empty pricing array' });
    }
  }

  if (type === 'comparison') {
    if (!Array.isArray(data.tools) || data.tools.length < 2) {
      issues.push({ severity: 'FAIL', message: 'Comparison missing tools array (need 2+)' });
    }
    if (!Array.isArray(data.winners) || data.winners.length === 0) {
      issues.push({ severity: 'WARN', message: 'Missing winners scenarios' });
    }
  }

  if (type === 'best') {
    if (!Array.isArray(data.tools) || data.tools.length === 0) {
      issues.push({ severity: 'WARN', message: 'Missing tools array in best-of article' });
    }
  }

  if (type === 'guide') {
    if (!Array.isArray(data.recommendedTools) || data.recommendedTools.length === 0) {
      issues.push({ severity: 'WARN', message: 'Missing recommendedTools in guide' });
    }
  }

  // 7. Placeholder URL detection
  const placeholderPatterns = ['#tool-affiliate', '#tool-slug', 'example.com', 'placeholder'];
  for (const pattern of placeholderPatterns) {
    if (raw.includes(pattern)) {
      issues.push({ severity: 'WARN', message: `Found placeholder pattern: "${pattern}"` });
    }
  }

  // Check for #...-affiliate patterns in frontmatter
  const affiliatePattern = /#[a-z0-9-]+-affiliate/g;
  const affiliateMatches = raw.match(affiliatePattern);
  if (affiliateMatches) {
    // This is expected for tools without approved affiliate URLs, just INFO
    issues.push({ severity: 'INFO', message: `Placeholder affiliate URLs: ${[...new Set(affiliateMatches)].join(', ')}` });
  }

  // 8. Broken internal links
  const brokenLinks = findBrokenLinks(content, validSlugs);
  if (brokenLinks.length > 0) {
    issues.push({
      severity: 'WARN',
      message: `Broken internal links (${brokenLinks.length}): ${brokenLinks.join(', ')}`,
    });
  }

  // 9. Duplicate H1 headings
  const h1Matches = content.match(/^# .+$/gm);
  if (h1Matches && h1Matches.length > 1) {
    issues.push({ severity: 'WARN', message: `Multiple H1 headings found (${h1Matches.length})` });
  }

  // 10. Check for H2 structure (should have at least 3 sections)
  const h2Matches = content.match(/^## .+$/gm);
  if (!h2Matches || h2Matches.length < 3) {
    issues.push({ severity: 'WARN', message: `Only ${h2Matches?.length ?? 0} H2 sections (expected 5+)` });
  }

  // Determine overall status
  const hasFail = issues.some((i) => i.severity === 'FAIL');
  const hasWarn = issues.some((i) => i.severity === 'WARN');
  const status = hasFail ? 'FAIL' : hasWarn ? 'WARN' : 'PASS';

  return {
    file: `${dir}/${filename}`,
    type,
    status,
    wordCount: words,
    issues,
  };
}

function main(): void {
  console.log('='.repeat(60));
  console.log('  ShelbyAIDeals - Content Quality Scanner');
  console.log('='.repeat(60));

  const validSlugs = getAllSlugs();
  console.log(`\nFound ${validSlugs.size} total content files.\n`);

  const results: ScanResult[] = [];

  for (const dir of CONTENT_DIRS) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx'));
    for (const file of files) {
      results.push(scanArticle(dir, file, validSlugs));
    }
  }

  // Sort: FAIL first, then WARN, then PASS
  const order = { FAIL: 0, WARN: 1, PASS: 2 };
  results.sort((a, b) => order[a.status] - order[b.status]);

  // Display results
  const passCount = results.filter((r) => r.status === 'PASS').length;
  const warnCount = results.filter((r) => r.status === 'WARN').length;
  const failCount = results.filter((r) => r.status === 'FAIL').length;

  for (const result of results) {
    const icon = result.status === 'PASS' ? 'OK' : result.status === 'WARN' ? '!!' : 'XX';
    console.log(`[${icon}] ${result.status.padEnd(4)} ${result.file} (${result.wordCount} words)`);

    const significantIssues = result.issues.filter((i) => i.severity !== 'INFO');
    for (const issue of significantIssues) {
      console.log(`       ${issue.severity}: ${issue.message}`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('  Summary');
  console.log('='.repeat(60));
  console.log(`  Total:  ${results.length}`);
  console.log(`  PASS:   ${passCount}`);
  console.log(`  WARN:   ${warnCount}`);
  console.log(`  FAIL:   ${failCount}`);

  if (failCount > 0) {
    console.log('\n  FAIL articles need fixing before publishing:');
    for (const r of results.filter((r) => r.status === 'FAIL')) {
      console.log(`    - ${r.file}`);
    }
  }

  process.exit(failCount > 0 ? 1 : 0);
}

main();
