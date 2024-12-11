import React from 'react';
// import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';

interface Category {
  id: number;
  nombre: string;
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategories: number[];
  onCategoryChange: (categoryId: number) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <label
            key={category.id}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div
              className={`w-5 h-5 border rounded flex items-center justify-center ${
                selectedCategories.includes(category.id)
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300 group-hover:border-blue-400'
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              {selectedCategories.includes(category.id) && (
                <Check className="w-4 h-4 text-white" />
              )}
            </div>
            <span className="text-gray-700 group-hover:text-gray-900">
              {category.nombre}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};