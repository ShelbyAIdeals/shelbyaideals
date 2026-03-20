'use client';

import { Github, Globe, Linkedin, Instagram, Youtube } from 'lucide-react';
import type { SocialLinks } from '@/lib/types';

interface SocialLinksRowProps {
  links: SocialLinks;
  toolName: string;
}

/* ── X / Twitter icon (lucide doesn't have the new X logo) ── */
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ── TikTok icon ────────────────────────────────────────── */
function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.321 5.562a5.124 5.124 0 01-.443-.258 6.228 6.228 0 01-1.137-.966c-.849-.971-1.166-1.956-1.282-2.645h.004c-.097-.573-.064-.943-.058-.943h-3.12v14.966c0 .201 0 .399-.008.595 0 .024-.003.047-.004.073 0 .01 0 .02-.002.032v.009a3.28 3.28 0 01-1.62 2.58 3.278 3.278 0 01-1.6.417c-1.8 0-3.26-1.468-3.26-3.281 0-1.813 1.46-3.282 3.26-3.282.341 0 .68.054 1.004.16V9.89a6.456 6.456 0 00-1.004-.074c-3.582 0-6.49 2.929-6.49 6.542a6.514 6.514 0 002.63 5.227A6.448 6.448 0 009.841 23c3.581 0 6.49-2.93 6.49-6.542V9.536a9.388 9.388 0 005.49 1.767v-3.11c-.972 0-1.926-.312-2.5-.631z" />
    </svg>
  );
}

/* ── Discord icon ───────────────────────────────────────── */
function DiscordIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  );
}

/* ── Facebook icon ─────────────────────────────────────── */
function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const SOCIAL_CONFIG: { key: keyof SocialLinks; icon: React.FC<{ size?: number }>; label: string }[] = [
  { key: 'website',   icon: Globe,        label: 'Website' },
  { key: 'twitter',   icon: XIcon,        label: 'X (Twitter)' },
  { key: 'youtube',   icon: Youtube,      label: 'YouTube' },
  { key: 'linkedin',  icon: Linkedin,     label: 'LinkedIn' },
  { key: 'facebook',  icon: FacebookIcon, label: 'Facebook' },
  { key: 'instagram', icon: Instagram,    label: 'Instagram' },
  { key: 'github',    icon: Github,       label: 'GitHub' },
  { key: 'tiktok',    icon: TikTokIcon,   label: 'TikTok' },
  { key: 'discord',   icon: DiscordIcon,  label: 'Discord' },
];

export default function SocialLinksRow({ links, toolName }: SocialLinksRowProps) {
  const activeLinks = SOCIAL_CONFIG.filter(({ key }) => links[key]);

  if (activeLinks.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {activeLinks.map(({ key, icon: Icon, label }) => (
        <a
          key={key}
          href={links[key]!}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-void-400 hover:text-signal-400 hover:bg-void-700/40 transition-all"
          aria-label={`${toolName} on ${label}`}
          title={label}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
