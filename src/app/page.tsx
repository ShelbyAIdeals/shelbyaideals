import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import ReviewCard from '@/components/ReviewCard';
import CategoryCard from '@/components/CategoryCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { getFeaturedArticles, getAllComparisons, getAllGuides, getArticlesByCategory } from '@/lib/content';
import { CATEGORIES } from '@/lib/types';
import type { ReviewMeta } from '@/lib/types';

export default async function HomePage() {
  const featured = getFeaturedArticles();
  const comparisons = getAllComparisons();
  const guides = getAllGuides();

  const featuredReviews = featured
    .filter((a): a is ReviewMeta => a.type === 'review')
    .slice(0, 3);

  const latestComparisons = comparisons.slice(0, 3);
  const latestGuides = guides.slice(0, 3);

  const categoriesWithCount = CATEGORIES.map((cat) => ({
    ...cat,
    articleCount: getArticlesByCategory(cat.slug).length,
  }));

  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Browse by Category */}
      <section id="categories" className="py-16 sm:py-20">
        <div className="container-main">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-accent-500 mb-2 block">
                  Browse
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-void-50">
                  Explore by Category
                </h2>
                <p className="mt-2 text-void-500 text-sm">
                  Find the right AI tools for your workflow.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesWithCount.map((cat) => (
              <StaggerItem key={cat.slug}>
                <CategoryCard
                  name={cat.name}
                  slug={cat.slug}
                  description={cat.description}
                  icon={cat.icon}
                  articleCount={cat.articleCount}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider" />

      {/* Featured Reviews */}
      {featuredReviews.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-main">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent-500 mb-2 block">
                    Reviews
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-void-50">
                    Featured Reviews
                  </h2>
                  <p className="mt-2 text-void-500 text-sm">
                    In-depth, hands-on reviews of the tools that matter.
                  </p>
                </div>
                <Link
                  href="/reviews"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-accent-400 hover:text-accent-300 no-underline group"
                >
                  All Reviews
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredReviews.map((review) => (
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
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-400 no-underline"
              >
                All Reviews <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="section-divider" />

      {/* Latest Comparisons */}
      {latestComparisons.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-main">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent-500 mb-2 block">
                    Head-to-Head
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-void-50">
                    Tool Comparisons
                  </h2>
                  <p className="mt-2 text-void-500 text-sm">
                    Side-by-side matchups with clear winners by use case.
                  </p>
                </div>
                <Link
                  href="/comparisons"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-accent-400 hover:text-accent-300 no-underline group"
                >
                  All Comparisons
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestComparisons.map((comp) => (
                <StaggerItem key={comp.slug}>
                  <Link
                    href={`/comparisons/${comp.slug}`}
                    className="card group p-6 no-underline hover:-translate-y-1 transition-all block"
                  >
                    {/* Tool badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {comp.tools.map((tool) => (
                        <span key={tool} className="badge-accent">
                          {tool}
                        </span>
                      ))}
                      <span className="badge-void">VS</span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-void-100 mb-2 group-hover:text-accent-400 transition-colors">
                      {comp.title}
                    </h3>
                    <p className="text-sm text-void-400 leading-relaxed mb-4 flex-1">
                      {comp.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400 group-hover:text-accent-300">
                      Read Comparison
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 sm:py-20">
        <div className="container-main">
          <NewsletterSignup variant="section" />
        </div>
      </section>

      <div className="section-divider" />

      {/* Latest Guides */}
      {latestGuides.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-main">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent-500 mb-2 block">
                    Learn
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-void-50">
                    Latest Guides
                  </h2>
                  <p className="mt-2 text-void-500 text-sm">
                    Step-by-step tutorials to build AI-powered workflows.
                  </p>
                </div>
                <Link
                  href="/guides"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-accent-400 hover:text-accent-300 no-underline group"
                >
                  All Guides
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestGuides.map((guide) => (
                <StaggerItem key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="card group p-6 no-underline hover:-translate-y-1 transition-all block"
                  >
                    <span className="badge-void mb-3 inline-block">Guide</span>
                    <h3 className="text-lg font-heading font-bold text-void-100 mb-2 group-hover:text-accent-400 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-void-400 leading-relaxed mb-4 flex-1">
                      {guide.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      {guide.readingTime && (
                        <span className="text-xs text-void-500">
                          {guide.readingTime}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-400 group-hover:text-accent-300">
                        Read Guide
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </main>
  );
}
