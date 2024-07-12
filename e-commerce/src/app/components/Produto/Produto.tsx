import Image from "next/image";
import styles from "./produto.module.css";
import classNames from "classnames";

function handleEdit(nome: string) {
    console.log(`Editing product: ${nome}`);
}

function handleDelete(nome: string) {
    console.log(`Deleted product: ${nome}`);
}

export default function Produto({
    nome = "Hidratante Labial Carmed Barbie 65 Pink 10g",
    precoAntigo = "R$49,90",
    precoAtual = "R$29,90",
    parcelas = "Ou 3x de 9,99",
    imagemSrc = "/produto.png",
    editable = false,
}) {
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
                        <button className={styles.editButton} onClick={() => handleEdit(nome)}>
                            <h6 className={styles.editName}>Edit</h6>
                        </button>
                        <button className={styles.delete} onClick={() => handleDelete(nome)}>
                            <Image className={styles.lixo} src='/mini-lixeira.svg'alt="deletar" width={24} height={28}/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}