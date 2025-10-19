import React from "react";
import LaptopCard from "@/components/ui/laptop-card";
import { LaptopsGridProps } from "@/lib/types";


export default function LaptopsGrid({ laptops, loading, error }: LaptopsGridProps) {
  return (
    <div className="min-h-[200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {loading ? (
        <div className="col-span-full flex justify-center items-center py-12">
          <span className="text-lg text-gray-500 animate-pulse">Loading laptops...</span>
        </div>
      ) : error ? (
        <div className="col-span-full flex justify-center items-center py-12">
          <span className="text-lg text-red-500">{error}</span>
        </div>
      ) : laptops.length === 0 ? (
        <div className="col-span-full flex justify-center items-center py-12">
          <span className="text-lg text-gray-500">No laptops found.</span>
        </div>
      ) : (
        laptops.map((laptop) => (
          <LaptopCard key={laptop.id} laptop={laptop} />
        ))
      )}
    </div>
  );
}

