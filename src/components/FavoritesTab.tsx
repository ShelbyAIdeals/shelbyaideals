'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { getUserFavorites, removeFavorite } from '@/lib/supabase';
import ToolListCard from '@/components/ToolListCard';
import type { Category } from '@/lib/types';

interface ReviewData {
  slug: string;
  tool: string;
  toolLogo?: string;
  excerpt: string;
  category: string;
  rating: number;
  bestFor: string;
  date: string;
  toolSlug?: string;
}

interface FavoritesTabProps {
  userId: string;
}

export default function FavoritesTab({ userId }: FavoritesTabProps) {
  const [allReviews, setAllReviews] = useState<ReviewData[]>([]);
  const [favSlugs, setFavSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/reviews.json').then((r) => r.json()).catch(() => []),
      getUserFavorites(userId),
    ]).then(([reviews, slugs]) => {
      setAllReviews(reviews);
      setFavSlugs(slugs);
      setLoading(false);
    });
  }, [userId]);

  const favoriteTools = allReviews.filter((r) => {
    const slug = r.toolSlug || r.slug.replace('-review', '');
    return favSlugs.includes(slug) || favSlugs.includes(r.slug);
  });

  const handleUnfavorite = async (toolSlug: string, reviewSlug: string) => {
    const slug = toolSlug || reviewSlug.replace('-review', '');
    setFavSlugs((prev) => prev.filter((s) => s !== slug && s !== reviewSlug));
    try {
      await removeFavorite(userId, slug);
    } catch {
      // Re-add on failure
      setFavSlugs((prev) => [...prev, slug]);
    }
  };

  if (loading) {
    return <div className="text-center py-16 text-void-500 text-sm">Loading favorites...</div>;
  }

  if (favoriteTools.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart size={32} className="text-void-600 mx-auto mb-3" />
        <p className="text-sm text-void-500">No favorites yet. Click the heart icon on any tool to add it here.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-heading font-bold text-void-50 mb-1">Your Favorite Tools</h2>
        <p className="text-sm text-void-400">{favoriteTools.length} tool{favoriteTools.length !== 1 ? 's' : ''} saved</p>
      </div>
      <div className="flex flex-col gap-3">
        {favoriteTools.map((review) => (
          <div key={review.slug} className="relative group">
            <ToolListCard
              slug={review.slug}
              tool={review.tool}
              toolLogo={review.toolLogo}
              excerpt={review.excerpt}
              category={review.category as Category}
              rating={review.rating}
              bestFor={review.bestFor}
              date={review.date}
            />
            <button
              onClick={() => handleUnfavorite(review.toolSlug || '', review.slug)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-void-700/50 transition-all cursor-pointer z-10"
              title="Remove from favorites"
            >
              <Heart size={16} className="text-red-400 fill-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
