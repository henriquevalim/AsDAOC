import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams(); // Captura o ID do produto da URL
  const navigate = useNavigate(); // Permite navegação entre páginas
  const [product, setProduct] = useState(null); // Estado para armazenar os dados do produto
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id); // Busca os dados do produto por ID
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Carregando...</div>; // Exibe carregamento enquanto busca os dados

  if (!product) return <div>Produto não encontrado!</div>; // Caso o produto não seja encontrado

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate("/products")}>Voltar</button>
      <div className="product-detail-card">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />
        <h1>{product.name}</h1>
        <p>Preço: R$ {product.price}</p>
        <p>Descrição: {product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetailPage;
