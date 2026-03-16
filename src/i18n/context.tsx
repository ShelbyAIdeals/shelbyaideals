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

/** Load Google Translate script once */
let googleTranslateLoaded = false;
function loadGoogleTranslate() {
  if (googleTranslateLoaded || typeof document === 'undefined') return;
  googleTranslateLoaded = true;

  // Create hidden container for Google Translate widget
  const container = document.createElement('div');
  container.id = 'google_translate_element';
  container.style.display = 'none';
  document.body.appendChild(container);

  // Define the callback Google Translate expects
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  win.googleTranslateElementInit = () => {
    if (win.google?.translate?.TranslateElement) {
      new win.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    }
  };

  // Load the script
  const script = document.createElement('script');
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.head.appendChild(script);
}

/** Trigger Google Translate to a specific language */
function triggerGoogleTranslate(langCode: string) {
  const gtCode = GOOGLE_TRANSLATE_CODES[langCode] ?? langCode;

  if (langCode === 'en') {
    // Revert to original — remove Google Translate
    const frame = document.querySelector('.goog-te-banner-frame') as HTMLIFrameElement;
    if (frame) {
      const closeBtn = frame.contentDocument?.querySelector('.goog-close-link') as HTMLElement;
      closeBtn?.click();
    }
    // Also try cookie-based reset
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname;
    return;
  }

  // Set the translation cookie
  document.cookie = `googtrans=/en/${gtCode}; path=/;`;
  document.cookie = `googtrans=/en/${gtCode}; path=/; domain=.${window.location.hostname}`;

  // Try to use the Google Translate select element
  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (select) {
    select.value = gtCode;
    select.dispatchEvent(new Event('change'));
  } else {
    // If widget hasn't loaded yet, reload to pick up the cookie
    window.location.reload();
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

    // Load Google Translate for full-page translation
    loadGoogleTranslate();

    // If a non-English language was saved, trigger translation
    if (initial !== 'en') {
      // Small delay to let Google Translate script load
      setTimeout(() => triggerGoogleTranslate(initial), 1500);
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
