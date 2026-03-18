import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/ArticleLayout';
import WinnerBox from '@/components/WinnerBox';
import MDXContent from '@/components/MDXContent';
import TableOfContents from '@/components/TableOfContents';
import JsonLd from '@/components/JsonLd';
import RelatedArticles from '@/components/RelatedArticles';
import { getArticle, getArticleSlugs, getAllArticles } from '@/lib/content';
import type { ComparisonMeta } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs('comparisons');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { meta } = getArticle('comparisons', slug);
    const comparison = meta as ComparisonMeta;
    const metaDescription = comparison.description || comparison.excerpt;

    const ogImage = comparison.featuredImage || {
      url: 'https://www.shelby-ai.com/images/og-thumbnail.png',
      width: 1200,
      height: 630,
    };

    return {
      title: comparison.title,
      description: metaDescription,
      openGraph: {
        title: comparison.title,
        description: metaDescription,
        type: 'article',
        images: [ogImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: comparison.title,
        description: metaDescription,
        images: [typeof ogImage === 'string' ? ogImage : ogImage.url],
      },
    };
  } catch {
    return { title: 'Comparison Not Found' };
  }
}

function extractHeadings(content: string) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ id, text, level });
  }

  return headings;
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;

  let content: string;
  let meta: ComparisonMeta;

  try {
    const article = getArticle('comparisons', slug);
    content = article.content;
    meta = article.meta as ComparisonMeta;
  } catch {
    notFound();
  }

  const headings = extractHeadings(content);
  const allArticles = getAllArticles();

  const breadcrumbs = [
    { name: 'Home', url: 'https://www.shelby-ai.com' },
    { name: 'Comparisons', url: 'https://www.shelby-ai.com/comparisons' },
    { name: meta.title, url: `https://www.shelby-ai.com/comparisons/${slug}` },
  ];

  const sidebar = (
    <div className="space-y-8">
      <TableOfContents headings={headings} />
    </div>
  );

  return (
    <ArticleLayout
      meta={meta}
      backLink={{ href: '/comparisons', label: 'All Comparisons' }}
      sidebar={sidebar}
    >
      {/* Winner Boxes */}
      {meta.winners.length > 0 && (
        <div className="mb-8">
          {meta.winners.map((winner) => (
            <WinnerBox
              key={winner.scenario}
              toolName={winner.winner}
              scenario={winner.scenario}
              reason={winner.reason}
              affiliateUrl={meta.affiliateUrls[winner.winner] ?? '#'}
            />
          ))}
        </div>
      )}

      <JsonLd type="article" data={meta} />
      <JsonLd type="breadcrumb" breadcrumbs={breadcrumbs} />

      {/* MDX Body */}
      <MDXContent source={content} />

      {/* Related Articles */}
      <RelatedArticles current={meta} articles={allArticles} />
    </ArticleLayout>
  );
}
