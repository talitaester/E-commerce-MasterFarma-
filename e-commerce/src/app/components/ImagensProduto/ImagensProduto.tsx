import Image from "next/image";
import styles from "./imagensproduto.module.css";
import finiimagem from '../../../../public/fini.png';
  
  interface ImagensProdutoProps {
    images: { url: string }[]
  }

export default function ImagensProduto({images}:ImagensProdutoProps) {
    {/** Recebe array de urls */}
    return (
        <div className={styles.imagensDoProduto}>
            <div className={styles.imagensPequenas}>
                {/** Mapeia cada url do array */}
                <Image
                    className={`${styles.imagemP} ${styles.selecionada}`}
                    src={finiimagem}
                    /** ^^^ URL mapeada */
                    alt={"produto"}
                />
                <Image
                    className={`${styles.imagemP}`}
                    src={finiimagem}
                    alt={"produto"}
                />
                <Image
                    className={`${styles.imagemP}`}
                    src={finiimagem}
                    alt={"produto"}
                />
                <Image
                    className={`${styles.imagemP}`}
                    src={finiimagem}
                    alt={"produto"}
                />
            </div>
            <Image
                className={`${styles.imagemG}`}
                src={finiimagem}
                alt={"produto"}
            />
        </div>
    )
}