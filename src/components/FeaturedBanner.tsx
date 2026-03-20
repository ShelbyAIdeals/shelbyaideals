'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FeaturedBannerProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaExternal?: boolean;
  badge?: string;
  variant?: 'signal' | 'ember' | 'iris';
}

const variantColors = {
  signal: {
    badge: 'bg-signal-500/15 text-signal-400 border-signal-500/20',
    border: 'border-signal-500/20 hover:border-signal-500/40',
  },
  ember: {
    badge: 'bg-ember-500/15 text-ember-400 border-ember-500/20',
    border: 'border-ember-500/20 hover:border-ember-500/40',
  },
  iris: {
    badge: 'bg-iris-500/15 text-iris-400 border-iris-500/20',
    border: 'border-iris-500/20 hover:border-iris-500/40',
  },
};

export default function FeaturedBanner({
  imageSrc,
  imageAlt,
  title,
  description,
  ctaLabel,
  ctaHref,
  ctaExternal = false,
  badge,
  variant = 'signal',
}: FeaturedBannerProps) {
  const colors = variantColors[variant];

  return (
    <div className={`rounded-xl border ${colors.border} bg-void-900 overflow-hidden transition-all`}>
      <div className="flex flex-col sm:flex-row">
        {/* Image area */}
        <div className="sm:w-1/2 lg:w-2/5 relative">
          <div className="aspect-video sm:aspect-auto sm:h-full">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
          {badge && (
            <span className={`inline-flex self-start items-center px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${colors.badge}`}>
              {badge}
            </span>
          )}

          <h3 className="text-xl sm:text-2xl font-heading font-bold text-void-50 mb-2">
            {title}
          </h3>

          {description && (
            <p className="text-sm sm:text-base text-void-400 leading-relaxed mb-6">
              {description}
            </p>
          )}

          {ctaLabel && ctaHref && (
            ctaExternal ? (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm self-start gap-2"
              >
                {ctaLabel}
                <ArrowRight size={14} />
              </a>
            ) : (
              <Link href={ctaHref} className="btn-primary text-sm self-start gap-2 no-underline">
                {ctaLabel}
                <ArrowRight size={14} />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
