import { CartItem } from "@/features/cart/cartSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const CartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (!isOpen) {
    return null;
  }

  return (
    <div className='modal'>
      <button onClick={onClose}>Close</button>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item: CartItem) => (
          <li key={item.id}>
            {item.title} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
      <button>Checkout</button>
    </div>
  );
};

export default CartModal;
