'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';

interface SearchArticle {
  title: string;
  slug: string;
  excerpt: string;
  type: 'review' | 'comparison' | 'best' | 'guide';
  category: string;
  date: string;
  readingTime?: string;
}

const TYPE_ROUTES: Record<string, string> = {
  review: 'reviews',
  comparison: 'comparisons',
  best: 'best',
  guide: 'guides',
};

const TYPE_LABELS: Record<string, string> = {
  review: 'Review',
  comparison: 'Comparison',
  best: 'Best Of',
  guide: 'Guide',
};

export default function SearchResults({ articles }: { articles: SearchArticle[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  const results = terms.length === 0
    ? []
    : articles.filter((a) => {
        const text = `${a.title} ${a.excerpt} ${a.category} ${a.type}`.toLowerCase();
        return terms.every((t) => text.includes(t));
      });

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-heading font-bold text-void-50 mb-6">
        Search
      </h1>

      {/* Search input */}
      <div className="relative max-w-xl mb-10">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-void-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools, categories, or comparisons..."
          autoFocus
          className="search-input !pl-12"
        />
      </div>

      {/* Results */}
      {terms.length === 0 ? (
        <p className="text-void-500">Type to search across all reviews, comparisons, and guides.</p>
      ) : results.length === 0 ? (
        <p className="text-void-500">
          No results for &ldquo;{query}&rdquo;. Try different keywords.
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-void-500 mb-4">
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
          {results.map((a) => (
            <Link
              key={`${a.type}-${a.slug}`}
              href={`/${TYPE_ROUTES[a.type]}/${a.slug}`}
              className="card p-5 no-underline block group hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="badge-accent text-[10px]">{TYPE_LABELS[a.type]}</span>
                    <span className="text-xs text-void-600">{a.category.replace(/-/g, ' ').replace('ai ', 'AI ')}</span>
                  </div>
                  <h3 className="text-base font-heading font-bold text-void-100 group-hover:text-accent-400 transition-colors mb-1">
                    {a.title}
                  </h3>
                  <p className="text-sm text-void-400 leading-relaxed line-clamp-2">
                    {a.excerpt}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-void-600">
                    {a.readingTime && <span>{a.readingTime}</span>}
                    <span>{a.date}</span>
                  </div>
                </div>
                <ArrowRight size={16} className="text-void-600 group-hover:text-accent-400 mt-1 shrink-0 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
