import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/ArticleLayout';
import QuickVerdict from '@/components/QuickVerdict';
import MDXContent from '@/components/MDXContent';
import ProsCons from '@/components/ProsCons';
import VerdictBox from '@/components/VerdictBox';
import ToolImage from '@/components/ToolImage';
import TableOfContents from '@/components/TableOfContents';
import JsonLd from '@/components/JsonLd';
import RelatedArticles from '@/components/RelatedArticles';
import StickyCTA from '@/components/StickyCTA';
import { getArticle, getArticleSlugs, getAllArticles } from '@/lib/content';
import type { ReviewMeta } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs('reviews');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { meta } = getArticle('reviews', slug);
    const review = meta as ReviewMeta;
    const metaDescription = review.description || review.excerpt;

    return {
      title: review.title,
      description: metaDescription,
      openGraph: {
        title: review.title,
        description: metaDescription,
        type: 'article',
        ...(review.featuredImage && { images: [review.featuredImage] }),
      },
    };
  } catch {
    return { title: 'Review Not Found' };
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

export default async function ReviewPage({ params }: PageProps) {
  const { slug } = await params;

  let content: string;
  let meta: ReviewMeta;

  try {
    const article = getArticle('reviews', slug);
    content = article.content;
    meta = article.meta as ReviewMeta;
  } catch {
    notFound();
  }

  const headings = extractHeadings(content);
  const allArticles = getAllArticles();

  // Build pricing summary for QuickVerdict
  const pricingSummary = meta.pricing.length > 0
    ? `From ${meta.pricing[0].price}/${meta.pricing[0].period}`
    : 'See pricing';

  const sidebar = (
    <div className="space-y-8">
      <QuickVerdict
        rating={meta.rating}
        bestFor={meta.bestFor}
        pricing={pricingSummary}
        affiliateUrl={meta.affiliateUrl}
        affiliateLabel={meta.affiliateLabel}
      />
      <TableOfContents headings={headings} />
    </div>
  );

  const breadcrumbs = [
    { name: 'Home', url: 'https://shelby-ai.com' },
    { name: 'Reviews', url: 'https://shelby-ai.com/reviews' },
    { name: meta.tool, url: `https://shelby-ai.com/reviews/${slug}` },
  ];

  return (
    <ArticleLayout
      meta={meta}
      backLink={{ href: '/reviews', label: 'All Reviews' }}
      sidebar={sidebar}
    >
      <JsonLd type="review" data={meta} />
      <JsonLd type="breadcrumb" breadcrumbs={breadcrumbs} />

      {/* Hero image */}
      {meta.toolSlug && (
        <div className="aspect-video rounded-xl overflow-hidden border border-void-700/50 mb-8 bg-void-800">
          <ToolImage
            toolSlug={meta.toolSlug}
            variant="hero"
            alt={`${meta.tool} screenshot`}
          />
        </div>
      )}

      {/* Quick Verdict (visible on mobile, hidden on desktop since it's in sidebar) */}
      <div className="lg:hidden mb-8">
        <QuickVerdict
          rating={meta.rating}
          bestFor={meta.bestFor}
          pricing={pricingSummary}
          affiliateUrl={meta.affiliateUrl}
          affiliateLabel={meta.affiliateLabel}
        />
      </div>

      {/* MDX Body */}
      <MDXContent source={content} />

      {/* Pros & Cons */}
      <div className="mt-10">
        <ProsCons pros={meta.pros} cons={meta.cons} />
      </div>

      {/* Final Verdict */}
      <div className="mt-10">
        <VerdictBox
          rating={meta.rating}
          verdict={meta.verdict}
          bestFor={meta.bestFor}
          affiliateUrl={meta.affiliateUrl}
          affiliateLabel={meta.affiliateLabel}
          toolName={meta.tool}
        />
      </div>

      {/* Related Articles */}
      <RelatedArticles current={meta} articles={allArticles} />

      {/* Sticky CTA Bar */}
      <StickyCTA
        toolName={meta.tool}
        affiliateUrl={meta.affiliateUrl}
        affiliateLabel={meta.affiliateLabel}
        rating={meta.rating}
      />
    </ArticleLayout>
  );
}
