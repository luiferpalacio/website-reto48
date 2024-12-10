import React from 'react';
import { Category } from '../types';
import { Link } from 'react-router-dom';

export const Categories = () => {
  // Example categories data - in a real app, this would come from an API
  const categories: Category[] = [
    { id: 1, nombre: 'Electronics' },
    { id: 2, nombre: 'Clothing' },
    { id: 3, nombre: 'Books' },
    { id: 4, nombre: 'Home & Garden' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${category.id}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">{category.nombre}</h2>
            <p className="text-gray-600 mt-2">Browse products in this category</p>
          </Link>
        ))}
      </div>
    </div>
  );
};