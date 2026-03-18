import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SITE_URL = process.env.SITE_URL || 'https://www.shelby-ai.com';
const SITE_TITLE = 'Shelby AI Deals';
const SITE_DESCRIPTION = 'Honest AI tool reviews for creators, freelancers, and small teams.';
const contentDir = path.join(process.cwd(), 'src/content');
const outDir = path.join(process.cwd(), 'public');

interface FeedItem {
  title: string;
  slug: string;
  type: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
}

function getContentFiles(dir: string): string[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter((f) => f.endsWith('.mdx'));
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildRss(): string {
  const items: FeedItem[] = [];

  const contentTypes = [
    { dir: 'reviews', urlPrefix: '/reviews' },
    { dir: 'comparisons', urlPrefix: '/comparisons' },
    { dir: 'best', urlPrefix: '/best' },
    { dir: 'guides', urlPrefix: '/guides' },
  ];

  for (const type of contentTypes) {
    const files = getContentFiles(type.dir);
    for (const file of files) {
      const filePath = path.join(contentDir, type.dir, file);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);
      const slug = file.replace('.mdx', '');

      items.push({
        title: data.title || slug,
        slug: `${type.urlPrefix}/${slug}`,
        type: type.dir,
        excerpt: data.excerpt || '',
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || SITE_TITLE,
        category: data.category || '',
      });
    }
  }

  // Sort by date descending
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rssDate = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${rssDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${SITE_URL}${item.slug}</link>
      <guid isPermaLink="true">${SITE_URL}${item.slug}</guid>
      <description>${escapeXml(item.excerpt)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <author>${escapeXml(item.author)}</author>
      <category>${escapeXml(item.category)}</category>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`;

  return xml;
}

// Generate and write
const rss = buildRss();
const outputPath = path.join(outDir, 'feed.xml');
fs.writeFileSync(outputPath, rss, 'utf-8');

const itemCount = (rss.match(/<item>/g) || []).length;
console.log(`RSS feed generated: ${outputPath} (${itemCount} items)`);
