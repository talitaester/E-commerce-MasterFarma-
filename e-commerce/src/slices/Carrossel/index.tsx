'use client'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from '@prismicio/next';
import { useState } from 'react';
import styles from "./carrossel.module.css"

/**
 * Props for `Carrossel`.
 */
export type CarrosselProps = SliceComponentProps<Content.CarrosselSlice>;

/**
 * Component for "Carrossel" Slices.
 */
const Carrossel = ({ slice }: CarrosselProps): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
      {imageFields.map((image, index) => (
        <div
          key={index}
          className={`${styles.carouselItem} ${index === currentSlide ? styles.carouselItemActive : ''}`}
        >
          <div className={`${styles.imageWrapper}`}>
            <PrismicNextImage
              field={image}
              className={`${styles.image}`}
            />
          </div>
        </div>
      ))}
      <div className={styles.carouselDots}>
        {imageFields.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carrossel;
