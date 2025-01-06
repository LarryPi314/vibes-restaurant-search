// This will be our user's favorite page. 
// It is protected, meaning only logged in users can see it. 

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import SearchBar from '@/components/search/search-bar'
import { SearchSection } from '@/components/search/search-section'

export default async function PrivatePage() {
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
      <SearchBar />
    </>
  ) 
}