'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface InlineNewsletterCTAProps {
  className?: string;
}

export default function InlineNewsletterCTA({ className }: InlineNewsletterCTAProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
          utm_medium: 'inline_article_cta',
          referring_site: window.location.href,
        }),
      });
      if (!res.ok) throw new Error('Subscription failed');
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div
      className={clsx(
        'relative my-10 rounded-xl border border-accent-500/20 bg-void-900 p-6 sm:p-8 overflow-hidden',
        className,
      )}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent-500/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-accent-500/10 border border-accent-500/15 text-accent-400 flex items-center justify-center shrink-0">
            <Mail size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-void-50 font-heading">
              Get weekly AI tool picks
            </h3>
            <p className="text-sm text-void-400 mt-0.5">
              Curated recommendations, workflow tips, and exclusive deals. No spam.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="mt-4 bg-void-800 border border-accent-500/20 rounded-lg p-4">
            <p className="text-sm font-semibold text-accent-400">
              You are in! Check your inbox for this week's picks.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-void-700/50 bg-void-950 text-void-100 placeholder:text-void-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-sm !px-5 !py-2.5 gap-1.5 whitespace-nowrap"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>
                    Subscribe <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
            {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
