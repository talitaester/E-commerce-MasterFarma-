'use client'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./ofertas.module.css";
import Produto from "@/app/components/Produto/Produto";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from "react";
import axios from "axios";

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
 * Props for `Ofertas`.
 */
export type OfertasProps = SliceComponentProps<Content.OfertasSlice>;

/**
 * Component for "Ofertas" Slices.
 */
const Ofertas = ({ slice }: OfertasProps): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      let response = await axios.get(`http://localhost:8080//products/filter`);
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
      <div className={styles.titulo}>{slice.primary.titulo}</div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={8}
        slidesPerView={1}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 14,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 14,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        pagination={{
          clickable: true,
          type: 'bullets',
          el: `.${styles.swiperPagination}`,
          bulletClass: styles.swiperPaginationBullet,
          bulletActiveClass: styles.swiperPaginationBulletActive,
        }}
        className={styles.carrosselOfertas}
      >
        {products.slice(0, 10).map(product => (
          <SwiperSlide key={product.id} className={styles.elemento}>
            <Produto
              nome={product.name}
              precoAntigo={`R$${product.oldPrice.toFixed(2)}`}
              precoAtual={`R$${product.price.toFixed(2)}`}
              parcelas={`Ou 3x de ${(product.price / 3).toFixed(2)}`}
              imagemSrc={product.images[0]?.url}
              code={product.code}
            />
          </SwiperSlide>
        ))}
        <div className={styles.swiperPagination}></div>
      </Swiper>
    </section>
  );
};

export default Ofertas;
