'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, ArrowRight, Twitter, Linkedin, Check, Send } from 'lucide-react';
import { useTranslation } from '@/i18n/context';

/* ------------------------------------------------------------------ */
/*  Link data                                                          */
/* ------------------------------------------------------------------ */

const categoryLinks = [
  { labelKey: 'footer.cat_ai_video', fallback: 'AI Video & Audio', href: '/categories/ai-video-audio' },
  { labelKey: 'footer.cat_ai_marketing', fallback: 'AI Marketing & SEO', href: '/categories/ai-marketing-seo' },
  { labelKey: 'footer.cat_ai_content', fallback: 'AI Content & Productivity', href: '/categories/ai-content-productivity' },
];

const resourceLinks = [
  { labelKey: 'footer.res_all_tools', fallback: 'All Tools', href: '/reviews' },
  { labelKey: 'footer.res_comparisons', fallback: 'Comparisons', href: '/comparisons' },
  { labelKey: 'footer.res_best_of', fallback: 'Best Of', href: '/best' },
  { labelKey: 'footer.res_guides', fallback: 'Guides', href: '/guides' },
  { labelKey: 'footer.res_alternatives', fallback: 'Alternatives', href: '/alternatives' },
  { labelKey: 'footer.res_pricing', fallback: 'Pricing Guides', href: '/pricing' },
  { labelKey: 'footer.res_best_for', fallback: 'Best For You', href: '/best-for' },
];

