import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function TrustBadge() {
  return (
    <div className="flex items-center gap-2 text-xs text-void-500 mt-3">
      <Shield size={12} className="text-signal-500/60 shrink-0" />
      <span>
        Independent testing &middot; No sponsored rankings &middot;{' '}
        <Link href="/affiliate-disclosure/" className="text-void-400 hover:text-signal-400 transition-colors underline-offset-2 underline">
          Full disclosure
        </Link>
      </span>
    </div>
  );
}
