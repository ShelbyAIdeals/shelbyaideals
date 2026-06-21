/**
 * Lightweight GA4 event helpers (client-side).
 * gtag is loaded in layout.tsx; these are no-ops if it isn't present (SSR/blocked).
 *
 * Mark these as Key Events in GA4 (Admin → Events → "Mark as key event") to track
 * conversions: `newsletter_signup` and the existing `affiliate_click` (fired in layout.tsx).
 */

type GtagFn = (command: string, eventName: string, params?: Record<string, unknown>) => void;

function getGtag(): GtagFn | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { gtag?: GtagFn };
  return typeof w.gtag === 'function' ? w.gtag : null;
}

/** Fire when a newsletter subscription succeeds. `source` = where it happened. */
export function trackNewsletterSignup(source: string): void {
  getGtag()?.('event', 'newsletter_signup', {
    event_category: 'newsletter',
    event_label: source,
    page_location: typeof window !== 'undefined' ? window.location.href : undefined,
  });
}
