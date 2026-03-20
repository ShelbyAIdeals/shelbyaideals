import type { ReviewMeta, ArticleMeta } from '@/lib/types';

interface FAQItem {
  question: string;
  answer: string;
}

interface VideoData {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
  uploadDate: string;
  duration?: string;
}

interface ItemListData {
  name: string;
  items: { url: string; name: string }[];
}

interface JsonLdProps {
  type: 'review' | 'article' | 'website' | 'organization' | 'breadcrumb' | 'faq' | 'video' | 'itemlist';
  data?: ReviewMeta | ArticleMeta | { questions: FAQItem[] } | VideoData | ItemListData;
  breadcrumbs?: { name: string; url: string }[];
}

export default function JsonLd({ type, data, breadcrumbs }: JsonLdProps) {
  let schema: Record<string, unknown>;

  if (type === 'website') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ShelbyAIDeals',
      url: 'https://www.shelby-ai.com',
      description: 'Honest AI tool reviews for creators, freelancers, and small teams.',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.shelby-ai.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    };
  } else if (type === 'organization') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ShelbyAIDeals',
      url: 'https://www.shelby-ai.com',
      logo: 'https://www.shelby-ai.com/images/og-thumbnail.png',
      description: 'Honest AI tool reviews for creators, freelancers, and small teams. 31+ tools tested hands-on.',
      sameAs: [
        'https://x.com/ShelbyAIDeals',
      ],
    };
  } else if (type === 'itemlist' && data && 'items' in data) {
    const list = data as ItemListData;
    schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: list.name,
      numberOfItems: list.items.length,
      itemListElement: list.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
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
        url: 'https://www.shelby-ai.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'ShelbyAIDeals',
        url: 'https://www.shelby-ai.com',
      },
      itemReviewed: {
        '@type': 'SoftwareApplication',
        name: review.tool,
        applicationCategory: 'AI Tool',
        offers: review.pricing?.length > 0 ? {
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
  } else if (type === 'article' && data && 'title' in data) {
    const article = data as ArticleMeta;
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      dateModified: article.lastUpdated,
      author: {
        '@type': 'Organization',
        name: 'ShelbyAIDeals',
        url: 'https://www.shelby-ai.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'ShelbyAIDeals',
        url: 'https://www.shelby-ai.com',
      },
    };
  } else if (type === 'faq' && data && 'questions' in data) {
    const faqData = data as { questions: FAQItem[] };
    schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.questions.map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer,
        },
      })),
    };
  } else if (type === 'video' && data && 'contentUrl' in data) {
    const video = data as VideoData;
    schema = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.name,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      contentUrl: video.contentUrl,
      uploadDate: video.uploadDate,
      duration: video.duration,
      publisher: {
        '@type': 'Organization',
        name: 'ShelbyAIDeals',
        url: 'https://www.shelby-ai.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.shelby-ai.com/images/logo.png',
        },
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