const companyLinks = [
  { labelKey: 'footer.comp_about', fallback: 'About', href: '/about' },
  { labelKey: 'footer.comp_faq', fallback: 'FAQ', href: '/faq' },
  { labelKey: 'footer.comp_contact', fallback: 'Contact', href: '/contact' },
  { labelKey: 'footer.comp_how_we_review', fallback: 'How We Review', href: '/how-we-review' },
  { labelKey: 'footer.comp_affiliate', fallback: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
];

const PinterestIcon = ({ size = 14, className = '' }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className}>
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

const connectLinks = [
  {
    labelKey: 'footer.social_twitter',
    fallback: 'X / Twitter',
    href: 'https://x.com/shelbyaideals',
    external: true,
    icon: Twitter,
  },
  {
    labelKey: 'footer.social_linkedin',
    fallback: 'LinkedIn',
    href: 'https://www.linkedin.com/in/shelby-ai-1bb38a3b6/',
    external: true,
    icon: Linkedin,
  },
  {
    labelKey: 'footer.social_pinterest',
    fallback: 'Pinterest',
    href: 'https://pinterest.com/shelbyaideals',
    external: true,
    icon: PinterestIcon,
  },
  {
    labelKey: 'footer.submit_tool',
    fallback: 'Submit a Tool',
    href: '/submit-tool',
    external: false,
    icon: Send,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const benefits = [
    t('newsletter.benefit_1', 'One tested AI tool recommendation per week'),
    t('newsletter.benefit_2', 'Early access to new reviews and comparisons'),
    t('newsletter.benefit_3', 'Practical workflow tips — zero fluff'),
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
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
          utm_medium: 'footer_signup',
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
    setSubscribed(true);
  };

  return (
    <footer className="relative z-[2] bg-void-950 text-void-300 overflow-hidden">
      {/* ── Background glow blob ── */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-signal-500/4 rounded-full blur-3xl pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════
          TOP BANNER — Newsletter CTA
      ══════════════════════════════════════════════════════════════ */}
      <div className="relative border-b border-void-800/60 bg-gradient-to-b from-void-900 via-void-950 to-void-950">
        {/* Dot grid overlay */}
        <div className="pattern-dots absolute inset-0 opacity-40 pointer-events-none" />

        <div className="container-main relative py-14 sm:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16">
            {/* Left — headline + benefits */}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-void-50 mb-5">
                {t('footer.stay_ahead', 'Get the Best AI Tools in Your Inbox')}
              </h3>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm text-void-300">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-signal-500/15 flex items-center justify-center">
                      <Check size={12} className="text-signal-400" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — form */}
            <div className="w-full lg:w-[380px] flex-shrink-0">
              {subscribed ? (
                <div className="rounded-xl border border-signal-500/20 bg-signal-500/5 p-6 text-center">
                  <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-signal-500/15 flex items-center justify-center">
                    <Check size={20} className="text-signal-400" strokeWidth={2.5} />
                  </div>
                  <p className="text-base font-semibold text-signal-400 mb-1">
                    {t('newsletter.success', "You're in! Check your inbox.")}
                  </p>
                  <p className="text-sm text-void-400">
                    {t('footer.check_inbox', 'Check your inbox for the first edition.')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('newsletter.email_placeholder', 'Enter your email')}
                      required
                      className="flex-1 min-w-0 px-4 py-3 text-sm rounded-lg bg-void-900 border border-void-700/50 text-void-50 placeholder:text-void-600 focus:outline-none focus:ring-2 focus:ring-signal-500/40 focus:border-transparent transition-shadow"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-signal-500 to-signal-400 text-void-950 hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {loading ? (
                        t('footer.sending', 'Sending...')
                      ) : (
                        <>
                          {t('footer.get_free_picks', 'Get Weekly AI Picks')}
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                  {error && <p className="text-xs text-red-400">{error}</p>}
                  <p className="text-xs text-void-500">
                    {t('footer.no_spam', 'Free forever. Unsubscribe anytime. No spam.')}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MIDDLE — Link Grid
      ══════════════════════════════════════════════════════════════ */}
      <div className="container-main py-14 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-14">
          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-signal-400 font-heading uppercase tracking-widest mb-4">
              {t('footer.categories', 'Categories')}
            </h4>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-void-400 hover:text-signal-400 no-underline transition-colors"
                  >
                    {t(link.labelKey, link.fallback)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold text-signal-400 font-heading uppercase tracking-widest mb-4">
              {t('footer.resources', 'Resources')}
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-void-400 hover:text-signal-400 no-underline transition-colors"
                  >
                    {t(link.labelKey, link.fallback)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-signal-400 font-heading uppercase tracking-widest mb-4">
              {t('footer.company', 'Company')}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-void-400 hover:text-signal-400 no-underline transition-colors"
                  >
                    {t(link.labelKey, link.fallback)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold text-signal-400 font-heading uppercase tracking-widest mb-4">
              {t('footer.connect', 'Connect')}
            </h4>
            <ul className="space-y-2.5">
              {connectLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-void-400 hover:text-signal-400 no-underline transition-colors"
                        aria-label={t(link.labelKey, link.fallback)}
                      >
                        <Icon size={14} className="flex-shrink-0" />
                        {t(link.labelKey, link.fallback)}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 text-sm text-void-400 hover:text-signal-400 no-underline transition-colors"
                      >
                        <Icon size={14} className="flex-shrink-0" />
                        {t(link.labelKey, link.fallback)}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════════════════════════════ */}
      <div className="border-t border-void-800/60">
        <div className="container-main py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline group flex-shrink-0">
            <div className="w-6 h-6 rounded-md bg-signal-500 flex items-center justify-center">
              <Zap size={12} className="text-void-950" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-heading font-bold text-void-50">
              Shelby<span className="text-signal-400">AI</span>Deals
            </span>
          </Link>

          {/* Copyright + legal links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1 text-xs text-void-500">
            <span>&copy; {new Date().getFullYear()} ShelbyAIDeals</span>
            <span className="hidden sm:inline text-void-700">|</span>
            <Link
              href="/terms-of-service"
              className="hover:text-void-300 no-underline transition-colors"
            >
              {t('footer.terms', 'Terms')}
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-void-300 no-underline transition-colors"
            >
              {t('footer.privacy', 'Privacy')}
            </Link>
            <Link
              href="/affiliate-disclosure"
              className="hover:text-void-300 no-underline transition-colors"
            >
              {t('footer.affiliate_disclosure', 'Affiliate Disclosure')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
