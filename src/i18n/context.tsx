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
    const mod = await import(`./locales/${locale}.json`);
    const translations: Translations = mod.default ?? mod;
    translationCache[locale] = translations;
    return translations;
  } catch {
    console.warn(`Failed to load translations for locale: ${locale}`);
    return {};
  }
}

/* ── Google Translate language code mapping ───────────────── */
const GOOGLE_TRANSLATE_CODES: Record<string, string> = {
  en: 'en', es: 'es', fr: 'fr', de: 'de', pt: 'pt', it: 'it',
  nl: 'nl', pl: 'pl', tr: 'tr', ja: 'ja', ko: 'ko', zh: 'zh-CN',
  ar: 'ar', hi: 'hi', ru: 'ru',
};

/* ── Google Translate via page proxy ──────────────────────── */

/** Check if we're currently on the Google Translate proxy */
function isOnTranslateProxy(): boolean {
  return window.location.hostname.endsWith('.translate.goog');
}

/** Get the original (non-proxy) URL for the current page */
function getOriginalUrl(): string {
  if (!isOnTranslateProxy()) return window.location.href;
  // translate.goog URLs look like: shelby--ai-com.translate.goog/path?_x_tr_sl=en&_x_tr_tl=es&...
  // Reconstruct original: https://shelby-ai.com/path
  const url = new URL(window.location.href);
  url.searchParams.delete('_x_tr_sl');
  url.searchParams.delete('_x_tr_tl');
  url.searchParams.delete('_x_tr_hl');
  url.searchParams.delete('_x_tr_pto');
  url.searchParams.delete('_x_tr_hist');
  // Hostname: www-shelby--ai-com.translate.goog → www.shelby-ai.com
  // Google uses -- for literal dash, - for dot separator
  const encoded = url.hostname.replace('.translate.goog', '');
  const origHost = encoded.replace(/--/g, '\x00').replace(/-/g, '.').replace(/\x00/g, '-');
  url.hostname = origHost;
  url.protocol = 'https:';
  return url.toString();
}

function triggerGoogleTranslate(langCode: string) {
  const gtCode = GOOGLE_TRANSLATE_CODES[langCode] ?? langCode;

  if (langCode === 'en') {
    // Switch back to English → go to the original site
    if (isOnTranslateProxy()) {
      window.location.href = getOriginalUrl();
    }
    // If already on original site, nothing to do (UI translations handle it via t())
    return;
  }

  // Navigate to Google Translate proxy for full-page translation.
  // Use the canonical www. URL to avoid redirect chain issues.
  let currentUrl = isOnTranslateProxy() ? getOriginalUrl() : window.location.href;
  // Ensure www. prefix (shelby-ai.com redirects to www.shelby-ai.com, which breaks the proxy chain)
  currentUrl = currentUrl.replace('://shelby-ai.com', '://www.shelby-ai.com');
  const translateUrl = `https://translate.google.com/translate?sl=en&tl=${gtCode}&u=${encodeURIComponent(currentUrl)}`;
  window.location.href = translateUrl;
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

    // If on translate proxy, detect locale from URL params
    if (isOnTranslateProxy()) {
      const params = new URLSearchParams(window.location.search);
      const proxyLang = params.get('_x_tr_tl');
      if (proxyLang) {
        const mapped = Object.entries(GOOGLE_TRANSLATE_CODES).find(([, v]) => v === proxyLang);
        if (mapped) {
          setLocaleState(mapped[0]);
          localStorage.setItem('locale', mapped[0]);
        }
      }
    }
  }, []);

  // Load UI string translations when locale changes
  useEffect(() => {
    loadTranslations(locale).then(setTranslations);
    const lang = getLanguageByCode(locale);
    setIsRTL(lang?.isRTL ?? false);

    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang?.isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((code: string) => {
    setLocaleState(code);
    localStorage.setItem('locale', code);
    // Trigger Google Translate for full page translation
    triggerGoogleTranslate(code);
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
