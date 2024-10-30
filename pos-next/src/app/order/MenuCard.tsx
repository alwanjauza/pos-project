import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cart/cartSlice";
import Card from "@/components/Card";

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

  const handleAddToCart = (quantity: number) => {
    dispatch(addToCart({ ...item, quantity }));
  };

  return (
    <Card
      imageUrl={item.image}
      title={item.title}
      price={item.price}
      description={item.description}
      buttonText='Add to Cart'
      onButtonClick={handleAddToCart}
    />
  );
};

export default MenuCard;
