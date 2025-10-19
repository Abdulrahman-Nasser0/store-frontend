import { useState, useEffect, useRef, ReactNode } from "react";

interface ClickDropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
}

export default function ClickDropdown({ trigger, children, align = "left", className = "" }: ClickDropdownProps) {
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
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-gray-700 hover:text-gray-900 flex items-center space-x-1 transition-colors duration-200"
      >
        {trigger}
      </button>

      <div className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} mt-2 w-48 bg-white rounded-md shadow-lg transition-all duration-200 z-50 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {children}
      </div>
    </div>
  );
}