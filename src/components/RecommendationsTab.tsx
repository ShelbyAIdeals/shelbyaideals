'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import ToolListCard from '@/components/ToolListCard';
import { INTEREST_CATEGORY_MAP } from '@/lib/onboarding-data';
import { markRecommendationsSeen, getUserFavorites } from '@/lib/supabase';
import type { UserPreferences } from '@/lib/supabase';
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
}

interface RecommendationsTabProps {
  userId: string;
  preferences: UserPreferences | null;
  onSeen: () => void;
}

export default function RecommendationsTab({ userId, preferences, onSeen }: RecommendationsTabProps) {
  const [allReviews, setAllReviews] = useState<ReviewData[]>([]);
  const [favSlugs, setFavSlugs] = useState<Set<string>>(new Set());

  // Fetch static review data + favorites
  useEffect(() => {
    Promise.all([
      fetch('/data/reviews.json').then((r) => r.json()).catch(() => []),
      userId ? getUserFavorites(userId) : Promise.resolve([]),
    ]).then(([reviews, slugs]) => {
      setAllReviews(reviews);
      setFavSlugs(new Set(slugs));
    });
  }, [userId]);

  const handleFavoriteToggle = useCallback((toolSlug: string, newState: boolean) => {
    setFavSlugs((prev) => {
      const next = new Set(prev);
      if (newState) next.add(toolSlug);
      else next.delete(toolSlug);
      return next;
    });
  }, []);

  // Mark as seen on mount
  useEffect(() => {
    if (userId) {
      markRecommendationsSeen(userId);
      onSeen();
    }
  }, [userId, onSeen]);

  const recommendedTools = useMemo(() => {
    if (!preferences?.interests?.length) return [];

    const categories = new Set<string>();
    for (const interest of preferences.interests) {
      const mapped = INTEREST_CATEGORY_MAP[interest];
      if (mapped) mapped.forEach((c) => categories.add(c));
    }

    return allReviews
      .filter((r) => categories.has(r.category))
      .sort((a, b) => b.rating - a.rating);
  }, [allReviews, preferences]);

  if (!preferences?.interests?.length) {
    return (
      <div className="text-center py-16">
        <Sparkles size={32} className="text-void-600 mx-auto mb-3" />
        <p className="text-sm text-void-500">Complete onboarding to get personalized recommendations.</p>
      </div>
    );
  }

  if (recommendedTools.length === 0) {
    return (
      <div className="text-center py-16">
        <Sparkles size={32} className="text-void-600 mx-auto mb-3" />
        <p className="text-sm text-void-500">Loading recommendations...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-heading font-bold text-void-50 mb-1">Recommended For You</h2>
        <p className="text-sm text-void-400">Based on your interests, here are tools we think you'll love.</p>
      </div>
      <div className="flex flex-col gap-3">
        {recommendedTools.map((review) => (
          <ToolListCard
            key={review.slug}
            slug={review.slug}
            tool={review.tool}
            toolLogo={review.toolLogo}
            excerpt={review.excerpt}
            category={review.category as Category}
            rating={review.rating}
            bestFor={review.bestFor}
            date={review.date}
            isFavorited={favSlugs.has(review.slug.replace('-review', ''))}
            onFavoriteToggle={(newState) => handleFavoriteToggle(review.slug.replace('-review', ''), newState)}
          />
        ))}
      </div>
    </div>
  );
}
