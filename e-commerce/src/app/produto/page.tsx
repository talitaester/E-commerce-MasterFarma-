import ImagensProduto from "../components/ImagensProduto/ImagensProduto";
import "./style.css"

export default function Produto () {
    return (
        <div className="principal">
            <div className="produtoTodo">
                <div id="desktop"><ImagensProduto images={[]} /></div>
                <div className="infoProduto">
                    <div className="nomeProduto">
                        <h2>Hidratante Labial Carmed Barbie 65 Pink 10g</h2>
                        <div className="ratingMaisCodigo">
                            <div className="rating">
                                <img src="Estrela.svg" />
                                <img src="Estrela.svg" />
                                <img src="Estrela.svg" />
                                <img src="Estrela.svg" />
                                <img src="Estrela.svg" />
                            </div>
                            <span>Código: 40028922</span>
                        </div>
                    </div>
                    <div id="mobile"><ImagensProduto images={[]} /></div>
                    <div className="precosMaisBotao">
                        <div className="precos">
                            <span className="corte"></span>
                            <h3 className="precoAntigo">R$49,90</h3>
                            <h2 className="precoAtual">R$29,90</h2>
                            <p className="parcelas">Ou 3x de R$9,99</p>
                        </div>
                        <button className="addCarrinho">
                            <img src="CarrinhoPlus.svg" />
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
            <h1>Você também pode gostar</h1>
        </div>
    )
}