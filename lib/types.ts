export interface Restaurant {
  restaurant_id: string;
  name: string;
  description: string;
  address?: string;
  city?: string;
  rating: number;
  embedding?: number[];
  reviews: string;
  photo?: string;
}

export interface SearchResult {
  restaurant: Restaurant;
  score: number;
}

export interface UserFavorite {
  userId: string;
  restaurantId: string;
  createdAt: string;
}