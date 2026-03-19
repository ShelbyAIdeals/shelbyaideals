'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, CheckCircle, Mail } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useTranslation } from '@/i18n/context';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

type ModalMode = 'login' | 'signup' | 'forgot' | 'signup-success' | 'reset-sent';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const [mode, setMode] = useState<ModalMode>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Reset state on open/close
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
      setLoading(false);
    }
  }, [isOpen, initialMode]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setUsername('');
    setFirstName('');
    setLastName('');
    setError('');
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
      onClose();
      resetForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('Invalid login credentials') || msg.includes('Email not confirmed')) {
        setError('Invalid credentials. If you just signed up, check your email and confirm your account first.');
      } else {
        setError(msg || t('auth.error.invalid_credentials', 'Invalid email or password'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError(t('auth.error.weak_password', 'Password must be at least 6 characters'));
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signUp(email, password, { username, firstName, lastName });
      setMode('signup-success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('already registered')) {
        setError(t('auth.error.email_taken', 'This email is already registered'));
      } else if (msg.includes('username')) {
        setError(t('auth.error.username_taken', 'This username is already taken'));
      } else {
        setError(msg || t('auth.error.generic', 'Something went wrong. Please try again.'));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await resetPassword(email);
      setMode('reset-sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.error.generic', 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.error.generic', 'Something went wrong. Please try again.'));
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Success states
  if (mode === 'signup-success') {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-void-950/80 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-md bg-void-900 border border-void-700/50 rounded-2xl shadow-2xl animate-[fadeInUp_0.2s_ease-out] p-8 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-void-400 hover:text-void-200 hover:bg-void-700/40 transition-colors cursor-pointer" aria-label="Close">
            <X size={18} />
          </button>
          <div className="w-14 h-14 rounded-full bg-signal-500/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-signal-400" />
          </div>
          <h2 className="text-xl font-heading font-bold text-void-50 mb-2">Account Created</h2>
          <p className="text-sm text-void-400 mb-6">
            Check your email to confirm your account, then come back to sign in. If you don&apos;t see it, check your spam folder.
          </p>
          <button
            onClick={() => { setMode('login'); resetForm(); }}
            className="w-full px-4 py-3 rounded-xl bg-signal-500 text-void-950 font-bold text-sm hover:bg-signal-400 transition-all cursor-pointer"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'reset-sent') {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-void-950/80 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-md bg-void-900 border border-void-700/50 rounded-2xl shadow-2xl animate-[fadeInUp_0.2s_ease-out] p-8 text-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-void-400 hover:text-void-200 hover:bg-void-700/40 transition-colors cursor-pointer" aria-label="Close">
            <X size={18} />
          </button>
          <div className="w-14 h-14 rounded-full bg-signal-500/10 flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-signal-400" />
          </div>
          <h2 className="text-xl font-heading font-bold text-void-50 mb-2">Check Your Email</h2>
          <p className="text-sm text-void-400 mb-6">
            We sent a password reset link to <span className="text-void-200 font-medium">{email}</span>. Click the link in the email to set a new password.
          </p>
          <button
            onClick={() => { setMode('login'); resetForm(); }}
            className="w-full px-4 py-3 rounded-xl bg-signal-500 text-void-950 font-bold text-sm hover:bg-signal-400 transition-all cursor-pointer"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void-950/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-void-900 border border-void-700/50 rounded-2xl shadow-2xl animate-[fadeInUp_0.2s_ease-out]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-void-400 hover:text-void-200 hover:bg-void-700/40 transition-colors cursor-pointer"
          aria-label={t('common.close', 'Close')}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-2xl font-heading font-bold text-void-50">
            {mode === 'login' && t('auth.sign_in', 'Sign In')}
            {mode === 'signup' && t('auth.sign_up', 'Sign Up')}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-sm text-void-400 mt-1">
            {mode === 'login' && (
              <>
                {t('auth.dont_have_account', "Don't have an account?")}{' '}
                <button
                  onClick={() => { setMode('signup'); setError(''); }}
                  className="text-signal-400 hover:text-signal-300 font-medium transition-colors cursor-pointer"
                >
                  {t('auth.sign_up', 'Sign Up')}
                </button>
              </>
            )}
            {mode === 'signup' && (
              <>
                {t('auth.already_have_account', 'Already have an account?')}{' '}
                <button
                  onClick={() => { setMode('login'); setError(''); }}
                  className="text-signal-400 hover:text-signal-300 font-medium transition-colors cursor-pointer"
                >
                  {t('auth.sign_in', 'Sign In')}
                </button>
              </>
            )}
            {mode === 'forgot' && (
              <>
                Remember your password?{' '}
                <button
                  onClick={() => { setMode('login'); setError(''); }}
                  className="text-signal-400 hover:text-signal-300 font-medium transition-colors cursor-pointer"
                >
                  {t('auth.sign_in', 'Sign In')}
                </button>
              </>
            )}
          </p>
        </div>

        {/* Google OAuth — not shown for forgot password */}
        {mode !== 'forgot' && (
          <>
            <div className="px-8 pb-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-void-600/50 bg-void-800/60 text-void-100 font-medium hover:bg-void-700/60 hover:border-void-500/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {mode === 'login' ? t('auth.sign_in_google', 'Sign in with Google') : t('auth.sign_up_google', 'Sign up with Google')}
              </button>
            </div>

            <div className="px-8 pb-4 flex items-center gap-4">
              <div className="flex-1 h-px bg-void-700/50" />
              <span className="text-xs text-void-500 font-medium">{t('auth.or_continue_with', 'Or continue with')}</span>
              <div className="flex-1 h-px bg-void-700/50" />
            </div>
          </>
        )}

        {/* Form */}
        <form
          onSubmit={mode === 'forgot' ? handleForgotPassword : mode === 'login' ? handleSignIn : handleSignUp}
          className="px-8 pb-8"
        >
          <div className="space-y-3">
            {/* Sign Up extra fields */}
            {mode === 'signup' && (
              <>
                <input
                  type="text"
                  placeholder={t('auth.username', 'Username')}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  maxLength={30}
                  className="w-full px-4 py-3 rounded-xl bg-void-800/60 border border-void-700/50 text-void-100 placeholder-void-500 focus:outline-none focus:border-signal-500/50 focus:ring-1 focus:ring-signal-500/30 transition-all"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder={t('auth.first_name', 'First Name')}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-void-800/60 border border-void-700/50 text-void-100 placeholder-void-500 focus:outline-none focus:border-signal-500/50 focus:ring-1 focus:ring-signal-500/30 transition-all"
                  />
                  <input
                    type="text"
                    placeholder={t('auth.last_name', 'Last Name')}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-void-800/60 border border-void-700/50 text-void-100 placeholder-void-500 focus:outline-none focus:border-signal-500/50 focus:ring-1 focus:ring-signal-500/30 transition-all"
                  />
                </div>
              </>
            )}

            {/* Email */}
            <input
              type="email"
              placeholder={t('auth.email', 'Email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-void-800/60 border border-void-700/50 text-void-100 placeholder-void-500 focus:outline-none focus:border-signal-500/50 focus:ring-1 focus:ring-signal-500/30 transition-all"
            />

            {/* Password — not shown for forgot */}
            {mode !== 'forgot' && (
              <input
                type="password"
                placeholder={t('auth.password', 'Password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl bg-void-800/60 border border-void-700/50 text-void-100 placeholder-void-500 focus:outline-none focus:border-signal-500/50 focus:ring-1 focus:ring-signal-500/30 transition-all"
              />
            )}
          </div>

          {/* Forgot password link */}
          {mode === 'login' && (
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={() => { setMode('forgot'); setError(''); }}
                className="text-xs text-void-500 hover:text-signal-400 transition-colors cursor-pointer"
              >
                {t('auth.forgot_password', 'Forgot password?')}
              </button>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-3 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 px-4 py-3 rounded-xl bg-signal-500 text-void-950 font-bold text-sm hover:bg-signal-400 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mode === 'forgot' && (loading ? 'Sending...' : 'Send Reset Link')}
            {mode === 'login' && (loading ? t('auth.signing_in', 'Signing in...') : t('auth.sign_in', 'Sign In'))}
            {mode === 'signup' && (loading ? t('auth.creating_account', 'Creating account...') : t('auth.sign_up', 'Sign Up'))}
          </button>
        </form>
      </div>
    </div>
  );
}
