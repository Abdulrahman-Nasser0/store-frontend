import Link from "next/link";
import { logout } from "@/lib/actions";
import Dropdown from "./Dropdown";
import { Button } from "@/components/common/Button";

export default function AccountDropdown({isAuthenticated = false } : boolean) {
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
        <Link href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
        <div className="border-t border-gray-100 my-1"></div>
        {isAuthenticated ? (<form action={logout} className="px-4 py-2 hover:bg-gray-100">
          <Button
            type="submit"
            variant="danger"
            fullWidth
            className="text-sm text-left bg-transparent! text-red-600! hover:text-red-800! shadow-none px-0 py-0 h-auto"
            style={{ justifyContent: 'flex-start' }}
          >
            Sign Out
          </Button>
        </form>) : (null)}
      </div>
    </Dropdown>
  );
}