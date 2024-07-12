"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.css';
import search from '/public/search-icon.svg';
import entrar from '/public/entrar-icon.svg';
import carrinho from '/public/carrinho-icon.svg';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/pesquisa?query=${searchTerm}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href='/' className={styles.logo}>
          <picture className={styles.logoHeader}>
            <source media="(max-width: 600px)" srcSet="/logo-pequena.svg" width={150} height={35} />
            <img src='/logo-media.svg' alt='Logo' width={317} height={60} />
          </picture>
        </Link>

        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input
            className={styles.searchInput}
            type='text'
            placeholder='O que você deseja?'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
