'use client'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./marcas.module.css";
import Image from "next/image";
import Link from "next/link";

/**
 * Props for `Ofertas`.
 */
export type MarcasProps = SliceComponentProps<Content.MarcasSlice>;

/**
 * Component for "Ofertas" Slices.
 */
const Marcas = ({ slice }: MarcasProps): JSX.Element => {


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.section}
    >
      <div className={styles.titulo}>{slice.primary.titulo_marcas}</div>
      <div className={styles.quatroMarcas}>
        <Link href='/'><Image className={styles.marca} src="/teste.png" alt="" width={288} height={288}/></Link>
        <Link href='/'><Image className={styles.marca} src="/teste.png" alt="" width={288} height={288}/></Link>
        <Link href='/'><Image className={styles.marca} src="/teste.png" alt="" width={288} height={288}/></Link>
        <Link href='/'><Image className={styles.marca} src="/teste.png" alt="" width={288} height={288}/></Link> 
      </div>
      </section>
  );
};

export default Marcas;
