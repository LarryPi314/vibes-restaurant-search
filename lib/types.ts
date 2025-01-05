export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  priceRange: '£' | '££' | '£££' | '££££';
  location: string;
  vibeDescription: string;
  rating: number;
  embedding?: number[];
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