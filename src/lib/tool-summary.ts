import { getAllReviews } from './content';
import { resolveAffiliateUrl, isAffiliateActive } from './affiliate';
import type { Category } from './types';

export interface ToolSummary {
  slug: string;          // review slug
  tool: string;
  category: Category;
  rating: number;
  minPrice: number;      // lowest paid plan price/mo (0 if only free)
  priceLabel: string;    // human label, e.g. "$19/month" or "Free"
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  affiliateLabel: string;
  isAffiliate: boolean;  // do we earn commission?
}

function priceToNum(price: string): number | null {
  const m = price.match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : null;
}

/** Server-only: compact, structured tool data for the /compare and /calculator tools. */
export function getToolSummaries(): ToolSummary[] {
  return getAllReviews()
    .filter((r) => typeof r.rating === 'number' && r.rating > 0)
    .map((r) => {
      const plans = Array.isArray(r.pricing) ? r.pricing : [];
      const paid = plans.map((p) => priceToNum(p.price)).filter((n): n is number => n != null && n > 0);
      const minPrice = paid.length > 0 ? Math.min(...paid) : 0;
      // Label from the cheapest plan (paid if any, else first).
      const cheapest =
        plans.find((p) => priceToNum(p.price) === minPrice && minPrice > 0) ?? plans[0];
      const priceLabel = cheapest
        ? priceToNum(cheapest.price) != null
          ? `${cheapest.price}${cheapest.period || ''}`
          : cheapest.price
        : 'See site';
      const toolKey = r.toolSlug || r.slug.replace(/-review$/, '');
      return {
        slug: r.slug,
        tool: r.tool,
        category: r.category,
        rating: r.rating,
        minPrice,
        priceLabel,
        pros: (r.pros || []).slice(0, 3),
        cons: (r.cons || []).slice(0, 3),
        affiliateUrl: resolveAffiliateUrl(toolKey, r.affiliateUrl || '#'),
        affiliateLabel: r.affiliateLabel || `Try ${r.tool}`,
        isAffiliate: isAffiliateActive(toolKey),
      };
    })
    .sort((a, b) => b.rating - a.rating);
}
