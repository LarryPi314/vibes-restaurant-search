import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { SearchSection } from '@/components/search/search-section';
import SearchBar from '@/components/search/search-bar';
import QueryIntro from '@/components/details/query-intro';
import Link from 'next/link';

export default async function SearchResultsPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Main container padding */}
      <div className="px-4 lg:px-8 py-6">
        {/* Query & Matches Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          
          {/* Query Intro Section */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
              You searched for...
            </h1>
            <div className="bg-white shadow-md rounded-lg p-4">
              <QueryIntro />
              <div className="mt-4">
                <SearchBar />
              </div>
            </div>
          </div>

          {/* Matches Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6">Matches</h2>
            <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
              <SearchSection />
            </div>
          </div>
        </div>

        {/* Redirect to Dashboard Link */}
        <div className="text-center mt-8">
          <Link
            href="/private/dashboard/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded shadow-md hover:opacity-90 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
