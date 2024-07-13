'use client'

import Image from "next/image";
import styles from "./produto.module.css";
import classNames from "classnames";
import { useState } from "react";

function handleEdit(nome: string) {
    console.log(`Editing product: ${nome}`);
}

function handleDelete(nome: string) {
    console.log(`Deleted product: ${nome}`);
}

function excluirProduto() {
    
}

export default function Produto({
    nome = "Hidratante Labial Carmed Barbie 65 Pink 10g",
    precoAntigo = "R$49,90",
    precoAtual = "R$29,90",
    parcelas = "Ou 3x de 9,99",
    imagemSrc = "/produto.png",
    editable = false,
}) {
    const [isEditVisible, setIsEditVisible] = useState(false);
        
    return (
        <div className={classNames(styles.produto, { [styles.editable]: editable })}>
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

                {editable && (
                    <div className={styles.edit}>
                            <>
                            <button className={styles.editButton}>
                            <h6 className={styles.editName}>Editar</h6>
                            </button>
                            <button className={styles.delete} onClick={() => setIsEditVisible(true)}>
                                <Image className={styles.lixo} src='/mini-lixeira.svg'alt="deletar" width={24} height={28}/>
                            </button>
                            </>
                    </div>
                )}
            </div>
            {isEditVisible && (
                <div className={styles.excluirCerteza}>
                    <h6>Tem certeza que<br/>quer excluir?</h6>
                    <div className={styles.botoesEdit}>
                        <button className={styles.botaoNao} onClick={() => setIsEditVisible(false)}><h6>Não</h6></button>
                        <button className={styles.botaoSim} onClick={() => excluirProduto()}><Image className={styles.lixo} src='/mini-lixeira.svg'alt="deletar" width={24} height={28}/><h6>Sim</h6></button>
                    </div>
                </div>
            )}
        </div>
    );
}