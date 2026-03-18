'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import CategoryCard from '@/components/CategoryCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import DealOfTheWeek from '@/components/DealOfTheWeek';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { useTranslation } from '@/i18n/context';
import type { ReviewMeta, ComparisonMeta, GuideMeta, CategoryInfo } from '@/lib/types';

interface HomeContentProps {
  featuredReviews: ReviewMeta[];
  latestComparisons: ComparisonMeta[];
  latestGuides: GuideMeta[];
  categoriesWithCount: Array<CategoryInfo & { articleCount: number }>;
}

export default function HomeContent({
  featuredReviews,
  latestComparisons,
  latestGuides,
  categoriesWithCount,
}: HomeContentProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* 2. Featured Reviews */}
      {featuredReviews.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-main">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-signal-500 mb-2 block">
                    {t('home.reviews_eyebrow', 'Reviews')}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-void-50">
                    {t('home.featured_reviews', 'Featured Reviews')}
                  </h2>
                  <p className="mt-2 text-void-400 text-sm">
                    {t('home.featured_reviews_desc', 'In-depth, hands-on reviews of the tools that matter.')}
                  </p>
                </div>
                <Link
                  href="/reviews"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline group"
                >
                  {t('home.all_reviews', 'All Reviews')}
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
                    toolLogo={review.toolLogo}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-sm font-semibold text-signal-400 no-underline"
              >
                {t('home.all_reviews', 'All Reviews')} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="section-divider" />

      {/* 3. Deal of the Week */}
      <section className="py-10 sm:py-14">
        <div className="container-main">
          <ScrollReveal>
            <DealOfTheWeek
              toolName="Pictory"
              deal="14-Day Free Trial — Turn Blog Posts into Videos"
              reviewSlug="pictory-review"
              affiliateUrl="https://pictory.ai?ref=fran26"
            />
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* 4. Browse by Category */}
      <section id="categories" className="py-16 sm:py-20 section-alt">
        <div className="container-main">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-iris-400 mb-2 block">
                  {t('home.browse_eyebrow', 'Browse')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-void-50">
                  {t('home.explore_by_category', 'Explore by Category')}
                </h2>
                <p className="mt-2 text-void-400 text-sm">
                  {t('home.explore_by_category_desc', 'Find the right AI tools for your workflow.')}
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

      {/* 5. Latest Comparisons */}
      {latestComparisons.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-main">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-ember-400 mb-2 block">
                    {t('home.head_to_head_eyebrow', 'Head-to-Head')}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-void-50">
                    {t('home.tool_comparisons', 'Tool Comparisons')}
                  </h2>
                  <p className="mt-2 text-void-400 text-sm">
                    {t('home.tool_comparisons_desc', 'Side-by-side matchups with clear winners by use case.')}
                  </p>
                </div>
                <Link
                  href="/comparisons"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline group"
                >
                  {t('home.all_comparisons', 'All Comparisons')}
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
                        <span key={tool} className="badge-signal">
                          {tool}
                        </span>
                      ))}
                      <span className="badge-ember">{t('home.vs', 'VS')}</span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-void-100 mb-2 group-hover:text-signal-400 transition-colors">
                      {comp.title}
                    </h3>
                    <p className="text-sm text-void-400 leading-relaxed mb-4 flex-1">
                      {comp.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 group-hover:text-signal-300">
                      {t('home.read_comparison', 'Read Comparison')}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* 6. Newsletter */}
      <section className="py-16 sm:py-20">
        <div className="container-main">
          <NewsletterSignup variant="section" />
        </div>
      </section>

      <div className="section-divider" />

      {/* 7. Latest Guides */}
      {latestGuides.length > 0 && (
        <section className="py-16 sm:py-20 section-alt">
          <div className="container-main">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-iris-400 mb-2 block">
                    {t('home.learn_eyebrow', 'Learn')}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-void-50">
                    {t('home.latest_guides', 'Latest Guides')}
                  </h2>
                  <p className="mt-2 text-void-400 text-sm">
                    {t('home.latest_guides_desc', 'Step-by-step tutorials to build AI-powered workflows.')}
                  </p>
                </div>
                <Link
                  href="/guides"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline group"
                >
                  {t('home.all_guides', 'All Guides')}
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
                    <span className="badge-iris mb-3 inline-block">{t('home.guide_badge', 'Guide')}</span>
                    <h3 className="text-lg font-heading font-bold text-void-100 mb-2 group-hover:text-signal-400 transition-colors">
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
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 group-hover:text-signal-300">
                        {t('home.read_guide', 'Read Guide')}
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
    </>
  );
}
