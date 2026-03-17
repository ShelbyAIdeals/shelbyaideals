export interface Language {
  code: string;
  name: string;       // English name
  nativeName: string; // Name in the language itself
  isRTL: boolean;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English',              nativeName: 'English',     isRTL: false },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文',     isRTL: false },
  { code: 'hi', name: 'Hindi',                nativeName: 'हिन्दी',        isRTL: false },
  { code: 'es', name: 'Spanish',              nativeName: 'Español',     isRTL: false },
  { code: 'ar', name: 'Arabic',               nativeName: 'العربية',      isRTL: true  },
];

export const DEFAULT_LOCALE = 'en';

export function getLanguageByCode(code: string): Language | undefined {
  return LANGUAGES.find((l) => l.code === code);
}

/** Circular flag SVG components keyed by language code */
export const FLAG_EMOJIS: Record<string, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  pt: '🇧🇷',
  it: '🇮🇹',
  nl: '🇳🇱',
  pl: '🇵🇱',
  tr: '🇹🇷',
  ja: '🇯🇵',
  ko: '🇰🇷',
  zh: '🇨🇳',
  ar: '🇸🇦',
  hi: '🇮🇳',
  ru: '🇷🇺',
};

/** SVG flag image paths — renders correctly on all platforms including Windows */
export const FLAG_PATHS: Record<string, string> = {
  en: '/flags/en.svg',
  es: '/flags/es.svg',
  fr: '/flags/fr.svg',
  de: '/flags/de.svg',
  pt: '/flags/pt.svg',
  it: '/flags/it.svg',
  nl: '/flags/nl.svg',
  pl: '/flags/pl.svg',
  tr: '/flags/tr.svg',
  ja: '/flags/ja.svg',
  ko: '/flags/ko.svg',
  zh: '/flags/zh.svg',
  ar: '/flags/ar.svg',
  hi: '/flags/hi.svg',
  ru: '/flags/ru.svg',
};
