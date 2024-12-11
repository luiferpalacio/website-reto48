import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Categories } from './pages/Categories';
import { Cart } from './pages/Cart';
import { ProductDetail } from './pages/ProductDetail';
import { SellProduct } from './pages/SellProduct';
import PrediccionVentas from './components/PrediccionVentas';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/categories/:id" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/ventas/predicciones" element={<PrediccionVentas />} />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;