'use client';

import React, { useState } from "react";
import Image from "next/image";
import styles from "./produto.module.css";
import classNames from "classnames";
import axios from "axios";

interface ProdutoProps {
    nome: string;
    precoAntigo?: string;
    precoAtual?: string;
    parcelas?: string;
    imagemSrc?: string;
    editable?: boolean;
    code: number;
    onDelete?: () => void;
    onEdit?: () => void; // Adicionando a prop onEdit
}

const Produto: React.FC<ProdutoProps> = ({
    nome,
    precoAntigo = "R$49,90",
    precoAtual = "R$29,90",
    parcelas = "Ou 3x de 9,99",
    imagemSrc = "/produto.png",
    editable = false,
    code,
    onDelete,
    onEdit,
}) => {
    const [isEditVisible, setIsEditVisible] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/products/code/${code}`);
            console.log(`Deleted product: ${nome}`);
            if (onDelete) {
                onDelete(); // Chama a função onDelete para atualizar a lista de produtos
            }
            setIsEditVisible(false); // Fecha o formulário de confirmação
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
        }
    };

    return (
        <div className={classNames(styles.produto, { [styles.editable]: editable })}>
            <div className={styles.conteudo}>
                <Image
                    className={styles.imagemProduto}
                    src={imagemSrc}
                    alt={nome}
                    width={258}
                    height={258}
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
                            <button className={styles.editButton} onClick={onEdit}>
                                <h6 className={styles.editName}>Editar</h6>
                            </button>
                            <button className={styles.delete} onClick={() => setIsEditVisible(true)}>
                                <Image className={styles.lixo} src='/mini-lixeira.svg' alt="deletar" width={24} height={28} />
                            </button>
                        </>
                    </div>
                )}
            </div>
            {isEditVisible && (
                <div className={styles.excluirCerteza}>
                    <h6>Tem certeza que<br />quer excluir?</h6>
                    <div className={styles.botoesEdit}>
                        <button className={styles.botaoNao} onClick={() => setIsEditVisible(false)}><h6>Não</h6></button>
                        <button className={styles.botaoSim} onClick={handleDelete}>
                            <Image className={styles.lixo} src='/mini-lixeira.svg' alt="deletar" width={24} height={28} />
                            <h6>Sim</h6>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Produto;