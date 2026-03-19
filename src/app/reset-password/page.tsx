'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'loading' | 'ready' | 'submitting' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    // Supabase automatically picks up the recovery tokens from the URL hash
    // when onAuthStateChange fires with PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setStatus('ready');
      }
    });

    // Also check if user is already authenticated (tokens already processed)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setStatus('ready');
      } else {
        // Give Supabase a moment to process the hash tokens
        setTimeout(() => {
          setStatus((prev) => prev === 'loading' ? 'ready' : prev);
        }, 2000);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setStatus('submitting');

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password.');
      setStatus('ready');
    }
  };

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {status === 'success' ? (
          <div className="text-center p-8 rounded-2xl border border-signal-500/30 bg-signal-500/5">
            <div className="w-14 h-14 rounded-full bg-signal-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-signal-400" />
            </div>
            <h1 className="text-xl font-heading font-bold text-void-50 mb-2">Password Updated</h1>
            <p className="text-sm text-void-400 mb-6">
              Your password has been successfully changed. You can now sign in with your new password.
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 rounded-xl bg-signal-500 text-void-950 font-bold text-sm hover:bg-signal-400 transition-all no-underline"
            >
              Go to Homepage
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-void-700/50 bg-void-900 p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-signal-500/10 flex items-center justify-center mx-auto mb-4">
                <Lock size={28} className="text-signal-400" />
              </div>
              <h1 className="text-xl font-heading font-bold text-void-50 mb-1">Set New Password</h1>
              <p className="text-sm text-void-400">
                Enter your new password below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-void-800/60 border border-void-700/50 text-void-100 placeholder-void-500 focus:outline-none focus:border-signal-500/50 focus:ring-1 focus:ring-signal-500/30 transition-all"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-void-800/60 border border-void-700/50 text-void-100 placeholder-void-500 focus:outline-none focus:border-signal-500/50 focus:ring-1 focus:ring-signal-500/30 transition-all"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'loading'}
                className="w-full px-4 py-3 rounded-xl bg-signal-500 text-void-950 font-bold text-sm hover:bg-signal-400 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
