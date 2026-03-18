/**
 * Hreflang tags for multilingual SEO.
 * Rendered in the <head> of every page to tell search engines about language versions.
 * Currently supports: en (default), es, de
 */

const SITE_URL = 'https://www.shelby-ai.com';

const SUPPORTED_LOCALES = [
  { code: 'en', hreflang: 'en' },
  { code: 'es', hreflang: 'es' },
  { code: 'de', hreflang: 'de' },
] as const;

interface HreflangProps {
  /** Current page path WITHOUT locale prefix (e.g., "/reviews/pictory-review/") */
  path: string;
}

export default function Hreflang({ path }: HreflangProps) {
  // Normalize path to ensure trailing slash
  const normalizedPath = path.endsWith('/') ? path : `${path}/`;

  return (
    <>
      {/* Default (English) — uses the root path */}
      <link
        rel="alternate"
        hrefLang="en"
        href={`${SITE_URL}${normalizedPath}`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}${normalizedPath}`}
      />
      {/* Localized versions */}
      {SUPPORTED_LOCALES.filter((l) => l.code !== 'en').map((locale) => (
        <link
          key={locale.code}
          rel="alternate"
          hrefLang={locale.hreflang}
          href={`${SITE_URL}/${locale.code}${normalizedPath}`}
        />
      ))}
    </>
  );
}
