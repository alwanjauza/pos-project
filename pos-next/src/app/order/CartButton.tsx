"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import CartSidebar from "./CardSidebar";

const CartButton: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  );

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className='fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 flex items-center justify-center'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
          <path d='M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
          <path d='M17 17h-11v-14h-2' />
          <path d='M6 5l14 1l-1 7h-13' />
        </svg>
        {cartItemsCount > 0 && (
          <span className='ml-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs'>
            {cartItemsCount}
          </span>
        )}
      </button>

      <CartSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default CartButton;
