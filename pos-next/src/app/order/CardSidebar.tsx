import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className='p-4 flex justify-between items-center border-b'>
        <h2 className='text-lg font-bold'>Your Cart</h2>
        <button onClick={onClose} className='text-gray-600 hover:text-gray-800'>
          ✕
        </button>
      </div>

      <div className='p-4 flex-1 overflow-y-auto'>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className='flex items-center mb-4'>
              <img
                src={item.image}
                alt={item.title}
                className='w-12 h-12 mr-4'
              />
              <div>
                <p className='text-sm font-medium'>{item.title}</p>
                <p className='text-xs text-gray-500'>Qty: {item.quantity}</p>
              </div>
              <div className='ml-auto font-semibold'>
                ${item.price * item.quantity}
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500'>Your cart is empty.</p>
        )}
      </div>

      {cartItems.length > 0 && (
        <button
          onClick={() => alert("Proceed to checkout")}
          className='w-full bg-yellow-500 text-white p-4 text-center font-semibold hover:bg-yellow-600'
        >
          Order Now
        </button>
      )}
    </div>
  );
};

export default CartSidebar;
