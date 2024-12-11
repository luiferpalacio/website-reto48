import React from 'react';
import { Category } from '../types';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategories: number[];
  onCategoryChange: (Category_id: number) => void;
}

export const ProductFilters = ({ 
  categories, 
  selectedCategories, 
  onCategoryChange 
}: ProductFiltersProps) => {
  return (
    <div className="w-64 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtrar por Categoría</h2>
      <div className="space-y-3">
        {categories.map((Category) => (
          <label key={Category.id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedCategories.includes(Category.id)}
              onChange={() => onCategoryChange(Category.id)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{Category.nombre}</span>
          </label>
        ))}
      </div>
    </div>
  );
};