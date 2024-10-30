import React from "react";
import MenuItem from "./MenuItem";

interface MenuCategoryProps {
  category: string;
  items: Array<{
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
  }>;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ category, items }) => {
  return (
    <div className='mb-8'>
      <h2 className='text-2xl font-semibold mb-4 text-gray-800'>{category}</h2>
      <div className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {items.map((item) => (
          <MenuItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
