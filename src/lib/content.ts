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

  // Sanitize array fields — GPT-generated frontmatter may omit or malform these
  // Use directory name (always reliable) instead of data.type (may be missing)
  const dirToType: Record<string, string> = {
    comparisons: 'comparison',
    reviews: 'review',
    best: 'best',
    guides: 'guide',
  };
  if (!data.type && dirToType[dir]) {
    data.type = dirToType[dir];
  }

  if (dir === 'comparisons') {
    data.tools = Array.isArray(data.tools) ? data.tools : [];
    data.winners = Array.isArray(data.winners) ? data.winners : [];
    data.affiliateUrls = data.affiliateUrls ?? {};
  }
  if (dir === 'reviews') {
    data.pricing = Array.isArray(data.pricing) ? data.pricing : [];
    data.pros = Array.isArray(data.pros) ? data.pros : [];
    data.cons = Array.isArray(data.cons) ? data.cons : [];
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

export function getAllReviews(): ReviewMeta[] {
  return getFilesFromDir('reviews').map((f) => parseArticle('reviews', f).meta as ReviewMeta);
}

export function getAllComparisons(): ComparisonMeta[] {
  return getFilesFromDir('comparisons').map((f) => parseArticle('comparisons', f).meta as ComparisonMeta);
}

export function getAllBestOf(): BestOfMeta[] {
  return getFilesFromDir('best').map((f) => parseArticle('best', f).meta as BestOfMeta);
}

export function getAllGuides(): GuideMeta[] {
  return getFilesFromDir('guides').map((f) => parseArticle('guides', f).meta as GuideMeta);
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
