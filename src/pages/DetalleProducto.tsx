import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Package, Clock, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Product } from '../types';

export const DetalleProducto = () => {
  const { id } = useParams();
  const agregarAlCarrito = useStore((state) => state.addToCart);
  const [producto, setProducto] = useState<Product | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string>('');

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const respuesta = await fetch(`http://localhost:8000/api/productos/${id}`);
        if (!respuesta.ok) {
          throw new Error('Error al cargar los detalles del producto');
        }
        const datos = await respuesta.json();
        setProducto(datos);
        setImagenSeleccionada(datos.library?.images?.[0] || 'https://via.placeholder.com/400'); // Imagen por defecto
      } catch (error: any) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  const manejarAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito({ ...producto, quantity: 1 });
      toast.success('¡Agregado al carrito!');
    }
  };

  if (cargando) {
    return <p className="text-center text-gray-600">Cargando producto...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!producto) {
    return <p className="text-center text-gray-600">Producto no encontrado</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <br />
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Galería de Imágenes */}
        <div className="mb-8 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={imagenSeleccionada}
              alt={producto.nombre}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            {producto.library?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Imagen ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                  img === imagenSeleccionada ? 'border-2 border-blue-500' : 'border'
                }`}
                onClick={() => setImagenSeleccionada(img)}
              />
            ))}
          </div>
        </div>

        {/* Detalles del Producto */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{producto.nombre}</h1>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-gray-900">
              ${producto.precioventa.toFixed(2) } COP
            </span>
            
          </div>
          <br />
        

          <div className="prose prose-sm text-gray-700">
            <p className="whitespace-pre-line">{producto.descripcion}</p>
          </div>
          <div className="prose prose-sm text-gray-700">
            <p className="whitespace-pre-line">{producto.categoria_id}</p>
          </div>
          
          {producto.stock > 0 && (
              <span className=" px-1 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                En Stock
              </span>
            )}
          <br />
          <button
            onClick={manejarAgregarAlCarrito}
            className="w-22 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Agregar al carrito
          </button>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Envío gratis en pedidos superiores a $100.000
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Envío el mismo día para pedidos antes de las 3:00 pm
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Garantía de 1 años incluida</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
  