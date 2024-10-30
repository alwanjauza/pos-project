import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const MenuCard: React.FC<{ item: MenuItem }> = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  return (
    <div className='p-4 border rounded-lg shadow hover:shadow-lg'>
      <img
        src={item.image}
        alt={item.title}
        className='w-full h-40 object-cover rounded'
      />
      <h2 className='mt-2 font-bold text-gray-900'>{item.title}</h2>
      <p className='text-gray-500 text-sm'>{item.description}</p>
      <p className='text-yellow-600 font-semibold mt-2'>${item.price}</p>
      <button
        onClick={handleAddToCart}
        className='mt-4 w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuCard;
