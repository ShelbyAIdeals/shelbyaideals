'use client';

import { useState } from 'react';
import { Mail, Sparkles, TrendingUp, Gift, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n/context';
import ExploreMore from '@/components/ExploreMore';

export default function NewsletterPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          utm_source: 'shelby-ai',
          utm_medium: 'newsletter-page',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Subscription failed');
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-0 sm:pt-2 pb-16 sm:pb-24">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-signal-500/10 border border-signal-500/30 text-signal-400 text-sm font-medium mb-6">
          <Mail size={16} />
          {t('newsletter.free_weekly', 'Free Weekly Newsletter')}
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-void-50 leading-tight mb-6">
          {t('newsletter.stay_ahead_title', 'Stay Ahead of the')}{' '}
          <span className="text-signal-400">{t('newsletter.stay_ahead_highlight', 'AI Curve')}</span>
        </h1>

        <p className="text-lg sm:text-xl text-void-300 max-w-2xl mx-auto leading-relaxed">
          {t('newsletter.page_description', 'Get the best AI tool picks, exclusive deals, and workflow tips — straight to your inbox every week. Join thousands of creators and small teams who use AI to work smarter.')}
        </p>
      </div>

      {/* Signup form */}
      <div className="max-w-lg mx-auto mb-20">
        {status === 'success' ? (
          <div className="text-center p-8 rounded-2xl border border-signal-500/30 bg-signal-500/5">
            <div className="w-16 h-16 rounded-full bg-signal-500/20 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={28} className="text-signal-400" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-void-50 mb-2">
              {t('newsletter.youre_in', "You're in!")}
            </h2>
            <p className="text-void-300">
              {t('newsletter.success_description', 'Check your inbox for a confirmation email. Your first issue arrives this week.')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.email_placeholder', 'Enter your email')}
              required
              className="flex-1 px-5 py-4 rounded-xl bg-void-800/60 border border-void-700/50 text-void-100 placeholder-void-500 focus:outline-none focus:border-signal-500/50 focus:ring-1 focus:ring-signal-500/30 transition-all text-base"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 rounded-xl bg-signal-500 text-void-950 font-bold text-base hover:bg-signal-400 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
            >
              {status === 'loading' ? t('newsletter.subscribing', 'Subscribing...') : t('newsletter.subscribe', 'Subscribe')}
              {status !== 'loading' && <ArrowRight size={18} />}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-sm text-red-400 text-center">{errorMsg}</p>
        )}

        <p className="text-xs text-void-600 text-center mt-3">
          {t('newsletter.no_spam_disclaimer', 'No spam, unsubscribe anytime. We respect your inbox.')}
        </p>
      </div>

      {/* What You'll Get */}
      <div className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-void-50 text-center mb-10">
          {t('newsletter.what_you_get', "What You'll Get")}
        </h2>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-void-700/50 bg-void-800/30 text-center">
            <div className="w-12 h-12 rounded-xl bg-signal-500/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={24} className="text-signal-400" />
            </div>
            <h3 className="text-base font-semibold text-void-100 mb-2">
              {t('newsletter.weekly_picks_title', 'Weekly AI Tool Picks')}
            </h3>
            <p className="text-sm text-void-400 leading-relaxed">
              {t('newsletter.weekly_picks_desc', "Hand-picked AI tools we've actually tested. No fluff, no sponsored picks — just what works.")}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-void-700/50 bg-void-800/30 text-center">
            <div className="w-12 h-12 rounded-xl bg-ember-500/10 flex items-center justify-center mx-auto mb-4">
              <Gift size={24} className="text-ember-400" />
            </div>
            <h3 className="text-base font-semibold text-void-100 mb-2">
              {t('newsletter.exclusive_deals_title', 'Exclusive Deals')}
            </h3>
            <p className="text-sm text-void-400 leading-relaxed">
              {t('newsletter.exclusive_deals_desc', 'Get discounts and extended trials that we negotiate directly with AI tool companies.')}
            </p>
          </div>

          <div className="p-6 rounded-xl border border-void-700/50 bg-void-800/30 text-center">
            <div className="w-12 h-12 rounded-xl bg-iris-500/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={24} className="text-iris-400" />
            </div>
            <h3 className="text-base font-semibold text-void-100 mb-2">
              {t('newsletter.workflow_tips_title', 'Workflow Tips')}
            </h3>
            <p className="text-sm text-void-400 leading-relaxed">
              {t('newsletter.workflow_tips_desc', 'Real workflows from real users. Learn how others use AI to save hours every week.')}
            </p>
          </div>
        </div>
      </div>

      {/* Archive link */}
      <div className="text-center">
        <a
          href="https://shelbyaideals.beehiiv.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-signal-400 hover:text-signal-300 font-medium transition-colors"
        >
          {t('newsletter.archive', 'Browse Newsletter Archive')}
          <ArrowRight size={16} />
        </a>
      </div>

      <ExploreMore variant="static" />
    </main>
  );
}
