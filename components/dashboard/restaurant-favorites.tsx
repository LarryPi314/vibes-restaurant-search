'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { RestaurantCard } from '../restaurants/restaurant-card'
import { Restaurant } from '@/lib/types'

export default function Favorites() {
  const [favorites, setFavorites] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
    
  // Function to fetch favorites
  const getFavorites = async () => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Failed to fetch favorites')
      const data = await response.json()
      setFavorites(data.restaurants)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
    
  const handleFavorite = async (restaurantId: string, isFavorited: boolean) => {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantId, isFavorited }),
    })
    if (!response.ok) throw new Error('Failed to update favorite')
        
    setFavorites((prev) => prev.filter((r) => r.restaurant_id !== restaurantId))
  }

  useEffect(() => {
    getFavorites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-white via-gray-50 to-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Favorite Restaurants</h2>

      <Button
        onClick={getFavorites}
        className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 focus:ring-2 focus:ring-purple-400"
      >
        Refresh your favorite restaurants
      </Button>

      {/* Responsive grid: 1 column on small screens, 2 on small/medium, 3 on larger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {favorites.map((restaurant) => (
          <RestaurantCard 
            key={restaurant.restaurant_id}
            restaurant={restaurant} 
            isFavorited={true}
            onFavorite={handleFavorite}
          />
        ))}
      </div>
    </div>
  )
}
