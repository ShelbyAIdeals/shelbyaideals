import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { isEditorialUrl, isTrackedAffiliateUrl } from '@/lib/affiliate';

interface CTAButtonProps {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  icon?: ReactNode;
  /**
   * Force the affiliate treatment on or off. Omit to auto-detect from the URL,
   * which is the correct behaviour for every current caller.
   */
  sponsored?: boolean;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
} as const;

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
} as const;

export default function CTAButton({
  href,
  label,
  variant = 'primary',
  size = 'md',
  external = true,
  icon,
  sponsored,
}: CTAButtonProps) {
  const className = `${variantClasses[variant]} ${sizeClasses[size]} gap-2`;

  const content = (
    <>
      {icon}
      <span>{label}</span>
      <ArrowRight size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
    </>
  );

  if (external) {
    // Only real tracked affiliate links get rel="sponsored" and the disclosure
    // label. Labelling a plain outbound link "Affiliate link" is a false
    // commercial disclosure, and rel="sponsored" would log a bogus
    // affiliate_click in GA. Non-sponsored links carry data-outbound so the
    // delegation handler in layout.tsx can still measure the click.
    const isSponsored = sponsored ?? isTrackedAffiliateUrl(href);

    // A CTA pointing at a tool we earn nothing from is an editorial recommendation,
    // so it is followed. Explicitly marking a link sponsored always keeps nofollow.
    const rel = isSponsored
      ? 'nofollow sponsored noopener'
      : isEditorialUrl(href)
        ? 'noopener noreferrer'
        : 'nofollow noopener noreferrer';

    return (
      <span className="inline-flex flex-col items-start">
        <a
          href={href}
          target="_blank"
          rel={rel}
          data-outbound={isSponsored ? undefined : '1'}
          className={className}
        >
          {content}
        </a>
        {isSponsored && (
          <span className="mt-1 text-xs text-void-600">Affiliate link</span>
        )}
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
