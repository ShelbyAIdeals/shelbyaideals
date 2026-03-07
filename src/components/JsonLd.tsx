import type { ReviewMeta, ArticleMeta } from '@/lib/types';

interface JsonLdProps {
  type: 'review' | 'article' | 'website' | 'breadcrumb';
  data?: ReviewMeta | ArticleMeta;
  breadcrumbs?: { name: string; url: string }[];
}

export default function JsonLd({ type, data, breadcrumbs }: JsonLdProps) {
  let schema: Record<string, unknown>;

  if (type === 'website') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ShelbyAIDeals',
      url: 'https://shelby-ai.com',
      description: 'Honest AI tool reviews for creators, freelancers, and small teams.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://shelby-ai.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    };
  } else if (type === 'breadcrumb' && breadcrumbs) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  } else if (type === 'review' && data && 'rating' in data) {
    const review = data as ReviewMeta;
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Review',
      name: review.title,
      description: review.excerpt,
      datePublished: review.date,
      dateModified: review.lastUpdated,
      author: {
        '@type': 'Organization',
        name: 'ShelbyAIDeals',
        url: 'https://shelby-ai.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'ShelbyAIDeals',
        url: 'https://shelby-ai.com',
      },
      itemReviewed: {
        '@type': 'SoftwareApplication',
        name: review.tool,
        applicationCategory: 'AI Tool',
        offers: review.pricing.length > 0 ? {
          '@type': 'Offer',
          price: review.pricing[0].price.replace(/[^0-9.]/g, '') || '0',
          priceCurrency: 'USD',
        } : undefined,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 0,
      },
    };
  } else if (type === 'article' && data) {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.excerpt,
      datePublished: data.date,
      dateModified: data.lastUpdated,
      author: {
        '@type': 'Organization',
        name: 'ShelbyAIDeals',
        url: 'https://shelby-ai.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'ShelbyAIDeals',
        url: 'https://shelby-ai.com',
      },
    };
  } else {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
