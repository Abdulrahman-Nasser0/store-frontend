'use client';

import  { useState, useEffect } from 'react';
import { useVariants } from '@/hooks/useVariants';
import VariantSelector from '@/components/products/VariantSelector';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import { Button } from '@/components/common/Button';
import type { LaptopVariantDetailed, LaptopVariantsClientProps } from '@/lib/types';
import { formatPrice, isVariantAvailable } from '@/lib/utils';



export default function LaptopVariantsClient({ laptopId, token }: LaptopVariantsClientProps) {
  const { variants, loading, error, refetch } = useVariants({
    laptopId,
    pageSize: 20, // Get more variants at once
    token
  });

  const [selectedVariant, setSelectedVariant] = useState<LaptopVariantDetailed | null>(null);

  // Auto-select first available variant
  useEffect(() => {
    if (variants.length > 0 && !selectedVariant) {
      const firstAvailable = variants.find(v => 
        isVariantAvailable(v.stockStatus, v.availableQuantity, v.isActive)
      );
      if (firstAvailable) {
        setSelectedVariant(firstAvailable);
      }
    }
  }, [variants, selectedVariant]);

  if (loading) {
    return (
      <div className="py-8">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        title="Unable to load variants"
        message={error}
        actionButton={{
          text: "Try Again",
          onClick: refetch
        }}
      />
    );
  }

  if (!variants || variants.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <svg 
          className="w-12 h-12 text-gray-400 mx-auto mb-3" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
          />
        </svg>
        <p className="text-gray-600 font-medium">No configurations available</p>
        <p className="text-sm text-gray-500 mt-1">Check back later for available variants</p>
      </div>
    );
  }

  const available = selectedVariant 
    ? isVariantAvailable(selectedVariant.stockStatus, selectedVariant.availableQuantity, selectedVariant.isActive)
    : false;

  return (
    <div className="space-y-6">
      {/* Variant Selector */}
      <VariantSelector
        variants={variants}
        selectedVariant={selectedVariant}
        onVariantSelect={setSelectedVariant}
      />

      {/* Selected Variant Details & Actions */}
      {selectedVariant && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Selected Configuration</h4>
              <p className="text-lg font-semibold text-gray-900">
                {selectedVariant.ram}GB RAM • {selectedVariant.storage}GB {selectedVariant.storageType}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {formatPrice(selectedVariant.currentPrice)}
              </div>
              {selectedVariant.discountPercentage > 0 && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(selectedVariant.originalPrice)}
                </div>
              )}
            </div>
          </div>

          {/* Cart Button */}
          <div className="flex gap-3">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!available}
              className="font-semibold"
            >
              {available ? 'Add to Cart' : 'Out of Stock'}
            </Button>
           
          </div>

          {/* Additional Info */}
          {selectedVariant.stockStatus === 'LowStock' && (
            <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <svg 
                className="w-5 h-5 shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              <span>
                Hurry! Only {selectedVariant.availableQuantity} left in stock
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
