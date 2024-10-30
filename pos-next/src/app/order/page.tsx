"use client";

import React, { useState, useEffect } from "react";
import CategoryTabs from "./CategoryTabs";
import MenuCard from "./MenuCard";
import CartButton from "./CartButton";
import { fetchCategories, fetchProductsByCategory } from "@/services/api";

interface MenuItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const OrderPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadCategories() {
      const categoryList = await fetchCategories();
      setCategories(categoryList);
      setSelectedCategory(categoryList[0]);
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      async function loadItems() {
        setLoading(true);
        const items = await fetchProductsByCategory(selectedCategory);
        setMenuItems(items);
        setLoading(false);
      }
      loadItems();
    }
  }, [selectedCategory]);

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h1 className='text-3xl font-bold mb-2 text-gray-900'>MENUS</h1>
      <p className='text-gray-600 mb-6'>
        Choose your menu and I will cook for you!
      </p>

      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          menuItems.map((item) => <MenuCard key={item.id} item={item} />)
        )}
      </div>

      <CartButton />
    </div>
  );
};

export default OrderPage;
