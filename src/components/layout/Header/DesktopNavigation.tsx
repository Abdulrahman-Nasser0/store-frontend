import Dropdown from "./Dropdown";

export default function DesktopNavigation() {
  const shopItems = [
    { label: "All Laptops", href: "/shop" },
    { label: "Ultrabooks", href: "/shop?category=ultrabook" },
    { label: "Gaming Laptops", href: "/shop?category=gaming" },
    { label: "Business Laptops", href: "/shop?category=business" },
    { label: "Creator Laptops", href: "/shop?category=creator" },
    { label: "Student Laptops", href: "/shop?category=student" },
    { label: "Workstation", href: "/shop?category=workstation" },
    { label: "2-in-1 Laptops", href: "/shop?category=2-in-1" },
  ];

  const brandItems = [
    { label: "Apple", href: "/shop?brand=apple" },
    { label: "Dell", href: "/shop?brand=dell" },
    { label: "HP", href: "/shop?brand=hp" },
    { label: "Lenovo", href: "/shop?brand=lenovo" },
    { label: "Acer", href: "/shop?brand=acer" },
    { label: "ASUS", href: "/shop?brand=asus" },
  ];

  return (
    <div className="hidden lg:flex items-center gap-1">
      <Dropdown trigger="Shop" items={shopItems} />
      <Dropdown trigger="Brands" items={brandItems} />
    </div>
  );
}