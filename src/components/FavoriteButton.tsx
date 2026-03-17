'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { addFavorite, removeFavorite } from '@/lib/supabase';

interface FavoriteButtonProps {
  toolSlug: string;
  isFavorited: boolean;
  onToggle?: (newState: boolean) => void;
}

export default function FavoriteButton({ toolSlug, isFavorited, onToggle }: FavoriteButtonProps) {
  const { user } = useAuth();
  const [favorited, setFavorited] = useState(isFavorited);
  const [busy, setBusy] = useState(false);

  if (!user) return null;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    const newState = !favorited;
    setFavorited(newState);
    try {
      if (newState) {
        await addFavorite(user.id, toolSlug);
      } else {
        await removeFavorite(user.id, toolSlug);
      }
      onToggle?.(newState);
    } catch {
      setFavorited(!newState);
    }
    setBusy(false);
  };

  return (
    <button
      onClick={handleClick}
      className="p-1.5 rounded-lg hover:bg-void-700/50 transition-all cursor-pointer shrink-0"
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        size={16}
        className={favorited ? 'text-red-400 fill-red-400' : 'text-void-500 hover:text-red-400'}
      />
    </button>
  );
}
