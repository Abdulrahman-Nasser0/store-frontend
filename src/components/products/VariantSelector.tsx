'use client';

import React from 'react';
import type { VariantSelectorProps } from '@/lib/types';
import { 
  formatPrice, 
  formatStorage, 
  formatRAM,
  getStockBadgeColor,
  getStockStatusLabel,
  isVariantAvailable,
  getDiscountBadgeColor
} from '@/lib/utils';
import clsx from 'clsx';



export default function VariantSelector({ 
  variants, 
  selectedVariant, 
  onVariantSelect 
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-600">No variants available for this laptop.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Select Configuration
        </h3>
        <span className="text-sm text-gray-500">
          {variants.length} {variants.length === 1 ? 'option' : 'options'} available
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {variants.map((variant) => {
          const isSelected = selectedVariant?.id === variant.id;
          const available = isVariantAvailable(
            variant.stockStatus, 
            variant.availableQuantity, 
            variant.isActive
          );
          const stockColors = getStockBadgeColor(variant.stockStatus);
          const hasDiscount = variant.discountPercentage > 0;
          const discountColors = getDiscountBadgeColor(variant.discountPercentage);

          return (
            <button
              key={variant.id}
              onClick={() => available && onVariantSelect(variant)}
              disabled={!available}
              className={clsx(
                'relative text-left border-2 rounded-lg p-4 transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm',
                !available && 'opacity-60 cursor-not-allowed bg-gray-50'
              )}
            >
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3">
                  <div className="bg-blue-500 rounded-full p-1">
                    <svg 
                      className="w-4 h-4 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 pr-8">
                  {/* Configuration */}
                  <div className="font-medium text-gray-900 text-base mb-1">
                    {formatRAM(variant.ram)} • {formatStorage(variant.storage)} {variant.storageType}
                  </div>
                  
                  {/* SKU */}
                  <div className="text-xs text-gray-500 font-mono">
                    SKU: {variant.sku}
                  </div>
                </div>
              </div>

              {/* Price and Stock Section */}
              <div className="flex items-end justify-between">
                <div className="flex-1">
                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(variant.currentPrice)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(variant.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Discount Badge */}
                  {hasDiscount && (
                    <div className="mt-1">
                      <span className={clsx(
                        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                        discountColors.bg,
                        discountColors.text
                      )}>
                        Save {variant.discountPercentage}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Stock Status */}
                <div className="text-right">
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
                    stockColors.bg,
                    stockColors.text,
                    stockColors.border
                  )}>
                    {getStockStatusLabel(variant.stockStatus)}
                  </span>
                  
                  {/* Available quantity for low stock */}
                  {variant.stockStatus === 'LowStock' && variant.availableQuantity > 0 && (
                    <div className="text-xs text-gray-600 mt-1">
                      Only {variant.availableQuantity} left
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
