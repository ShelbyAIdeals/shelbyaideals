import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/**
 * Supabase client — returns a real client when env vars are set,
 * or a null-safe stub during static builds without Supabase configured.
 */
function createSafeClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a proxy that silently no-ops all calls during static build
    // This prevents build crashes when Supabase isn't configured yet
    return new Proxy({} as SupabaseClient, {
      get: (_target, prop) => {
        if (prop === 'auth') {
          return new Proxy({}, {
            get: () => (..._args: unknown[]) => Promise.resolve({ data: { session: null, user: null, subscription: { unsubscribe: () => {} } }, error: null }),
          });
        }
        if (prop === 'from') {
          return () => ({
            select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }), order: () => Promise.resolve({ data: [], error: null }) }), order: () => Promise.resolve({ data: [], error: null }) }),
            upsert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
            insert: () => Promise.resolve({ data: null, error: null }),
            update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
            delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
          });
        }
        return () => {};
      },
    });
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createSafeClient();

/* ── Auth helpers ─────────────────────────────────────────── */

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUpWithEmail(
  email: string,
  password: string,
  metadata: { username: string; firstName: string; lastName: string }
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: metadata.username,
        first_name: metadata.firstName,
        last_name: metadata.lastName,
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/` : undefined,
    },
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

/* ── Profile helpers ──────────────────────────────────────── */

export interface UserProfile {
  id: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

export async function upsertProfile(profile: Partial<UserProfile> & { id: string }) {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* ── Review helpers ───────────────────────────────────────── */

export interface UserReview {
  id: string;
  user_id: string;
  tool_slug: string;
  rating: number;
  title: string;
  body: string | null;
  created_at: string;
  updated_at: string;
  profiles?: UserProfile;
}

export async function getReviewsForTool(toolSlug: string): Promise<UserReview[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*, profiles(username, first_name, last_name, avatar_url)')
    .eq('tool_slug', toolSlug)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function submitReview(review: {
  user_id: string;
  tool_slug: string;
  rating: number;
  title: string;
  body?: string;
}) {
  const { data, error } = await supabase
    .from('reviews')
    .upsert(
      { ...review, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,tool_slug' }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteReview(reviewId: string) {
  const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
  if (error) throw error;
}

/* ── Review vote helpers ──────────────────────────────────── */

export async function voteOnReview(userId: string, reviewId: string, helpful: boolean) {
  const { error } = await supabase
    .from('review_votes')
    .upsert(
      { user_id: userId, review_id: reviewId, helpful },
      { onConflict: 'user_id,review_id' }
    );
  if (error) throw error;
}

export async function getVotesForReview(reviewId: string) {
  const { data, error } = await supabase
    .from('review_votes')
    .select('helpful')
    .eq('review_id', reviewId);
  if (error) return { helpful: 0, unhelpful: 0 };
  const helpful = data.filter((v) => v.helpful).length;
  return { helpful, unhelpful: data.length - helpful };
}
