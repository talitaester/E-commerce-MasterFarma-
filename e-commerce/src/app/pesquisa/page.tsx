"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from '../../../axios';
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

export default function Pesquisa() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const fetchProducts = async () => {
    try {
      let response;

      // Verifica se há uma busca por nome ou se há categorias selecionadas
      if (query && query.trim()) {
        response = await axios.get(`/products/name/${query}`);
        if (response.data) {
          // Filtra os produtos de acordo com as categorias selecionadas
          const filteredProducts = response.data.filter((product: Product) =>
            selectedCategories.length === 0 || selectedCategories.includes(product.category)
          );
          setProducts(filteredProducts);
        }
      } else if (selectedCategories.length > 0) {
        const categories = selectedCategories.join(',');
        response = await axios.get(`/products/category/${categories}`);
        setProducts(response.data);
      } else {
        setProducts([]);
        return;
      }
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

  useEffect(() => {
    fetchProducts();
  }, [query, selectedCategories]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Exibindo resultados para “{query || selectedCategories.join(', ')}”</h1>
      <div className="gradePesquisa">
        <div className="filtros">
          <form>
            <h2>Filtrar por categoria</h2>
            <div className="opcoesForm">
              {['Medicamentos', 'Suplementos', 'Higiene', 'Beleza', 'Bebês', 'Perfumaria'].map(category => (
                <div key={category}>
                  <input
                    type="checkbox"
                    id={category}
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
            {/* O restante do código de filtros e ordenação permanece igual */}
          </form>
        </div>
        <div className="gradeResultados">
          {products.map(product => (
            <div key={product.id} className="produto">
              <img src={product.images[0]?.url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>R${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Seção você também pode gostar */}
    </>
  );
}
