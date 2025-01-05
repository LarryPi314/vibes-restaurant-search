"use client";

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Restaurant } from '@/lib/types';
import { toast } from 'sonner';

interface RestaurantCardProps {
  restaurant: Restaurant;
  score?: number;
  isFavorited?: boolean;
  onFavorite?: (id: string) => Promise<void>;
}

export function RestaurantCard({ 
  restaurant, 
  score, 
  isFavorited = false,
  onFavorite 
}: RestaurantCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async () => {
    if (!onFavorite) return;
    setIsLoading(true);
    try {
      await onFavorite(restaurant.id);
      toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      toast.error('Failed to update favorites');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{restaurant.name}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {restaurant.priceRange} • {restaurant.cuisine}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{restaurant.description}</p>
        <p className="text-sm italic">&quot;{restaurant.vibeDescription}&quot;</p>
        {score !== undefined && (
          <div className="mt-2 text-sm text-muted-foreground">
            Match score: {Math.round(score * 100)}%
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">{restaurant.location}</span>
        {onFavorite && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavorite}
            disabled={isLoading}
          >
            <Heart 
              className={`h-4 w-4 ${isFavorited ? 'fill-current text-red-500' : ''}`} 
            />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}