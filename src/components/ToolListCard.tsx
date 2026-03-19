'use client';

import Link from 'next/link';
import { ArrowRight, BadgeCheck, Youtube, Linkedin, Instagram, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/i18n/context';
import FavoriteButton from '@/components/FavoriteButton';
import type { Category, SocialLinks } from '@/lib/types';

/* ── Inline social icons (lucide doesn't have X/TikTok/Discord) ── */

function XIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.971-1.166-1.956-1.282-2.645h.004c-.097-.573-.064-.943-.058-.943h-3.12v14.966c0 .201 0 .399-.008.595 0 .024-.003.047-.004.073 0 .01 0 .02-.002.032v.009a3.28 3.28 0 01-1.62 2.58 3.278 3.278 0 01-1.6.417c-1.8 0-3.26-1.468-3.26-3.281 0-1.813 1.46-3.282 3.26-3.282.341 0 .68.054 1.004.16V9.89a6.456 6.456 0 00-1.004-.074c-3.582 0-6.49 2.929-6.49 6.542a6.514 6.514 0 002.63 5.227A6.448 6.448 0 009.841 23c3.581 0 6.49-2.93 6.49-6.542V9.536a9.388 9.388 0 005.49 1.767v-3.11c-.972 0-1.926-.312-2.5-.631z" />
    </svg>
  );
}

function DiscordIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  );
}

const SOCIAL_CONFIG: { key: keyof SocialLinks; icon: React.FC<{ size?: number }>; label: string }[] = [
  { key: 'twitter',   icon: XIcon,        label: 'X' },
  { key: 'youtube',   icon: Youtube,      label: 'YouTube' },
  { key: 'linkedin',  icon: Linkedin,     label: 'LinkedIn' },
  { key: 'instagram', icon: Instagram,    label: 'Instagram' },
  { key: 'github',    icon: Github,       label: 'GitHub' },
  { key: 'tiktok',    icon: TikTokIcon,   label: 'TikTok' },
  { key: 'discord',   icon: DiscordIcon,  label: 'Discord' },
];

interface ToolListCardProps {
  slug: string;
  tool: string;
  toolLogo?: string;
  toolSlug?: string;
  socialLinks?: SocialLinks;
  excerpt: string;
  category: Category;
  rating: number;
  isFavorited?: boolean;
  bestFor: string;
  date: string;
}

export default function ToolListCard({
  slug,
  tool,
  toolLogo,
  toolSlug,
  socialLinks,
  excerpt,
  category,
  rating,
  bestFor,
  isFavorited = false,
}: ToolListCardProps) {
  const { t } = useTranslation();
  const clampedRating = Math.max(0, Math.min(5, Number(rating) || 0));
  const isVerified = clampedRating >= 4.0;
  const favSlug = toolSlug || slug.replace('-review', '');
  const initial = tool.charAt(0).toUpperCase();

  const categoryLabel = category
    .replace('ai-', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const activeSocials = socialLinks
    ? SOCIAL_CONFIG.filter(({ key }) => socialLinks[key])
    : [];

  return (
    <Link href={`/reviews/${slug}`} className="no-underline block">
      <motion.article
        className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-xl border border-void-700/40 bg-void-800/30 hover:border-signal-500/30 hover:bg-void-800/50 transition-all duration-200 cursor-pointer group"
        whileHover={{ x: 4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* Logo */}
        <div className="shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden">
          {toolLogo ? (
            <img
              src={toolLogo}
              alt={`${tool} logo`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-lg font-bold text-signal-400">{initial}</span>
          )}
        </div>

        {/* Middle: name + socials + description + tags */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-sm sm:text-base font-heading font-bold text-void-50 truncate group-hover:text-signal-400 transition-colors">
              {tool}
            </h3>
            {isVerified && (
              <BadgeCheck size={15} className="text-signal-400 shrink-0" />
            )}
            {/* Social icons */}
            {activeSocials.length > 0 && (
              <div className="hidden sm:flex items-center gap-0.5 ml-1">
                {activeSocials.map(({ key, icon: Icon, label }) => (
                  <a
                    key={key}
                    href={socialLinks![key]!}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded text-void-500 hover:text-signal-400 transition-colors"
                    aria-label={`${tool} on ${label}`}
                    title={label}
                  >
                    <Icon size={13} />
                  </a>
                ))}
              </div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-void-400 line-clamp-1 mb-2">
            {excerpt}
          </p>
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-signal-500/10 text-signal-400 text-[10px] sm:text-xs font-medium">
              #{categoryLabel}
            </span>
            {bestFor && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-void-700/50 text-void-300 text-[10px] sm:text-xs">
                #{bestFor}
              </span>
            )}
          </div>
        </div>

        {/* Right: favorite + rating + arrow */}
        <div className="shrink-0 flex items-center gap-2">
          <FavoriteButton toolSlug={favSlug} isFavorited={isFavorited} />
          <div className="badge-score w-10 h-10 text-sm">
            {clampedRating.toFixed(1)}
          </div>
          <ArrowRight
            size={16}
            className="text-void-500 group-hover:text-signal-400 transition-all duration-200 group-hover:translate-x-1 hidden sm:block"
          />
        </div>
      </motion.article>
    </Link>
  );
}
