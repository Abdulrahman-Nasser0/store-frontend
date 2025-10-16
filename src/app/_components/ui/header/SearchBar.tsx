import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="flex-1 max-w-lg mx-8 hidden md:block">
      <form onSubmit={handleSearch} className={`relative ${isSearchFocused ? 'ring-2 ring-blue-500' : ''}`}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search laptops, brands, specifications..."
          className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
          onClick={() => {
            if (searchQuery.trim()) {
              handleSearch({ preventDefault: () => {} } as React.FormEvent);
            }
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </form>
    </div>
  );
}