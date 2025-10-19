'use client'

import { useEffect, useState } from "react";

import { getLaptops } from "@/lib/api";
import type { Laptop } from "@/lib/types";


export function useLaptops(pageSize = 9) {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchLaptops() {
      setLoading(true);
      try {
        const laptopsResponse = await getLaptops({ pageSize });
        if (!isMounted) return;
        if (laptopsResponse.isSuccess) {
          setLaptops(laptopsResponse.data?.items || []);
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
  }, [pageSize]);

  return { laptops, loading, error };
}
