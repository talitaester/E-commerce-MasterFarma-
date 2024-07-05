'use client'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./ofertas.module.css";
import Produto from "@/app/components/Produto/Produto";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

/**
 * Props for `Ofertas`.
 */
export type OfertasProps = SliceComponentProps<Content.OfertasSlice>;

/**
 * Component for "Ofertas" Slices.
 */
const Ofertas = ({ slice }: OfertasProps): JSX.Element => {


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
        <SwiperSlide  className={styles.elemento}>
          <Produto />
        </SwiperSlide>

        <SwiperSlide className={styles.elemento}>
          <Produto />
        </SwiperSlide>

        <SwiperSlide className={styles.elemento}>
          <Produto />
        </SwiperSlide>

        <SwiperSlide className={styles.elemento}>
          <Produto />
        </SwiperSlide>
        <div className={styles.swiperPagination}></div>
      </Swiper>
    </section>
  );
};

export default Ofertas;
