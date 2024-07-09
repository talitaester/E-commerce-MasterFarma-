"use client"

import ItemCarrinho from "../components/ItemCarrinho/ItemCarrinho"
import "./style.css"
import { useState } from "react"

export default function LogIn() {
    const [cep, setCep] = useState('')
    const [cupom, setCupom] = useState('')

    return (
        <main>
            <div id="tituloCarrinho">
                <img src={"CarrinhoPlus.svg"} />
                <h1>Seu carrinho de compras</h1>
            </div>
            <div className="carrinho">
                <div className="itensCarrinho">
                    <ItemCarrinho />
                    <ItemCarrinho />
                </div>
                <div className="moduloPedido">
                    <form>
                        <div>
                            <label htmlFor="cep">Calcule o valor do frete</label>
                            <div className="inputMaisOK">
                                <input
                                    type="cep"
                                    placeholder="Digite seu CEP"
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                />
                                <button className="btnOK">Ok</button>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="cupom">Cupom de desconto</label>
                            <div className="inputMaisOK">
                                <input
                                    type="cupom"
                                    placeholder="Digite seu cupom"
                                    value={cupom}
                                    onChange={(e) => setCupom(e.target.value)}
                                />
                                <button className="btnOK">Ok</button>
                            </div>
                        </div>
                    </form>
                    <div className="divisoria"></div>
                    <div className="resumo">
                        <label>Resumo do pedido</label>
                        <div className="textoMaisPreco">
                            <p>Subtotal</p>
                            <strong>R$119,60 {/** Mudar para preço dinâmico */}</strong>
                        </div>
                        <div className="textoMaisPreco">
                            <p>Entrega</p>
                            <strong>R$0,00 </strong>
                        </div>
                        <div className="divisoria"></div>
                        <div className="textoMaisPreco">
                            <p>Total</p>
                            <strong>R$119,60 {/** Mudar para preço dinâmico */}</strong>
                        </div>
                    </div>
                    <button className="btnGrande princi">Continuar comprando</button>
                    <button className="btnGrande secund">Finalizar compra</button>
                </div>
            </div>
            <h1>Vistos recentemente</h1>
            {/** ... */}
            <h1>Você também pode gostar</h1>
            {/** ... */}
        </main>
    )
}