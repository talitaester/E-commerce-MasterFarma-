import Image from "next/image";
import styles from "./produto.module.css";

export default function Produto({
    nome = "Hidratante Labial Carmed Barbie 65 Pink 10g",
    precoAntigo = "R$49,90",
    precoAtual = "R$29,90",
    parcelas = "Ou 3x de 9,99",
    imagemSrc = "/produto.png",
}) {
    return (
        <div className={styles.produto}>
            <div className={styles.conteudo}>
                <Image
                    className={styles.imagemProduto}
                    src={imagemSrc}
                    alt={nome}
                    width="258"
                    height="258"
                />
                
                <div className={styles.container}>
                    <h6 className={styles.nomeProduto}>{nome}</h6>

                    <div className={styles.precos}>
                        <span className={styles.corte}></span>
                        <h6 className={styles.nomeProduto}>{precoAntigo}</h6>

                        <h2 className={styles.precoAtual}>{precoAtual}</h2>
                        <p className={styles.parcelas}>{parcelas}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
