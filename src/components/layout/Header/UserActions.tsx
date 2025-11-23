import Link from "next/link";
import AccountDropdown from "./AccountDropdown";
import CartIcon from "./CartIcon";
import { UserActionsProps } from "@/lib/types";
import { Button } from "@/components/common/Button";


export default function UserActions({ isAuthenticated = false }: UserActionsProps) {
  return (
    <div className="flex items-center">
        <div className="flex items-center ">
          {/* Cart */}
          <CartIcon itemCount={0} />

          {/* Account Dropdown */}
          <AccountDropdown isAuthenticated={isAuthenticated} />
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </Link>
        </div>
      
    </div>
  );
}