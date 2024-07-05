'use client';


import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./sessoes.module.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

/**
 * Props for `Sessoes`.
 */
export type SessoesProps = SliceComponentProps<Content.SessoesSlice>;

/**
 * Component for "Sessoes" Slices.
 */
const Sessoes = ({ slice }: SessoesProps): JSX.Element => {

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.sessoes}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={8}
        slidesPerView={2}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 14,
          },
          1300: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
        }}
        pagination={{
          clickable: true,
          el: `.${styles.swiperPagination}`,
          bulletClass: styles.swiperPaginationBullet,
          bulletActiveClass: styles.swiperPaginationBulletActive,
        }}
        
        className={styles.carrosselSessoes}
      >
        <SwiperSlide>
          <div className={styles.sessao}>
            <Link href="/" className={styles.circle}>
              <img src='/pilula.svg' alt='pílula' className={styles.icon} />
            </Link>
            <Link href="/" className={styles.title}>Medicamentos</Link>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.sessao}>
            <Link href="/" className={styles.circle}>
              <img src='/pesos.svg' alt='pesos' className={styles.icon} />
            </Link>
            <Link href="/" className={styles.title}>Suplementos</Link>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.sessao}>
            <Link href="/" className={styles.circle}>
              <img src='/maos.svg' alt='maos' className={styles.icon} />
            </Link>
            <Link href="/" className={styles.title}>Higiene</Link>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.sessao}>
            <Link href="/" className={styles.circle}>
              <img src='/batom.svg' alt='batom' className={styles.icon} />
            </Link>
            <Link href="/" className={styles.title}>Beleza</Link>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.sessao}>
            <Link href="/" className={styles.circle}>
              <img src='/bebe.svg' alt='bebe' className={styles.icon} />
            </Link>
            <Link href="/" className={styles.title}>Bebês</Link>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={styles.sessao}>
            <Link href="/" className={styles.circle}>
              <img src='/spray.svg' alt='spray' className={styles.icon} />
            </Link>
            <Link href="/" className={styles.title}>Perfumaria</Link>
          </div>
        </SwiperSlide>
        <div className={styles.swiperPagination}></div>
      </Swiper>
    </section>
  );
};

export default Sessoes;
