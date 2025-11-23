import Link from "next/link";
import { ReactNode, useState, useEffect, useRef } from "react";

interface DropdownItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface DropdownProps {
  trigger: ReactNode;
  items?: DropdownItem[];
  children?: ReactNode;
  align?: "left" | "right";
}

export default function Dropdown({ trigger, items, children, align = "left" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative group" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1 transition-all duration-200 font-medium text-sm"
      >
        {trigger}
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-200 z-50 ${
        isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
      } group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}>
        {children ? (
          children
        ) : (
          <div className="py-2">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl"
                onClick={() => setIsOpen(false)}
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}