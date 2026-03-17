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

/* ── Google Translate ─────────────────────────────────────── */
let gtLoaded = false;

function setGoogTransCookies(gtCode: string) {
  const hostname = window.location.hostname;
  if (gtCode === 'en') {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname}`;
  } else {
    document.cookie = `googtrans=/en/${gtCode}; path=/;`;
    document.cookie = `googtrans=/en/${gtCode}; path=/; domain=.${hostname}`;
  }
}

function getComboBox(): HTMLSelectElement | null {
  return document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
}

function selectLanguageInCombo(gtCode: string) {
  const select = getComboBox();
  if (!select) return false;
  select.value = gtCode;
  select.dispatchEvent(new Event('change'));
  return true;
}

/** Poll for combo box, resolve when found or timeout */
function waitForCombo(maxMs = 12000): Promise<HTMLSelectElement | null> {
  return new Promise((resolve) => {
    const start = Date.now();
    const check = () => {
      const combo = getComboBox();
      if (combo) return resolve(combo);
      if (Date.now() - start > maxMs) return resolve(null);
      setTimeout(check, 300);
    };
    check();
  });
}

function loadGoogleTranslate() {
  if (gtLoaded || typeof document === 'undefined') return;
  gtLoaded = true;

  // Container: in-flow, invisible but rendered (NOT display:none, NOT off-screen)
  let container = document.getElementById('google_translate_element');
  if (!container) {
    container = document.createElement('div');
    container.id = 'google_translate_element';
    document.body.appendChild(container);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  win.googleTranslateElementInit = () => {
    if (win.google?.translate?.TranslateElement) {
      new win.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: true },
        'google_translate_element'
      );
    }
  };

  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.head.appendChild(script);
}

function triggerGoogleTranslate(langCode: string) {
  const gtCode = GOOGLE_TRANSLATE_CODES[langCode] ?? langCode;
  setGoogTransCookies(gtCode);

  if (langCode === 'en') {
    if (!selectLanguageInCombo('en')) {
      window.location.reload();
    }
    return;
  }

  // Try combo immediately
  if (selectLanguageInCombo(gtCode)) {
    // Verify after delay — if page not translated, force reload
    setTimeout(() => {
      if (!document.querySelector('.translated-ltr, .translated-rtl')) {
        window.location.reload();
      }
    }, 2000);
    return;
  }

  // Combo not ready — wait for it
  waitForCombo(8000).then((combo) => {
    if (combo) {
      combo.value = gtCode;
      combo.dispatchEvent(new Event('change'));
    } else {
      // Widget never loaded — reload (autoDisplay: true + cookie will handle it)
      window.location.reload();
    }
  });
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

    // Load Google Translate for article/card content translation.
    // With autoDisplay: true, GT auto-translates if googtrans cookie is set.
    loadGoogleTranslate();

    // If a non-English locale is saved, set cookies and wait for combo box
    if (initial !== 'en') {
      const gtCode = GOOGLE_TRANSLATE_CODES[initial] ?? initial;
      setGoogTransCookies(gtCode);
      // Poll for combo and trigger once ready
      waitForCombo(15000).then((combo) => {
        if (combo && !document.querySelector('.translated-ltr, .translated-rtl')) {
          combo.value = gtCode;
          combo.dispatchEvent(new Event('change'));
        }
      });
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
