'use client';

import Link from 'next/link';
import { ArrowRight, Users, PenTool, Briefcase, Video, TrendingUp, Lightbulb, FlaskConical, Scale, ShieldCheck, RefreshCw, Star } from 'lucide-react';
import ReviewCard from '@/components/ReviewCard';
import CategoryCard from '@/components/CategoryCard';
import DealOfTheWeek from '@/components/DealOfTheWeek';
import FeaturedBanner from '@/components/FeaturedBanner';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { useTranslation } from '@/i18n/context';
import type { ReviewMeta, ComparisonMeta, GuideMeta, CategoryInfo } from '@/lib/types';

const audienceSegments = [
  { label: 'Content Writers', slug: 'content-writers', icon: PenTool },
  { label: 'Marketers', slug: 'marketing-teams', icon: TrendingUp },
  { label: 'Freelancers', slug: 'freelancers', icon: Briefcase },
  { label: 'Video Creators', slug: 'video-creators', icon: Video },
  { label: 'Small Business', slug: 'small-business', icon: Users },
  { label: 'Solopreneurs', slug: 'solopreneurs', icon: Lightbulb },
];

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
      {/* Quick Picks by Use Case */}
      <section className="py-14 sm:py-16">
        <div className="container-main">
          <ScrollReveal>
            <div className="mb-8">
              <span className="text-xs font-semibold tracking-widest uppercase text-signal-500 mb-2 block">
                Quick Answer
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-void-50">
                Best AI Tools by Use Case
              </h2>
              <p className="mt-2 text-void-400 text-sm">
                Short on time? Here are our top picks after testing 31+ tools hands-on.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-4 sm:grid-cols-3">
            {[
              {
                label: 'Best for Writing & SEO',
                tool: 'Frase',
                rating: 4.0,
                reason: 'AI content briefs + SERP optimization in one tool. Replaced two separate subscriptions.',
                href: '/best-for/content-writers',
                reviewHref: '/reviews/frase-review',
              },
              {
                label: 'Best for Video Creation',
                tool: 'Pictory',
                rating: 3.5,
                reason: 'Paste a blog URL, get a video. No editing skills needed. Best for content repurposing.',
                href: '/best-for/video-creators',
                reviewHref: '/reviews/pictory-review',
              },
              {
                label: 'Best for Small Business',
                tool: 'Make.com',
                rating: 4.3,
                reason: 'Visual workflow builder that replaced Zapier for us. Cheaper for multi-step automations.',
                href: '/best-for/small-business',
                reviewHref: '/reviews/make-review',
              },
            ].map((pick) => (
              <StaggerItem key={pick.label}>
                <div className="card p-5 border border-void-700/40 h-full flex flex-col">
                  <span className="text-xs font-semibold text-signal-400 mb-2">{pick.label}</span>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base font-bold text-void-50">{pick.tool}</span>
                    <span className="flex items-center gap-0.5 text-xs text-amber-400">
                      <Star size={11} fill="currentColor" /> {pick.rating}
                    </span>
                  </div>
                  <p className="text-xs text-void-400 leading-relaxed mb-4 flex-1">{pick.reason}</p>
                  <div className="flex items-center gap-3">
                    <Link
                      href={pick.reviewHref}
                      className="text-xs font-semibold text-signal-400 hover:text-signal-300 no-underline inline-flex items-center gap-1"
                    >
                      Read Review <ArrowRight size={11} />
                    </Link>
                    <Link
                      href={pick.href}
                      className="text-xs text-void-400 hover:text-void-300 no-underline"
                    >
                      See All Picks
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="section-divider" />

      {/* 2. Featured Reviews */}
      {featuredReviews.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-main">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-signal-500 mb-2 block">
                    {t('home.reviews_eyebrow', 'Tested & Rated')}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-void-50">
                    {t('home.featured_reviews', 'Top-Rated AI Tools This Month')}
                  </h2>
                  <p className="mt-2 text-void-400 text-sm">
                    {t('home.featured_reviews_desc', 'Each tool tested for 7-14 days with real workflows. See what actually works.')}
                  </p>
                </div>
                <Link
                  href="/reviews"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline group"
                >
                  {t('home.all_reviews', 'See All Reviews')}
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
                {t('home.all_reviews', 'See All Reviews')} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Banner — update imageSrc when new image is ready */}
      <section className="py-10 sm:py-14">
        <div className="container-main">
          <ScrollReveal>
            <FeaturedBanner
              imageSrc="/images/og-thumbnail.png"
              imageAlt="ShelbyAI — Tested AI tool reviews and comparisons"
              title="Every Rating Earned, Not Paid For"
              description="We spend 7-14 days with each tool, testing real workflows and documenting real output. Our ratings are based on hands-on experience — not ad budgets or sponsorship deals."
              ctaLabel="See How We Test"
              ctaHref="/how-we-review"
              badge="Our Testing Process"
              variant="signal"
            />
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* How We Test — Trust Section */}
      <section className="py-16 sm:py-20 section-alt">
        <div className="container-main">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-widest uppercase text-signal-500 mb-2 block">
                Our Process
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-void-50">
                How We Test AI Tools
              </h3>
              <p className="mt-2 text-void-400 text-sm max-w-2xl mx-auto">
                Every rating on this site is earned through hands-on testing. No tool company pays for placement or scores.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: FlaskConical,
                title: '7-14 Days Hands-On',
                desc: 'We sign up, complete onboarding, and run real tasks — writing, video, SEO, automation — for at least a week.',
              },
              {
                icon: Scale,
                title: 'Weighted Scoring',
                desc: 'Output quality (30%), value for money (25%), ease of use (20%), features (15%), support (10%).',
              },
              {
                icon: ShieldCheck,
                title: 'No Sponsored Rankings',
                desc: 'Affiliate links help fund the site, but they never influence ratings, rankings, or recommendations.',
              },
              {
                icon: RefreshCw,
                title: 'Regularly Updated',
                desc: 'AI tools change fast. We re-test when major updates ship and update our scores accordingly.',
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="text-center p-5">
                  <div className="w-12 h-12 rounded-xl bg-signal-500/10 border border-signal-500/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon size={22} className="text-signal-400" />
                  </div>
                  <h3 className="text-sm font-bold text-void-100 mb-2">{item.title}</h3>
                  <p className="text-xs text-void-400 leading-relaxed">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal>
            <div className="text-center mt-8">
              <Link
                href="/how-we-review"
                className="inline-flex items-center gap-2 text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline"
              >
                See Full Methodology <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

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
                  {t('home.browse_eyebrow', 'By Use Case')}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-void-50">
                  {t('home.explore_by_category', 'Find Tools for Your Workflow')}
                </h2>
                <p className="mt-2 text-void-400 text-sm">
                  {t('home.explore_by_category_desc', 'Curated AI tools organized by what you actually need to get done.')}
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

      {/* 4b. Find Tools for Your Role */}
      <section className="py-16 sm:py-20">
        <div className="container-main">
          <ScrollReveal>
            <div className="mb-10">
              <span className="text-xs font-semibold tracking-widest uppercase text-signal-500 mb-2 block">
                {t('home.role_eyebrow', 'By Role')}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-void-50">
                {t('home.role_heading', 'Find the Best Tools for Your Role')}
              </h3>
              <p className="mt-2 text-void-400 text-sm">
                {t('home.role_desc', 'Curated picks based on how you work — not just what category a tool falls into.')}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {audienceSegments.map((seg) => (
              <StaggerItem key={seg.slug}>
                <Link
                  href={`/best-for/${seg.slug}/`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-void-700/40 bg-void-800/20 hover:border-signal-500/30 hover:bg-void-800/40 transition-all no-underline group"
                >
                  <div className="w-10 h-10 rounded-lg bg-signal-500/10 border border-signal-500/20 flex items-center justify-center shrink-0">
                    <seg.icon size={18} className="text-signal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-void-100 group-hover:text-signal-400 transition-colors">
                      Best AI Tools for {seg.label}
                    </span>
                  </div>
                  <ArrowRight size={14} className="text-void-500 group-hover:text-signal-400 transition-colors shrink-0" />
                </Link>
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
                    {t('home.tool_comparisons', 'Which Tool Should You Pick?')}
                  </h2>
                  <p className="mt-2 text-void-400 text-sm">
                    {t('home.tool_comparisons_desc', 'Side-by-side comparisons with clear winners for each use case.')}
                  </p>
                </div>
                <Link
                  href="/comparisons"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline group"
                >
                  {t('home.all_comparisons', 'See All Comparisons')}
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
                      {t('home.read_comparison', 'See Which Wins')}
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <div className="section-divider" />

      {/* 7. Latest Guides */}
      {latestGuides.length > 0 && (
        <section className="py-16 sm:py-20 section-alt">
          <div className="container-main">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-iris-400 mb-2 block">
                    {t('home.learn_eyebrow', 'Practical Guides')}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-void-50">
                    {t('home.latest_guides', 'Build AI-Powered Workflows')}
                  </h3>
                  <p className="mt-2 text-void-400 text-sm">
                    {t('home.latest_guides_desc', 'Step-by-step tutorials to save time and produce better content with AI.')}
                  </p>
                </div>
                <Link
                  href="/guides"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline group"
                >
                  {t('home.all_guides', 'See All Guides')}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestGuides.map((guide) => (
                <StaggerItem key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="card group p-6 no-underline hover:-translate-y-1 transition-all flex flex-col h-full"
                  >
                    <span className="badge-iris mb-3 inline-block">{t('home.guide_badge', 'Guide')}</span>
                    <h3 className="text-lg font-heading font-bold text-void-100 mb-2 group-hover:text-signal-400 transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-void-400 leading-relaxed mb-4 flex-1 line-clamp-2">
                      {guide.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      {guide.readingTime && (
                        <span className="text-xs text-void-500">
                          {guide.readingTime}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 group-hover:text-signal-300">
                        {t('home.read_guide', 'Follow the Guide')}
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
