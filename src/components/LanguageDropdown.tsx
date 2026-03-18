'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '@/i18n/context';
import { LANGUAGES, FLAG_PATHS } from '@/i18n/languages';

export default function LanguageDropdown() {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState(-1);

  /* ── Close on outside click ────────────────────────────── */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* ── Keyboard navigation ───────────────────────────────── */
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
        setFocusIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        setOpen(false);
        setFocusIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusIndex((prev) => (prev + 1) % LANGUAGES.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusIndex((prev) => (prev - 1 + LANGUAGES.length) % LANGUAGES.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (focusIndex >= 0) {
          setLocale(LANGUAGES[focusIndex].code);
          setOpen(false);
          setFocusIndex(-1);
        }
        break;
    }
  }

  return (
    <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-void-300 hover:text-void-100 hover:bg-void-700/40 transition-all cursor-pointer"
        aria-label={t('language.select', 'Language')}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <img
          src={FLAG_PATHS[locale] ?? FLAG_PATHS.en}
          alt={locale}
          className="w-5 h-5 rounded-full object-cover"
          width={20}
          height={20}
        />
        <span className="text-xs font-medium uppercase">{locale}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-56 max-h-80 overflow-y-auto rounded-xl border border-void-700/30 bg-void-900/60 backdrop-blur-2xl shadow-2xl z-50 py-2 animate-[fadeInUp_0.15s_ease-out]"
          role="listbox"
          aria-label={t('language.select', 'Language')}
        >
          {LANGUAGES.map((lang, idx) => {
            const isActive = lang.code === locale;
            const isFocused = idx === focusIndex;

            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setLocale(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                  isActive
                    ? 'text-signal-300 bg-signal-500/10'
                    : isFocused
                    ? 'text-void-50 bg-void-700/50'
                    : 'text-void-200 hover:text-void-50 hover:bg-void-700/40'
                }`}
              >
                {/* Circular flag */}
                <img
                  src={FLAG_PATHS[lang.code]}
                  alt={lang.name}
                  className="w-6 h-6 rounded-full object-cover border border-void-700/50 shrink-0"
                  width={24}
                  height={24}
                />

                {/* Language name */}
                <span className="flex-1 text-left">
                  <span className="font-medium">{lang.nativeName}</span>
                  {lang.nativeName !== lang.name && (
                    <span className="text-void-500 ml-1.5 text-xs">({lang.name})</span>
                  )}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
