import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ArticleLayout from '@/components/ArticleLayout';
import MDXContent from '@/components/MDXContent';
import TableOfContents from '@/components/TableOfContents';
import { getArticle, getArticleSlugs } from '@/lib/content';
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

    return {
      title: guide.title,
      description: guide.excerpt,
      openGraph: {
        title: guide.title,
        description: guide.excerpt,
        type: 'article',
        ...(guide.featuredImage && { images: [guide.featuredImage] }),
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
      {/* Recommended Tools */}
      {meta.recommendedTools.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-bold text-void-950 mb-4">
            Tools Mentioned in This Guide
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {meta.recommendedTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="card p-4 no-underline hover:border-accent-300 border-2 border-transparent transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-void-900 group-hover:text-accent-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-void-500 mt-0.5">
                      {tool.category} &middot; {tool.pricing}
                    </p>
                    <p className="text-xs text-void-600 mt-1.5 leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-accent-500 mt-0.5 group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
                <span className="mt-2 block text-[10px] text-void-400">
                  Affiliate link
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* MDX Body */}
      <MDXContent source={content} />
    </ArticleLayout>
  );
}
