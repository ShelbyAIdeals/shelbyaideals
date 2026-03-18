'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { getReviewsForTool, type UserReview } from '@/lib/supabase';
import { useTranslation } from '@/i18n/context';
import RatingDistribution from './RatingDistribution';
import ReviewForm from './ReviewForm';
import UserReviewCard from './UserReviewCard';

interface UserReviewsSectionProps {
  toolSlug: string;
  toolName: string;
}

export default function UserReviewsSection({ toolSlug, toolName }: UserReviewsSectionProps) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<UserReview | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const fetchReviews = useCallback(async () => {
    try {
      setError(false);
      const data = await getReviewsForTool(toolSlug);
      setReviews(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [toolSlug]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const userHasReview = user ? reviews.some((r) => r.user_id === user.id) : false;

  const handleSubmitted = () => {
    setShowForm(false);
    setEditingReview(null);
    fetchReviews();
  };

  const handleEdit = (review: UserReview) => {
    setEditingReview(review);
    setShowForm(true);
  };

  // Don't render if Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;

  // Don't render the section at all when there are no reviews
  if (!loading && !error && reviews.length === 0) return null;

  return (
    <section className="mt-12" id="user-reviews">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-void-50">
          {t('review.user_rating')}
        </h2>
        {user && !userHasReview && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-signal-500/10 border border-signal-500/30 text-signal-400 text-sm font-medium hover:bg-signal-500/20 transition-all cursor-pointer"
          >
            <MessageSquarePlus size={16} />
            {t('review.write_review')}
          </button>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="py-8 text-center text-void-500 text-sm animate-pulse">
          {t('common.loading')}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="py-8 text-center">
          <p className="text-sm text-void-500">{t('common.error')}</p>
          <button
            onClick={fetchReviews}
            className="mt-2 text-sm text-signal-400 hover:text-signal-300 cursor-pointer"
          >
            {t('common.retry')}
          </button>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Rating distribution */}
          {reviews.length > 0 && (
            <div className="p-5 rounded-xl border border-void-700/50 bg-void-800/30 mb-6">
              <RatingDistribution reviews={reviews} averageRating={averageRating} />
            </div>
          )}

          {/* Review form */}
          {showForm && (
            <div className="p-5 rounded-xl border border-signal-500/30 bg-signal-500/5 mb-6">
              <h3 className="text-sm font-semibold text-void-200 mb-4">
                {editingReview ? t('review.edit_review') : t('review.write_review')}
              </h3>
              <ReviewForm
                toolSlug={toolSlug}
                onSubmitted={handleSubmitted}
                existingReview={editingReview}
              />
              <button
                onClick={() => { setShowForm(false); setEditingReview(null); }}
                className="mt-3 text-xs text-void-500 hover:text-void-300 cursor-pointer"
              >
                {t('common.cancel')}
              </button>
            </div>
          )}

          {/* Reviews list */}
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.slice(0, visibleCount).map((review) => (
                <UserReviewCard
                  key={review.id}
                  review={review}
                  onDeleted={fetchReviews}
                  onEdit={handleEdit}
                />
              ))}
              {reviews.length > visibleCount && (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 5)}
                  className="w-full py-3 text-sm text-signal-400 hover:text-signal-300 border border-void-700/50 rounded-xl hover:bg-void-800/40 transition-all cursor-pointer"
                >
                  {t('common.show_more')} ({reviews.length - visibleCount} more)
                </button>
              )}
            </div>
          ) : !showForm ? (
            <div className="py-8 text-center border border-void-700/30 rounded-xl">
              <p className="text-sm text-void-500 mb-3">{t('review.no_reviews')}</p>
              {user && (
                <button
                  onClick={() => setShowForm(true)}
                  className="text-sm text-signal-400 hover:text-signal-300 cursor-pointer"
                >
                  {t('review.write_review')}
                </button>
              )}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
