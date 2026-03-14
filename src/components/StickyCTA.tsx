'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface StickyCTAProps {
  toolName: string;
  affiliateUrl: string;
  affiliateLabel: string;
  rating: number;
}

export default function StickyCTA({ toolName, affiliateUrl, affiliateLabel, rating }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 40% of the page
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.4);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-void-700/60 bg-void-950/95 backdrop-blur-md">
      <div className="container-main py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-semibold text-void-50 truncate">
            {toolName}
          </span>
          <span className="text-xs text-signal-400 font-semibold shrink-0">
            {rating}/5
          </span>
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
            className="p-1.5 text-void-500 hover:text-void-50 transition-colors cursor-pointer"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
