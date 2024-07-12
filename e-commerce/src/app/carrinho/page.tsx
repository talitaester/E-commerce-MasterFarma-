"use client";

import ItemCarrinho from "../components/ItemCarrinho/ItemCarrinho";
import "./style.css";
import { useState, useEffect } from "react";
import Link from 'next/link';
import axios from '../../../axios';

export default function Carrinho() {
    const [cep, setCep] = useState('');
    const [cupom, setCupom] = useState('');
    const [produtos, setProdutos] = useState([]); // Inicializado como array vazio

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('/cart');
                setProdutos(response.data || []); // Garante que seja um array
                console.log('Produtos do carrinho:', response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProdutos();
    }, []);

    const calcularSubtotal = () => {
        return produtos.reduce((total, produto) => {
            return total + (produto.subtotal || 0); // Se subtotal não existir, usa 0
        }, 0);
    };

    return (
        <main>
            <div id="tituloCarrinho">
                <img src={"CarrinhoPlus.svg"} alt="Carrinho" />
                <h1>Seu carrinho de compras</h1>
            </div>
            <div className="carrinho">
                <div className="itensCarrinho">
                    {produtos.length > 0 ? (
                        produtos.map((produto) => (
                            <ItemCarrinho  produto={produto} />
                        ))
                    ) : (
                        <p>Nenhum produto no carrinho.</p>
                    )}
                </div>
                <div className="moduloPedido">
                    <form>
                        <div>
                            <label htmlFor="cep">Calcule o valor do frete</label>
                            <div className="inputMaisOK">
                                <input
                                    type="text"
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
                                    type="text"
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
                            <strong>R${calcularSubtotal().toFixed(2)}</strong>
                        </div>
                        <div className="textoMaisPreco">
                            <p>Entrega</p>
                            <strong>R$0,00</strong>
                        </div>
                        <div className="divisoria"></div>
                        <div className="textoMaisPreco">
                            <p>Total</p>
                            <strong>R${calcularSubtotal().toFixed(2)}</strong>
                        </div>
                    </div>
                    <Link href='/'>
                        <button className="btnGrande princi">Continuar comprando</button>
                    </Link>
                    <button className="btnGrande secund">Finalizar compra</button>
                </div>
            </div>
            <h1>Vistos recentemente</h1>
            {/** ... */}
            <h1>Você também pode gostar</h1>
            {/** ... */}
        </main>
    );
}
