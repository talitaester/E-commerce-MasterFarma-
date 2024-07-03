import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import styles from "./ofertas.module.css"
import Image from "next/image";
import Produto from "@/app/components/Produto/produto";

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

        <div className={styles.exibicao}>
          <Produto />
          <Produto />
          <Produto />
          <Produto />
        </div>
    </section>
  );
};

export default Ofertas;
