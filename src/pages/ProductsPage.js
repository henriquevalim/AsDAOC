
import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchProducts from "../hooks/useFetchProducts";
import { deleteProduct } from "../services/productService";
import "./ProductsPage.css";

function ProductsPage() {
  const { products, loading } = useFetchProducts();
  const navigate = useNavigate();

  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleDelete = async (id) => {
    await deleteProduct(id);
    window.location.reload(); // Atualiza a lista de produtos
  };

  return (
    <div className="products-page">
      <h1>Produtos</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>R$ {product.price}</p>
            <p>{product.description}</p>
            <div className="product-actions">
              <button onClick={() => navigate(`/products/${product.id}/details`)}>Detalhes</button>
              <button onClick={() => navigate(`/products/${product.id}/edit`)}>Editar</button>
              <button onClick={() => handleDelete(product.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/products/new")}>Adicionar Produto</button>
    </div>
  );
}

export default ProductsPage;
