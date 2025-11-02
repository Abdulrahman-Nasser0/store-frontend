"use client";

import { useMenuState } from "@/hooks/useMenuState";
import PromotionalBanner from "./PromotionalBanner";
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
  isAuthenticated?: boolean;
}


export default function Header({ isAuthenticated = false }: HeaderProps) {
  const [isMenuOpen, toggleMenu, setIsMenuOpen] = useMenuState();

  return (
    <>
      <PromotionalBanner />

      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-2">
            <Logo />

            <DesktopNavigation />

            <SearchBar />

            <div className="flex items-center gap-2">
              <UserActions isAuthenticated={isAuthenticated} />

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden cursor-pointer text-gray-700 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          <MobileMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </nav>
    </>
  );
}
