'use client';

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from '@prismicio/next';
import styles from "./carrossel.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

/**
 * Props for `Carrossel`.
 */
export type CarrosselProps = SliceComponentProps<Content.CarrosselSlice>;

/**
 * Component for "Carrossel" Slices.
 */
const Carrossel = ({ slice }: CarrosselProps): JSX.Element => {
  const imageFields = [
    slice.primary.imagem_1,
    slice.primary.imagem_2,
    slice.primary.imagem_3,
    slice.primary.imagem_4,
    slice.primary.imagem_5,
    slice.primary.imagem_6,
  ];

  return (
    <div className={styles.carousel}>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
          el: `.${styles.carouselDots}`,
          bulletClass: styles.dot,
          bulletActiveClass: styles.dotActive,
        }}
        className={styles.carouselContainer}
      >
        {imageFields.map((image, index) => (
          <SwiperSlide key={index} className={styles.swiperSlide}>
            <div className={styles.imageWrapper}>
              <PrismicNextImage
                field={image}
                className={styles.image}
              />
            </div>
          </SwiperSlide>
        ))}
        <div className={styles.carouselDots}></div>
      </Swiper>
    </div>
  );
};

export default Carrossel;
