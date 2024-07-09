import Image from "next/image"
import styles from "./itemcarrinho.module.css"
import Link from "next/link"
import { useState } from "react"

export default function ItemCarrinho() {
  const [quant, setQuant] = useState(1)
  const preco = 29.90

    return (
        <div className={styles.produto}>
            <div className={styles.conteudo}>
              <div className={styles.conteudoOriginal}>
                <Image className={styles.imagemProduto} src="/produto.png" alt="produto" width="258" height="258"></Image>
                
                <div className={styles.container}>
                  <h6 className={styles.nomeProduto}>Hidratante Labial Carmed Barbie 65 Pink 10g</h6>

                  <div className={styles.precos}>
                    <span className={styles.corte}></span>
                    <h6 className={styles.nomeProduto}>R$49,90</h6>

                    <h2 className={styles.precoAtual}>R${preco.toFixed(2)}</h2>
                    <p className={styles.parcelas}>Ou 3x de 9,99</p>
                  </div>
                </div>
              </div>
              <div className={styles.editarItem}>
                <div className={styles.caracteristicasItem}>
                  <div className={styles.mudarQuant}>
                    <button className={styles.maisMenos} onClick={() => setQuant(quant-1)}> − </button>
                    <div className={styles.quantidade}>{quant}</div>
                    <button className={styles.maisMenos} onClick={() => setQuant(quant+1)}> + </button>
                  </div>
                  <div className={styles.subtotal}>
                    <label>Subtotal</label>
                    <div className={styles.subtotalReais}>R${(preco*quant).toFixed(2)}</div>
                  </div>
                </div>
                <img src={"/Lixeira.svg"} alt="remover item do carrinho" />
              </div>
              
            </div>
          </div> 
    ) 
}