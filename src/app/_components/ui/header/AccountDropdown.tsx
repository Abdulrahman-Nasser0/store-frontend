import Link from "next/link";
import { logout } from "../../../lib/actions";
import Dropdown from "./Dropdown";

export default function AccountDropdown() {
  const trigger = (
    <>
      <svg className="w-6 h-6 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </>
  );

  return (
    <Dropdown trigger={trigger} align="right">
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
    </Dropdown>
  );
}