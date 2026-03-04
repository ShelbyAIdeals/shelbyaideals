import Link from 'next/link';
import { Info } from 'lucide-react';

export default function AffiliateDisclosure() {
  return (
    <div className="disclosure-box flex items-start gap-3">
      <Info size={18} className="mt-0.5 shrink-0 text-accent-500" />
      <p>
        <strong className="text-void-200">Disclosure:</strong> This post contains
        affiliate links. If you purchase through our links, we may earn a
        commission at no extra cost to you. We only recommend tools we&apos;ve
        tested and believe in.{' '}
        <Link
          href="/affiliate-disclosure"
          className="font-medium text-accent-400 underline underline-offset-2 hover:text-accent-300"
        >
          Learn more
        </Link>
      </p>
    </div>
  );
}
