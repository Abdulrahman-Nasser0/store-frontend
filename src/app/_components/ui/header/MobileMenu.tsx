import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isAuthenticated?: boolean;
}

export default function MobileMenu({ isMenuOpen, setIsMenuOpen, isAuthenticated = false }: MobileMenuProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden border-t border-gray-200 py-4">
      <div className="space-y-4">
        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search laptops..."
            className="w-full pl-4 pr-12 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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

        {/* Mobile Navigation */}
        <div className="space-y-2">
          <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/shop" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link href="/deals" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>Deals</Link>
          <Link href="/wishlist" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
          <Link href="/cart" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>Cart</Link>
        </div>

        {/* Mobile Auth */}
        {!isAuthenticated && (
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <Link href="/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
            <Link href="/signup" className="block px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-center" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
}