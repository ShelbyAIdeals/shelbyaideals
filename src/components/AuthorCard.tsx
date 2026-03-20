'use client';

import Link from 'next/link';
import { Twitter, Linkedin, ArrowRight } from 'lucide-react';

const AUTHOR = {
  name: 'Fran Shelby',
  title: 'Founder & Lead Reviewer at ShelbyAI',
  initials: 'FS',
  bio: "I've personally tested every tool on this site \u2014 signing up, paying for plans, and running real projects for 7\u201314 days each. When I say a tool works, I mean I've used it on actual client work.",
  profileUrl: '/about/fran-shelby/',
  social: {
    twitter: 'https://x.com/shelbyaideals',
    linkedin: 'https://www.linkedin.com/in/shelby-ai-1bb38a3b6/',
  },
} as const;

export default function AuthorCard() {
  return (
    <div className="card-glass p-5 sm:p-6 mt-12">
      <div className="flex items-start gap-4 sm:gap-5">
        {/* Avatar */}
        <Link
          href={AUTHOR.profileUrl}
          className="shrink-0 no-underline"
          aria-label={`${AUTHOR.name}'s profile`}
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-signal-500 to-signal-700 text-void-50 font-heading font-bold text-lg sm:text-xl select-none">
            {AUTHOR.initials}
          </div>
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <Link
              href={AUTHOR.profileUrl}
              className="text-base sm:text-lg font-heading font-bold text-void-50 hover:text-signal-400 transition-colors no-underline"
            >
              {AUTHOR.name}
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-void-400 mb-2">
            {AUTHOR.title}
          </p>

          <p className="text-sm text-void-300 leading-relaxed mb-2">
            {AUTHOR.bio}
          </p>
          <p className="text-xs text-void-500 mb-3">
            31+ tools tested &middot; 7-14 days per review &middot; Real workflows, real results
          </p>

          {/* Bottom row: social + profile link */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <a
                href={AUTHOR.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-void-400 hover:text-signal-400 transition-colors"
                aria-label="Follow on X / Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href={AUTHOR.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-void-400 hover:text-signal-400 transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>

            <Link
              href={AUTHOR.profileUrl}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal-400 hover:text-signal-300 transition-colors no-underline"
            >
              View profile
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
