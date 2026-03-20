import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/ArticleLayout';
import QuickVerdict from '@/components/QuickVerdict';
import MDXContent from '@/components/MDXContent';
import ProsCons from '@/components/ProsCons';
import VerdictBox from '@/components/VerdictBox';
import ImageCarousel from '@/components/ImageCarousel';
import TableOfContents from '@/components/TableOfContents';
import JsonLd from '@/components/JsonLd';
import RelatedArticles from '@/components/RelatedArticles';
import StickyCTA from '@/components/StickyCTA';
import InlineNewsletterCTA from '@/components/InlineNewsletterCTA';
import VideoPlayer from '@/components/VideoPlayer';
import PinButton from '@/components/PinButton';
import SocialLinksRow from '@/components/SocialLinksRow';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import UserReviewsSection from '@/components/UserReviewsSection';
import ToolHubLinks from '@/components/ToolHubLinks';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getArticle, getArticleSlugs, getAllArticles, getAllComparisons } from '@/lib/content';
import type { ReviewMeta, ComparisonMeta } from '@/lib/types';

/** Auto-detect hero + screenshot images for a tool at build time */
function getToolImages(toolSlug: string): { src: string; alt: string }[] {
  const dir = path.join(process.cwd(), 'public', 'images', 'tools', toolSlug);
  if (!fs.existsSync(dir)) return [];

  const allFiles = fs.readdirSync(dir);
  const images: { src: string; alt: string }[] = [];

  const toolName = toolSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // Add hero image first (try webp, then png, then svg)
  const heroFile = ['hero.webp', 'hero.png', 'hero.svg'].find((f) => allFiles.includes(f));
  if (heroFile) {
    images.push({ src: `/images/tools/${toolSlug}/${heroFile}`, alt: `${toolName} dashboard overview` });
  }

  // Add numbered screenshots
  const screenshots = allFiles.filter((f) => /^screenshot-\d+\.(webp|png|jpg)$/i.test(f));
  screenshots.sort();
  screenshots.forEach((f, i) => {
    images.push({ src: `/images/tools/${toolSlug}/${f}`, alt: `${toolName} interface — screenshot ${i + 1}` });
  });

  return images;
}

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

    const ogImage = review.featuredImage || {
      url: 'https://www.shelby-ai.com/images/og-thumbnail.png',
      width: 1200,
      height: 630,
    };

    const openGraph: Record<string, unknown> = {
      title: review.title,
      description: metaDescription,
      type: 'article',
      images: [ogImage],
    };

    if (review.videoUrl) {
      openGraph.videos = [{
        url: review.videoUrl,
        type: 'video/mp4',
        width: 1920,
        height: 1080,
      }];
    }

    return {
      title: review.title,
      description: metaDescription,
      alternates: {
        canonical: `https://www.shelby-ai.com/reviews/${slug}`,
      },
      openGraph,
      twitter: {
        card: 'summary_large_image',
        title: review.title,
        description: metaDescription,
        images: [typeof ogImage === 'string' ? ogImage : ogImage.url],
      },
    };
  } catch {
    return { title: 'Review Not Found' };
  }
}

/**
 * Split MDX content at the nearest ## heading boundary around the 50% mark.
 * Returns [firstHalf, secondHalf]. If no good split point is found, secondHalf is empty.
 */
