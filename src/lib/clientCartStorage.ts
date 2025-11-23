// Client-side cart storage using localStorage for mock mode
import type { CartItem, CartData, AddToCartResponse } from './types';

const CART_STORAGE_KEY = 'techzone_cart';

// Get cart from localStorage
function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse cart from localStorage:', error);
    return [];
  }
}

// Save cart to localStorage
function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
}

// Get cart with calculations
export function getClientCart(): CartData {
  const items = getStoredCart();
  
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = items.reduce((sum, item) => sum + item.discountAmount * item.quantity, 0);
  const tax = 0;
  const shipping = 0;
  const total = subtotal - discount + tax + shipping;

  return {
    items,
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    discount,
    tax,
    shipping,
    total,
    appliedDiscountCode: null
  };
}

// Add item to cart
export function addClientCartItem(
  productId: number,
  productName: string,
  sku: string,
  unitPrice: number,
  discountAmount: number,
  stockAvailable: number,
  image: string,
  quantity: number = 1
): AddToCartResponse {
  const items = getStoredCart();
  
  // Validate quantity
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }
  
  if (quantity > stockAvailable) {
    throw new Error(`Only ${stockAvailable} items available in stock`);
  }
  
  // Check if item already exists
  const existingItem = items.find(item => item.productId === productId);
  
  if (existingItem) {
    // Validate total quantity doesn't exceed stock
    const newQuantity = existingItem.quantity + quantity;
    if (newQuantity > stockAvailable) {
      throw new Error(`Cannot add ${quantity} more. Only ${stockAvailable - existingItem.quantity} items available`);
    }
    
    // Update quantity
    existingItem.quantity = newQuantity;
    existingItem.totalPrice = existingItem.unitPrice * existingItem.quantity;
    saveCart(items);
    
    const cartSummary = getClientCart();
    return {
      id: existingItem.id,
      productType: 'LaptopVariant',
      productId: existingItem.productId,
      productName: existingItem.productName,
      quantity: existingItem.quantity,
      unitPrice: existingItem.unitPrice,
      totalPrice: existingItem.totalPrice,
      addedAt: existingItem.addedAt,
      cartSummary: {
        totalItems: cartSummary.totalItems,
        total: cartSummary.total
      }
    };
  }
  
  // Create new item
  const newItem: CartItem = {
    id: Date.now(), // Use timestamp as ID for uniqueness
    productType: 'LaptopVariant',
    productId,
    productName,
    sku,
    quantity,
    unitPrice,
    discountAmount,
    totalPrice: unitPrice * quantity,
    stockAvailable,
    image,
    addedAt: new Date().toISOString()
  };
  
  items.push(newItem);
  saveCart(items);
  
  const cartSummary = getClientCart();
  return {
    id: newItem.id,
    productType: 'LaptopVariant',
    productId: newItem.productId,
    productName: newItem.productName,
    quantity: newItem.quantity,
    unitPrice: newItem.unitPrice,
    totalPrice: newItem.totalPrice,
    addedAt: newItem.addedAt,
    cartSummary: {
      totalItems: cartSummary.totalItems,
      total: cartSummary.total
    }
  };
}

// Update cart item quantity
export function updateClientCartItem(itemId: number, quantity: number): void {
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0');
  }
  
  const items = getStoredCart();
  const item = items.find(i => i.id === itemId);
  
  if (!item) {
    throw new Error('Cart item not found');
  }
  
  // Validate quantity doesn't exceed available stock
  if (quantity > item.stockAvailable) {
    throw new Error(`Only ${item.stockAvailable} items available in stock`);
  }
  
  item.quantity = quantity;
  item.totalPrice = item.unitPrice * quantity;
  saveCart(items);
}

// Remove cart item
export function removeClientCartItem(itemId: number): { removedItemId: number; cartSummary: { totalItems: number; total: number } } {
  const items = getStoredCart();
  const index = items.findIndex(i => i.id === itemId);
  
  if (index === -1) {
    throw new Error('Cart item not found');
  }
  
  items.splice(index, 1);
  saveCart(items);
  
  const cartSummary = getClientCart();
  return {
    removedItemId: itemId,
    cartSummary: {
      totalItems: cartSummary.totalItems,
      total: cartSummary.total
    }
  };
}

// Clear cart
export function clearClientCart(): { itemsRemoved: number; clearedAt: string } {
  const items = getStoredCart();
  const itemsRemoved = items.length;
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_STORAGE_KEY);
  }
  
  return {
    itemsRemoved,
    clearedAt: new Date().toISOString()
  };
}
