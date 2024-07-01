import './header.css'
import Image from "next/image"
import Link from "next/link"

export default function Header(){
    return (
        <header>
            <div className='logoHeader'>
                
                <h1>Master<span>Farma</span></h1>
            </div>
            <div>
                <input type='text' placeholder='O que você deseja?' />
                <div className='IconeHeader'>
                    
                    Entrar
                </div>
                <div className='IconeHeader'>
                    
                    R$0,00
                </div>
            </div>
        </header>
    )
}