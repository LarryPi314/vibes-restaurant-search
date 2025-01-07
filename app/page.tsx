import { SearchSection } from '@/components/search/search-section';
import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default async function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="max-w-sm mx-auto">
          <p className="text-center mb-4 text-muted-foreground">
            Finding underground taco spots 🌮 should be easy. Enter your cravings and let's find you a spot!
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
    </main>
  );
}
