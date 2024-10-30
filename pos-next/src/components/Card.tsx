import React, { useState } from "react";

interface CardProps {
  imageUrl: string;
  title: string;
  price: string | number;
  description: string;
  buttonText?: string;
  onButtonClick?: (quantity: number) => void;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  price,
  description,
  buttonText = "Add to Order",
  onButtonClick,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className='w-80 bg-white shadow rounded'>
      <div
        className='h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center'
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundColor: "transparent",
        }}
      ></div>
      <div className='p-4 flex flex-col items-center'>
        <h1 className='text-gray-800 text-center mt-1 line-clamp-2'>{title}</h1>
        <p className='text-gray-400 font-light text-xs text-center line-clamp-2'>
          {description}
        </p>
        <p className='text-center text-gray-800 mt-1'>€{price}</p>
        <div className='inline-flex items-center mt-2'>
          <button
            onClick={handleDecrease}
            className='bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M20 12H4'
              />
            </svg>
          </button>
          <div className='bg-gray-100 border-t border-b border-gray-100 text-gray-600 inline-flex items-center px-4 py-1 select-none'>
            {quantity}
          </div>
          <button
            onClick={handleIncrease}
            className='bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 4v16m8-8H4'
              />
            </svg>
          </button>
        </div>
        <button
          className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 mt-4 w-full flex items-center justify-center'
          onClick={() => onButtonClick?.(quantity)} // Pass quantity to the parent
        >
          {buttonText}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 ml-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
