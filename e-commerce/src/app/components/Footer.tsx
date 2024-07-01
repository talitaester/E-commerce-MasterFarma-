import Image from "next/image"
import logo from "/logo.svg"

export default function Footer() {
    return (
        <>
        <h6>Atendimento</h6>
        <p>
        Perguntas frequentes <br/>
        Aviso de privacidade <br/>
        Política de entrega <br/>
        </p>

        <h6>Institucional</h6>
        <p>
        Nossa história <br/>
        Nossas Lojas <br/>
        Trabalhe conosco <br/>
        </p>

        <Image src={logo} alt="Logo"/>
        </>
    )
}