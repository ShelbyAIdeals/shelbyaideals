/**
 * Commissionable cross-sell: pages for non-affiliate tools (ChatGPT, Gemini,
 * Midjourney, etc.) pull big traffic but earn nothing. Surface a category-matched tool
 * we *actually* earn from and recommend, so high-intent traffic converts to revenue.
 * All picks are honest top-rated tools — not pay-to-rank.
 *
 * Shared by pricing pages and review pages.
 */

import { getAffiliateLink } from './affiliate';

export interface CrossSellPick {
  toolKey: string; // affiliate.ts key
  name: string;
  reviewSlug?: string;
  reason: string;
}

export const CROSS_SELL_BY_CATEGORY: Record<string, CrossSellPick> = {
  video: { toolKey: 'pictory', name: 'Pictory', reviewSlug: 'pictory-review', reason: 'turns scripts and blog posts into social-ready video in minutes' },
  voice: { toolKey: 'elevenlabs', name: 'ElevenLabs', reviewSlug: 'elevenlabs-review', reason: 'the most natural AI voices we tested, with a usable free tier' },
  seo: { toolKey: 'mangools', name: 'Mangools', reviewSlug: 'mangools-review', reason: 'affordable keyword research and rank tracking built for small sites' },
  writing: { toolKey: 'frase', name: 'Frase', reviewSlug: 'frase-review', reason: 'AI writing engineered to actually rank in search, not just sound good' },
  chatbot: { toolKey: 'chatbase', name: 'Chatbase', reviewSlug: 'chatbase-review', reason: 'lets you train a support chatbot on your own docs in minutes' },
  deals: { toolKey: 'appsumo', name: 'AppSumo', reason: 'runs lifetime deals on vetted AI and design tools — pay once instead of monthly' },
};

export function classifyTool(toolName: string): keyof typeof CROSS_SELL_BY_CATEGORY | null {
  const t = toolName.toLowerCase();
  if (/(runway|pictory|synthesia|descript|fliki|invideo|lumen|heygen|opus|capcut|veo)/.test(t)) return 'video';
  if (/(elevenlabs|murf|play\.?ht|mubert|speechify|voice)/.test(t)) return 'voice';
  if (/(semrush|surfer|mangools|frase|ahrefs|clearscope|seo)/.test(t)) return 'seo';
  if (/(chatbase|tidio|intercom|drift|botpress|chatbot)/.test(t)) return 'chatbot';
  if (/(jasper|copy\.?ai|writesonic|rytr|grammarly|chatgpt|gemini|claude|grok|perplexity|notion)/.test(t)) return 'writing';
  // Design/image + automation tools have no active affiliate program yet — route
  // that intent to AppSumo lifetime deals (active, tracked).
  if (/(midjourney|leonardo|canva|dall|stable diffusion|ideogram|adobe|zapier|make\.?com|clickup|simplified|decktopus)/.test(t)) return 'deals';
  return null;
}

export interface ResolvedCrossSell extends CrossSellPick {
  url: string;
  rating?: number;
}

/**
 * Returns the commissionable cross-sell pick for a tool, or null when the tool has
 * no matching category or the pick would advertise the page's own tool.
 */
export function getCrossSell(
  toolName: string,
  excludeReviewSlug: string | undefined,
  ratingBySlug: Map<string, number | undefined>,
): ResolvedCrossSell | null {
  const cat = classifyTool(toolName);
  const candidate = cat ? CROSS_SELL_BY_CATEGORY[cat] : null;
  if (!candidate || (excludeReviewSlug && candidate.reviewSlug === excludeReviewSlug)) return null;
  const url = getAffiliateLink(candidate.toolKey);
  if (url === '#') return null;
  return {
    ...candidate,
    url,
    rating: candidate.reviewSlug ? ratingBySlug.get(candidate.reviewSlug) : undefined,
  };
}
