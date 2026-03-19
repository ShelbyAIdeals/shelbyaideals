'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Layers, GitCompare, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickLinks = [
  {
    title: 'Popular Tools',
    icon: Sparkles,
    color: 'text-signal-400',
    links: [
      { label: 'Pictory Review', href: '/reviews/pictory-review' },
      { label: 'ElevenLabs Review', href: '/reviews/elevenlabs-review' },
      { label: 'Synthesia Review', href: '/reviews/synthesia-review' },
      { label: 'Descript Review', href: '/reviews/descript-review' },
    ],
  },
  {
    title: 'Categories',
    icon: Layers,
    color: 'text-iris-400',
    links: [
      { label: 'AI Video & Audio', href: '/categories/ai-video-audio' },
      { label: 'AI Marketing & SEO', href: '/categories/ai-marketing-seo' },
      { label: 'AI Content & Productivity', href: '/categories/ai-content-productivity' },
    ],
  },
  {
    title: 'Comparisons',
    icon: GitCompare,
    color: 'text-ember-400',
    links: [
      { label: 'Pictory vs Synthesia', href: '/comparisons/pictory-vs-synthesia' },
      { label: 'ElevenLabs vs Murf vs Play.ht', href: '/comparisons/elevenlabs-vs-murf-vs-playht' },
      { label: 'All Comparisons', href: '/comparisons' },
    ],
  },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, duration: 0.35, bounce: 0.15 },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: -8,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
};

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [query, setQuery] = useState('');

  /* Focus input when opened, clear query on close */
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* ESC to close + focus trap */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap — Tab cycles within the panel
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a, button, input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-void-950/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="relative w-full max-w-xl rounded-2xl border border-void-700/30 overflow-hidden bg-void-900 shadow-2xl"
            style={{
              backdropFilter: 'blur(24px) saturate(1.3)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
            }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-void-700/40">
              <Search size={20} className="text-void-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search tools, guides, comparisons..."
                className="flex-1 bg-transparent text-void-50 text-base placeholder:text-void-500 outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-medium text-void-500 bg-void-800/80 border border-void-700/50 rounded">
                ESC
              </kbd>
            </div>

            {/* Search action when query is typed */}
            {query.trim() && (
              <div className="px-5 pt-4 pb-2">
                <button
                  onClick={handleSearch}
                  className="w-full group flex items-center justify-between px-3 py-3 rounded-lg text-sm text-void-100 bg-signal-500/10 hover:bg-signal-500/20 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Search size={15} className="text-signal-400" />
                    Search for &ldquo;{query.trim()}&rdquo;
                  </span>
                  <ArrowRight size={14} className="text-signal-400" />
                </button>
              </div>
            )}

            {/* Quick links — shown when no query */}
            {!query.trim() && (
              <div className="px-5 py-4 max-h-[60vh] overflow-y-auto">
                {quickLinks.map((section) => (
                  <div key={section.title} className="mb-5 last:mb-0">
                    <div className="flex items-center gap-2 mb-2.5">
                      <section.icon size={15} className={section.color} />
                      <span className="text-xs font-semibold uppercase tracking-wider text-void-400">
                        {section.title}
                      </span>
                    </div>
                    <ul className="space-y-0.5">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="group flex items-center justify-between px-3 py-2 rounded-lg text-sm text-void-200 no-underline hover:bg-signal-500/10 hover:text-signal-300 transition-colors"
                          >
                            <span>{link.label}</span>
                            <ArrowRight
                              size={14}
                              className="text-void-600 group-hover:text-signal-400 transition-colors"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Footer hint */}
            <div className="px-5 py-3 border-t border-void-700/30 flex items-center justify-between">
              <span className="text-[11px] text-void-500">
                {query.trim() ? 'Press Enter to search' : 'Type to search or browse links above'}
              </span>
              <span className="text-[11px] text-void-500">
                <kbd className="font-mono">ESC</kbd> to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
