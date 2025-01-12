"use client";
import { useEffect, useState } from 'react';

export default function QueryIntro() {
  const query = sessionStorage.getItem('query');
  const [queryIntro, setQueryIntro] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  if (!query) {
    return null;
  }

  const getQueryIntro = async (query: string) => {
    try {
      const response = await fetch(`/api/details?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        setQueryIntro(data.output);
      } else {
        throw new Error('Failed to fetch details');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state to false once fetch is complete
    }
  };

  useEffect(() => {
    if (query) {
      getQueryIntro(query);
    }
  }, [query]);

  // Display loading spinner or message while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <p className="text-lg mt-2">
      {query} — {queryIntro}
    </p>
  );
}
