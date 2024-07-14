"use client";

import ItemCarrinho from "../components/ItemCarrinho/ItemCarrinho";
import Produto from "../components/Produto/Produto";
import "./style.css";
import { useState, useEffect } from "react";
import Link from 'next/link';
// import axios from '../../../axios';
import axios from 'axios'

interface ProdutoType {
    category: string;
    code: number;
    id: number;
    name: string;
    price: number;
    oldPrice: number;
    images: { url: string }[];
    quant: number;
}

export default function Carrinho() {
    const [cep, setCep] = useState('');
    const [cupom, setCupom] = useState('');
    const [produtos, setProdutos] = useState<ProdutoType[]>([]);
    const [vistosRecentemente, setVistosRecentemente] = useState<ProdutoType[]>([]);
    const [frete, setFrete] = useState(0);
    const [itensSemelhantes, setItensSemelhantes] = useState<ProdutoType[]>([]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cart');
                setProdutos(response.data || []);
                console.log('Produtos do carrinho:', response.data);
                if (response.data.length > 0) {
                    const primeiraCategoria = response.data[0].category;
                    await fetchItensSemelhantes(primeiraCategoria);
                }
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        const fetchVistosRecentemente = async () => {
            try {
                const response = await axios.get('http://localhost:8080/products');
                setVistosRecentemente(response.data || []);
                console.log('Produtos vistos recentemente:', response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos vistos:', error);
            }
        };

        fetchProdutos();
        fetchVistosRecentemente();
    }, []);

    const fetchItensSemelhantes = async (categoria: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/products/category/${categoria}`);
            setItensSemelhantes(response.data || []);
            console.log('Itens semelhantes:', response.data);
        } catch (error) {
            console.error('Erro ao buscar itens semelhantes:', error);
        }
    };

    const calcularSubtotal = () => {
        return produtos.reduce((total, produto) => {
            return total + (produto.price * produto.quant || 0);
        }, 0);
    };

    const calcularTotal = () => {
        return calcularSubtotal() + frete;
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d{0,8}$/.test(value)) {
            setCep(value);
        }
    };

    const calcularFrete = () => {
        if (cep.length > 0) {
            setFrete(10);
        } else {
            setFrete(0);
        }
    };

    const handleQuantityChange = (id: number, newQuantity: number) => {
        setProdutos((produtos) =>
            produtos.map((produto) =>
                produto.id === id ? { ...produto, quant: newQuantity } : produto
            )
        );
    };

    return (
        <div className="principal">
            <div id="tituloCarrinho">
                <img src={"CarrinhoPlus.svg"} alt="Carrinho" />
                <h1>Seu carrinho de compras</h1>
            </div>
            <div className="carrinho">
                <div className="itensCarrinho">
                    {produtos.length > 0 ? (
                        produtos.map((produto) => (
                            <ItemCarrinho
                                produto={produto}
                                key={produto.id}
                                onQuantityChange={handleQuantityChange}
                            />
                        ))
                    ) : (
                        <p style={{color: "var(--c95)", fontSize:"2.5em"}}>Nenhum produto no carrinho.</p>
                    )}
                </div>
                <div className="moduloPedido" style={{display: produtos.length > 0 ? "flex" : "none"}}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="cep">Calcule o valor do frete</label>
                            <div className="inputMaisOK">
                                <input
                                    type="text"
                                    placeholder="Digite seu CEP"
                                    value={cep}
                                    onChange={handleCepChange}
                                />
                                <button type="button" className="btnOK" onClick={calcularFrete}>Ok</button>
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
                                <button type="button" className="btnOK">Ok</button>
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
                            <strong>R${frete.toFixed(2)}</strong>
                        </div>
                        <div className="divisoria"></div>
                        <div className="textoMaisPreco">
                            <p>Total</p>
                            <strong>R${calcularTotal().toFixed(2)}</strong>
                        </div>
                    </div>
                    
                    <div className="botoezoes">
                            <Link href='/'>
    <button className="btnGrande princi">Continuar comprando</button>
                            </Link>
                        <button className="btnGrande secund">Finalizar compra</button>
                    </div>
                </div>
            </div>
            <h1>Vistos recentemente</h1>
            <div className="produtosVistos">
                {vistosRecentemente.length > 0 ? (
                    vistosRecentemente.slice(0, 5).map((produto) => (
                        <Produto
                            key={produto.id}
                            nome={produto.name}
                            precoAntigo={`R$${produto.oldPrice}`}
                            precoAtual={`R$${produto.price}`}
                            parcelas={`Ou 3x de R$${(produto.price / 3).toFixed(2)}`}
                            imagemSrc={produto.images[0]?.url || '/produto.png'}
                            code={produto.code}
                        />
                    ))
                ) : (
                    <p style={{color: "var(--c95)", fontSize:"2.5em"}}>Nenhum produto visto recentemente.</p>
                )}
            </div>
            <h1>Itens Semelhantes</h1>
            <div className="produtosSemelhantes">
                {itensSemelhantes.length > 0 ? (
                    itensSemelhantes.slice(0, 4).map((produto) => (
                        <Produto
                            key={produto.id}
                            nome={produto.name}
                            precoAntigo={`R$${produto.oldPrice}`}
                            precoAtual={`R$${produto.price}`}
                            parcelas={`Ou 3x de R$${(produto.price / 3).toFixed(2)}`}
                            imagemSrc={produto.images[0]?.url || '/produto.png'}
                            code={produto.code} 
                        />
                    ))
                ) : (
                    <p style={{color: "var(--c95)", fontSize:"2.5em"}}>Nenhum item semelhante encontrado.</p>
                )}
            </div>
        </div>
    );
}
