'use client';

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./sessoes.module.css";
import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Props for `Sessoes`.
 */
export type SessoesProps = SliceComponentProps<Content.SessoesSlice>;

/**
 * Component for "Sessoes" Slices.
 */
const Sessoes = ({ slice }: SessoesProps): JSX.Element => {
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
      className={styles.sessoes}
    >
      <div ref={carrosselRef} className={styles.carrosselSessoes}>
        <span className={styles.sessao}>
          <Link href=""  className={styles.circle}>
            <img src='/pilula.svg' alt='pílula' className={styles.icon} />
          </Link>
          <Link href="" className={styles.title}>Medicamentos</Link>
        </span>

        <span className={styles.sessao}>
          <Link href="" className={styles.circle}>
            <img src='/pesos.svg' alt='pesos' className={styles.icon} />
          </Link>
          <Link href="" className={styles.title}>Suplementos</Link>
        </span>

        <span className={styles.sessao}>
          <Link href="" className={styles.circle}>
            <img src='/maos.svg' alt='maos' className={styles.icon} />
          </Link>
          <Link href="" className={styles.title}>Higiene</Link>
        </span>

        <span className={styles.sessao}>
          <Link href="" className={styles.circle}>
            <img src='/batom.svg' alt='batom' className={styles.icon} />
          </Link>
          <Link href="" className={styles.title}>Beleza</Link>
        </span>

        <span className={styles.sessao}>
          <Link href="" className={styles.circle}>
            <img src='/bebe.svg' alt='bebe' className={styles.icon} />
          </Link>
          <Link href="" className={styles.title}>Bebês</Link>
        </span>

        <span className={styles.sessao}>
          <Link href="" className={styles.circle}>
            <img src='/spray.svg' alt='spray' className={styles.icon} />
          </Link>
          <Link href="" className={styles.title}>Perfumaria</Link>
        </span>
      </div>
    </section>
  );
};

export default Sessoes;
