'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { User, Star, Calendar, ArrowLeft, LogOut, Camera, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { supabase, uploadAvatar, deleteAccount, getUserPreferences, type UserReview, type UserPreferences } from '@/lib/supabase';
import { useTranslation } from '@/i18n/context';
import RecommendationsTab from '@/components/RecommendationsTab';
import FavoritesTab from '@/components/FavoritesTab';
import DealsTab from '@/components/DealsTab';
import { deals as allDeals } from '@/lib/deals-data';

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, refreshProfile, signOut } = useAuth();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'profile' | 'favorites' | 'recommendations' | 'deals'>('profile');
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [hasUnseenRecs, setHasUnseenRecs] = useState(false);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', firstName: '', lastName: '' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [uploading, setUploading] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) router.push('/');
  }, [authLoading, user, router]);

  // Load user data
  useEffect(() => {
    if (!user) return;
    supabase
      .from('reviews')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setUserReviews(data); });

    getUserPreferences(user.id).then((prefs) => {
      setPreferences(prefs);
      if (prefs && !prefs.recommendations_seen_at) setHasUnseenRecs(true);
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
      // Use fetch directly — Supabase JS client hangs on some operations
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token || supabaseKey;

      const res = await fetch(
        `${supabaseUrl}/rest/v1/profiles?id=eq.${user.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseKey || '',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: formData.username.trim(),
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
          }),
        }
      );
      if (!res.ok) {
        const body = await res.text();
        setSaveError(`Save failed: ${body}`);
        setSaving(false);
        return;
      }
      refreshProfile();
      setEditing(false);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save profile');
    }
    setSaving(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 2 * 1024 * 1024) { setSaveError('Image must be under 2MB'); return; }
    if (!file.type.startsWith('image/')) { setSaveError('Please select an image file'); return; }
    setUploading(true);
    setSaveError('');
    try {
      await uploadAvatar(user.id, file);
      await refreshProfile();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Upload failed');
    }
    setUploading(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteAccount();
      router.push('/');
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Delete failed');
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleSignOut = () => {
    // Force clear all auth state locally — don't wait for Supabase
    try {
      // Clear Supabase session from localStorage
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith('sb-') || key.includes('supabase')) {
          localStorage.removeItem(key);
        }
      }
      // Fire and forget the server signout
      supabase.auth.signOut().catch(() => {});
    } catch {
      // Ignore errors
    }
    // Hard navigate — forces full page reload with cleared state
    window.location.href = '/';
  };

  const handleRecsSeen = useCallback(() => setHasUnseenRecs(false), []);

  if (authLoading || !user) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="animate-pulse text-center text-void-500">{t('common.loading')}</div>
      </main>
    );
  }

  const displayName = profile?.username || profile?.first_name || user.email?.split('@')[0] || 'User';
  const initials = (profile?.first_name?.[0] ?? '') + (profile?.last_name?.[0] ?? '');
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-void-400 hover:text-signal-400 mb-8 no-underline transition-colors">
        <ArrowLeft size={14} />
        {t('common.back')}
      </Link>

      {/* Profile header */}
      <div className="flex items-start gap-5 mb-8">
        {/* Avatar with upload overlay */}
        <div className="relative group cursor-pointer shrink-0" onClick={() => fileInputRef.current?.click()}>
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt={displayName} className="w-20 h-20 rounded-full object-cover border-2 border-void-600/50" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-signal-500/15 border-2 border-signal-500/30 flex items-center justify-center text-2xl font-bold text-signal-400">
              {initials || <User size={32} />}
            </div>
          )}
          <div className="absolute inset-0 rounded-full bg-void-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {uploading ? (
              <div className="w-5 h-5 border-2 border-void-100 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Camera size={20} className="text-void-100" />
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-heading font-bold text-void-50">{displayName}</h1>
          {profile?.first_name && profile?.last_name && (
            <p className="text-void-400 text-sm">{profile.first_name} {profile.last_name}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-xs text-void-500">
            <span className="flex items-center gap-1"><Calendar size={12} /> Joined {joinDate}</span>
            <span className="flex items-center gap-1"><Star size={12} /> {userReviews.length} review{userReviews.length !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setEditing(!editing)} className="px-4 py-2 text-sm font-medium border border-void-600/50 rounded-lg text-void-300 hover:text-void-100 hover:bg-void-700/40 transition-all cursor-pointer">
            {editing ? t('common.cancel') : 'Edit Profile'}
          </button>
          <button onClick={handleSignOut} className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      {saveError && <p className="text-sm text-red-400 mb-4">{saveError}</p>}

      {/* Edit form */}
      {editing && (
        <div className="p-6 rounded-xl border border-void-700/50 bg-void-800/30 mb-8 space-y-4">
          <div>
            <label className="text-xs font-medium text-void-400 mb-1 block">{t('auth.username')}</label>
            <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-void-800/60 border border-void-700/50 text-void-100 focus:outline-none focus:border-signal-500/50 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-void-400 mb-1 block">{t('auth.first_name')}</label>
              <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-void-800/60 border border-void-700/50 text-void-100 focus:outline-none focus:border-signal-500/50 transition-all" />
            </div>
            <div>
              <label className="text-xs font-medium text-void-400 mb-1 block">{t('auth.last_name')}</label>
              <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-void-800/60 border border-void-700/50 text-void-100 focus:outline-none focus:border-signal-500/50 transition-all" />
            </div>
          </div>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 rounded-lg bg-signal-500 text-void-950 font-bold text-sm hover:bg-signal-400 transition-all cursor-pointer disabled:opacity-50">
            {saving ? t('common.loading') : t('common.save')}
          </button>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex gap-1 p-1 rounded-xl bg-void-800/40 border border-void-700/30 mb-8 overflow-x-auto scrollbar-hide">
        {(['profile', 'favorites', 'recommendations', 'deals'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeTab === tab ? 'bg-signal-500/15 text-signal-400' : 'text-void-400 hover:text-void-200'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'recommendations' && hasUnseenRecs && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'profile' && (
        <>
          <section id="reviews" className="mb-12">
            <h2 className="text-xl font-heading font-bold text-void-50 mb-6">{t('user.my_reviews')}</h2>
            {userReviews.length === 0 ? (
              <div className="py-10 text-center border border-void-700/30 rounded-xl">
                <Star size={32} className="text-void-600 mx-auto mb-3" />
                <p className="text-sm text-void-500">You haven&apos;t written any reviews yet.</p>
                <Link href="/reviews" className="mt-3 inline-block text-sm text-signal-400 hover:text-signal-300 no-underline">Browse tools to review</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userReviews.map((review) => (
                  <div key={review.id} className="p-5 rounded-xl border border-void-700/50 bg-void-800/30">
                    <div className="flex items-center justify-between mb-2">
                      <Link href={`/reviews/${review.tool_slug}`} className="text-sm font-semibold text-signal-400 hover:text-signal-300 no-underline">
                        {review.tool_slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      </Link>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={12} className={star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-void-600'} />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-void-100 mb-1">{review.title}</h3>
                    {review.body && <p className="text-sm text-void-400 line-clamp-2">{review.body}</p>}
                    <p className="text-xs text-void-600 mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
          <section className="pt-8 border-t border-void-700/30">
            <h3 className="text-sm font-semibold text-red-400 mb-2">Danger Zone</h3>
            <p className="text-xs text-void-500 mb-4">Once you delete your account, there is no going back.</p>
            <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/10 transition-all cursor-pointer">
              <Trash2 size={14} /> Delete Account
            </button>
          </section>
        </>
      )}
      {activeTab === 'favorites' && <FavoritesTab userId={user.id} />}
      {activeTab === 'recommendations' && <RecommendationsTab userId={user.id} preferences={preferences} onSeen={handleRecsSeen} />}
      {activeTab === 'deals' && <DealsTab deals={allDeals} />}

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-void-950/80 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative max-w-sm w-full p-6 rounded-2xl bg-void-900 border border-void-700/50 shadow-2xl">
            <h3 className="text-lg font-heading font-bold text-void-50 mb-2">Delete Account</h3>
            <p className="text-sm text-void-400 mb-6">This will permanently delete your account, reviews, and all data. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 text-sm font-medium rounded-lg border border-void-600/50 text-void-300 hover:bg-void-700/40 transition-all cursor-pointer">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="flex-1 py-2.5 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-all cursor-pointer">
                {deleting ? 'Deleting...' : 'Delete Forever'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
