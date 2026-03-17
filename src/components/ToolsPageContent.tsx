'use client';

import { useState, useMemo } from 'react';
import ScrollReveal from '@/components/motion/ScrollReveal';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import CategorySidebar from '@/components/CategorySidebar';
import ToolsTabs from '@/components/ToolsTabs';
import ToolListCard from '@/components/ToolListCard';
import { useTranslation } from '@/i18n/context';
import type { ReviewMeta, Category, CategoryInfo } from '@/lib/types';

interface ToolsPageContentProps {
  reviews: ReviewMeta[];
  categoriesWithCount: Array<CategoryInfo & { articleCount: number }>;
}

export default function ToolsPageContent({
  reviews,
  categoriesWithCount,
}: ToolsPageContentProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'popular' | 'recent'>('popular');

  const filteredAndSorted = useMemo(() => {
    const filtered =
      activeCategory === 'all'
        ? reviews
        : reviews.filter((r) => r.category === activeCategory);

    const sorted = [...filtered].sort((a, b) => {
      if (activeTab === 'popular') return b.rating - a.rating;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return sorted;
  }, [reviews, activeCategory, activeTab]);

  return (
    <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
      {/* Page Header */}
      <ScrollReveal>
        <div className="max-w-2xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-3">
            {t('tools.page_title', 'AI Tools Directory')}
          </h1>
          <p className="text-base sm:text-lg text-void-400 leading-relaxed">
            {t(
              'tools.page_description',
              'Browse and compare the best AI tools — reviewed, rated, and ranked for creators and small teams.'
            )}
          </p>
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
                    excerpt={review.excerpt}
                    category={review.category as Category}
                    rating={review.rating}
                    bestFor={review.bestFor}
                    date={review.date}
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
