import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProduct,
  updateProduct,
  getProductById,
} from "../services/productService";

const ProductFormPage = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id); // Busca os dados do produto por ID
      setProduct(data);
    } catch (error) {
      console.error("Erro ao carregar o produto:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!product.name) tempErrors.name = "Nome é obrigatório";
    if (!product.price || isNaN(product.price)) tempErrors.price = "Preço inválido";
    if (!product.description) tempErrors.description = "Descrição é obrigatória";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (id) {
        await updateProduct(id, product); // Atualiza o produto existente
      } else {
        await addProduct(product); // Adiciona um novo produto
      }
      navigate("/products"); // Redireciona para a lista de produtos
    } catch (error) {
      console.error("Erro ao salvar o produto:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome: <input name="name" value={product.name} onChange={handleChange} />
      </label>
      <label>
        Preço: <input name="price" value={product.price} onChange={handleChange} />
      </label>
      <label>
        Descrição:
        <input
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Imagem: <input name="image" value={product.image} onChange={handleChange} />
      </label>
      {errors.name && <p>{errors.name}</p>}
      {errors.price && <p>{errors.price}</p>}
      {errors.description && <p>{errors.description}</p>}
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProductFormPage;
