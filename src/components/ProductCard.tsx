import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addToCart({ ...product, quantity: 1 });
    toast.success('Agregado al carrito de compras!');
  };

  return (
    <Link to={`/productos/${product.id}`} className="group">
      <div className="w-62 bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
        <img
          src={product.library?.images?.[0]}
          alt={product.nombre}
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {product.nombre}
          </h3>
          <p className="text-gray-600 mt-1 text-sm line-clamp-2">
            {product.descripcion}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${product.precioventa}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};