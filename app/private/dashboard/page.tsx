import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import SearchBar from '@/components/search/search-bar'
import { SearchSection } from '@/components/search/search-section'
import Signout from '@/components/dashboard/signout'
import { Button } from '@/components/ui/button'
import Favorites from '@/components/dashboard/restaurant-favorites'

export default async function Dashboard() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  console.log(data.user.id);
  const { data : data_user, error : error_user} = await supabase.from('users').select('*').eq('user_id', data.user.id);
  if (error_user || !data_user) {
    redirect('/login')
  }
  const name = data_user[0].name;
  
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-8">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-lg mb-6 text-gray-600">
          Hello <span className="font-semibold text-gray-900">{name}</span>, here are some of your favorite restaurants.
        </p>
        
        <Favorites />
        
        <div className="mt-8">
          <SearchBar />
        </div>
        
        <div className="mt-6">
          <Signout />
        </div>
      </div>
    </div>
  )
}
