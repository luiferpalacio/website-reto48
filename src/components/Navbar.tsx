import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, ChevronDown, User } from 'lucide-react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { useStore } from '../store/useStore';
import { SearchBar } from './SearchBar';

export const Navbar = () => {
  const cart = useStore((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Verificar si el usuario está autenticado
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    // Eliminar usuario del localStorage y redirigir
    localStorage.removeItem('user');
    navigate('/'); // Redirigir a la página de inicio
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/logo-.PNG" alt="Logo" className="w-24 h-auto" />
            </Link>
          </div>
          <SearchBar />

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              INICIO
            </Link>
            <Link to="/productos" className="text-gray-600 hover:text-gray-900">
              PRODUCTOS
            </Link>

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
                  {user ? (
                    // Mostrar Logout si está autenticado
                    <div className="px-1 py-1">
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            LOGOUT
                          </button>
                        )}
                      </HeadlessMenu.Item>
                    </div>
                  ) : (
                    // Mostrar Login y Registro si no está autenticado
                    <div className="px-1 py-1">
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <Link to="/login"
                            className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            LOGIN
                          </Link>
                        )}
                      </HeadlessMenu.Item>
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <Link to="/registro"
                            className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            REGISTRO
                          </Link>
                        )}
                      </HeadlessMenu.Item>
                    </div>
                  )}
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>

            <Link to="/carrito" className="text-gray-600 hover:text-gray-900 relative">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4">
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
              Inicio
            </Link>
            <Link
              to="/productos"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900"
            >
              Productos
            </Link>

            <div className="border-t border-gray-200 my-2"></div>
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/registro"
                  className="block px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  Registro
                </Link>
              </>
            )}
            <Link
              to="/carrito"
              className="block px-3 py-2 text-gray-600 hover:text-gray-900"
            >
              Carrito ({cart.length})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
