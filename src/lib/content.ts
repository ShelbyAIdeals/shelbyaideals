import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { ArticleMeta, ReviewMeta, ComparisonMeta, BestOfMeta, GuideMeta, Category } from './types';

const contentDir = path.join(process.cwd(), 'src/content');

function getFilesFromDir(dir: string): string[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter((f) => f.endsWith('.mdx'));
}

function parseArticle(dir: string, filename: string) {
  const filePath = path.join(contentDir, dir, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  // Infer type from directory (always reliable, GPT may omit type field)
  const dirToType: Record<string, string> = {
    comparisons: 'comparison',
    reviews: 'review',
    best: 'best',
    guides: 'guide',
  };
  if (!data.type && dirToType[dir]) {
    data.type = dirToType[dir];
  }

  // Ensure all required base fields have safe defaults
  data.title = data.title ?? filename.replace('.mdx', '');
  data.excerpt = data.excerpt ?? '';
  data.category = data.category ?? 'ai-productivity';
  data.author = data.author ?? 'Shelby AI Deals Team';
  data.date = data.date ?? new Date().toISOString().split('T')[0];
  data.lastUpdated = data.lastUpdated ?? data.date;

  // Sanitize type-specific array/object fields
  if (dir === 'comparisons') {
    data.tools = Array.isArray(data.tools) ? data.tools : [];
    data.winners = Array.isArray(data.winners) ? data.winners : [];
    data.affiliateUrls = data.affiliateUrls ?? {};
  }
  if (dir === 'reviews') {
    data.tool = data.tool ?? '';
    data.rating = typeof data.rating === 'number' ? data.rating : 0;
    data.bestFor = data.bestFor ?? '';
    data.verdict = data.verdict ?? '';
    data.affiliateUrl = data.affiliateUrl ?? '#';
    data.affiliateLabel = data.affiliateLabel ?? 'Visit Site';
    data.pricing = Array.isArray(data.pricing) ? data.pricing : [];
    data.pros = Array.isArray(data.pros) ? data.pros : [];
    data.cons = Array.isArray(data.cons) ? data.cons : [];
    // Ensure each pricing tier has a features array
    data.pricing = data.pricing.map((tier: Record<string, unknown>) => ({
      ...tier,
      features: Array.isArray(tier.features) ? tier.features : [],
    }));
  }
  if (dir === 'best') {
    data.tools = Array.isArray(data.tools) ? data.tools : [];
  }
  if (dir === 'guides') {
    data.recommendedTools = Array.isArray(data.recommendedTools) ? data.recommendedTools : [];
  }

  return {
    meta: {
      ...data,
      slug: filename.replace('.mdx', ''),
      readingTime: stats.text,
    } as ArticleMeta,
    content,
  };
}

function safeParseArticle(dir: string, filename: string) {
  try {
    return parseArticle(dir, filename);
  } catch (err) {
    console.warn(`Warning: Failed to parse ${dir}/${filename}, skipping:`, (err as Error).message);
    return null;
  }
}

export function getAllReviews(): ReviewMeta[] {
  return getFilesFromDir('reviews')
    .map((f) => safeParseArticle('reviews', f))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => r.meta as ReviewMeta);
}

export function getAllComparisons(): ComparisonMeta[] {
  return getFilesFromDir('comparisons')
    .map((f) => safeParseArticle('comparisons', f))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => r.meta as ComparisonMeta);
}

export function getAllBestOf(): BestOfMeta[] {
  return getFilesFromDir('best')
    .map((f) => safeParseArticle('best', f))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => r.meta as BestOfMeta);
}

export function getAllGuides(): GuideMeta[] {
  return getFilesFromDir('guides')
    .map((f) => safeParseArticle('guides', f))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => r.meta as GuideMeta);
}

export function getAllArticles(): ArticleMeta[] {
  return [
    ...getAllReviews(),
    ...getAllComparisons(),
    ...getAllBestOf(),
    ...getAllGuides(),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticlesByCategory(category: Category): ArticleMeta[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticle(type: string, slug: string) {
  return parseArticle(type, `${slug}.mdx`);
}

export function getArticleSlugs(type: string): string[] {
  return getFilesFromDir(type).map((f) => f.replace('.mdx', ''));
}

export function getFeaturedArticles(): ArticleMeta[] {
  return getAllArticles().filter((a) => a.featured);
}
