"use client";

import { useEffect, useState } from 'react';
import { SearchBar } from './search-bar';
import { RestaurantCard } from '../restaurants/restaurant-card';
import { SearchResult } from '@/lib/types';
import { toast } from 'sonner';

interface SearchSectionProps {
  userId: string;
}
// TODO why do we need userId?
export function SearchSection({ userId }: SearchSectionProps) {
  const query = sessionStorage.getItem('query');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      setResults(data.results);
      
    } catch (error) {
      toast.error('Failed to search restaurants');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);
  const handleFavorite = async (restaurantId: string) => {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantId }),
    });

    if (!response.ok) throw new Error('Failed to update favorite');
    
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(restaurantId)) {
        next.delete(restaurantId);
      } else {
        next.add(restaurantId);
      }
      return next;
    });
  };

  const handleRestaurantClick = async (id: string) => {
    console.log("todo")
  }

  return (
    <div className="space-y-8">      
      {results.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map(({ restaurant, score }) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              score={score}
              isFavorited={favorites.has(restaurant.id)}
              onFavorite={handleFavorite}
              onClick={handleRestaurantClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}