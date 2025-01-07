import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { SearchSection } from '@/components/search/search-section'
import { Input } from 'postcss';
import SearchBar from '@/components/search/search-bar';
import QueryIntro from '@/components/details/query-intro';
import RestaurantMatchDetails from '@/components/details/restaurant-match-details';

export default async function SearchResultsPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login')
  }

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <>
      <div className="flex justify-between gap-8">
        {/* Query Intro Section */}
        <div className="flex-1 mb-8">
          <h1 className="text-2xl font-bold">You searched for...</h1>
          <QueryIntro />
          <RestaurantMatchDetails />
          <SearchBar />
        </div>

        {/* Matches Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Matches</h2>
          <SearchSection userId={session.user.id} />
        </div>
      </div>

    </>
  ) 
}