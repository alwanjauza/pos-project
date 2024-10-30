import React from "react";

interface MenuItemProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  description,
  price,
  image,
}) => {
  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105'>
      <img src={image} alt={title} className='w-full h-40 object-cover' />
      <div className='p-4'>
        <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
        <p className='text-sm text-gray-600 mt-1 line-clamp-2'>{description}</p>
        <p className='text-lg font-bold text-gray-800 mt-2'>
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default MenuItem;
