"use client";

import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
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
  const [isClicked, setIsClicked] = useState(false);
  
  // We’ll measure the front content's height so the card size never changes.
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggling reviews
    if (!onFavorite) return;
    setIsLoading(true);
    try {
      await onFavorite(restaurant.restaurant_id, isFavorited);
      toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
    } catch (error) {
      toast.error('Failed to update favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    setIsClicked((prev) => !prev);
  };

  // Convert reviews from a '|' delimited string into a multi-line string
  const reviewArr = restaurant.reviews.split('|');
  let reviews = '';
  for (let i = 0; i < reviewArr.length; i++) {
    const trimmed = reviewArr[i].trim();
    if (!trimmed) continue;
    reviews += `\n\nReview ${i + 1}: ${trimmed}`;
  }

  // Measure the front's height once it mounts or updates.
  useEffect(() => {
    if (frontRef.current && cardHeight === null) {
      setCardHeight(frontRef.current.clientHeight);
    }
  }, [frontRef, cardHeight]);

  return (
    // Parent container that will set a fixed height
    // based on the frontRef's measured height.
    <div
      className="relative w-full max-w-sm mx-auto rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
      onClick={handleCardClick}
      // If we have measured a height, fix the container to that height.
      style={{ height: cardHeight ? cardHeight : 'auto' }}
    >

      <div ref={frontRef}>
        <Card className="w-full rounded-xl pointer-events-none">
          {/* pointer-events-none ensures clicks go "through" to the parent */}
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {restaurant.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-bold">Description:</span>{' '}
              {restaurant.description === '' ? 'None provided' : restaurant.description}
            </p>

            {restaurant.photo && (
              <div className="mb-4">
                <img
                  src={restaurant.photo}
                  alt={`${restaurant.name} photo`}
                  className="w-full h-40 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            {score !== undefined && (
              <div className="mt-2 text-sm text-gray-500">
                Match score: {Math.round(score * 100)}%
              </div>
            )}

            <p className="text-sm text-gray-600 mt-4">
              <span className="font-bold">Click to view reviews.</span>
            </p>
          </CardContent>

          <CardFooter className="p-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">{restaurant.city}</span>
            {onFavorite && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFavorite}
                disabled={isLoading}
                className="hover:bg-gray-100 active:bg-gray-200 transition-all pointer-events-auto"
                // pointer-events-auto ensures the button *does* receive clicks
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorited ? 'text-red-500' : 'text-gray-500'
                  }`}
                />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      {isClicked && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-white rounded-xl p-4 overflow-y-auto pointer-events-auto shadow-lg"
          // pointer-events-auto here so it can receive scroll/click, etc.
          // The user can scroll but still see the same container size
          // as the front content.
        >
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {restaurant.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4">
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              <span className="font-bold">Reviews:</span> 
              {reviews || '\n\n(No Reviews)'}
            </p>
          </CardContent>

          <CardFooter className="p-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">{restaurant.city}</span>
            {onFavorite && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFavorite(e);
                }}
                disabled={isLoading}
                className="hover:bg-gray-100 active:bg-gray-200 transition-all pointer-events-auto"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorited ? 'text-red-500' : 'text-gray-500'
                  }`}
                />
              </Button>
            )}
          </CardFooter>
        </div>
      )}
    </div>
  );
}
