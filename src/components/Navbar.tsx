import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, ChevronDown, User } from 'lucide-react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { Category } from '../types';
import { useStore } from '../store/useStore';

// const categories = [
//   { id: 1, nombre: 'Electronics' },
//   { id: 2, nombre: 'Clothing' },
//   { id: 3, nombre: 'Books' },
//   { id: 4, nombre: 'Home & Garden' },
// ];

export const Navbar = () => {
  const cart = useStore((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);


  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Llamar a la API para obtener las categorías
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categorias'); // Ajusta la URL según tu configuración
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading categories...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }


  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">E-Catalog</h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            
            {/* Categories Dropdown */}
            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className="flex items-center text-gray-600 hover:text-gray-900">
                Categories
                <ChevronDown className="ml-1 w-4 h-4" />
              </HeadlessMenu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-1 py-1">
                    {categories.map((category) => (
                      <HeadlessMenu.Item key={category.id}>
                        {({ active }) => (
                          <Link
                            to={`/categories/${category.id}`}
                            className={`${
                              active ? 'bg-blue-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            {category.nombre}
                          </Link>
                        )}
                      </HeadlessMenu.Item>
                    ))}
                  </div>
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>

            {/* User Session Dropdown */}
            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className="flex items-center text-gray-600 hover:text-gray-900">
                <User className="w-5 h-5" />
                <ChevronDown className="ml-1 w-4 h-4" />
              </HeadlessMenu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <HeadlessMenu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-blue-500 text-white' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Login
                        </button>
                      )}
                    </HeadlessMenu.Item>
                    <HeadlessMenu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-blue-500 text-white' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Register
                        </button>
                      )}
                    </HeadlessMenu.Item>
                  </div>
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>

            <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900"
            >
              Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 pl-6"
              >
                {category.nombre}
              </Link>
            ))}
            <div className="border-t border-gray-200 my-2"></div>
            <button className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900">
              Login
            </button>
            <button className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900">
              Register
            </button>
            <Link
              to="/cart"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900"
            >
              Cart ({cart.length})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};