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
        className="text-gray-700 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-200"
      >
        {trigger}
        <svg className="w-4 h-4 pl-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} mt-2 w-48 bg-white rounded-md shadow-lg transition-all duration-200 z-50 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      } group-hover:opacity-100 group-hover:visible`}>
        {children ? (
          children
        ) : (
          <div className="py-1">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}