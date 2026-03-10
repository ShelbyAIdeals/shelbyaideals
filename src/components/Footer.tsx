'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, ArrowRight, Twitter, Linkedin } from 'lucide-react';

const categoryLinks = [
  { label: 'AI Writing Tools', href: '/categories/ai-writing-tools' },
  { label: 'AI Design & Video', href: '/categories/ai-design-tools' },
  { label: 'AI Coding Tools', href: '/categories/ai-coding-tools' },
  { label: 'AI Automation', href: '/categories/ai-automation' },
  { label: 'AI SEO Tools', href: '/categories/ai-seo-tools' },
  { label: 'AI Productivity', href: '/categories/ai-productivity' },
];

const resourceLinks = [
  { label: 'All Tools', href: '/reviews' },
  { label: 'Comparisons', href: '/comparisons' },
  { label: 'Best Of', href: '/best' },
  { label: 'Guides', href: '/guides' },
  { label: 'Alternatives', href: '/alternatives' },
  { label: 'Pricing Guides', href: '/pricing' },
  { label: 'Best For You', href: '/best-for' },
  { label: 'Submit a Tool', href: '/submit-tool' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'How We Review', href: '/how-we-review' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubscribed(true);
  };

  return (
    <footer className="relative z-[2] bg-void-950 text-void-300 overflow-hidden border-t border-void-700/80">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-accent-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="container-main py-14 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 lg:gap-14">
          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold text-accent-400 font-heading uppercase tracking-widest mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-void-300 hover:text-accent-400 no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-accent-400 font-heading uppercase tracking-widest mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-void-300 hover:text-accent-400 no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-accent-400 font-heading uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-void-300 hover:text-accent-400 no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold text-accent-400 font-heading uppercase tracking-widest mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-void-300 mb-4 leading-relaxed">
              Weekly AI tool tips and exclusive deals.
            </p>

            {subscribed ? (
              <p className="text-sm font-medium text-accent-400">
                Subscribed -- welcome aboard!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="w-full px-3 py-2 text-sm rounded-lg bg-void-900 border border-void-700/50 text-void-50 placeholder:text-void-600 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-3 py-2 text-sm font-semibold rounded-lg bg-accent-500 text-void-950 hover:bg-accent-400 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                  {!loading && <ArrowRight size={14} />}
                </button>
                {error && <p className="text-xs text-red-400">{error}</p>}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-void-800/80">
        <div className="container-main py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 no-underline group"
          >
            <div className="w-6 h-6 rounded-md bg-accent-500 flex items-center justify-center">
              <Zap size={12} className="text-void-950" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-heading font-bold text-void-50">
              Shelby<span className="text-accent-400">AI</span>Deals
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="https://x.com/shelbyaideals"
              target="_blank"
              rel="noopener noreferrer"
              className="text-void-400 hover:text-accent-400 transition-colors"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/shelby-ai-1bb38a3b6/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-void-400 hover:text-accent-400 transition-colors"
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>

          <p className="text-xs text-void-300 text-center sm:text-right leading-relaxed">
            &copy; 2026 ShelbyAIDeals &mdash; Honest AI tool reviews for creators
            and small teams.
          </p>
        </div>
      </div>
    </footer>
  );
}
