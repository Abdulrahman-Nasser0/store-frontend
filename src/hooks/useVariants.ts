'use client';

import { useEffect, useState } from 'react';
import { getLaptopVariants } from '@/lib/api';
import type { LaptopVariantDetailed, LaptopVariantInfo, UseVariantsOptions, UseVariantsReturn } from '@/lib/types';



export function useVariants({
  laptopId,
  page = 1,
  pageSize = 10,
  inStockOnly = false,
  token
}: UseVariantsOptions): UseVariantsReturn {
  const [variants, setVariants] = useState<LaptopVariantDetailed[]>([]);
  const [laptopInfo, setLaptopInfo] = useState<LaptopVariantInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchVariants = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getLaptopVariants({
        laptopId,
        page,
        pageSize,
        inStockOnly,
        token
      });

      if (response.isSuccess && response.data) {
        setVariants(response.data.variants.items);
        setLaptopInfo(response.data.laptop);
        setTotalCount(response.data.variants.totalCount);
        setError(null);
      } else {
        setVariants([]);
        setLaptopInfo(null);
        setTotalCount(0);
        setError(response.message || 'Failed to load variants');
      }
    } catch (err) {
      setVariants([]);
      setLaptopInfo(null);
      setTotalCount(0);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (laptopId) {
      fetchVariants();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [laptopId, page, pageSize, inStockOnly, token]);

  return {
    variants,
    laptopInfo,
    loading,
    error,
    totalCount,
    refetch: fetchVariants,
  };
}
