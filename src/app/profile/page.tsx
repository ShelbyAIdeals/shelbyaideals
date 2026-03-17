'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Star, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { supabase, upsertProfile, type UserReview } from '@/lib/supabase';
import { useTranslation } from '@/i18n/context';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const { t } = useTranslation();
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', firstName: '', lastName: '' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [authLoading, user, router]);

  // Load user's reviews
  useEffect(() => {
    if (!user) return;
    supabase
      .from('reviews')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setUserReviews(data);
      });
  }, [user]);

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username ?? '',
        firstName: profile.first_name ?? '',
        lastName: profile.last_name ?? '',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaveError('');
    try {
      await upsertProfile({
        id: user.id,
        username: formData.username.trim(),
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
      });
      await refreshProfile();
      setEditing(false);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="animate-pulse text-center text-void-500">{t('common.loading')}</div>
      </main>
    );
  }

  const displayName = profile?.username || profile?.first_name || user.email?.split('@')[0] || 'User';
  const initials = (profile?.first_name?.[0] ?? '') + (profile?.last_name?.[0] ?? '');
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-void-400 hover:text-signal-400 mb-8 no-underline transition-colors"
      >
        <ArrowLeft size={14} />
        {t('common.back')}
      </Link>

      {/* Profile header */}
      <div className="flex items-start gap-5 mb-10">
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={displayName}
            className="w-20 h-20 rounded-full object-cover border-2 border-void-600/50"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-signal-500/15 border-2 border-signal-500/30 flex items-center justify-center text-2xl font-bold text-signal-400">
            {initials || <User size={32} />}
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-heading font-bold text-void-50">{displayName}</h1>
          {profile?.first_name && profile?.last_name && (
            <p className="text-void-400 text-sm">
              {profile.first_name} {profile.last_name}
            </p>
          )}
          <div className="flex items-center gap-4 mt-2 text-xs text-void-500">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              Joined {joinDate}
            </span>
            <span className="flex items-center gap-1">
              <Star size={12} />
              {userReviews.length} review{userReviews.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="px-4 py-2 text-sm font-medium border border-void-600/50 rounded-lg text-void-300 hover:text-void-100 hover:bg-void-700/40 transition-all cursor-pointer"
        >
          {editing ? t('common.cancel') : 'Edit Profile'}
        </button>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="p-6 rounded-xl border border-void-700/50 bg-void-800/30 mb-10 space-y-4">
          <div>
            <label className="text-xs font-medium text-void-400 mb-1 block">{t('auth.username')}</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-void-800/60 border border-void-700/50 text-void-100 focus:outline-none focus:border-signal-500/50 transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-void-400 mb-1 block">{t('auth.first_name')}</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-void-800/60 border border-void-700/50 text-void-100 focus:outline-none focus:border-signal-500/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-void-400 mb-1 block">{t('auth.last_name')}</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-void-800/60 border border-void-700/50 text-void-100 focus:outline-none focus:border-signal-500/50 transition-all"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-signal-500 text-void-950 font-bold text-sm hover:bg-signal-400 transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? t('common.loading') : t('common.save')}
          </button>
          {saveError && (
            <p className="text-sm text-red-400 mt-2">{saveError}</p>
          )}
        </div>
      )}

      {/* My Reviews */}
      <section id="reviews">
        <h2 className="text-xl font-heading font-bold text-void-50 mb-6">
          {t('user.my_reviews')}
        </h2>

        {userReviews.length === 0 ? (
          <div className="py-10 text-center border border-void-700/30 rounded-xl">
            <Star size={32} className="text-void-600 mx-auto mb-3" />
            <p className="text-sm text-void-500">You haven&apos;t written any reviews yet.</p>
            <Link
              href="/reviews"
              className="mt-3 inline-block text-sm text-signal-400 hover:text-signal-300 no-underline"
            >
              Browse tools to review
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userReviews.map((review) => (
              <div
                key={review.id}
                className="p-5 rounded-xl border border-void-700/50 bg-void-800/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <Link
                    href={`/reviews/${review.tool_slug}`}
                    className="text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline"
                  >
                    {review.tool_slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-void-600'}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-void-100 mb-1">{review.title}</h3>
                {review.body && (
                  <p className="text-sm text-void-400 line-clamp-2">{review.body}</p>
                )}
                <p className="text-xs text-void-600 mt-2">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
