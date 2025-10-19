
"use client";

import { useLaptops } from "@/hooks/useLaptops";
import LaptopsGrid from "@/components/ui/laptops-grid";

export default function Shop() {
  const { laptops, loading, error } = useLaptops(1000); // fetch all laptops (adjust pageSize as needed)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop Laptops</h1>
        </div>
        <LaptopsGrid laptops={laptops} loading={loading} error={error} />
      </div>
    </div>
  );
}
