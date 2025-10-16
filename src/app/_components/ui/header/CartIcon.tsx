import Link from "next/link";

interface CartIconProps {
  itemCount?: number;
}

export default function CartIcon({ itemCount = 0 }: CartIconProps) {
  return (
    <Link href="/cart" className="text-gray-700 hover:text-gray-900 relative transition-colors duration-200">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3" />
      </svg>
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {itemCount}
      </span>
    </Link>
  );
}