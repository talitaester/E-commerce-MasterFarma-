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
  price: string;
  oldPrice: string;
  category: string;
  images: { url: string }[];
  editable?: boolean;
}
interface PesquisaProps {
  editable?: boolean;
  onEdit?: (product: Product) => void;
}

const Pesquisa: React.FC<PesquisaProps> = ({ editable = false, onEdit }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get('category');

  const handleEdit = (product: Product) => {
    if (onEdit) {
      onEdit(product);
    }
  };

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

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const fetchProducts = async () => {
    try {
      let response;

      const categoryString = selectedCategories.join(',');
      const minPrice = selectedPriceRanges.includes('Até R$50,00') ? 0 :
                        selectedPriceRanges.includes('Acima de R$200,00') ? 200 : undefined;
      const maxPrice = selectedPriceRanges.includes('Até R$50,00') ? 50 : 
                        selectedPriceRanges.includes('Até R$100,00') ? 100 :
                        selectedPriceRanges.includes('Até R$200,00') ? 200 : undefined;

      response = await axios.get('/products/filter', {
        params: {
          categories: categoryString,
          minPrice,
          maxPrice,
          sortBy
        }
      });

      if (query) {
        const produtosFiltrados = response.data.filter((product: Product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
        setProducts(produtosFiltrados)
      }
      else setProducts(response.data);

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
  }, [query, selectedCategories, selectedPriceRanges, sortBy]);

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
                      type="radio"
                      id={order}
                      name="sortOrder"
                      value={order}
                      onChange={() => handleSortChange(order.toLowerCase())}
                    />
                    <label htmlFor={order}><p className='items'>{order}</p></label>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        
        <div className="gradeResultados">
          {products.map(product => (
            <Produto
              key={product.id}
              nome={product.name}
              precoAntigo={`R$${Number(product.oldPrice).toFixed(2)}`}
              precoAtual={`R$${Number(product.price).toFixed(2)}`}
              parcelas={`Ou 3x de ${(Number(product.price) / 3).toFixed(2)}`}
              imagemSrc={product.images[0]?.url}
              code={product.code}
              editable={editable}
              onDelete={fetchProducts}
              onEdit={() => handleEdit(product)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Pesquisa;