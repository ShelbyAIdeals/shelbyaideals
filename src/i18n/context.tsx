'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { DEFAULT_LOCALE, getLanguageByCode } from './languages';

type Translations = Record<string, string>;

interface I18nContextValue {
  locale: string;
  setLocale: (code: string) => void;
  t: (key: string, fallback?: string) => string;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/* ── Translation file cache ──────────────────────────────── */
const translationCache: Record<string, Translations> = {};

async function loadTranslations(locale: string): Promise<Translations> {
  if (translationCache[locale]) return translationCache[locale];

  try {
    // Dynamic import of locale JSON files
    const mod = await import(`./locales/${locale}.json`);
    const translations: Translations = mod.default ?? mod;
    translationCache[locale] = translations;
    return translations;
  } catch {
    console.warn(`Failed to load translations for locale: ${locale}`);
    return {};
  }
}

/* ── Detect browser language ─────────────────────────────── */
function detectBrowserLocale(): string {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE;
  const browserLang = navigator.language.split('-')[0];
  const lang = getLanguageByCode(browserLang);
  return lang ? lang.code : DEFAULT_LOCALE;
}

/* ── Provider ─────────────────────────────────────────────── */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE);
  const [translations, setTranslations] = useState<Translations>({});
  const [isRTL, setIsRTL] = useState(false);

  // Initialize locale from localStorage or browser detection
  useEffect(() => {
    const saved = localStorage.getItem('locale');
    const initial = saved ?? detectBrowserLocale();
    setLocaleState(initial);
    const lang = getLanguageByCode(initial);
    setIsRTL(lang?.isRTL ?? false);
  }, []);

  // Load translations when locale changes
  useEffect(() => {
    loadTranslations(locale).then(setTranslations);
    const lang = getLanguageByCode(locale);
    setIsRTL(lang?.isRTL ?? false);

    // Update document direction for RTL languages
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang?.isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((code: string) => {
    setLocaleState(code);
    localStorage.setItem('locale', code);
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      return translations[key] ?? fallback ?? key;
    },
    [translations]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}
