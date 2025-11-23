"use client";

import { useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '@/lib/api';
import { getSessionToken } from '@/lib/actions';
import type { CartData, AddToCartRequest } from '@/lib/types';
import { USE_MOCK_DATA } from '@/lib/mock-data/config';
import { 
  getClientCart, 
  addClientCartItem, 
  updateClientCartItem, 
  removeClientCartItem, 
  clearClientCart 
} from '@/lib/clientCartStorage';

// Custom event for cart updates
const CART_UPDATE_EVENT = 'cart-updated';

export function useCart() {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (USE_MOCK_DATA) {
        // Use client-side storage for mock mode
        const clientCart = getClientCart();
        setCart(clientCart);
      } else {
        // Use server API for real mode
        const token = await getSessionToken();
        const response = await getCart(token || undefined);
        
        if (response.isSuccess) {
          setCart(response.data);
        } else {
          setError(response.message);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger cart update event to notify other components
  const notifyCartUpdate = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT));
    }
  }, []);

  const addItem = async (request: AddToCartRequest) => {
    try {
      if (USE_MOCK_DATA) {
        // For mock mode, we need to get the variant details first
        const { productId } = request;
        
        // We'll need to import the variant lookup
        const { getMockLaptopVariants } = await import('@/lib/mock-data/config');
        const { mockLaptops } = await import('@/lib/mock-data/mockData');
        
        let foundVariant = null;
        let foundLaptop = null;
        
        for (const laptop of mockLaptops) {
          const variantsResponse = getMockLaptopVariants(laptop.id, 1, 100);
          const variant = variantsResponse.variants.items.find(v => v.id === productId);
          if (variant) {
            foundVariant = variant;
            foundLaptop = laptop;
            break;
          }
        }
        
        if (!foundVariant || !foundLaptop) {
          return { success: false, message: 'Product not found' };
        }
        
        const response = addClientCartItem(
          productId,
          `${foundLaptop.modelName} - ${foundVariant.ram}GB RAM, ${foundVariant.storage}GB ${foundVariant.storageType}`,
          foundVariant.sku,
          foundVariant.currentPrice,
          foundVariant.discountAmount || 0,
          foundVariant.availableQuantity,
          foundLaptop.mainImage || '/fallback.jpeg',
          request.quantity
        );
        
        await fetchCart(); // Refresh cart
        notifyCartUpdate(); // Notify other components
        return { success: true, message: 'Item added to cart successfully' };
      } else {
        // Use server API for real mode
        const token = await getSessionToken();
        const response = await addToCart(request, token || undefined);
        
        if (response.isSuccess) {
          await fetchCart(); // Refresh cart
          notifyCartUpdate(); // Notify other components
          return { success: true, message: response.message };
        } else {
          return { success: false, message: response.message };
        }
      }
    } catch (err) {
      return { 
        success: false, 
        message: err instanceof Error ? err.message : 'Failed to add item to cart' 
      };
    }
  };

  const updateItem = async (itemId: number, quantity: number) => {
    try {
      if (USE_MOCK_DATA) {
        updateClientCartItem(itemId, quantity);
        await fetchCart(); // Refresh cart
        notifyCartUpdate(); // Notify other components
        return { success: true, message: 'Cart item updated successfully' };
      } else {
        const token = await getSessionToken();
        const response = await updateCartItem(itemId, { quantity }, token || undefined);
        
        if (response.isSuccess) {
          await fetchCart(); // Refresh cart
          notifyCartUpdate(); // Notify other components
          return { success: true, message: response.message };
        } else {
          return { success: false, message: response.message };
        }
      }
    } catch (err) {
      return { 
        success: false, 
        message: err instanceof Error ? err.message : 'Failed to update cart item' 
      };
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      if (USE_MOCK_DATA) {
        removeClientCartItem(itemId);
        await fetchCart(); // Refresh cart
        notifyCartUpdate(); // Notify other components
        return { success: true, message: 'Item removed from cart successfully' };
      } else {
        const token = await getSessionToken();
        const response = await removeCartItem(itemId, token || undefined);
        
        if (response.isSuccess) {
          await fetchCart(); // Refresh cart
          notifyCartUpdate(); // Notify other components
          return { success: true, message: response.message };
        } else {
          return { success: false, message: response.message };
        }
      }
    } catch (err) {
      return { 
        success: false, 
        message: err instanceof Error ? err.message : 'Failed to remove cart item' 
      };
    }
  };

  const clearAllItems = async () => {
    try {
      if (USE_MOCK_DATA) {
        clearClientCart();
        await fetchCart(); // Refresh cart
        notifyCartUpdate(); // Notify other components
        return { success: true, message: 'Cart cleared successfully' };
      } else {
        const token = await getSessionToken();
        const response = await clearCart(token || undefined);
        
        if (response.isSuccess) {
          await fetchCart(); // Refresh cart
          notifyCartUpdate(); // Notify other components
          return { success: true, message: response.message };
        } else {
          return { success: false, message: response.message };
        }
      }
    } catch (err) {
      return { 
        success: false, 
        message: err instanceof Error ? err.message : 'Failed to clear cart' 
      };
    }
  };

  useEffect(() => {
    fetchCart();
    
    // Listen for cart update events from other components
    const handleCartUpdate = () => {
      fetchCart();
    };
    
    window.addEventListener(CART_UPDATE_EVENT, handleCartUpdate);
    
    return () => {
      window.removeEventListener(CART_UPDATE_EVENT, handleCartUpdate);
    };
  }, [fetchCart]);

  return {
    cart,
    loading,
    error,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    clearAllItems,
  };
}
