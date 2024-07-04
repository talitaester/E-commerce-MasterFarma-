import Image from "next/image"
import styles from "./produto.module.css"
import Link from "next/link"

export default function Produto() {
    return (
        <div className={styles.produto}>
            <div className={styles.conteudo}>

              <Image className={styles.imagemProduto} src="/produto.png" alt="produto" width="258" height="258"></Image>
              
              <div className={styles.container}>
                <h6 className={styles.nomeProduto}>Hidratante Labial Carmed Barbie 65 Pink 10g</h6>

                <div className={styles.precos}>
                  <span className={styles.corte}></span>
                  <h6 className={styles.nomeProduto}>R$49,90</h6>

                  <h2 className={styles.precoAtual}>R$29,90</h2>
                  <p className={styles.parcelas}>Ou 3x de 9,99</p>
                </div>
              </div>

            </div>
          </div> 
    ) 
}