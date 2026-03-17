'use client';

import ReviewCard from '@/components/ReviewCard';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { useTranslation } from '@/i18n/context';
import type { ReviewMeta } from '@/lib/types';

interface ReviewsContentProps {
  reviews: ReviewMeta[];
}

export default function ReviewsContent({ reviews }: ReviewsContentProps) {
  const { t } = useTranslation();

  return (
    <div className="container-main pt-48 sm:pt-52 pb-12 sm:pb-16">
      {/* Page Header */}
      <ScrollReveal>
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
            {t('reviews_page.title', 'AI Tool Reviews')}
          </h1>
          <p className="text-lg text-void-400 leading-relaxed">
            {t('reviews_page.description', 'In-depth, hands-on reviews of the AI tools that matter most for creators and small teams.')}
          </p>
        </div>
      </ScrollReveal>

      {/* Reviews Grid */}
      {reviews.length > 0 ? (
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
      ) : (
        <div className="text-center py-20">
          <p className="text-void-500 text-lg">
            {t('reviews_page.empty', 'No reviews published yet. Check back soon.')}
          </p>
        </div>
      )}
    </div>
  );
}
