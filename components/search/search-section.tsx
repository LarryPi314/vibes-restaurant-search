"use client";

import { useEffect, useState } from 'react';
import { RestaurantCard } from '../restaurants/restaurant-card';
import { SearchResult } from '@/lib/types';
import { toast } from 'sonner';

export function SearchSection() {
  const query = sessionStorage.getItem('query');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [vibeDescriptions, setVibeDescriptions] = useState<{ [id: string]: string | undefined }>({});

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

  const handleFavorite = async (restaurantId: string, isFavorited: boolean) => {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantId, isFavorited}),
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

  const getMatchExplanation = async (restaurant: any) => {
    const restaurantData = {
      query,
      restaurant_name: restaurant?.name,
      description: restaurant?.description,
      reviews: restaurant?.reviews,
    };
    try {
      const response = await fetch('/api/details/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantData }),
      });

      if (!response.ok) throw new Error('Failed to fetch details');
      
      const data = await response.json();
      const { matchDetails } = data;
      return matchDetails as string;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          {results.map(({ restaurant, score }) => (
            <div className="flex items-stretch" key={restaurant.restaurant_id}>
              <RestaurantCard
                restaurant={restaurant}
                score={score}
                vibeDescription={vibeDescriptions[restaurant.restaurant_id]}
                isFavorited={favorites.has(restaurant.restaurant_id)}
                onFavorite={handleFavorite}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">No results found</div>
      )}
    </div>
  );
}
