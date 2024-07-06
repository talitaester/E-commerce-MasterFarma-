import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./maisVendidos.module.css"
import alternative from "../../app/components/Produto/produto.module.css"
import Produto from "@/app/components/Produto/Produto";

/**
 * Props for `MaisVendidos`.
 */
export type MaisVendidosProps = SliceComponentProps<Content.MaisVendidosSlice>;

/**
 * Component for "MaisVendidos" Slices.
 */
const MaisVendidos = ({ slice }: MaisVendidosProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.section}
    >
      <div className={styles.titulo}>{slice.primary.titulo_mais_vendidos}</div>

      <div className={styles.produtos}>
        <div className={`${alternative.produtos} ${alternative.horizontal}`}>
          <Produto />
        </div>

        <div className={`${alternative.produtos} ${alternative.horizontal}`}>
          <Produto />
        </div>
      </div>

    </section>
  );
};

export default MaisVendidos;
