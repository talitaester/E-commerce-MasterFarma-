import Image from "next/image";
import styles from "./imagensproduto.module.css";
import finiimagem from '../../../../public/fini.png';
  
  interface ImagensProdutoProps {
    images: { url: string }[]
  }

export default function ImagensProduto({images}:ImagensProdutoProps) {
    const imagensLimitadas = images.slice(0, 6)
    return (
        <div className={styles.imagensDoProduto}>
            <div className={styles.imagensPequenas}>
                {imagensLimitadas.map((imagem)=>
                    <img
                    className={imagem === images[0] ? `${styles.imagemP} ${styles.selecionada}` : `${styles.imagemP}`}
                    src={imagem.url}
                    alt={"produto"}
                />
                )}
            </div>
            <img
                className={`${styles.imagemG}`}
                src={images[0].url}
                alt={"produto"}
            />
        </div>
    )
}