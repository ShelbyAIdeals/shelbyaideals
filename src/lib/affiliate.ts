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
    url: 'https://www.jasper.ai', // Replace with actual affiliate URL
    commission: '30% recurring',
    status: 'pending',
  },
  'copy-ai': {
    name: 'Copy.ai',
    url: 'https://www.copy.ai',
    commission: '20-45% recurring',
    status: 'unavailable',
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
    url: 'https://mangools.com/a/a69b085f86aee0888864a82a9',
    commission: '30% recurring',
    status: 'active',
  },
  make: {
    name: 'Make.com',
    url: 'https://www.make.com',
    commission: 'CPA + recurring',
    status: 'pending',
  },
  canva: {
    name: 'Canva',
    url: 'https://www.canva.com',
    commission: 'Varies',
    status: 'pending',
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
