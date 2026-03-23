import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/ArticleLayout';
import ToolCard from '@/components/ToolCard';
import MDXContent from '@/components/MDXContent';
import TableOfContents from '@/components/TableOfContents';
import JsonLd from '@/components/JsonLd';
import RelatedArticles from '@/components/RelatedArticles';
import { getArticle, getArticleSlugs, getAllArticles } from '@/lib/content';
import type { BestOfMeta } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs('best');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { meta } = getArticle('best', slug);
    const bestOf = meta as BestOfMeta;
    const metaDescription = bestOf.description || bestOf.excerpt;

    const ogImage = bestOf.featuredImage || {
      url: 'https://www.shelby-ai.com/images/og-thumbnail.png',
      width: 1200,
      height: 630,
    };

    return {
      title: bestOf.title,
      description: metaDescription,
      openGraph: {
        title: bestOf.title,
        description: metaDescription,
        type: 'article',
        images: [ogImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: bestOf.title,
        description: metaDescription,
        images: [typeof ogImage === 'string' ? ogImage : ogImage.url],
      },
      alternates: {
        canonical: `https://www.shelby-ai.com/best/${slug}/`,
      },
    };
  } catch {
    return { title: 'Best-Of List Not Found' };
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

export default async function BestOfArticlePage({ params }: PageProps) {
  const { slug } = await params;

  let content: string;
  let meta: BestOfMeta;

  try {
    const article = getArticle('best', slug);
    content = article.content;
    meta = article.meta as BestOfMeta;
  } catch {
    notFound();
  }

  const headings = extractHeadings(content);
  const allArticles = getAllArticles();

  const breadcrumbs = [
    { name: 'Home', url: 'https://www.shelby-ai.com/' },
    { name: 'Best Of', url: 'https://www.shelby-ai.com/best/' },
    { name: meta.title, url: `https://www.shelby-ai.com/best/${slug}/` },
  ];

  const sidebar = (
    <div className="space-y-8">
      <TableOfContents headings={headings} />
    </div>
  );

  return (
    <ArticleLayout
      meta={meta}
      backLink={{ href: '/best', label: 'All Best-Of Lists' }}
      sidebar={sidebar}
    >
      {/* Ranked Tools */}
      {meta.tools.length > 0 && (
        <div className="mb-10 space-y-4">
          <h2 className="text-xl font-bold text-void-50 mb-4">
            Our Top Picks
          </h2>
          {meta.tools.map((tool) => (
            <ToolCard
              key={tool.name}
              rank={tool.rank}
              name={tool.name}
              tagline={tool.tagline}
              rating={tool.rating}
              pricing={tool.pricing}
              bestFor={tool.bestFor}
              affiliateUrl={tool.affiliateUrl}
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
