'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import ScrollReveal from '@/components/motion/ScrollReveal';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import CategorySidebar from '@/components/CategorySidebar';
import ToolsTabs from '@/components/ToolsTabs';
import ToolListCard from '@/components/ToolListCard';
import { useTranslation } from '@/i18n/context';
import { useAuth } from '@/lib/auth-context';
import { getUserFavorites } from '@/lib/supabase';
import { isAffiliateActive } from '@/lib/affiliate';
import Link from 'next/link';
import type { ReviewMeta, Category, CategoryInfo } from '@/lib/types';

const audiencePills = [
  { label: 'Content Writers', slug: 'content-writers' },
  { label: 'Marketers', slug: 'marketing-teams' },
  { label: 'Freelancers', slug: 'freelancers' },
  { label: 'Video Creators', slug: 'video-creators' },
  { label: 'Small Teams', slug: 'small-business' },
];

interface ToolsPageContentProps {
  reviews: ReviewMeta[];
  categoriesWithCount: Array<CategoryInfo & { articleCount: number }>;
}

export default function ToolsPageContent({
  reviews,
  categoriesWithCount,
}: ToolsPageContentProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'popular' | 'recent'>('popular');
  const [favSlugs, setFavSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user?.id) {
      getUserFavorites(user.id).then((slugs) => setFavSlugs(new Set(slugs)));
    } else {
      setFavSlugs(new Set());
    }
  }, [user?.id]);

  const handleFavoriteToggle = useCallback((toolSlug: string, newState: boolean) => {
    setFavSlugs((prev) => {
      const next = new Set(prev);
      if (newState) next.add(toolSlug);
      else next.delete(toolSlug);
      return next;
    });
  }, []);

  const filteredAndSorted = useMemo(() => {
    const filtered =
      activeCategory === 'all'
        ? reviews
        : reviews.filter((r) => r.category === activeCategory);

    const sorted = [...filtered].sort((a, b) => {
      if (activeTab === 'popular') {
        const aBoost = isAffiliateActive(a.toolSlug || a.slug.replace('-review', '')) ? 0.1 : 0;
        const bBoost = isAffiliateActive(b.toolSlug || b.slug.replace('-review', '')) ? 0.1 : 0;
        return (b.rating + bBoost) - (a.rating + aBoost);
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return sorted;
  }, [reviews, activeCategory, activeTab]);

  return (
    <div className="container-main pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Page Header */}
      <ScrollReveal>
        <div className="max-w-2xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-3">
            {t('tools.page_title', 'AI Tools Directory')}
          </h1>
          <p className="text-base sm:text-lg text-void-400 leading-relaxed">
            {t(
              'tools.page_description',
              'Tested, rated, and ranked — find the right AI tool for your workflow.'
            )}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <span className="text-xs text-void-500">{t('tools.popular_for', 'Popular for:')}</span>
            {audiencePills.map((pill) => (
              <Link
                key={pill.slug}
                href={`/best-for/${pill.slug}/`}
                className="px-3 py-1 text-xs font-medium text-void-400 bg-void-800/60 border border-void-700/40 rounded-full hover:border-signal-500/30 hover:text-signal-400 no-underline transition-all"
              >
                {pill.label}
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar handles its own responsive rendering (desktop sidebar + mobile pills) */}
        <CategorySidebar
          categories={categoriesWithCount}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <ToolsTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            totalCount={filteredAndSorted.length}
          />

          {filteredAndSorted.length > 0 ? (
            <StaggerContainer key={`${activeCategory}-${activeTab}`} className="flex flex-col gap-3">
              {filteredAndSorted.map((review) => (
                <StaggerItem key={review.slug}>
                  <ToolListCard
                    slug={review.slug}
                    tool={review.tool}
                    toolLogo={review.toolLogo}
                    toolSlug={review.toolSlug}
                    socialLinks={review.socialLinks}
                    excerpt={review.excerpt}
                    category={review.category as Category}
                    rating={review.rating}
                    bestFor={review.bestFor}
                    date={review.date}
                    isFavorited={favSlugs.has(review.toolSlug || review.slug.replace('-review', ''))}
                    onFavoriteToggle={(newState) => handleFavoriteToggle(review.toolSlug || review.slug.replace('-review', ''), newState)}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-20">
              <p className="text-void-500 text-lg">
                {t('tools.empty', 'No tools found in this category.')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
