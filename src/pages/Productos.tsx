import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CategorySidebar } from '../components/CategorySidebar';
import { useCategories } from '../hooks/useCategories';
import { Product } from '../types';
import ErrorBoundary from '../components/ErrorBoundary';
import PrediccionVentas from '../components/PrediccionVentas';

export const Productos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useCategories();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const selectedCategories = React.useMemo(() => {
    return searchParams.get('categories')?.split(',').map(Number) || [];
  }, [searchParams]);

  useEffect(() => {
    // Llamada a la API para obtener los productos
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/productos`);
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        const data = await response.json();
        console.log({ data });
        setProducts((prevProducts) => {
          const newProducts = data.filter(
            (newProduct: Product) => !prevProducts.some((prevProduct) => prevProduct.id === newProduct.id)
          );
          return [...prevProducts, ...newProducts];
        });
        setHasMore(data.next_page_url !== null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleCategoryChange = (categoryId: number) => {
    let newSelectedCategories: number[];

    if (selectedCategories.includes(categoryId)) {
      newSelectedCategories = selectedCategories.filter(id => id !== categoryId);
    } else {
      newSelectedCategories = [...selectedCategories, categoryId];
    }

    if (newSelectedCategories.length > 0) {
      setSearchParams({ categories: newSelectedCategories.join(',') });
    } else {
      setSearchParams({});
    }
  };

  const filteredProducts = React.useMemo(() => {
    if (selectedCategories.length === 0) return products;
    return products.filter(product =>
      selectedCategories.includes(product.Categoria_id)
    );
  }, [selectedCategories, products]);

  const handleScroll = React.useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && hasMore) {
      setPage(page => page + 1);
    }
  }, [hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <div className="w-64">
          <CategorySidebar
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Predicción de Ventas</h2>
            <ErrorBoundary>
              <PrediccionVentas />
            </ErrorBoundary>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found for the selected categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};