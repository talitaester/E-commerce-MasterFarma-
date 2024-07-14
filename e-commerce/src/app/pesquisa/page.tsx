"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from '../../../axios';
import Produto from '../components/Produto/Produto'; // Importa o componente Produto
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
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get('category');

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handlePriceChange = (priceRange: string) => {
    setSelectedPriceRanges(prev => {
      if (prev.includes(priceRange)) {
        return prev.filter(p => p !== priceRange);
      } else {
        return [...prev, priceRange];
      }
    });
  };

  const filterByPrice = (price: number): boolean => {
    if (selectedPriceRanges.includes('Até R$50,00') && price <= 50) return true;
    if (selectedPriceRanges.includes('Até R$100,00') && price <= 100) return true;
    if (selectedPriceRanges.includes('Até R$200,00') && price <= 200) return true;
    if (selectedPriceRanges.includes('Acima de R$200,00') && price > 200) return true;
    return false;
  };

  const fetchProducts = async () => {
    try {
      let response;

      if (query && query.trim()) {
        response = await axios.get(`/products/name/${query}`);
        if (response.data) {
          const filteredProducts = response.data.filter((product: Product) =>
            (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
            (selectedPriceRanges.length === 0 || filterByPrice(product.price))
          );
          setProducts(filteredProducts);
        }
      } else if (category) {
        response = await axios.get(`/products/category/${category}`);
        setProducts(response.data);
      } else if (selectedCategories.length > 0) {
        const categories = selectedCategories.join(',');
        response = await axios.get(`/products/category/${categories}`);
        setProducts(response.data.filter((product: Product) => filterByPrice(product.price)));
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
  }, [query, selectedCategories, selectedPriceRanges]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="gradePesquisa">
        <div className="filtros">
          <form>
            <div className='firstForm'>
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
                    <label htmlFor={category}><p className='items'>{category}</p></label>
                  </div>
                ))}
              </div>
            </div>

            <div className="separateForms">
              <h2>Filtrar por preço</h2>
              <div className="opcoesForm">
                {['Até R$50,00', 'Até R$100,00', 'Até R$200,00', 'Acima de R$200,00'].map(priceRange => (
                  <div key={priceRange}>
                    <input
                      type="checkbox"
                      id={priceRange}
                      value={priceRange}
                      checked={selectedPriceRanges.includes(priceRange)}
                      onChange={() => handlePriceChange(priceRange)}
                    />
                    <label htmlFor={priceRange}><p className='items'>{priceRange}</p></label>
                  </div>
                ))}
              </div>

              <h2>Ordenar por</h2>
              <div className="opcoesForm">
                {['Relevância', 'Preço'].map(order => (
                  <div key={order}>
                    <input
                      type="checkbox"
                      id={order}
                      value={order}
                      disabled // Desativa as caixas de seleção
                    />
                    <label htmlFor={order}><p className='items'>{order}</p></label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        
        
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
    </>
  );
}
