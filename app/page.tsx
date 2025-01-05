import { SearchSection } from '@/components/search/search-section';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AuthForm } from '@/components/auth/auth-form';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Find Your Perfect Restaurant Vibe
      </h1>
      {session ? (
        <SearchSection userId={session.user.id} />
      ) : (
        <div className="max-w-sm mx-auto">
          <p className="text-center mb-4 text-muted-foreground">
            Sign in to start discovering restaurants that match your vibe
          </p>
          <AuthForm />
        </div>
      )}
    </main>
  );
}