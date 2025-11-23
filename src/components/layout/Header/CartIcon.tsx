import Link from "next/link";

interface CartIconProps {
  itemCount?: number;
}

export default function CartIcon({ itemCount = 0 }: CartIconProps) {
  return (
    <Link 
      href="/cart" 
      className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
      aria-label="Shopping cart"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
        {itemCount > 99 ? '99+' : itemCount}
      </span>
    </Link>
  );
}