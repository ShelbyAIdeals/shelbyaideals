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

interface HowToData {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}

interface CollectionPageData {
  name: string;
  description: string;
  url: string;
}

interface JsonLdProps {
  type: 'review' | 'article' | 'website' | 'organization' | 'breadcrumb' | 'faq' | 'video' | 'itemlist' | 'howto' | 'collectionpage';
  data?: ReviewMeta | ArticleMeta | { questions: FAQItem[] } | VideoData | ItemListData | HowToData | CollectionPageData;
  breadcrumbs?: { name: string; url: string }[];
  canonicalUrl?: string;
}

const AUTHOR_PERSON = {
  '@type': 'Person',
  name: 'Frank Shelby',
  url: 'https://www.shelby-ai.com/author/frank-shelby',
  jobTitle: 'Founder & Lead Reviewer',
  knowsAbout: ['AI Tools', 'Video Creation', 'Content Marketing', 'SEO', 'Small Business Technology'],
  sameAs: [
    'https://x.com/ShelbyAIDeals',
    'https://www.linkedin.com/in/frank-shelby-1bb38a3b6/',
    'https://www.reddit.com/user/Legitimate_Farmer529/',
    'https://www.pinterest.com/shelbyaideals/',
    'https://github.com/ShelbyAIdeals',
  ],
};

const PUBLISHER_ORG = {
  '@type': 'Organization',
  name: 'ShelbyAIDeals',
  url: 'https://www.shelby-ai.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.shelby-ai.com/images/og-thumbnail.png',
  },
};

/**
 * Renders JSON-LD structured data for SEO and AI search visibility.
 * All data is developer-controlled (not user-generated), so JSON.stringify
 * is safe here — no untrusted input reaches the output.
 */
export default function JsonLd({ type, data, breadcrumbs, canonicalUrl }: JsonLdProps) {
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
      description: 'Honest AI tool reviews for creators, freelancers, and small teams. 37+ tools tested hands-on.',
      founder: AUTHOR_PERSON,
      sameAs: [
        'https://x.com/ShelbyAIDeals',
        'https://www.linkedin.com/in/frank-shelby-1bb38a3b6/',
        'https://www.reddit.com/user/Legitimate_Farmer529/',
        'https://www.pinterest.com/shelbyaideals/',
        'https://github.com/ShelbyAIdeals',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.5',
        reviewCount: '31',
        bestRating: '5',
        worstRating: '1',
      },
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
    const toolSlug = review.toolSlug || review.slug?.replace('-review', '') || '';
    const imageUrl = review.featuredImage
      ? `https://www.shelby-ai.com${review.featuredImage}`
      : `https://www.shelby-ai.com/images/tools/${toolSlug}/screenshot-1.png`;
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Review',
      name: review.title,
      description: review.excerpt,
      datePublished: review.date,
      dateModified: review.lastUpdated,
      image: imageUrl,
      author: AUTHOR_PERSON,
      publisher: PUBLISHER_ORG,
      ...(canonicalUrl && { mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl } }),
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.quick-verdict', '.verdict-box'],
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
    const imageUrl = article.featuredImage
      ? `https://www.shelby-ai.com${article.featuredImage}`
      : 'https://www.shelby-ai.com/images/og-thumbnail.png';
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.date,
      dateModified: article.lastUpdated,
      image: imageUrl,
      author: AUTHOR_PERSON,
      publisher: PUBLISHER_ORG,
      ...(canonicalUrl && { mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl } }),
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'article > p:first-of-type'],
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
  } else if (type === 'howto' && data && 'steps' in data) {
    const howTo = data as HowToData;
    schema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: howTo.name,
      description: howTo.description,
      totalTime: howTo.totalTime,
      step: howTo.steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    };
  } else if (type === 'collectionpage' && data && 'url' in data) {
    const page = data as CollectionPageData;
    schema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: page.name,
      description: page.description,
      url: page.url,
      isPartOf: {
        '@type': 'WebSite',
        name: 'ShelbyAIDeals',
        url: 'https://www.shelby-ai.com',
      },
    };
  } else {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      // Safe: all data is developer-controlled static content, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
