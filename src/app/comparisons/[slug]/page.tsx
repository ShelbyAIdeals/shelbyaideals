import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/ArticleLayout';
import WinnerBox from '@/components/WinnerBox';
import MDXContent from '@/components/MDXContent';
import TableOfContents from '@/components/TableOfContents';
import JsonLd from '@/components/JsonLd';
import RelatedArticles from '@/components/RelatedArticles';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getArticle, getArticleSlugs, getAllArticles, getAllReviews } from '@/lib/content';
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
      alternates: {
        canonical: `https://www.shelby-ai.com/comparisons/${slug}`,
      },
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

      {/* Cross-links to individual reviews */}
      {(() => {
        const reviews = getAllReviews();
        const toolReviews = meta.tools
          .map((toolName) => reviews.find((r) => r.tool.toLowerCase() === toolName.toLowerCase()))
          .filter(Boolean);
        if (toolReviews.length === 0) return null;
        return (
          <section className="mb-8 p-5 rounded-xl border border-void-700/40 bg-void-800/20">
            <h2 className="text-lg font-heading font-bold text-void-100 mb-3">Read the Full Reviews</h2>
            <div className="flex flex-col gap-2">
              {toolReviews.map((review) => (
                <Link
                  key={review!.slug}
                  href={`/reviews/${review!.slug}/`}
                  className="inline-flex items-center gap-2 text-sm text-signal-400 hover:text-signal-300 transition-colors"
                >
                  <ArrowRight size={14} />
                  {`Read our full ${review!.tool} review`}
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* MDX Body */}
      <MDXContent source={content} />

      {/* Related Articles */}
      <RelatedArticles current={meta} articles={allArticles} />
    </ArticleLayout>
  );
}
