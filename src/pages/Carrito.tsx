import React, { useState } from 'react';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export const Carrito = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Simulamos los datos del usuario desde una sesión o contexto
  const user = {
    documento: '123456789',
    tipoDocumento: 'CC',
    nombre: 'John',
    apellido: 'Doe',
    email: 'johndoe@example.com',
    celular: '3001234567',
  };

  const total = cart.reduce(
    (suma, item) => suma + item.precioventa * item.quantity,
    0
  );

  const descripcionFactura = cart.map((item) => item.nombre).join(', ');

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Carrito de Compras</h1>
        <p className="text-lg text-gray-600 mb-6">Tu carrito está vacío</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Regresar a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={
                    item.library?.images?.[0] ||
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'
                  }
                  alt={item.nombre}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.nombre}
                  </h3>
                  <p className="text-gray-600">${item.precioventa.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <MinusCircle className="w-6 h-6" />
                  </button>
                  <span className="text-gray-800 font-medium text-lg">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <PlusCircle className="w-6 h-6" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold text-gray-900">Total:</span>
            <span className="text-3xl font-bold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowPaymentForm(true)}
              className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Proceder al Pago
            </button>
            <Link
              to="/"
              className="text-blue-600 hover:underline ml-4"
            >
              Regresar a la tienda
            </Link>
          </div>
        </div>
      </div>

      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Resumen de Compra
            </h2>
            <form
              method="POST"
              action="https://demover3-1.tucompra.net/tc3/app/inputs/compra.jsp"
              className="space-y-4"
            >
              {/* Factura */}
              <div className="form-group">
                <label htmlFor="factura" className="block text-gray-700 font-medium">
                  # Factura:
                </label>
                <input
                  name="factura"
                  id="factura"
                  type="number"
                  value="12345" // Cambia esto según tu lógica
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Valor */}
              <div className="form-group">
                <label htmlFor="valor" className="block text-gray-700 font-medium">
                  Valor:
                </label>
                <input
                  name="valor"
                  id="valor"
                  type="number"
                  value={total.toFixed(2)}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Descripción */}
              <div className="form-group">
                <label htmlFor="descripcionFactura" className="block text-gray-700 font-medium">
                  Descripción:
                </label>
                <input
                  name="descripcionFactura"
                  id="descripcionFactura"
                  type="text"
                  value={descripcionFactura}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Datos ocultos */}
              <input type="hidden" name="usuario" value="4d3c2b1a_reemplazar" />
              <input
                type="hidden"
                name="documentoComprador"
                value={user.documento}
              />
              <input
                type="hidden"
                name="tipoDocumento"
                value={user.tipoDocumento}
              />
              <input
                type="hidden"
                name="nombreComprador"
                value={user.nombre}
              />
              <input
                type="hidden"
                name="apellidoComprador"
                value={user.apellido}
              />
              <input
                type="hidden"
                name="correoComprador"
                value={user.email}
              />
              <input
                type="hidden"
                name="celularComprador"
                value={user.celular}
              />

              <input
                type="submit"
                value="Pagar"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              />
            </form>
            <button
              onClick={() => setShowPaymentForm(false)}
              className="mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
