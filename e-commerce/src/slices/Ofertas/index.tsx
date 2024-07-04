'use client'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./ofertas.module.css";
import Produto from "@/app/components/Produto/Produto";
import { useEffect, useRef } from "react";

/**
 * Props for `Ofertas`.
 */
export type OfertasProps = SliceComponentProps<Content.OfertasSlice>;

/**
 * Component for "Ofertas" Slices.
 */
const Ofertas = ({ slice }: OfertasProps): JSX.Element => {
  const carrosselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carrossel = carrosselRef.current;

    const handleResize = () => {
      if (carrossel) {
        const isOverflowing = carrossel.scrollWidth > carrossel.clientWidth;
        carrossel.style.justifyContent = isOverflowing ? 'flex-start' : 'center';
        carrossel.style.overflowX = isOverflowing ? 'auto' : 'hidden';
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.section}
    >
      <div className={styles.titulo}>{slice.primary.titulo}</div>
      <div ref={carrosselRef} className={styles.carrosselOfertas}>
        <Produto />
        <Produto />
        <Produto />
        <Produto />
      </div>
    </section>
  );
};

export default Ofertas;
