import { SearchSection } from '@/components/search/search-section'
import Link from "next/link"
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      {/* Big, stylish heading */}
      <h1 className="text-center text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
        vibe & dine
      </h1>

  
      <div className="text-center text-5xl mb-6">🍱 🍙 🥮</div>

      {/* App description */}
      <p className="text-center mb-8 text-gray-700 max-w-xl leading-relaxed">
        Finding underrated hot pot spots should be easy.<br />
        Enter your cravings and let's find exactly what you're feeling for!
      </p>
      
      {/* CTA Button */}
      <Link
        href="/login"
        className="flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 md:text-base"
      >
        <span>Log in</span>
        <ArrowRightIcon className="w-5 md:w-6" />
      </Link>
    </main>
  )
}

// Where good vibes meets fine taste