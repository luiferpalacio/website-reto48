import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Inicio } from './pages/Inicio';
import { Productos } from './pages/Productos';
import { Categorias } from './pages/Categorias';
import { Carrito } from './pages/Carrito';
import { DetalleProducto } from './pages/DetalleProducto';
import { SellProduct } from './pages/SellProduct';
import { Login } from './pages/Login';
import { Registro } from './pages/Registro';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <br />
        <br />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;