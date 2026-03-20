'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, Star, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useTranslation } from '@/i18n/context';

export default function UserMenu() {
  const { user, profile, signOut } = useAuth();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const displayName = profile?.username || profile?.first_name || user?.email?.split('@')[0] || 'User';
  const initials = (profile?.first_name?.[0] ?? '') + (profile?.last_name?.[0] ?? '') || (user?.email?.[0]?.toUpperCase() ?? '');

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-void-200 hover:text-void-50 hover:bg-void-700/40 transition-all cursor-pointer"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {/* Avatar */}
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={displayName}
            className="w-7 h-7 rounded-full object-cover border border-void-600/50"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-signal-500/20 border border-signal-500/30 flex items-center justify-center text-xs font-bold text-signal-400">
            {initials || '?'}
          </div>
        )}
        <span className="text-sm font-medium hidden xl:block max-w-[100px] truncate">
          {displayName}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-void-700/50 bg-void-900/95 backdrop-blur-xl shadow-2xl z-50 py-2 animate-[fadeInUp_0.15s_ease-out]">
          {/* User info header */}
          <div className="px-4 py-2.5 border-b border-void-700/50">
            <p className="text-sm font-medium text-void-100 truncate">{displayName}</p>
            {profile?.first_name && profile?.last_name && (
              <p className="text-xs text-void-500 truncate">
                {profile.first_name} {profile.last_name}
              </p>
            )}
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-void-200 hover:text-void-50 hover:bg-void-700/40 transition-colors no-underline"
            >
              <User size={16} />
              {t('user.profile', 'Profile')}
            </Link>
            <Link
              href="/profile#reviews"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-void-200 hover:text-void-50 hover:bg-void-700/40 transition-colors no-underline"
            >
              <Star size={16} />
              {t('user.my_reviews', 'My Reviews')}
            </Link>
          </div>

          {/* Sign out */}
          <div className="border-t border-void-700/50 pt-1">
            <button
              onClick={async () => {
                await signOut();
                setOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-void-400 hover:text-red-400 hover:bg-void-700/40 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              {t('auth.sign_out', 'Sign Out')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
