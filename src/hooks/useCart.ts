"use client";

import { useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '@/lib/api';
import { getSessionToken } from '@/lib/actions';
import type { CartData, AddToCartRequest } from '@/lib/types';

export function useCart() {
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = await getSessionToken();
      
      const response = await getCart(token || undefined);
      
      if (response.isSuccess) {
        setCart(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = async (request: AddToCartRequest) => {
    try {
      const token = await getSessionToken();
      
      const response = await addToCart(request, token || undefined);
      
      if (response.isSuccess) {
        await fetchCart(); // Refresh cart
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
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
      const token = await getSessionToken();
      
      const response = await updateCartItem(itemId, { quantity }, token || undefined);
      
      if (response.isSuccess) {
        await fetchCart(); // Refresh cart
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
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
      const token = await getSessionToken();
      
      const response = await removeCartItem(itemId, token || undefined);
      
      if (response.isSuccess) {
        await fetchCart(); // Refresh cart
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
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
      const token = await getSessionToken();
      
      const response = await clearCart(token || undefined);
      
      if (response.isSuccess) {
        await fetchCart(); // Refresh cart
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
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
