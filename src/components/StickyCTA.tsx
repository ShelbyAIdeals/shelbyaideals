'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface StickyCTAProps {
  toolName: string;
  affiliateUrl: string;
  affiliateLabel: string;
  rating?: number;
}

export default function StickyCTA({ toolName, affiliateUrl, affiliateLabel, rating }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 30% — GA shows ~90% bounce on key pages, so surface the
      // affiliate CTA earlier to capture intent before visitors leave.
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CookieConsent renders its own `fixed bottom-0 ... z-50` bar app-wide and
  // collides with this one at equal z-index. We can't edit CookieConsent.tsx,
  // so mirror the same signal it uses (the `cookie-consent` localStorage key
  // plus its own 1.5s reveal delay) to know when its banner is on screen and
  // offset ourselves above it. `storage` events don't fire in the same tab,
  // so poll for the moment the visitor accepts/declines there.
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      setCookieBannerVisible(false);
      return;
    }
    const showTimer = setTimeout(() => setCookieBannerVisible(true), 1500);
    const pollInterval = setInterval(() => {
      if (localStorage.getItem('cookie-consent')) {
        setCookieBannerVisible(false);
        clearInterval(pollInterval);
      }
    }, 400);
    return () => {
      clearTimeout(showTimer);
      clearInterval(pollInterval);
    };
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div
      className={`fixed left-0 right-0 z-40 border-t border-void-700/60 bg-void-950/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] transition-[bottom] duration-200 ${
        cookieBannerVisible ? 'bottom-28 sm:bottom-24' : 'bottom-0'
      }`}
    >
      <div className="container-main py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-semibold text-void-50 truncate">
            {toolName}
          </span>
          {typeof rating === 'number' && (
            <span className="text-xs text-signal-400 font-semibold shrink-0">
              {rating}/5
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="btn-accent text-sm !py-2 !px-4 gap-1.5"
          >
            {affiliateLabel} <ArrowRight size={14} />
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="min-w-11 min-h-11 flex items-center justify-center text-void-500 hover:text-void-50 transition-colors cursor-pointer"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
