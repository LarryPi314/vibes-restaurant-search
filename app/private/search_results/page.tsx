
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { SearchSection } from '@/components/search/search-section'

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
      <p>Hello {data.user.email}, here are some of your favorite restaurants.</p>
      <SearchSection userId={session.user.id} />
    </>
  ) 
}