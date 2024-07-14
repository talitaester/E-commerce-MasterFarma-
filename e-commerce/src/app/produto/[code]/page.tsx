// app/produto/[code]/page.tsx
"use client"

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import ImagensProduto from "../../components/ImagensProduto/ImagensProduto";
import Produto from "../../components/Produto/Produto";
import "../style.css"
import axios from "axios";

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

const ProdutoPage = () => {
    const { code } = useParams()
    const [produto, setProduto] = useState<ProdutoType | null>(null)
    const [itensSemelhantes, setItensSemelhantes] = useState<ProdutoType[]>([])

    useEffect(() => {
        if (code) {
            const fetchProduto = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/products/code/${code}`);
                    setProduto(response.data);
                } catch (error) {
                    console.error('Erro ao buscar produto:', error);
                }
            };
            if (code) fetchProduto();
        }
    }, [code]);

    useEffect(() => {
        const fetchItensSemelhantes = async (categoria: string) => {
            try {
                const response = await axios.get(`http://localhost:8080/products/category/${categoria}`);
                setItensSemelhantes(response.data || []);
                console.log('Itens semelhantes:', response.data);
            } catch (error) {
                console.error('Erro ao buscar itens semelhantes:', error);
            }
        }
        if (produto?.category) fetchItensSemelhantes(produto.category)
    }, [produto])

    if (!produto) {
        return <div>Carregando...</div>;
    }
    
    return (
        <div className="principal">
            <div className="produtoTodo">
                <div id="desktop"><ImagensProduto images={produto.images} /></div>
                <div className="infoProduto">
                    <div className="nomeProduto">
                        <h2>{produto.name}</h2>
                        <div className="ratingMaisCodigo">
                            <div className="rating">
                                <img src="../Estrela.svg" />
                                <img src="../Estrela.svg" />
                                <img src="../Estrela.svg" />
                                <img src="../Estrela.svg" />
                                <img src="../Estrela.svg" />
                            </div>
                            <span>Código: {produto.code}</span>
                        </div>
                    </div>
                    <div id="mobile"><ImagensProduto images={produto.images} /></div>
                    <div className="precosMaisBotao">
                        <div className="precos">
                            <span className="corte"></span>
                            <h3 className="precoAntigo">R${produto.oldPrice.toFixed(2)}</h3>
                            <h2 className="precoAtual">R${produto.price.toFixed(2)}</h2>
                            <p className="parcelas">Ou 3x de R${(produto.price / 3).toFixed(2)}</p>
                        </div>
                        <button className="addCarrinho">
                            <img src="../CarrinhoPlus.svg" />
                            <p>Adicionar ao carrinho</p>
                        </button>
                    </div>
                    <div className="calculaFrete">
                        Calcule o valor do frete
                        <div>
                        <input type="text" placeholder="Digite seu CEP" />
                        <button> Ok </button>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Itens semelhantes</h1>
            <div className="produtosSemelhantes">
                {itensSemelhantes.length > 0 ? (
                    itensSemelhantes.map((produto) => (
                        <Produto
                            key={produto.id}
                            nome={produto.name}
                            precoAntigo={`R$${produto.oldPrice.toFixed(2)}`}
                            precoAtual={`R$${produto.price.toFixed(2)}`}
                            parcelas={`Ou 3x de R$${(produto.price / 3).toFixed(2)}`}
                            imagemSrc={produto.images[0]?.url || '/produto.png'}
                            code={produto.code}
                        />
                    ))
                ) : (
                    <p>Nenhum item semelhante encontrado.</p>
                )}
            </div>
            <h1>Outros produtos</h1>
        </div>
    )
}

export default ProdutoPage;