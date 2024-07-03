import styles from "./header.module.css";
import Image from 'next/image';
import Link from 'next/link';
import search from '/public/search-icon.svg';
import entrar from '/public/entrar-icon.svg';
import carrinho from '/public/carrinho-icon.svg';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
          <Link href='' className={styles.logo}>
            <picture className={styles.logoHeader}> 
              <source media="(max-width: 600px)" srcSet="/logo-pequena.svg" width={150} height={35}/>
              <img src='/logo-media.svg' alt='Logo' width={317} height={60} />
            </picture>
          </Link>

        <form className={styles.searchForm}>
            <input className={styles.searchInput} type='text' placeholder='O que você deseja?' />
            <button className={styles.searchButton} type='submit'>
                <Image className={styles.IconeHeader} src={search} alt='search' width={20} height={20} />
            </button>
        </form>


        <div className={styles.headerOption}>
          <Image className={styles.IconeHeader} src={entrar} alt='entrar' width={32} height={32} />
          Entrar
        </div>

        <div className={styles.headerOption}>
          <Image className={styles.IconeHeader} src={carrinho} alt='carrinho' width={32} height={32} />
          R$0,00
        </div>
      </div>
    </header>
  );
}
