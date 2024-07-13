import Image from "next/image";
import styles from "./itemcarrinho.module.css";
import { useState } from "react";
import finiimagem from '../../../../public/fini.png';
import axios from 'axios';
import Link from "next/link";

interface Produto {
  category: string;
  code: number;
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  images: { url: string }[];
  quant: number;
}

interface ItemCarrinhoProps {
  produto: Produto;
  onQuantityChange: (id: number, newQuantity: number) => void; // Nova prop
}

export default function ItemCarrinho({ produto, onQuantityChange }: ItemCarrinhoProps) {
  const [quant, setQuant] = useState(produto.quant);

  const atualizarQuantidade = async (novaQuant: number) => {
    try {
      await axios.put(`http://localhost:8080/cart/${produto.id}/quantity`, { quant: novaQuant });
    } catch (error) {
      console.error('Erro ao atualizar a quantidade:', error);
    }
  };

  const removerDoCarrinho = async () => {
    try {
        await axios.delete(`http://localhost:8080/cart/${produto.id}`);
        // Aqui você pode chamar uma função de callback se precisar atualizar a lista no componente pai
    } catch (error) {
        console.error('Erro ao remover o produto do carrinho:', error);
    }
}

  const incrementar = async () => {
    const novaQuant = quant + 1;
    setQuant(novaQuant);
    await atualizarQuantidade(novaQuant);
    onQuantityChange(produto.id, novaQuant); // Chama o callback
  };

  const decrementar = async () => {
    if (quant > 1) {
      const novaQuant = quant - 1;
      setQuant(novaQuant);
      await atualizarQuantidade(novaQuant);
      onQuantityChange(produto.id, novaQuant); // Chama o callback
    }
  };

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
              <h6 className={styles.precoAntigo}>R${produto.oldPrice}</h6>
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
          <button className={styles.lixeira} onClick={removerDoCarrinho}>
          <img  src={"/Lixeira.svg"} alt="remover item do carrinho"  />
          </button>
        </div>
      </div>
    </div>
  );
}
