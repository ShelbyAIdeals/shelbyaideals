'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Trash2, Pencil } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { deleteReview, voteOnReview, type UserReview } from '@/lib/supabase';
import { useTranslation } from '@/i18n/context';

interface UserReviewCardProps {
  review: UserReview;
  onDeleted: () => void;
  onEdit: (review: UserReview) => void;
}

export default function UserReviewCard({ review, onDeleted, onEdit }: UserReviewCardProps) {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [deleting, setDeleting] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(0);
  const [voted, setVoted] = useState<'helpful' | 'unhelpful' | null>(null);

  const isAuthor = user?.id === review.user_id;
  const profile = review.profiles as { username?: string; first_name?: string; last_name?: string; avatar_url?: string } | undefined;
  const displayName = profile?.username || profile?.first_name || 'Anonymous';
  const initials = (profile?.first_name?.[0] ?? '') + (profile?.last_name?.[0] ?? '');

  const handleDelete = async () => {
    if (!confirm(t('review.confirm_delete', 'Are you sure you want to delete this review?'))) return;
    setDeleting(true);
    try {
      await deleteReview(review.id);
      onDeleted();
    } catch {
      setDeleting(false);
    }
  };

  const handleVote = async (helpful: boolean) => {
    if (!user) return;
    const newVote = helpful ? 'helpful' : 'unhelpful';
    if (voted === newVote) return;
    try {
      await voteOnReview(user.id, review.id, helpful);
      if (helpful) setHelpfulCount((prev) => prev + (voted === 'unhelpful' ? 2 : 1));
      else setHelpfulCount((prev) => prev - (voted === 'helpful' ? 2 : 1));
      setVoted(newVote);
    } catch {
      // Silent fail for votes
    }
  };

  const reviewDate = new Date(review.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="p-5 rounded-xl border border-void-700/50 bg-void-800/30">
      {/* Header: avatar + name + date + stars */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={displayName}
              className="w-9 h-9 rounded-full object-cover border border-void-600/50"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-signal-500/15 border border-signal-500/30 flex items-center justify-center text-xs font-bold text-signal-400">
              {initials || '?'}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-void-100">{displayName}</p>
            <p className="text-xs text-void-500">{reviewDate}</p>
          </div>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-0.5 shrink-0">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={14}
              className={star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-void-600'}
            />
          ))}
        </div>
      </div>

      {/* Review content */}
      <h4 className="text-sm font-semibold text-void-100 mb-1">{review.title}</h4>
      {review.body && (
        <p className="text-sm text-void-400 leading-relaxed">{review.body}</p>
      )}

      {/* Actions footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-void-700/30">
        {/* Helpful votes */}
        <div className="flex items-center gap-3">
          {user && !isAuthor && (
            <>
              <button
                onClick={() => handleVote(true)}
                className={`flex items-center gap-1 text-xs transition-colors cursor-pointer ${
                  voted === 'helpful' ? 'text-signal-400' : 'text-void-500 hover:text-void-300'
                }`}
                title={t('review.helpful', 'Helpful')}
              >
                <ThumbsUp size={14} />
                {helpfulCount > 0 && <span>{helpfulCount}</span>}
              </button>
              <button
                onClick={() => handleVote(false)}
                className={`flex items-center gap-1 text-xs transition-colors cursor-pointer ${
                  voted === 'unhelpful' ? 'text-red-400' : 'text-void-500 hover:text-void-300'
                }`}
                title={t('review.not_helpful', 'Not helpful')}
              >
                <ThumbsDown size={14} />
              </button>
            </>
          )}
        </div>

        {/* Author actions */}
        {isAuthor && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(review)}
              className="flex items-center gap-1 text-xs text-void-500 hover:text-signal-400 transition-colors cursor-pointer"
            >
              <Pencil size={13} />
              {t('review.edit_review', 'Edit your review')}
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1 text-xs text-void-500 hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Trash2 size={13} />
              {t('review.delete_review', 'Delete')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
