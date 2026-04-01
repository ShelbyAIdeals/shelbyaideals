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
    url: 'https://www.chatbase.co', // Replace with Dub.co partner link from partners.dub.co/programs/chatbase/links
    commission: 'Up to 30% per sale (1 year)',
    status: 'active',
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
