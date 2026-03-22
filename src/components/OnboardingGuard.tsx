'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { X } from 'lucide-react';

const EXCLUDED_PATHS = ['/onboarding'];

export default function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showToast, setShowToast] = useState(false);

  const needsOnboarding = !loading && !!user && !!profile && !profile.onboarding_completed;

  const handleNavAttempt = useCallback(() => {
    if (!needsOnboarding) return;
    if (EXCLUDED_PATHS.some((p) => pathname.startsWith(p))) return;

    setShowToast(true);
    router.push('/onboarding');

    const timer = setTimeout(() => setShowToast(false), 4000);
    return () => clearTimeout(timer);
  }, [needsOnboarding, pathname, router]);

  useEffect(() => {
    handleNavAttempt();
  }, [handleNavAttempt]);

  return (
    <>
      {children}

      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-[100] animate-[fadeInUp_0.3s_ease-out] max-w-sm">
          <div className="bg-void-900 border border-signal-500/30 rounded-xl px-5 py-4 shadow-2xl flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-signal-500/15 border border-signal-500/25 flex items-center justify-center text-signal-400 text-sm font-bold">
              !
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-void-50">
                Complete your profile first
              </p>
              <p className="text-xs text-void-400 mt-0.5">
                Answer a few quick questions so we can personalize your experience.
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="shrink-0 text-void-500 hover:text-void-300 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
