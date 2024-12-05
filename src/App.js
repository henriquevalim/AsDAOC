import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductFormPage from './pages/ProductFormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/new" element={<ProductFormPage />} />
        <Route path="/products/:id" element={<ProductFormPage />} />
        <Route path="/products/:id/details" element={<ProductDetailPage />} />
        <Route path="/products/:id/edit" element={<ProductFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
