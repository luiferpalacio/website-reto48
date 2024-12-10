import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Category } from '../types';

export const Categories = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamar a la API para obtener las categorías
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/categorias/${id}`); // Ajusta la URL según tu configuración
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategory(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading categories...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
      {
        category ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600">{category.nombre}</p>
          </div>
        ) : (
          <p className="text-center text-gray-600">Category not found</p>
        )
      }
    </div>
  );
};
