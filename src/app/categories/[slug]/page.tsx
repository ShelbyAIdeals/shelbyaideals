import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReviewCard from '@/components/ReviewCard';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { getArticlesByCategory } from '@/lib/content';
import { CATEGORIES, CATEGORY_MAP } from '@/lib/types';
import type { ReviewMeta, ComparisonMeta, BestOfMeta, GuideMeta, Category } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  // Generate pages for new categories AND legacy slugs so old URLs still work
  const legacySlugs = Object.keys(CATEGORY_MAP);
  const allSlugs = new Set([
    ...CATEGORIES.map((cat) => cat.slug),
    ...legacySlugs,
  ]);
  return Array.from(allSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mapped = CATEGORY_MAP[slug];
  const category = CATEGORIES.find((c) => c.slug === slug) ??
    (mapped ? CATEGORIES.find((c) => c.slug === mapped) : undefined);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  // If this is a legacy slug, set canonical to the new category URL
  const canonicalSlug = mapped && mapped !== slug ? mapped : slug;

  return {
    title: category.name,
    description: `${category.description} Tested and reviewed with real-world workflows.`,
    alternates: {
      canonical: `https://www.shelby-ai.com/categories/${canonicalSlug}/`,
    },
    openGraph: {
      title: category.name,
      description: `${category.description} Tested and reviewed with real-world workflows.`,
      images: [
        {
          url: 'https://www.shelby-ai.com/images/og-thumbnail.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.name,
      description: `${category.description} Tested and reviewed with real-world workflows.`,
      images: ['https://www.shelby-ai.com/images/og-thumbnail.png'],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  // Resolve legacy slug to new category via CATEGORY_MAP
  const resolvedSlug = CATEGORY_MAP[slug] ?? slug;
  const category = CATEGORIES.find((c) => c.slug === resolvedSlug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(resolvedSlug as Category);

  // Group by type
  const reviews = articles.filter((a): a is ReviewMeta => a.type === 'review');
  const comparisons = articles.filter((a): a is ComparisonMeta => a.type === 'comparison');
  const bestOf = articles.filter((a): a is BestOfMeta => a.type === 'best');
  const guides = articles.filter((a): a is GuideMeta => a.type === 'guide');

  return (
    <main className="min-h-screen">
      <div className="container-main py-12 sm:py-16">
        {/* Category Header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-void-400 leading-relaxed">
              {category.description}
            </p>
          </div>
        </ScrollReveal>

        {articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-void-500 text-lg">
              No articles in this category yet. Check back soon.
            </p>
          </div>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-void-50 mb-6">Reviews</h2>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <StaggerItem key={review.slug}>
                  <ReviewCard
                    title={review.title}
                    slug={review.slug}
                    tool={review.tool}
                    rating={review.rating}
                    excerpt={review.excerpt}
                    category={review.category}
                    bestFor={review.bestFor}
                    featuredImage={review.featuredImage}
                    toolLogo={review.toolLogo}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}

        {/* Comparisons */}
        {comparisons.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-void-50 mb-6">Comparisons</h2>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {comparisons.map((comp) => (
                <StaggerItem key={comp.slug}>
                  <Link
                    href={`/comparisons/${comp.slug}`}
                    className="card p-6 no-underline hover:border-signal-500/40 border border-void-700/50 transition-all hover:-translate-y-1 block"
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {comp.tools.map((tool) => (
                        <span key={tool} className="badge-signal">
                          {tool}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-void-100 mb-2">
                      {comp.title}
                    </h3>
                    <p className="text-sm text-void-400 leading-relaxed mb-4">
                      {comp.excerpt}
                    </p>
                    <span className="inline-flex items-center text-sm font-semibold text-signal-400">
                      Read Comparison <span className="ml-1">&rarr;</span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}

        {/* Best-Of */}
        {bestOf.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-void-50 mb-6">Best-Of Lists</h2>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bestOf.map((article) => (
                <StaggerItem key={article.slug}>
                  <Link
                    href={`/best/${article.slug}`}
                    className="card p-6 no-underline hover:border-signal-500/40 border border-void-700/50 transition-all hover:-translate-y-1 block"
                  >
                    <span className="badge-signal mb-3 inline-block">
                      {article.tools.length} tools ranked
                    </span>
                    <h3 className="text-lg font-bold text-void-100 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-void-400 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center text-sm font-semibold text-signal-400">
                      See Rankings <span className="ml-1">&rarr;</span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}

        {/* Guides */}
        {guides.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-void-50 mb-6">Guides</h2>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <StaggerItem key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="card p-6 no-underline hover:border-signal-500/40 border border-void-700/50 transition-all hover:-translate-y-1 block"
                  >
                    <span className="badge-void mb-3 inline-block">Guide</span>
                    <h3 className="text-lg font-bold text-void-100 mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-void-400 leading-relaxed mb-4">
                      {guide.excerpt}
                    </p>
                    <span className="inline-flex items-center text-sm font-semibold text-signal-400">
                      Read Guide <span className="ml-1">&rarr;</span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        )}
      </div>
    </main>
  );
}
