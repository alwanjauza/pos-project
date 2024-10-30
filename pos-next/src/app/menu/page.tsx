"use client";

import React, { useState, useEffect } from "react";
import MenuCategory from "./MenuCategory";
import { fetchCategories, fetchProducts } from "@/services/api";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [products, categories] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);

        setMenuItems(products);
        setCategories(categories);
      } catch (error) {
        setError("Failed to load menu items.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className='text-center'>
        <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto'></div>
        <h2 className='text-zinc-900 dark:text-white mt-4'>Loading...</h2>
        <p className='text-zinc-600 dark:text-zinc-400'>
          Get ready to see some delicious food!
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-red-600'>{error}</h2>
      </div>
    );
  }

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold mb-8 text-gray-900'>Our Menu</h1>
      {categories.map((category) => (
        <MenuCategory
          key={category}
          category={category}
          items={menuItems.filter((item) => item.category === category)}
        />
      ))}
    </div>
  );
};

export default MenuPage;
