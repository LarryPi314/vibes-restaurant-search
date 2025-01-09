'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { RestaurantCard } from '../restaurants/restaurant-card'
import { Restaurant } from '@/lib/types'
import { redirect } from 'next/navigation'

export default function Favorites() {
    const [favorites, setFavorites] = useState<Restaurant[]>([])
    const [loading, setLoading] = useState(true)
    
    // Function to fetch favorites
    const getFavorites = async () => {
        console.log("running get favorites")
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
            console.log("DATA", data.restaurants)
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
          body: JSON.stringify({ restaurantId, isFavorited}),
        });
    
        if (!response.ok) throw new Error('Failed to update favorite');
        
        setFavorites(prev => {
            const next = [...prev]
            return next.filter(restaurant => restaurant.restaurant_id !== restaurantId);
        })
    };

    // Run the fetch operation when the component mounts
    useEffect(() => {
        getFavorites()
        console.log(favorites)
    }, []) // Empty dependency array means this runs only once when the component mounts

    if (loading) return <div>Loading...</div>

    return (
        <div className="h-full flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
            <Button onClick = {getFavorites}>
                Refresh your favorite restaurants
            </Button>
            <ul className="mt-4">
                {favorites.map((restaurant) => (
                    <li key={restaurant.restaurant_id} className="mb-4">
                        <RestaurantCard 
                        key={restaurant.restaurant_id}
                        restaurant={restaurant} 
                        isFavorited={true}
                        onFavorite={handleFavorite}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )

}