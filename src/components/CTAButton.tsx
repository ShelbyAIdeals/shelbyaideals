import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface CTAButtonProps {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  icon?: ReactNode;
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
    return (
      <span className="inline-flex flex-col items-start">
        <a
          href={href}
          target="_blank"
          rel="nofollow sponsored noopener"
          className={className}
        >
          {content}
        </a>
        <span className="mt-1 text-xs text-void-600">Affiliate link</span>
      </span>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
