import Link from "next/link";
import SearchBar from "./SearchBar";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isAuthenticated?: boolean;
}

export default function MobileMenu({ isMenuOpen, setIsMenuOpen, isAuthenticated = false }: MobileMenuProps) {
  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden border-t border-gray-200 py-4">
      <div className="space-y-4">
        {/* Mobile Search */}
        <SearchBar isMobile={true} onMenuClose={() => setIsMenuOpen(false)} />

        {/* Mobile Navigation */}
        <div className="space-y-1">
          <Link
            href="/shop"
            className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Shop
          </Link>
        </div>

        {/* Mobile Auth */}
        {!isAuthenticated && (
          <div className="border-t border-gray-200 pt-4 space-y-3">
            <Link
              href="/login"
              className="flex items-center justify-center w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium border border-gray-200 hover:border-blue-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </Link>
            <Link
              href="/signup"
              className="flex items-center justify-center w-full px-4 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}