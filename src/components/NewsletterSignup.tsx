'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Loader2, Download } from 'lucide-react';
import clsx from 'clsx';

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
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (variant === 'inline') {
    return (
      <div className={clsx('card p-6', className)}>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-accent-500/10 border border-accent-500/15 text-accent-400 flex items-center justify-center shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-void-100">
              Get the Free AI Tool Stack Cheatsheet
            </h4>
            <p className="text-xs text-void-500 mt-1 leading-relaxed">
              Get curated AI tool recommendations and exclusive deals weekly.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="py-2 space-y-2">
            <p className="text-sm font-medium text-accent-400">
              You're in! Here's your cheatsheet:
            </p>
            <a
              href="/ai-tool-stack-cheatsheet.html"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300 hover:text-accent-200 transition-colors"
            >
              <Download size={14} />
              Download Cheatsheet
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
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-void-700/50 bg-void-900 text-void-100 placeholder:text-void-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-transparent"
              />
              <button type="submit" disabled={loading} className="btn-primary text-sm !px-4 !py-2 gap-1.5">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <>Download Free <ArrowRight size={14} /></>}
              </button>
            </form>
            {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
          </>
        )}
      </div>
    );
  }

  // Section variant
  return (
    <section
      className={clsx(
        'relative overflow-hidden rounded-2xl bg-void-900 border border-void-700/60',
        className,
      )}
    >
      <div className="relative z-10 px-6 py-14 sm:px-12 sm:py-16">
        <div className="max-w-xl mx-auto text-center">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/15 text-accent-400 flex items-center justify-center mx-auto mb-5">
            <Mail size={24} />
          </div>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-bold text-void-50 font-heading mb-3">
            Get the Free AI Tool Stack Cheatsheet
          </h2>

          {/* Description */}
          <p className="text-void-400 leading-relaxed mb-8 max-w-md mx-auto">
            Get our curated AI tool recommendations,
            workflow tips, and exclusive deals. Delivered weekly.
          </p>

          {/* Form */}
          {submitted ? (
            <div className="bg-void-800 border border-accent-500/20 rounded-xl p-6 max-w-md mx-auto space-y-3">
              <p className="text-base font-semibold text-accent-400">
                You're in! Here's your cheatsheet:
              </p>
              <a
                href="/ai-tool-stack-cheatsheet.html"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-accent-500 text-void-950 hover:bg-accent-400 transition-colors"
              >
                <Download size={16} />
                Download Cheatsheet
              </a>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="bg-void-800 border border-void-700/50 rounded-xl p-2 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 text-sm rounded-lg border border-void-700/50 bg-void-900 text-void-100 placeholder:text-void-500 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-transparent"
                />
                <button type="submit" disabled={loading} className="btn-primary text-sm whitespace-nowrap gap-1.5">
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <>Download Free <ArrowRight size={14} /></>}
                </button>
              </form>
              {error && <p className="text-xs text-red-400 mt-3">{error}</p>}
            </>
          )}

          {/* Trust note */}
          <p className="text-xs text-void-500 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-glow" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/6 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
    </section>
  );
}
