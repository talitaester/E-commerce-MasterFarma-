'use client';

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./sessoes.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import Link from "next/link";

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
          320: { slidesPerView: 3, spaceBetween: 10 },
          480: { slidesPerView: 4, spaceBetween: 12 },
          768: { slidesPerView: 5, spaceBetween: 14 },
          1300: { slidesPerView: 6, spaceBetween: 16 },
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
          <Link href='/categoria/Medicamentos' className={styles.sessao}>
            <div className={styles.circle}>
              <img src='/pilula.svg' alt='pílula' className={styles.icon} />
            </div>
            <div className={styles.title}>Medicamentos</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href='/categoria/Suplementos' className={styles.sessao}>
            <div className={styles.circle}>
              <img src='/pesos.svg' alt='pesos' className={styles.icon} />
            </div>
            <div className={styles.title}>Suplementos</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href='/categoria/Higiene' className={styles.sessao}>
            <div className={styles.circle}>
              <img src='/maos.svg' alt='maos' className={styles.icon} />
            </div>
            <div className={styles.title}>Higiene</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href='/categoria/Beleza' className={styles.sessao}>
            <div className={styles.circle}>
              <img src='/batom.svg' alt='batom' className={styles.icon} />
            </div>
            <div className={styles.title}>Beleza</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href='/categoria/Bebes' className={styles.sessao}>
            <div className={styles.circle}>
              <img src='/bebe.svg' alt='bebe' className={styles.icon} />
            </div>
            <div className={styles.title}>Bebês</div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href='/categoria/Perfumaria' className={styles.sessao}>
            <div className={styles.circle}>
              <img src='/spray.svg' alt='spray' className={styles.icon} />
            </div>
            <div className={styles.title}>Perfumaria</div>
          </Link>
        </SwiperSlide>
        <div className={styles.swiperPagination}></div>
      </Swiper>
    </section>
  );
};

export default Sessoes;
