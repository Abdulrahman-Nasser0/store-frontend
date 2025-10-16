import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DesktopNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "text-blue-600 font-medium" : "text-gray-700 hover:text-gray-900";
  };

  return (
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
  );
}