function splitContentAtMidpoint(content: string): [string, string] {
  const midpoint = Math.floor(content.length / 2);
  const headingRegex = /^## /gm;
  const splitPoints: number[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    splitPoints.push(match.index);
  }

  if (splitPoints.length < 2) return [content, ''];

  // Find the heading start closest to the midpoint
  let closestIdx = 0;
  let closestDist = Math.abs(splitPoints[0] - midpoint);
  for (let i = 1; i < splitPoints.length; i++) {
    const dist = Math.abs(splitPoints[i] - midpoint);
    if (dist < closestDist) {
      closestDist = dist;
      closestIdx = i;
    }
  }

  // Don't split at the very first heading
  if (closestIdx === 0) closestIdx = 1;

  const splitAt = splitPoints[closestIdx];
  return [content.slice(0, splitAt).trimEnd(), content.slice(splitAt)];
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
  const [contentFirstHalf, contentSecondHalf] = splitContentAtMidpoint(content);
  const allArticles = getAllArticles();
  const toolImages = getToolImages(meta.toolSlug || slug.replace(/-review$/, ''));

  // Build pricing summary for QuickVerdict
  const pricingSummary = meta.pricing?.length > 0
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
    { name: 'Home', url: 'https://www.shelby-ai.com' },
    { name: 'Reviews', url: 'https://www.shelby-ai.com/reviews' },
    { name: meta.tool, url: `https://www.shelby-ai.com/reviews/${slug}` },
  ];

  return (
    <ArticleLayout
      meta={meta}
      backLink={{ href: '/reviews', label: 'All Reviews' }}
      sidebar={sidebar}
    >
      <JsonLd type="review" data={meta} />
      <JsonLd type="breadcrumb" breadcrumbs={breadcrumbs} />
      <JsonLd
        type="faq"
        data={{
          questions: [
            ...(meta.bestFor ? [{ question: `Who is ${meta.tool} best for?`, answer: meta.bestFor }] : []),
            ...(meta.pricing?.length > 0 ? [{ question: `How much does ${meta.tool} cost?`, answer: `${meta.tool} plans start at ${meta.pricing[0].price}/${meta.pricing[0].period}. ${meta.pricing.length > 1 ? `They offer ${meta.pricing.length} plans total.` : ''}` }] : []),
            ...(meta.verdict ? [{ question: `Is ${meta.tool} worth it?`, answer: meta.verdict }] : []),
            ...(meta.notFor ? [{ question: `Who should NOT use ${meta.tool}?`, answer: meta.notFor }] : []),
          ].filter((q) => q.answer),
        }}
      />
      {meta.videoUrl && (
        <JsonLd
          type="video"
          data={{
            name: meta.videoTitle || `${meta.tool} Review`,
            description: meta.videoDescription || meta.excerpt,
            thumbnailUrl: meta.videoPosterUrl || `https://www.shelby-ai.com/images/og-thumbnail.png`,
            contentUrl: meta.videoUrl,
            uploadDate: meta.videoUploadDate || meta.date,
            duration: meta.videoDuration,
          }}
        />
      )}

      {/* Tool logo + name header */}
      {meta.toolLogo && (
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-lg shrink-0">
            <img
              src={meta.toolLogo}
              alt={`${meta.tool} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-void-50">{meta.tool}</h2>
            {meta.bestFor && (
              <p className="text-sm text-void-400">{meta.bestFor}</p>
            )}
          </div>
        </div>
      )}

      {/* Tool images carousel — hero + screenshots */}
      {toolImages.length > 0 && (
        <div className="mb-8">
          <ImageCarousel images={toolImages} />
        </div>
      )}

      {/* Social links */}
      {meta.socialLinks && Object.values(meta.socialLinks).some(Boolean) && (
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-medium text-void-500 uppercase tracking-wide">Follow</span>
          <SocialLinksRow links={meta.socialLinks} toolName={meta.tool} />
        </div>
      )}

      {/* Video review */}
      {meta.videoUrl && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-void-50 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-signal-400"><path d="M8 5v14l11-7z" /></svg>
              Video Review
            </h2>
            <PinButton
              url={`https://www.shelby-ai.com/reviews/${slug}/`}
              imageUrl={meta.featuredImage || 'https://www.shelby-ai.com/images/og-thumbnail.png'}
              description={`${meta.tool} Review: ${meta.excerpt}`}
            />
          </div>
          <VideoPlayer
            src={meta.videoUrl}
            poster={meta.videoPosterUrl}
            title={`${meta.tool} Video Review`}
          />
        </div>
      )}

      {/* YouTube embed (quick review) */}
      {meta.youtubeUrl && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-void-50 flex items-center gap-2 mb-3">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff"/></svg>
            Watch on YouTube
          </h2>
          <YouTubeEmbed url={meta.youtubeUrl} title={`${meta.tool} Review`} />
        </div>
      )}

      {/* Pin button (when no video, still allow pinning the article) */}
      {!meta.videoUrl && (
        <div className="flex justify-end mb-4">
          <PinButton
            url={`https://www.shelby-ai.com/reviews/${slug}/`}
            imageUrl={meta.featuredImage || 'https://www.shelby-ai.com/images/og-thumbnail.png'}
            description={`${meta.tool} Review: ${meta.excerpt}`}
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

      {/* MDX Body — first half */}
      <MDXContent source={contentFirstHalf} />

      {/* Inline Newsletter CTA — appears mid-article */}
      {contentSecondHalf && <InlineNewsletterCTA />}

      {/* MDX Body — second half */}
      {contentSecondHalf && <MDXContent source={contentSecondHalf} />}

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

      {/* Related comparisons mentioning this tool */}
      {(() => {
        const comparisons = getAllComparisons();
        const related = comparisons.filter((c: ComparisonMeta) =>
          c.tools.some((t) => t.toLowerCase() === meta.tool.toLowerCase())
        );
        if (related.length === 0) return null;
        return (
          <section className="mt-8 p-5 rounded-xl border border-void-700/40 bg-void-800/20">
            <h2 className="text-lg font-heading font-bold text-void-100 mb-3">{meta.tool} in Comparisons</h2>
            <div className="flex flex-col gap-2">
              {related.map((comp: ComparisonMeta) => (
                <Link
                  key={comp.slug}
                  href={`/comparisons/${comp.slug}/`}
                  className="inline-flex items-center gap-2 text-sm text-signal-400 hover:text-signal-300 transition-colors"
                >
                  <ArrowRight size={14} />
                  {comp.title}
                </Link>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Explore More — internal links to alternatives, pricing, best-for */}
      <ToolHubLinks toolSlug={slug} toolName={meta.tool} category={meta.category} />

      {/* User Reviews */}
      <UserReviewsSection toolSlug={meta.toolSlug || slug} toolName={meta.tool} />

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
