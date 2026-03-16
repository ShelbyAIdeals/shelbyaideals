'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { submitReview } from '@/lib/supabase';
import { useTranslation } from '@/i18n/context';

interface ReviewFormProps {
  toolSlug: string;
  onSubmitted: () => void;
  existingReview?: { rating: number; title: string; body: string | null } | null;
}

export default function ReviewForm({ toolSlug, onSubmitted, existingReview }: ReviewFormProps) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState(existingReview?.title ?? '');
  const [body, setBody] = useState(existingReview?.body ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="text-center py-6 px-4 rounded-xl border border-void-700/50 bg-void-800/40">
        <p className="text-sm text-void-400">{t('review.login_to_review')}</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await submitReview({
        user_id: user.id,
        tool_slug: toolSlug,
        rating,
        title: title.trim(),
        body: body.trim() || undefined,
      });
      onSubmitted();
      if (!existingReview) {
        setRating(0);
        setTitle('');
        setBody('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.error.generic'));
    } finally {
      setLoading(false);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Star selector */}
      <div>
        <label className="text-sm font-medium text-void-300 mb-2 block">
          {t('review.your_rating')}
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5 cursor-pointer transition-transform hover:scale-110"
              aria-label={`${star} star${star !== 1 ? 's' : ''}`}
            >
              <Star
                size={28}
                className={`transition-colors ${
                  star <= displayRating
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-void-600 hover:text-void-400'
                }`}
              />
            </button>
          ))}
          {displayRating > 0 && (
            <span className="ml-2 text-sm text-void-400">{displayRating}/5</span>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <input
          type="text"
          placeholder={t('review.review_title_placeholder')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={200}
          className="w-full px-4 py-3 rounded-xl bg-void-800/60 border border-void-700/50 text-void-100 placeholder-void-500 focus:outline-none focus:border-signal-500/50 focus:ring-1 focus:ring-signal-500/30 transition-all"
        />
      </div>

      {/* Body */}
      <div>
        <textarea
          placeholder={t('review.review_body_placeholder')}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={2000}
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-void-800/60 border border-void-700/50 text-void-100 placeholder-void-500 focus:outline-none focus:border-signal-500/50 focus:ring-1 focus:ring-signal-500/30 transition-all resize-none"
        />
        <div className="text-right text-xs text-void-600 mt-1">
          {body.length}/2000
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || rating === 0}
        className="px-6 py-2.5 rounded-xl bg-signal-500 text-void-950 font-bold text-sm hover:bg-signal-400 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? t('review.submitting') : (existingReview ? t('review.edit_review') : t('review.submit'))}
      </button>
    </form>
  );
}
