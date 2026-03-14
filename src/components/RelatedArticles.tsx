import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StarRating from './StarRating';
import type { ArticleMeta, ReviewMeta, Category } from '@/lib/types';

interface RelatedArticlesProps {
  current: ArticleMeta;
  articles: ArticleMeta[];
  maxItems?: number;
}

const typePathMap: Record<string, string> = {
  review: 'reviews',
  comparison: 'comparisons',
  best: 'best',
  guide: 'guides',
};

export default function RelatedArticles({ current, articles, maxItems = 3 }: RelatedArticlesProps) {
  const related = articles
    .filter((a) => a.slug !== current.slug)
    .filter((a) => a.category === current.category || a.type === current.type)
    .sort((a, b) => {
      // Prioritize same category
      const aScore = (a.category === current.category ? 2 : 0) + (a.type === current.type ? 1 : 0);
      const bScore = (b.category === current.category ? 2 : 0) + (b.type === current.type ? 1 : 0);
      return bScore - aScore || new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, maxItems);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-void-700/50">
      <h2 className="text-xl font-heading font-bold text-void-50 mb-6">
        Related Articles
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((article) => {
          const path = typePathMap[article.type] || 'reviews';
          const isReview = article.type === 'review';
          const review = isReview ? (article as ReviewMeta) : null;

          return (
            <Link
              key={article.slug}
              href={`/${path}/${article.slug}`}
              className="card group p-5 no-underline hover:-translate-y-1 transition-all block"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="badge-signal text-[0.65rem]">{article.category.replace(/-/g, ' ')}</span>
                <span className="badge-void text-[0.65rem] capitalize">{article.type}</span>
              </div>
              <h3 className="text-sm font-heading font-bold text-void-100 leading-snug mb-2 group-hover:text-signal-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
              {review && (
                <div className="mb-2">
                  <StarRating rating={review.rating} size="sm" />
                </div>
              )}
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-signal-400 group-hover:text-signal-300">
                Read More <ArrowRight size={12} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
