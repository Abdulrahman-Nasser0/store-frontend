import Link from "next/link";
import AccountDropdown from "./AccountDropdown";
import CartIcon from "./CartIcon";
import { UserActionsProps } from "@/lib/types";


export default function UserActions({ isAuthenticated = false }: UserActionsProps) {
  return (
    <div className="flex items-center">
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <CartIcon itemCount={0} />

          {/* Account Dropdown */}
          <AccountDropdown isAuthenticated={isAuthenticated} />
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/login" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            Sign In
          </Link>
          <Link href="/signup" className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            Sign Up
          </Link>
        </div>
      
    </div>
  );
}