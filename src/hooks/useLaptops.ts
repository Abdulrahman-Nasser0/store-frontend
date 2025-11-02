'use client'

import { useEffect, useState } from "react";

import { getLaptops } from "@/lib/api";
import type { Laptop } from "@/lib/types";


export function useLaptops(pageSize = 9, search?: string, categoryId?: number) {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchLaptops() {
      setLoading(true);
      try {
        // Fetch laptops with the new API parameters
        const laptopsResponse = await getLaptops({ 
          pageSize, 
          search,
          categoryId,
          isActive: true // Only fetch active laptops
        });
        if (!isMounted) return;
        if (laptopsResponse.isSuccess) {
          const fetchedLaptops = laptopsResponse.data?.items || [];
          setLaptops(fetchedLaptops);
          setError(null);
        } else {
          setLaptops([]);
          setError(laptopsResponse.message || "Unable to load products");
        }
      } catch {
        if (!isMounted) return;
        setLaptops([]);
        setError("Unable to connect to our servers");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchLaptops();
    return () => {
      isMounted = false;
    };
  }, [pageSize, search, categoryId]);

  return { laptops, loading, error };
}
