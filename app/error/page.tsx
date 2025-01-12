'use client'

import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        {/* Error Icon */}
        <div className="flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-12 h-12 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21.21 13a9 9 0 11-18.42 0 9 9 0 0118.42 0z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          We’re sorry for the inconvenience. 
        </p>

        {/* Return Button */}
        <button
          onClick={() => router.push('/')}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
