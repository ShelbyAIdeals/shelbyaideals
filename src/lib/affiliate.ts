/**
 * Centralized affiliate link management.
 * Replace placeholder URLs with actual affiliate links once approved.
 */

export interface AffiliateProgram {
  name: string;
  url: string;
  commission: string;
  status: 'active' | 'pending' | 'unavailable';
}

const affiliateLinks: Record<string, AffiliateProgram> = {
  jasper: {
    name: 'Jasper AI',
    url: 'https://www.jasper.ai',
    commission: 'N/A',
    status: 'unavailable',
  },
  'copy-ai': {
    name: 'Copy.ai',
    url: 'https://www.copy.ai',
    commission: '20-45% recurring',
    status: 'unavailable',
  },
  frase: {
    name: 'Frase',
    url: 'https://www.frase.io/?via=shelby-ai',
    commission: 'Recurring',
    status: 'active',
  },
  writesonic: {
    name: 'Writesonic',
    url: 'https://writesonic.com',
    commission: '30% recurring',
    status: 'pending',
  },
  surfer: {
    name: 'Surfer SEO',
    url: 'https://surferseo.com',
    commission: '25% recurring',
    status: 'pending',
  },
  semrush: {
    name: 'SEMrush',
    url: 'https://www.semrush.com',
    commission: '$200 CPA',
    status: 'pending',
  },
  grammarly: {
    name: 'Grammarly',
    url: 'https://www.grammarly.com',
    commission: '$0.20-$20 CPA',
    status: 'pending',
  },
  descript: {
    name: 'Descript',
    url: 'https://www.descript.com',
    commission: '15-20% recurring',
    status: 'pending',
  },
  pictory: {
    name: 'Pictory',
    url: 'https://pictory.ai?ref=fran26',
    commission: '30% recurring',
    status: 'active',
  },
  synthesia: {
    name: 'Synthesia',
    url: 'https://www.synthesia.io/?via=shelbyai',
    commission: 'CPA/rev share',
    status: 'active',
  },
  elevenlabs: {
    name: 'ElevenLabs',
    url: 'https://try.elevenlabs.io/3vu715wo9f9y',
    commission: 'CPA/rev share',
    status: 'active',
  },
  zapier: {
    name: 'Zapier',
    url: 'https://zapier.com',
    commission: 'N/A',
    status: 'unavailable',
  },
  mangools: {
    name: 'Mangools',
    url: 'https://mangools.com#a69b085f86aee0888864a82a9',
    commission: '30% recurring',
    status: 'active',
  },
  make: {
    name: 'Make.com',
    url: 'https://www.make.com',
    commission: 'CPA + recurring',
    status: 'unavailable',
  },
  canva: {
    name: 'Canva',
    url: 'https://www.canva.com',
    commission: 'Varies',
    status: 'pending',
  },
  clickup: {
    name: 'ClickUp',
    url: 'https://clickup.com',
    commission: 'Varies',
    status: 'pending',
  },
  chatbase: {
    name: 'Chatbase',
    url: 'https://link.chatbase.co/shelby-ai',
    commission: 'Up to 30% per sale (1 year)',
    status: 'active',
  },
  'otter-ai': {
    name: 'Otter.ai',
    url: 'https://otter.ai', // TODO: apply for tracking link
    commission: 'Recurring',
    status: 'pending',
  },
  scalenut: {
    name: 'Scalenut',
    url: 'https://scalenut.com/?fpr=shelby-ai',
    commission: 'Recurring',
    status: 'active',
  },
  appsumo: {
    name: 'AppSumo',
    url: 'https://appsumo.8odi.net/NG9YMP',
    commission: 'Per sale',
    status: 'active',
  },
  rytr: {
    name: 'Rytr',
    url: 'https://rytr.me', // TODO: apply for tracking link
    commission: 'Recurring',
    status: 'pending',
  },
  fliki: {
    name: 'Fliki',
    url: 'https://fliki.ai', // TODO: apply for tracking link
    commission: 'Recurring',
    status: 'pending',
  },
  'easy-peasy-ai': {
    name: 'Easy Peasy AI',
    url: 'https://easy-peasy.ai', // TODO: apply for tracking link
    commission: 'Recurring',
    status: 'pending',
  },
  simplified: {
    name: 'Simplified',
    url: 'https://simplified.com', // TODO: apply for FirstPromoter tracking link
    commission: 'Recurring',
    status: 'pending',
  },
  mubert: {
    name: 'Mubert',
    url: 'https://mubert.com', // TODO: apply for tracking link
    commission: 'Recurring',
    status: 'pending',
  },
  mixo: {
    name: 'Mixo',
    url: 'https://mixo.io', // TODO: apply for tracking link
    commission: 'Recurring',
    status: 'pending',
  },
  'decktopus-ai': {
    name: 'Decktopus AI',
    url: 'https://decktopus.com', // TODO: apply for tracking link
    commission: 'Recurring',
    status: 'pending',
  },
  'julius-ai': {
    name: 'Julius AI',
    url: 'https://julius.ai', // TODO: apply for tracking link
    commission: 'Recurring',
    status: 'pending',
  },
};

