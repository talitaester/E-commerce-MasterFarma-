'use client'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./maisVendidos.module.css"
import alternative from "../../app/components/Produto/produto.module.css"
import Produto from "@/app/components/Produto/Produto";
import axios from "axios";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  code: number;
  price: number;
  oldPrice: number;
  category: string;
  images: { url: string }[];
}
/**
 * Props for `MaisVendidos`.
 */
export type MaisVendidosProps = SliceComponentProps<Content.MaisVendidosSlice>;

/**
 * Component for "MaisVendidos" Slices.
 */
const MaisVendidos = ({ slice }: MaisVendidosProps): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      let response = await axios.get(`http://localhost:8080/products`);
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

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.section}
    >
      <div className={styles.titulo}>{slice.primary.titulo_mais_vendidos}</div>

      
      <div className={styles.produtos}>
      {products.slice(0, 2).map(product => (
          <div className={`${alternative.produtos} ${alternative.horizontal}`}>
            <Produto
              nome={product.name}
              precoAntigo={`R$${product.oldPrice.toFixed(2)}`}
              precoAtual={`R$${product.price.toFixed(2)}`}
              parcelas={`Ou 3x de ${(product.price / 3).toFixed(2)}`}
              imagemSrc={product.images[0]?.url}
              code={product.code}
              />
            </div>
        ))}
          
      </div>

    </section>
  );
};

export default MaisVendidos;
