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
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-8 px-4 lg:px-8 py-6">
        {/* Query Intro Section */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">You searched for...</h1>
          <div className="bg-white shadow-sm rounded-lg p-4">
            <QueryIntro />
            <div className="mt-4">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Matches Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Matches</h2>
          <div className="space-y-4">
            <SearchSection userId={session.user.id} />
          </div>
        </div>
      </div>

      {/* Redirect to Dashboard Link */}
      <div className="text-center mt-8">
        <Link
          href="/private/dashboard/"
          className="px-6 py-3 bg-black text-white font-medium rounded shadow-md hover:bg-gray-800 transition"
          >
          Go to Dashboard
        </Link>
      </div>
    </>
  );
}
