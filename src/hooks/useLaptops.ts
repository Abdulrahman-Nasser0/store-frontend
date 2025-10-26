'use client'

import { useEffect, useState } from "react";

import { getLaptops } from "@/lib/api";
import type { Laptop } from "@/lib/types";


export function useLaptops(pageSize = 9, search?: string, category?: string) {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchLaptops() {
      setLoading(true);
      try {
        // Fetch all laptops first (remove category from API call to get all data)
        const laptopsResponse = await getLaptops({ pageSize: 1000, search });
        if (!isMounted) return;
        if (laptopsResponse.isSuccess) {
          let filteredLaptops = laptopsResponse.data?.items || [];

          // Apply client-side category filtering if category is specified
          if (category) {
            filteredLaptops = filteredLaptops.filter(laptop => {
              // Handle different category formats
              if (typeof laptop.category === 'string') {
                return laptop.category.toLowerCase() === category.toLowerCase();
              } else if (laptop.category && typeof laptop.category === 'object' && 'name' in laptop.category) {
                return (laptop.category as any).name?.toLowerCase() === category.toLowerCase();
              }
              return false;
            });
          }

          setLaptops(filteredLaptops);
          setError(null);
        } else {
          setLaptops([]);
          setError(laptopsResponse.message || "Failed to fetch laptops");
        }
      } catch {
        if (!isMounted) return;
        setLaptops([]);
        setError("An error occurred while fetching laptops");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchLaptops();
    return () => {
      isMounted = false;
    };
  }, [pageSize, search, category]);

  return { laptops, loading, error };
}
