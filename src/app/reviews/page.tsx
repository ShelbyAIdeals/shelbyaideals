import type { Metadata } from 'next';
import ReviewCard from '@/components/ReviewCard';
import { getAllReviews } from '@/lib/content';

export const metadata: Metadata = {
  title: 'AI Tool Reviews',
  description:
    'In-depth, hands-on reviews of the AI tools that matter most for creators and small teams.',
};

export default async function ReviewsPage() {
  const reviews = getAllReviews();

  return (
    <main className="min-h-screen">
      <div className="container-main py-12 sm:py-16">
        {/* Page Header */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-void-50 mb-4">
            AI Tool Reviews
          </h1>
          <p className="text-lg text-void-400 leading-relaxed">
            In-depth, hands-on reviews of the AI tools that matter most for
            creators and small teams.
          </p>
        </div>

        {/* Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-reveal-stagger">
            {reviews.map((review) => (
              <ReviewCard
                key={review.slug}
                title={review.title}
                slug={review.slug}
                tool={review.tool}
                rating={review.rating}
                excerpt={review.excerpt}
                category={review.category}
                bestFor={review.bestFor}
                featuredImage={review.featuredImage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-void-500 text-lg">
              No reviews published yet. Check back soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
