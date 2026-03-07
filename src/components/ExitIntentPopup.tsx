'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, Zap } from 'lucide-react';

const BEEHIIV_PUBLICATION_ID = process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID || '';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const show = useCallback(() => {
    if (typeof window === 'undefined') return;
    const dismissed = sessionStorage.getItem('exitPopupDismissed');
    if (dismissed) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };

    // Only trigger on desktop
    if (window.innerWidth >= 1024) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [show]);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('exitPopupDismissed', '1');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    if (BEEHIIV_PUBLICATION_ID) {
      try {
        const res = await fetch(
          `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              utm_source: 'website',
              utm_medium: 'exit_intent_popup',
            }),
          }
        );
        if (!res.ok) throw new Error('Failed');
      } catch {
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setSubscribed(true);
    setTimeout(() => dismiss(), 2500);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void-950/80 backdrop-blur-sm" onClick={dismiss} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-void-900 border border-void-700/60 rounded-2xl p-8 shadow-2xl">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-void-500 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-accent-500 flex items-center justify-center mx-auto mb-4">
            <Zap size={24} className="text-void-950" strokeWidth={2.5} />
          </div>

          <h3 className="text-xl font-heading font-bold text-white mb-2">
            Wait — grab this before you go
          </h3>
          <p className="text-sm text-void-300 mb-6 leading-relaxed">
            Get our weekly AI tool picks and exclusive deals. Join 1,000+ creators who stay ahead.
          </p>

          {subscribed ? (
            <p className="text-accent-400 font-semibold">
              You're in! Check your inbox.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full px-4 py-3 text-sm rounded-lg bg-void-800 border border-void-700/50 text-white placeholder:text-void-600 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 text-sm font-semibold rounded-lg bg-accent-500 text-void-950 hover:bg-accent-400 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Get Weekly AI Picks'}
                {!loading && <ArrowRight size={14} />}
              </button>
              <p className="text-xs text-void-600">No spam. Unsubscribe anytime.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
