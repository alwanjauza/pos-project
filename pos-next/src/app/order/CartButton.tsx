"use client";

import React, { use } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

const CartButton: React.FC = () => {
  const router = useRouter();
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  );

  const handleCartClick = () => {
    router.push("/cart");
  };

  return (
    <button
      onClick={handleCartClick}
      className='fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 flex items-center justify-center'
    >
      <span className='material-icons'>shopping_cart</span>
      {cartItemsCount > 0 && (
        <span className='ml-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs'>
          {cartItemsCount}
        </span>
      )}
    </button>
  );
};

export default CartButton;
