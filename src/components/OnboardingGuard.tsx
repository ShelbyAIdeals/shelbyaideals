'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

const EXCLUDED_PATHS = ['/onboarding'];

export default function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading || !user || !profile) return;
    if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return;

    if (!profile.onboarding_completed) {
      router.push('/onboarding');
    }
  }, [loading, user, profile, pathname, router]);

  return <>{children}</>;
}
