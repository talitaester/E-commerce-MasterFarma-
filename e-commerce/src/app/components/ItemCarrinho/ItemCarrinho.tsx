import Image from "next/image";
import styles from "./itemcarrinho.module.css";
import { useState } from "react";
import finiimagem from '../../../../public/fini.png'

interface Produto {
  category: string;
  code: number;
  id: number;
  name: string;
  price: number;
  oldprice: '$99,99';
  images: { url: string }[];
}

interface ItemCarrinhoProps {
  produto: Produto;
}

export default function ItemCarrinho({ produto }: ItemCarrinhoProps) {
  const [quant, setQuant] = useState(1);

  const incrementar = () => setQuant(quant + 1);
  const decrementar = () => {
    if (quant > 1) setQuant(quant - 1);
  };

  // const imagemUrl = produto.images && produto.images.length > 0 ? produto.images[0].url : 'https://drogariasp.vteximg.com.br/arquivos/ids/1078300-500-500/853445---hidratante-labial-pink-barbie-65-carmed-10g_0000_7897947617704_99_1_1200_72_SRGB.png?v=638472307626330000'; // URL padrão caso não tenha imagem

  return (
    <div className={styles.produto}>
      <div className={styles.conteudo}>
        <div className={styles.conteudoOriginal}>
          <Image
            className={styles.imagemProduto}
            src={finiimagem}
            alt={produto.name}
            width={258}
            height={258}
          />
          <div className={styles.container}>
            <h6 className={styles.nomeProduto}>{produto.name}</h6>
            <div className={styles.precos}>
              <span className={styles.corte}></span>
              <h6 className={styles.precoAntigo}>R${produto.oldprice}</h6>
              <h2 className={styles.precoAtual}>R${produto.price}</h2>
              <p className={styles.parcelas}>Ou 3x de R$9,99</p>
            </div>
          </div>
        </div>
        <div className={styles.editarItem}>
          <div className={styles.caracteristicasItem}>
            <div className={styles.mudarQuant}>
              <button
                className={styles.maisMenos}
                onClick={decrementar}
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <div className={styles.quantidade}>{quant}</div>
              <button
                className={styles.maisMenos}
                onClick={incrementar}
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
            <div className={styles.subtotal}>
              <label>Subtotal</label>
              <div className={styles.subtotalReais}>R${(produto.price * quant).toFixed(2)}</div>
            </div>
          </div>
          
          <img src={"/Lixeira.svg"} alt="remover item do carrinho" />
        </div>
      </div>
    </div>
  );
}