export function getAffiliateLink(toolSlug: string): string {
  return affiliateLinks[toolSlug]?.url ?? '#';
}

/** Maps variant slugs used in data files to canonical affiliate.ts keys. */
const SLUG_ALIASES: Record<string, string> = {
  'jasper-ai': 'jasper',
  'surfer-seo': 'surfer',
  'make-com': 'make',
};

/** Returns the tracked affiliate URL if the program is active, otherwise the fallback URL. */
export function resolveAffiliateUrl(toolSlug: string, fallbackUrl: string): string {
  const canonicalSlug = SLUG_ALIASES[toolSlug] ?? toolSlug;
  const program = affiliateLinks[canonicalSlug];
  return program?.status === 'active' ? program.url : fallbackUrl;
}

export function getAffiliateProgram(toolSlug: string): AffiliateProgram | null {
  return affiliateLinks[toolSlug] ?? null;
}

export function getAllPrograms(): Record<string, AffiliateProgram> {
  return affiliateLinks;
}

export function isAffiliateActive(toolSlug: string): boolean {
  const entry = affiliateLinks[toolSlug];
  return entry ? entry.status === 'active' : false;
}

export function getActiveAffiliateSlugs(): string[] {
  return Object.entries(affiliateLinks)
    .filter(([, v]) => v.status === 'active')
    .map(([k]) => k);
}

/**
 * Detects whether a URL is an actual tracked affiliate link (carries a ref/partner
 * parameter or uses a known partner domain). Used to (a) mark in-content links
 * rel="sponsored" for Google compliance + GA click tracking, and (b) only show the
 * "Affiliate link" disclosure label on links that really are affiliate links.
 */
const TRACKING_PATTERNS: RegExp[] = [
  /[?&](via|ref|fpr|aff|affiliate|irclickid)=/i,
  /try\.elevenlabs\.io/i,
  /appsumo\.8odi\.net/i,
  /link\.chatbase\.co/i,
  /mangools\.com\/?#a/i,
];

export function isTrackedAffiliateUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return TRACKING_PATTERNS.some((p) => p.test(url));
}

/** Hostnames of every vendor we have or are pursuing a commercial relationship with. */
const partnerHostnames: ReadonlySet<string> = new Set(
  Object.values(affiliateLinks).flatMap((program) => {
    try {
      const host = new URL(program.url).hostname.replace(/^www\./, '');
      return [host];
    } catch {
      return [];
    }
  })
);

/**
 * Detects a purely editorial outbound link: one we get paid nothing for, now or
 * later. Those should be followed — a nofollow on an unpaid link we chose to cite
 * passes up the ranking signal Google expects an editorial link to carry, and it
 * withholds credit from free tools and primary sources we are recommending on merit.
 *
 * Anything with a tracking parameter is a paid link. Anything on a vendor hostname
 * in the affiliate map is commercial even while its program sits "pending" and its
 * URL is still an untracked homepage, so it stays nofollow until that is resolved.
 */
export function isEditorialUrl(url: string | undefined | null): boolean {
  if (!url || !/^https?:\/\//i.test(url)) return false;
  if (isTrackedAffiliateUrl(url)) return false;

  try {
    return !partnerHostnames.has(new URL(url).hostname.replace(/^www\./, ''));
  } catch {
    return false;
  }
}

/**
 * Resolves an affiliate URL from a display name ("Copy.ai", "Jasper AI", "Make.com")
 * instead of a slug — for content surfaces (best-of frontmatter) that only carry names.
 */
export function resolveAffiliateUrlByName(toolName: string, fallbackUrl: string): string {
  const slug = toolName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return resolveAffiliateUrl(slug, fallbackUrl);
}
