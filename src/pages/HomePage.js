import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Bem-vindo à Loja</h1>
      <Link to="/products">Ver Produtos</Link>
    </div>
  );
};

export default HomePage;
