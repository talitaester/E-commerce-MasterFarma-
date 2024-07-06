import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from './compreJunto.module.css'
import Link from "next/link";
import Image from "next/image";

/**
 * Props for `CompreJunto`.
 */
export type CompreJuntoProps = SliceComponentProps<Content.CompreJuntoSlice>;

/**
 * Component for "CompreJunto" Slices.
 */
const CompreJunto = ({ slice }: CompreJuntoProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.section}
    >
      <div className={styles.titulo}>{slice.primary.titulo_compre_junto}</div>

      <div className={styles.conjuntoKits}>
        <Link href='/' className={styles.kit}>
          <Image className={styles.img} src="/compreJunto.png" alt="" width={392} height={438}/>
          <h4 className={styles.nomeProduto}>Kit promocional</h4>
        </Link>

        <Link href='/' className={styles.kit}>
          <Image className={styles.img} src="/compreJunto.png" alt="" width={392} height={438}/>
          <h4 className={styles.nomeProduto}>Kit promocional</h4>
        </Link>

        <Link href='/' className={styles.kit}>
          <Image className={styles.img} src="/compreJunto.png" alt="" width={392} height={438}/>
          <h4 className={styles.nomeProduto}>Kit promocional</h4>
        </Link>
      </div>

    </section>
  );
};

export default CompreJunto;
