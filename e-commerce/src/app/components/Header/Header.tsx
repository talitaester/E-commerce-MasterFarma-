import './header.css'
import Image from "next/image"
import Link from "next/link"

export default function Header(){
    return (
        <header>
            <div className='logoHeader'>
                <Image src={"/"} alt='Logo da Master Farma' />
                <h1>Master<span>Farma</span></h1>
            </div>
            <div>
                <input type='text' placeholder='O que você deseja?' />
                <div className='IconeHeader'>
                    <Image src={"/"} alt='Ícone de usuário' />
                    Entrar
                </div>
                <div className='IconeHeader'>
                    <Image src={"/"} alt='Carrinho de compras' />
                    R$0,00
                </div>
            </div>
        </header>
    )
}