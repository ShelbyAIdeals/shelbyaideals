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
    url: '#jasper-affiliate', // Replace with actual affiliate URL
    commission: '30% recurring',
    status: 'pending',
  },
  'copy-ai': {
    name: 'Copy.ai',
    url: '#copyai-affiliate',
    commission: '20-45% recurring',
    status: 'pending',
  },
  writesonic: {
    name: 'Writesonic',
    url: '#writesonic-affiliate',
    commission: '30% recurring',
    status: 'pending',
  },
  surfer: {
    name: 'Surfer SEO',
    url: '#surfer-affiliate',
    commission: '25% recurring',
    status: 'pending',
  },
  semrush: {
    name: 'SEMrush',
    url: '#semrush-affiliate',
    commission: '$200 CPA',
    status: 'pending',
  },
  grammarly: {
    name: 'Grammarly',
    url: '#grammarly-affiliate',
    commission: '$0.20-$20 CPA',
    status: 'pending',
  },
  descript: {
    name: 'Descript',
    url: '#descript-affiliate',
    commission: '15-20% recurring',
    status: 'pending',
  },
  pictory: {
    name: 'Pictory',
    url: '#pictory-affiliate',
    commission: '30% recurring',
    status: 'pending',
  },
  synthesia: {
    name: 'Synthesia',
    url: '#synthesia-affiliate',
    commission: 'CPA/rev share',
    status: 'pending',
  },
  zapier: {
    name: 'Zapier',
    url: '#zapier-affiliate',
    commission: 'CPA via Impact',
    status: 'pending',
  },
  make: {
    name: 'Make.com',
    url: '#make-affiliate',
    commission: 'CPA + recurring',
    status: 'pending',
  },
  canva: {
    name: 'Canva',
    url: '#canva-affiliate',
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
