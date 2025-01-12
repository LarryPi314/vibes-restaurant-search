import Signout from "../dashboard/signout";


export default function Header({ title = "Vibe & Dine", showSearchBar = false, backLink = "/private/dashboard/" }) {
    return (
      <header className="sticky top-0 bg-white shadow-md z-10 w-full px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          {title}
        </h1>
          <Signout />
      </header>
    );
}