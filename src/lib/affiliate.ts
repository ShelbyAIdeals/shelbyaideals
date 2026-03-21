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
    url: 'https://rytr.me', // Update with tracking link if available
    commission: 'Recurring',
    status: 'active',
  },
  fliki: {
    name: 'Fliki',
    url: 'https://fliki.ai', // Update with tracking link if available
    commission: 'Recurring',
    status: 'active',
  },
  'easy-peasy-ai': {
    name: 'Easy Peasy AI',
    url: 'https://easy-peasy.ai', // Update with tracking link if available
    commission: 'Recurring',
    status: 'active',
  },
  simplified: {
    name: 'Simplified',
    url: 'https://simplified.com', // Update with FirstPromoter tracking link
    commission: 'Recurring',
    status: 'active',
  },
  mubert: {
    name: 'Mubert',
    url: 'https://mubert.com',
    commission: 'Recurring',
    status: 'active',
  },
  mixo: {
    name: 'Mixo',
    url: 'https://mixo.io',
    commission: 'Recurring',
    status: 'active',
  },
  'decktopus-ai': {
    name: 'Decktopus AI',
    url: 'https://decktopus.com',
    commission: 'Recurring',
    status: 'active',
  },
  'julius-ai': {
    name: 'Julius AI',
    url: 'https://julius.ai',
    commission: 'Recurring',
    status: 'active',
  },
};

export function getAffiliateLink(toolSlug: string): string {
  return affiliateLinks[toolSlug]?.url ?? '#';
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
