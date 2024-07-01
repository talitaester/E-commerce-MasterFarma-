import styles from "./footer.module.css"
import Image from "next/image"
import logoGrande from "/public/logo-grande.svg"
import logoMedia from "/public/logo-media.svg"
import logoPequena from "/public/logo-pequena.svg"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <span className={styles.rectangle}></span>
            <div className={styles.container}>
                <div className={styles.sections}>
                    <ul className={styles.list}>
                        <li className={styles.title}>Atendimento</li>
                        <li>
                            <Link href="" className={styles.links}>Perguntas frequentes</Link>
                        </li>
                        <li>
                            <Link href="" className={styles.links}>Aviso de privacidade </Link>
                        </li>
                        <li>
                            <Link href="" className={styles.links}>Política de entrega</Link>
                        </li>
                    </ul>

                    <ul className={styles.list}>
                        <li className={styles.title}>Institucional</li>
                        <li>
                            <Link href="" className={styles.links}>Nossa história</Link>
                        </li>
                        <li>
                            <Link href="" className={styles.links}>Nossas Lojas </Link>
                        </li>
                        <li>
                            <Link href="" className={styles.links}>Trabalhe conosco</Link>
                        </li>
                    </ul>
                </div>
                
                <picture>
                    <source media="(max-width: 430px)" srcSet="/logo-pequena.svg" />
                    <img src="/logo-media.svg" alt="Logo"/>
                </picture>
            </div>
            <p className={styles.copyright}>Copyright © 2024</p>
        </footer>
    )
}