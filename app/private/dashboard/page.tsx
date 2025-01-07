// This will be our user's favorite page. 
// It is protected, meaning only logged in users can see it. 

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import SearchBar from '@/components/search/search-bar'
import { SearchSection } from '@/components/search/search-section'
import Signout from '@/components/dashboard/signout'
import { Button } from '@/components/ui/button'
import Favorites from '@/components/dashboard/restaurant-favorites'

export default async function Dashboard() {
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
      <p>Hello {data.user.email}, here are some of your favorite restaurants.</p>
      
      <Signout />
      <Favorites/>
      <SearchBar />
    </>
  ) 
}