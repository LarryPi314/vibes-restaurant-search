"use client";
import { useEffect, useState } from 'react';
export default function QueryIntro() {
    const query = sessionStorage.getItem('query');
    const [queryIntro, setQueryIntro] = useState('');

    if (!query) {
      return null;
    }

    const getQueryIntro = async (restaurantId: string) => {
      const response = await fetch(`/api/details?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        setQueryIntro(data.output);
      }

      if (!response.ok) throw new Error('Failed to fetch details');
    }
    

    useEffect(() => {
        if (query) {
          getQueryIntro(query);
        }
    }, [query]);

    return (
        <p className="text-lg mt-2">
           {query} --- {queryIntro}
        </p>
    );
}