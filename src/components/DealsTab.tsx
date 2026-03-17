'use client';

import { Tag } from 'lucide-react';
import Link from 'next/link';

interface Deal {
  slug: string;
  tool: string;
  tagline: string;
  dealType: string;
  dealLabel: string;
  regularPrice?: string;
  dealPrice?: string;
  affiliateUrl: string;
  category: string;
}

interface DealsTabProps {
  deals: Deal[];
}

export default function DealsTab({ deals }: DealsTabProps) {
  if (deals.length === 0) {
    return (
      <div className="text-center py-16">
        <Tag size={32} className="text-void-600 mx-auto mb-3" />
        <p className="text-sm text-void-500">No deals available right now. Check back soon.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-heading font-bold text-void-50 mb-1">Active Deals</h2>
        <p className="text-sm text-void-400">Special offers on AI tools</p>
      </div>
      <div className="flex flex-col gap-3">
        {deals.map((deal) => (
          <Link key={deal.slug} href={deal.affiliateUrl} target="_blank" rel="noopener noreferrer" className="no-underline block">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-void-700/40 bg-void-800/30 hover:border-signal-500/30 transition-all group">
              <div className="shrink-0 px-3 py-1.5 rounded-lg bg-signal-500/15 text-signal-400 text-xs font-bold uppercase">
                {deal.dealLabel}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-heading font-bold text-void-50 group-hover:text-signal-400 transition-colors">{deal.tool}</h3>
                <p className="text-xs text-void-400 line-clamp-1">{deal.tagline}</p>
              </div>
              {deal.regularPrice && deal.dealPrice && (
                <div className="shrink-0 text-right">
                  <span className="text-xs text-void-500 line-through">{deal.regularPrice}</span>
                  <span className="ml-2 text-sm font-bold text-signal-400">{deal.dealPrice}</span>
                </div>
              )}
              {!deal.dealPrice && (
                <span className="shrink-0 text-xs font-medium text-signal-400">{deal.dealType === 'free-trial' ? 'Free Trial' : deal.dealType === 'free-tier' ? 'Free Tier' : 'Discount'}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
