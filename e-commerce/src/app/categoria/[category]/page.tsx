'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from '../../../../axios';
import Produto from '../../components/Produto/Produto'; // Importa o componente Produto
import './style.css';

interface Product {
  id: number;
  name: string;
  code: number;
  price: number;
  oldPrice: number;
  category: string;
  images: { url: string }[];
}

const CategoriaPage = () => {
  const { category } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/category/${category}`);
        setProducts(response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Erro ao buscar produtos:', error);
          setError(error.message);
        } else {
          console.error('Erro desconhecido:', error);
          setError('Erro ao buscar produtos');
        }
      } finally {
        setLoading(false);
      }
    };
    if (category) {
      fetchProducts();
    }
  }, [category]);

  if (!category) {
    return <p>Categoria não especificada</p>;
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="gradeResultados">
      {products.map(product => (
        <Produto
          key={product.id}
          nome={product.name}
          precoAntigo={`R$${product.oldPrice.toFixed(2)}`}
          precoAtual={`R$${product.price.toFixed(2)}`}
          parcelas={`Ou 3x de ${(product.price / 3).toFixed(2)}`}
          imagemSrc={product.images[0]?.url}
          code={product.code}
        />
      ))}
    </div>
  );
};

export default CategoriaPage;
