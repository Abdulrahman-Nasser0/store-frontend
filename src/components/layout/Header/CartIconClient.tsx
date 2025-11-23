"use client";

import { useCart } from "@/hooks/useCart";
import CartIcon from "./CartIcon";

export default function CartIconClient() {
  const { cart } = useCart();

  return <CartIcon itemCount={cart?.totalItems || 0} />;
}
