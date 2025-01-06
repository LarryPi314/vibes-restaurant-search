import { SearchSection } from '@/components/search/search-section';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AuthForm } from '@/components/auth/auth-form';
import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Find Your Perfect Restaurant Vibe
      </h1>
      (
        <div className="max-w-sm mx-auto">
          <p className="text-center mb-4 text-muted-foreground">
            Sign in to start discovering restaurants that match your vibe
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      )
    </main>
  );
}