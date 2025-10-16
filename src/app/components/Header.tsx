'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "../lib/actions";

interface HeaderProps {
  isAuthenticated?: boolean;
}

export default function Header({ isAuthenticated = false }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => {
    return pathname === path ? "text-blue-600 font-medium" : "text-gray-700 hover:text-gray-900";
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm">
        <p>🚀 Free shipping on orders over $1000 | Limited time offer!</p>
      </div>

      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center mr-12">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-gray-900">TechZone</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`${isActive("/")} transition-colors duration-200`}>Home</Link>

              {/* Shop Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-200">
                  <span>Shop</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link href="/shop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Laptops</Link>
                    <Link href="/shop?category=ultrabook" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ultrabooks</Link>
                    <Link href="/shop?category=gaming" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Gaming Laptops</Link>
                    <Link href="/shop?category=business" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Business Laptops</Link>
                    <Link href="/shop?category=creator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Creator Laptops</Link>
                    <Link href="/shop?category=student" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Student Laptops</Link>
                    <Link href="/shop?category=workstation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Workstation</Link>
                    <Link href="/shop?category=2-in-1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">2-in-1 Laptops</Link>
                  </div>
                </div>
              </div>

              {/* Brands Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-200">
                  <span>Brands</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link href="/shop?brand=apple" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Apple</Link>
                    <Link href="/shop?brand=dell" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dell</Link>
                    <Link href="/shop?brand=hp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">HP</Link>
                    <Link href="/shop?brand=lenovo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Lenovo</Link>
                    <Link href="/shop?brand=acer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Acer</Link>
                    <Link href="/shop?brand=asus" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">ASUS</Link>
                  </div>
                </div>
              </div>

              <Link href="/deals" className={`${isActive("/deals")} transition-colors duration-200`}>Deals</Link>
            </div>

            {/* Search Bar */}
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

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <Link href="/wishlist" className="text-gray-700 hover:text-red-500 transition-colors duration-200 hidden md:block">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="text-gray-700 hover:text-gray-900 relative transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
              </Link>

              {/* Account */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="text-gray-700 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Order History</Link>
                      <Link href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Wishlist</Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <form action={logout} className="px-4 py-2">
                        <button type="submit" className="text-red-600 hover:text-red-800 text-sm w-full text-left">
                          Sign Out
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                    Sign In
                  </Link>
                  <Link href="/signup" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-700 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search laptops..."
                    className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
          )}
        </div>
      </nav>
    </>
  );
}
