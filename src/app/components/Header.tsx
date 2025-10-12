'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "../lib/actions";

interface HeaderProps {
  isAuthenticated?: boolean;
}

export default function Header({ isAuthenticated = false }: HeaderProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "text-blue-600 font-medium" : "text-gray-700 hover:text-gray-900";
  };

  if (!isAuthenticated) {
    // Header for unauthenticated users (home page)
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">TechStore</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
              <Link href="/signup" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Header for authenticated users
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-2xl font-bold text-blue-600">TechStore</Link>
            <Link href="/shop" className={isActive("/shop")}>Shop</Link>
            <Link href="/cart" className={isActive("/cart")}>Cart</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/profile" className={isActive("/profile")}>Profile</Link>
            <Link href="/dashboard" className={pathname === "/dashboard" ? "bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium" : "bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"}>
              Dashboard
            </Link>
            <form action={logout} className="inline">
              <button type="submit" className="text-red-600 hover:text-red-800 text-sm">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
