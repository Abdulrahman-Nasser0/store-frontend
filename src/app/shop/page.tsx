
"use client";

import { useSearchParams } from "next/navigation";
import { useLaptops } from "@/hooks/useLaptops";
import LaptopsGrid from "@/components/products/LaptopsGrid";

export default function Shop() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const categoryIdParam = searchParams.get("categoryId");
  const search = searchParams.get("search");

  // Parse categoryId if provided, otherwise undefined
  const categoryId = categoryIdParam ? parseInt(categoryIdParam, 10) : undefined;

  const { laptops, loading, error } = useLaptops(1000, search || undefined, categoryId);

  // Dynamic title based on filters
  const getPageTitle = () => {
    if (categoryParam) {
      return `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Laptops`;
    }
    if (categoryId) {
      return `Category ${categoryId} Laptops`;
    }
    if (search) {
      return `Search Results for "${search}"`;
    }
    return "Shop Laptops";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
        </div>
        <LaptopsGrid laptops={laptops} loading={loading} error={error} />
      </div>
    </div>
  );
}
