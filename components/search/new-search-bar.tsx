"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { redirect } from 'next/navigation';

export default function NewSearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem('query', query)
    router.push('/private/search_results')
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}  // Update the state when the input changes
        placeholder="Juicy birria tacos with sprite..."
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};
