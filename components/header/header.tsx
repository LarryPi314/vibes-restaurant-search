import Link from 'next/link';
import SearchBar from '@/components/search/search-bar';
import Signout from '../dashboard/signout';

export default function Header({ title = "Vibe & Dine", showSearchBar = false, backLink = "/private/dashboard/" }) {
  return (
    <header className="sticky top-0 bg-white shadow-md z-10 w-full px-4 py-3 flex items-center justify-between">
      {/* Page Title */}
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
     
        <Signout />
    </header>
  );
}
