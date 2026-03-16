export interface Language {
  code: string;
  name: string;       // English name
  nativeName: string; // Name in the language itself
  isRTL: boolean;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English',              nativeName: 'English',     isRTL: false },
  { code: 'es', name: 'Spanish',              nativeName: 'Español',     isRTL: false },
  { code: 'fr', name: 'French',               nativeName: 'Français',    isRTL: false },
  { code: 'de', name: 'German',               nativeName: 'Deutsch',     isRTL: false },
  { code: 'pt', name: 'Portuguese',           nativeName: 'Português',   isRTL: false },
  { code: 'it', name: 'Italian',              nativeName: 'Italiano',    isRTL: false },
  { code: 'nl', name: 'Dutch',                nativeName: 'Nederlands',  isRTL: false },
  { code: 'pl', name: 'Polish',               nativeName: 'Polski',      isRTL: false },
  { code: 'tr', name: 'Turkish',              nativeName: 'Türkçe',      isRTL: false },
  { code: 'ja', name: 'Japanese',             nativeName: '日本語',       isRTL: false },
  { code: 'ko', name: 'Korean',               nativeName: '한국어',       isRTL: false },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '简体中文',     isRTL: false },
  { code: 'ar', name: 'Arabic',               nativeName: 'العربية',      isRTL: true  },
  { code: 'hi', name: 'Hindi',                nativeName: 'हिन्दी',        isRTL: false },
  { code: 'ru', name: 'Russian',              nativeName: 'Русский',     isRTL: false },
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
