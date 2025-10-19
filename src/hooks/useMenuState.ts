import { useState, Dispatch, SetStateAction } from "react";

export function useMenuState(): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);
  return [isMenuOpen, toggleMenu, setIsMenuOpen];
}
