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
  vibeDescription?: string;
  isFavorited?: boolean;
  onFavorite?: (id: string, isFavorited: boolean) => Promise<void>;
}

export function RestaurantCard({ 
  restaurant, 
  score, 
  vibeDescription,
  isFavorited = false,
  onFavorite,
}: RestaurantCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!onFavorite) return;
    setIsLoading(true);
    try {
      console.log(restaurant.restaurant_id);
      await onFavorite(restaurant.restaurant_id, isFavorited);
      toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      toast.error('Failed to update favorites');
    } finally {
      setIsLoading(false);
    }
  };
  console.log("in restaurant card")
  console.log(vibeDescription)

  return (
    <Card className="w-full cursor-pointer">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{restaurant.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">{restaurant.description}</p>
        {restaurant.photo && (
          <div className="mb-4">
            <img
              src={restaurant.photo}
              alt={`${restaurant.name} photo`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {score !== undefined && (
          <div className="mt-2 text-sm text-muted-foreground">
            Match score: {Math.round(score * 100)}%
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">{restaurant.city}</span>
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