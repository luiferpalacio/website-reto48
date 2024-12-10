import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Package, Clock, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Product } from '../types';

export const ProductDetail = () => {
  const { id } = useParams();
  const addToCart = useStore((state) => state.addToCart);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamar a la API para obtener los detalles del producto
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      toast.success('Added to cart!');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading product...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!product) {
    return <p className="text-center text-gray-600">Product not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Product Image */}
        <div className="mb-8 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.library?.images?.[0]}
              alt={product.nombre}
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.nombre}</h1>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-900">
              ${product.precioventa.toFixed(2)}
            </span>
            {product.stock > 0 && (
              <span className="ml-4 px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                In Stock
              </span>
            )}
          </div>

          <div className="prose prose-sm text-gray-700">
            <p className="whitespace-pre-line">{product.descripcion}</p>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>

          {/* Features */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Same-day dispatch for orders before 2pm</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
