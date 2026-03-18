'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Loader2, Download, Check } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from '@/i18n/context';

interface NewsletterSignupProps {
  variant?: 'inline' | 'section';
  className?: string;
}

export default function NewsletterSignup({
  variant = 'section',
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const benefits = [
    t('newsletter.benefit_1', 'Weekly curated AI tool picks'),
    t('newsletter.benefit_2', 'Exclusive deals and discounts'),
    t('newsletter.benefit_3', 'Real workflow tips — no fluff'),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          utm_source: 'website',
          utm_medium: 'cheatsheet_signup',
          referring_site: window.location.href,
        }),
      });
      if (!res.ok) throw new Error('Subscription failed');
    } catch {
      setError(t('newsletter.error', 'Something went wrong. Please try again.'));
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  /* ── Inline variant (compact, for use within articles) ────────── */
  if (variant === 'inline') {
    return (
      <div className={clsx('card p-6', className)}>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-signal-500/10 border border-signal-500/15 text-signal-400 flex items-center justify-center shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-void-100">
              {t('newsletter.title', 'Stay Ahead of the AI Curve')}
            </h4>
            <p className="text-xs text-void-500 mt-1 leading-relaxed">
              {t('newsletter.subtitle', 'Get the best AI tool picks, exclusive deals, and workflow tips — straight to your inbox every week.')}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-2 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-signal-500/20 flex items-center justify-center">
                <Check size={12} className="text-signal-400" />
              </div>
              <p className="text-sm font-medium text-signal-400">
                {t('newsletter.success', "You're in! Check your inbox.")}
              </p>
            </div>
            <a
              href="/ai-tool-stack-cheatsheet.html"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-300 hover:text-signal-200 transition-colors"
            >
              <Download size={14} />
              {t('newsletter.subscribe', 'Subscribe')}
            </a>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-void-700/50 bg-void-900 text-void-100 placeholder:text-void-500 focus:outline-none focus:ring-2 focus:ring-signal-500/40 focus:border-transparent"
              />
              <button type="submit" disabled={loading} className="btn-accent text-sm !px-4 !py-2 gap-1.5">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <>{t('newsletter.subscribe', 'Subscribe')} <ArrowRight size={14} /></>}
              </button>
            </form>
            {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
          </>
        )}
      </div>
    );
  }

  /* ── Section variant (two-column featured layout) ─────────────── */
  return (
    <section
      className={clsx(
        'relative overflow-hidden rounded-2xl bg-void-900/50 border border-void-700/60',
        className,
      )}
    >
      {/* Dot grid background */}
      <div className="pattern-dots absolute inset-0 pointer-events-none" />

      <div className="relative z-10 px-6 py-14 sm:px-12 sm:py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* ── Left column: headline + benefits ────────────────── */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-signal-400 mb-3 block">
              {'Free Weekly Newsletter'}
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-void-50 font-heading mb-3 leading-tight">
              {t('newsletter.title', 'Stay Ahead of the AI Curve')}
            </h2>

            <p className="text-sm text-void-400 mb-6">
              Join small business owners and creators who get our weekly AI tool picks. No sponsored content — just what works.
            </p>

            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-signal-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-signal-500" />
                  </div>
                  <span className="text-void-300 text-sm leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right column: form ──────────────────────────────── */}
          <div>
            {submitted ? (
              <div className="bg-void-800 border border-signal-500/20 rounded-xl p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-signal-500/15 flex items-center justify-center mx-auto">
                  <Check size={24} className="text-signal-400" />
                </div>
                <p className="text-lg font-semibold text-void-50">
                  {t('newsletter.success', "You're in! Check your inbox.")}
                </p>
                <a
                  href="/ai-tool-stack-cheatsheet.html"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-signal-500 text-void-950 hover:bg-signal-400 transition-colors"
                >
                  <Download size={16} />
                  {t('newsletter.subscribe', 'Subscribe')}
                </a>
              </div>
            ) : (
              <div className="bg-void-800/60 border border-void-700/50 rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-ember-500/10 border border-ember-500/15 text-ember-400 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <p className="text-sm font-medium text-void-200">
                    {t('newsletter.email_placeholder', 'Enter your email')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 text-sm rounded-lg border border-void-700/50 bg-void-900 text-void-100 placeholder:text-void-500 focus:outline-none focus:ring-2 focus:ring-ember-500/40 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-accent w-full text-sm gap-1.5"
                  >
                    {loading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <>Get Free Picks <ArrowRight size={14} /></>
                    )}
                  </button>
                </form>

                {error && <p className="text-xs text-red-400 mt-3">{error}</p>}

                <p className="text-xs text-void-500 mt-4 text-center">
                  {t('footer.no_spam', 'No spam, unsubscribe anytime.')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-signal-500/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-glow pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-ember-500/6 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
    </section>
  );
}
