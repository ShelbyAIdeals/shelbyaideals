import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = process.env.SITE_URL || 'https://www.shelby-ai.com';
const contentDir = path.join(process.cwd(), 'src/content');
const outDir = path.join(process.cwd(), 'public');

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function getContentFiles(dir: string): string[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter((f) => f.endsWith('.mdx'));
}

/** Get file mtime as YYYY-MM-DD for a page source file */
function getFileLastmod(urlPath: string, fallback: string): string {
  // Map URL path to Next.js page file path
  const srcPath = urlPath === '/' ? '' : urlPath.replace(/^\//, '');
  const candidates = [
    path.join(process.cwd(), 'src/app', srcPath, 'page.tsx'),
    path.join(process.cwd(), 'src/app', srcPath, 'page.ts'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const stat = fs.statSync(candidate);
      return stat.mtime.toISOString().split('T')[0];
    }
  }
  return fallback;
}

function buildSitemap(): string {
  const entries: SitemapEntry[] = [];
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/reviews', priority: '0.9', changefreq: 'daily' },
    { url: '/comparisons', priority: '0.9', changefreq: 'daily' },
    { url: '/best', priority: '0.9', changefreq: 'daily' },
    { url: '/guides', priority: '0.9', changefreq: 'weekly' },
    { url: '/alternatives', priority: '0.8', changefreq: 'weekly' },
    { url: '/about', priority: '0.5', changefreq: 'monthly' },
    { url: '/how-we-review', priority: '0.5', changefreq: 'monthly' },
    { url: '/newsletter', priority: '0.5', changefreq: 'monthly' },
    { url: '/faq', priority: '0.4', changefreq: 'monthly' },
    { url: '/contact', priority: '0.3', changefreq: 'yearly' },
    { url: '/affiliate-disclosure', priority: '0.3', changefreq: 'yearly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    // Author page
    { url: '/author/frank-shelby', priority: '0.5', changefreq: 'monthly' },
    // Categories collection page
    { url: '/categories', priority: '0.8', changefreq: 'weekly' },
  ];

  for (const page of staticPages) {
    entries.push({ url: page.url, lastmod: getFileLastmod(page.url, today), changefreq: page.changefreq, priority: page.priority });
  }

  // Category pages (consolidated)
  const categories = [
    'ai-video-audio', 'ai-marketing-seo', 'ai-content-productivity',
  ];
  for (const cat of categories) {
    entries.push({ url: `/categories/${cat}`, lastmod: today, changefreq: 'weekly', priority: '0.8' });
  }

  // Alternatives pages — dynamically read page-level slugs from alternatives-data.ts
  // Only match 4-space indented slugs (page entries), not 8+ space (sub-alternative tools)
  const altDataPath = path.join(process.cwd(), 'src/lib/alternatives-data.ts');
  const altSource = fs.readFileSync(altDataPath, 'utf-8');
  const alternativesSlugs = Array.from(altSource.matchAll(/^ {2,4}slug:\s*'([^']+)'/gm))
    .map((m) => m[1]);
  for (const slug of alternativesSlugs) {
    entries.push({ url: `/alternatives/${slug}`, lastmod: today, changefreq: 'monthly', priority: '0.7' });
  }

  // Pricing pages — dynamically read page-level slugs from pricing-data.ts
  // Match 2-4 space indented slugs (top-level entries in the array)
  const pricingDataPath = path.join(process.cwd(), 'src/lib/pricing-data.ts');
  const pricingSource = fs.readFileSync(pricingDataPath, 'utf-8');
  const pricingSlugs = Array.from(pricingSource.matchAll(/^ {2,4}slug:\s*'([^']+)'/gm)).map((m) => m[1]);
  entries.push({ url: '/pricing', lastmod: today, changefreq: 'weekly', priority: '0.8' });
  for (const slug of pricingSlugs) {
    entries.push({ url: `/pricing/${slug}`, lastmod: today, changefreq: 'monthly', priority: '0.7' });
  }

  // Best-for use case pages
  const useCaseSlugs = [
    'content-writers', 'freelancers', 'small-business', 'marketing-teams',
    'video-creators', 'seo', 'solopreneurs', 'startups',
  ];
  entries.push({ url: '/best-for', lastmod: today, changefreq: 'weekly', priority: '0.8' });
  for (const slug of useCaseSlugs) {
    entries.push({ url: `/best-for/${slug}`, lastmod: today, changefreq: 'monthly', priority: '0.7' });
  }

  // Content pages
  const contentTypes = [
    { dir: 'reviews', urlPrefix: '/reviews', priority: '0.8', changefreq: 'monthly' },
    { dir: 'comparisons', urlPrefix: '/comparisons', priority: '0.8', changefreq: 'monthly' },
    { dir: 'best', urlPrefix: '/best', priority: '0.8', changefreq: 'monthly' },
    { dir: 'guides', urlPrefix: '/guides', priority: '0.7', changefreq: 'monthly' },
  ];

  for (const type of contentTypes) {
    const files = getContentFiles(type.dir);
    for (const file of files) {
      const filePath = path.join(contentDir, type.dir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);
      const slug = file.replace('.mdx', '');
      const lastmod = data.lastUpdated || data.date || today;

      entries.push({
        url: `${type.urlPrefix}/${slug}`,
        lastmod,
        changefreq: type.changefreq,
        priority: type.priority,
      });
    }
  }

  // Deduplicate entries by URL
  const seen = new Set<string>();
  const uniqueEntries = entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueEntries
  .map(
    (e) => {
      const loc = e.url.endsWith('/') ? e.url : `${e.url}/`;
      return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`;
    }
  )
  .join('\n')}
</urlset>`;

  return xml;
}

// Generate and write
const sitemap = buildSitemap();
const outputPath = path.join(outDir, 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

const urlCount = (sitemap.match(/<url>/g) || []).length;
console.log(`Sitemap generated: ${outputPath} (${urlCount} URLs)`);
