import React from "react";

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className='flex space-x-4 mb-6 overflow-x-auto'>
      {categories.map((category) => (
        <button
          key={category}
          className={`py-2 px-4 rounded ${
            selectedCategory === category
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
