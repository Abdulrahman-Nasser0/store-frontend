"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import EmptyState from "@/components/common/EmptyState";
import { formatPrice } from "@/lib/utils";

export default function Cart() {
  const { cart, loading, error, updateItem, removeItem, clearAllItems } = useCart();

  if (loading) {
    return <LoadingSpinner message="Loading your cart..." fullScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <ErrorDisplay
          title="Unable to Load Cart"
          message={error}
          actionButton={{
            text: "Try Again",
            onClick: () => window.location.reload()
          }}
        />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <EmptyState
            icon="box"
            title="Your cart is empty"
            message="Looks like you haven't added any items to your cart yet. Start shopping to find great laptops!"
            actionButton={{
              text: "Start Shopping",
              onClick: () => window.location.href = "/shop"
            }}
          />
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateItem(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId: number) => {
    await removeItem(itemId);
  };

  const handleClearCart = async () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      await clearAllItems();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">{cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          {cart.items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="shrink-0">
                    <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image || '/fallback.jpeg'}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>
                    
                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-blue-600">
                        {formatPrice(item.unitPrice)}
                      </span>
                      {item.discountAmount > 0 && (
                        <span className="text-sm text-green-600 font-medium">
                          ({formatPrice(item.discountAmount)} off)
                        </span>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stockAvailable}
                          className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Stock Info */}
                      <span className="text-sm text-gray-600">
                        {item.stockAvailable} available
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-auto text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {formatPrice(item.totalPrice)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.totalItems} items)</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>

                {cart.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(cart.discount)}</span>
                  </div>
                )}

                {cart.tax > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>{formatPrice(cart.tax)}</span>
                  </div>
                )}

                {cart.shipping > 0 ? (
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{formatPrice(cart.shipping)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(cart.total)}
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="mb-3"
              >
                Proceed to Checkout
              </Button>

              <Link href="/shop">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
