'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import {
  supabase,
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle as googleSignIn,
  signOut as supabaseSignOut,
  upsertProfile,
  getProfile,
  type UserProfile,
} from './supabase';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, meta: { username: string; firstName: string; lastName: string }) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    loading: true,
  });

  /* ── Load profile from Supabase ────────────────────────── */
  const loadProfile = useCallback(async (userId: string) => {
    const profile = await getProfile(userId);
    setState((prev) => ({ ...prev, profile }));
  }, []);

  /* ── Ensure profile row exists (first login) ───────────── */
  const ensureProfile = useCallback(async (user: User) => {
    const existing = await getProfile(user.id);
    if (existing) {
      setState((prev) => ({ ...prev, profile: existing }));
      return;
    }
    const meta = user.user_metadata ?? {};
    const profile = await upsertProfile({
      id: user.id,
      username: meta.username ?? meta.preferred_username ?? user.email?.split('@')[0] ?? null,
      first_name: meta.first_name ?? meta.given_name ?? null,
      last_name: meta.last_name ?? meta.family_name ?? null,
      avatar_url: meta.avatar_url ?? meta.picture ?? null,
    });
    setState((prev) => ({ ...prev, profile }));
  }, []);

  /* ── Listen for auth state changes ─────────────────────── */
  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    try {
      const result = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          const user = session?.user ?? null;
          setState((prev) => ({ ...prev, user, session, loading: false }));
          if (user) {
            await ensureProfile(user);
          } else {
            setState((prev) => ({ ...prev, profile: null }));
          }
        }
      );
      subscription = result.data.subscription;
    } catch {
      // Supabase not configured or key format incompatible — degrade gracefully
      setState((prev) => ({ ...prev, loading: false }));
    }

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      setState((prev) => ({ ...prev, user, session, loading: false }));
      if (user) ensureProfile(user);
    }).catch(() => {
      setState((prev) => ({ ...prev, loading: false }));
    });

    return () => subscription?.unsubscribe();
  }, [ensureProfile]);

  /* ── Auth actions ───────────────────────────────────────── */
  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmail(email, password);
  }, []);

  const signUp = useCallback(async (
    email: string,
    password: string,
    meta: { username: string; firstName: string; lastName: string }
  ) => {
    const { user } = await signUpWithEmail(email, password, meta);
    if (user) {
      await upsertProfile({
        id: user.id,
        username: meta.username,
        first_name: meta.firstName,
        last_name: meta.lastName,
        avatar_url: null,
      });

      // Auto-subscribe to newsletter
      try {
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            utm_source: 'shelby-ai',
            utm_medium: 'signup',
          }),
        });
      } catch {
        // Non-blocking — newsletter signup failure shouldn't break auth
      }
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await googleSignIn();
  }, []);

  const signOut = useCallback(async () => {
    await supabaseSignOut();
    setState({ user: null, profile: null, session: null, loading: false });
  }, []);

  const refreshProfile = useCallback(async () => {
    if (state.user) await loadProfile(state.user.id);
  }, [state.user, loadProfile]);

  return (
    <AuthContext.Provider
      value={{ ...state, signIn, signUp, signInWithGoogle, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
