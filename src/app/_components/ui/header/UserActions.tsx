import Link from "next/link";
import { logout } from "../../../lib/actions";

interface UserActionsProps {
  isAuthenticated?: boolean;
}

export default function UserActions({ isAuthenticated = false }: UserActionsProps) {
  return (
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
              <form action={logout} className="px-4 py-2 hover:bg-gray-100">
                <button type="submit" className="text-red-600 cursor-pointer hover:text-red-800 text-sm w-full text-left">
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
    </div>
  );
}