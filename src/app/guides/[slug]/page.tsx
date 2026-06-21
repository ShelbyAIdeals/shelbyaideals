import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ArticleLayout from '@/components/ArticleLayout';
import KeyTakeaway from '@/components/KeyTakeaway';
import MDXContent from '@/components/MDXContent';
import TableOfContents from '@/components/TableOfContents';
import JsonLd from '@/components/JsonLd';
import RelatedArticles from '@/components/RelatedArticles';
import { getArticle, getArticleSlugs, getAllArticles, getAllReviews } from '@/lib/content';
import type { GuideMeta } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs('guides');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { meta } = getArticle('guides', slug);
    const guide = meta as GuideMeta;
    const metaDescription = guide.description || guide.excerpt;

    const ogImage = guide.featuredImage || {
      url: 'https://www.shelby-ai.com/images/og-thumbnail.png',
      width: 1200,
      height: 630,
    };

    return {
      title: guide.title,
      description: metaDescription,
      alternates: {
        canonical: `https://www.shelby-ai.com/guides/${slug}/`,
      },
      openGraph: {
        title: guide.title,
        description: metaDescription,
        type: 'article',
        images: [ogImage],
      },
      twitter: {
        card: 'summary_large_image',
        title: guide.title,
        description: metaDescription,
        images: [typeof ogImage === 'string' ? ogImage : ogImage.url],
      },
    };
  } catch {
    return { title: 'Guide Not Found' };
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

function extractHowToSteps(content: string): { name: string; text: string }[] {
  const sections = content.split(/^##\s+/m).slice(1);
  if (sections.length < 3) return []; // Not a step-by-step guide

  return sections.slice(0, 10).map((section) => {
    const lines = section.trim().split('\n');
    const name = lines[0].replace(/^(?:Step\s+\d+[:.]\s*)?/, '').trim();
    const text = lines.slice(1).join(' ').replace(/[#*`]/g, '').trim().slice(0, 300);
    return { name, text };
  });
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;

  let content: string;
  let meta: GuideMeta;

  try {
    const article = getArticle('guides', slug);
    content = article.content;
    meta = article.meta as GuideMeta;
  } catch {
    notFound();
  }

  const headings = extractHeadings(content);
  const howToSteps = extractHowToSteps(content);
  const allArticles = getAllArticles();
  const tools = meta.recommendedTools ?? [];

  // Key takeaways: hand-authored if present, else derived from recommended tools.
  const takeawayPoints =
    meta.keyTakeaways && meta.keyTakeaways.length > 0
      ? meta.keyTakeaways
      : tools.slice(0, 4).map((t) => `${t.name} (${t.pricing}) — ${t.description}`);

  // FAQ: hand-authored if present, else data-backed Q&A from real tool frontmatter.
  // Derived answers reuse existing descriptions/pricing — no fabricated claims.
  const derivedFaq = (() => {
    if (tools.length === 0) return [];
    const items: { question: string; answer: string }[] = [];
    if (tools.length > 0) {
      items.push({
        question: `Which AI tools does this guide recommend?`,
        answer: `This guide covers ${tools.map((t) => t.name).join(', ')}.`,
      });
    }
    tools.slice(0, 4).forEach((t) => {
      items.push({
        question: `Is ${t.name} worth it?`,
        answer: `${t.description} Pricing: ${t.pricing}.`,
      });
    });
    return items;
  })();
  const faqItems = (meta.faq && meta.faq.length > 0 ? meta.faq : derivedFaq).filter((q) => q.answer);

  const breadcrumbs = [
    { name: 'Home', url: 'https://www.shelby-ai.com/' },
    { name: 'Guides', url: 'https://www.shelby-ai.com/guides/' },
    { name: meta.title, url: `https://www.shelby-ai.com/guides/${slug}/` },
  ];

  const sidebar = (
    <div className="space-y-8">
      <TableOfContents headings={headings} />
    </div>
  );

  return (
    <ArticleLayout
      meta={meta}
      backLink={{ href: '/guides', label: 'All Guides' }}
      sidebar={sidebar}
    >
      {/* Key Takeaways — answer-first TL;DR for skim readers + AI extraction */}
      <KeyTakeaway summary={meta.description || meta.excerpt} points={takeawayPoints} />

      {/* Recommended Tools */}
      {meta.recommendedTools.length > 0 && (() => {
        const reviews = getAllReviews();
        const reviewMap = new Map(reviews.map((r) => [r.tool.toLowerCase(), r.slug]));
        return (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-void-50 mb-4">
              Tools Mentioned in This Guide
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {meta.recommendedTools.map((tool) => {
                const reviewSlug = reviewMap.get(tool.name.toLowerCase());
                return (
                  <div
                    key={tool.name}
                    className="card p-4 border-2 border-transparent"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-void-100">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-void-300 mt-0.5">
                          {tool.category} &middot; {tool.pricing}
                        </p>
                        <p className="text-xs text-void-400 mt-1.5 leading-relaxed line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      {reviewSlug && (
                        <Link
                          href={`/reviews/${reviewSlug}/`}
                          className="text-xs font-semibold text-signal-400 hover:text-signal-300 no-underline inline-flex items-center gap-1"
                        >
                          Read Review <ArrowRight size={11} />
                        </Link>
                      )}
                      <a
                        href={tool.affiliateUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        className="text-xs font-semibold text-void-400 hover:text-void-300 no-underline inline-flex items-center gap-1"
                      >
                        Try It <ArrowRight size={11} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      <JsonLd type="article" data={meta} canonicalUrl={`https://www.shelby-ai.com/guides/${slug}/`} />
      <JsonLd type="breadcrumb" breadcrumbs={breadcrumbs} />
      {howToSteps.length >= 3 && (
        <JsonLd
          type="howto"
          data={{
            name: meta.title,
            description: meta.excerpt || meta.description || '',
            steps: howToSteps,
          }}
        />
      )}

      {faqItems.length > 0 && <JsonLd type="faq" data={{ questions: faqItems }} />}

      {/* MDX Body */}
      <MDXContent source={content} />

      {/* FAQ — data-backed Q&A for GEO / AI citations + long-tail coverage */}
      {faqItems.length > 0 && (
        <section className="mt-12 pt-8 border-t border-void-700/50">
          <h2 className="text-2xl font-heading font-bold text-void-50 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqItems.map((q) => (
              <div key={q.question}>
                <h3 className="text-base font-heading font-semibold text-void-100 mb-1.5">{q.question}</h3>
                <p className="text-sm text-void-300 leading-relaxed">{q.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Articles */}
      <RelatedArticles current={meta} articles={allArticles} />
    </ArticleLayout>
  );
}
