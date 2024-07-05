import "./style.css"

export default function Pesquisa(){
    return (
        <>
            <h1>Exibindo resultados para “xxxxxxxxx”</h1>
            <div className="gradePesquisa">
                <div className="filtros">
                    <form>
                        <h2>Filtrar por categoria</h2>
                        <div className="opcoesForm">
                            <div>
                                <input type="checkbox" id="categoria1" name="categoria1" value="Medicamentos" />
                                <label htmlFor="Medicamentos">Medicamentos</label>
                            </div><div>
                                <input type="checkbox" id="categoria2" name="categoria2" value="Suplementos" />
                                <label htmlFor="Suplementos">Suplementos</label>
                            </div><div>
                                <input type="checkbox" id="categoria3" name="categoria3" value="Higiene" />
                                <label htmlFor="Higiene">Higiene</label>
                            </div><div>
                                <input type="checkbox" id="categoria4" name="categoria4" value="Beleza" />
                                <label htmlFor="Beleza">Beleza</label>
                            </div><div>
                                <input type="checkbox" id="categoria5" name="categoria5" value="Bebês" />
                                <label htmlFor="Bebês">Bebês</label>
                            </div><div>
                                <input type="checkbox" id="categoria6" name="categoria6" value="Perfumaria" />
                                <label htmlFor="Perfumaria">Perfumaria</label>
                            </div>
                        </div>
                        <h2>Filtrar por preço</h2>
                        <div className="opcoesForm">
                            <div>
                                <input type="radio" id="ate50" name="filtrar_preco" value="Até 50 Reais" />
                                <label htmlFor="ate50">Até R$50,00</label>
                            </div><div>
                                <input type="radio" id="ate50" name="filtrar_preco" value="Até 100 Reais" />
                                <label htmlFor="ate100">Até R$100,00</label>
                            </div><div>
                                <input type="radio" id="ate200" name="filtrar_preco" value="Até 200 Reais" />
                                <label htmlFor="ate200">Até R$200,00</label>
                            </div><div>
                                <input type="radio" id="acima200" name="filtrar_preco" value="Acima de 200 Reais" />
                                <label htmlFor="acima200">Acima de R$200,00</label>
                            </div><div>
                                <input type="radio" id="reseta_preco" name="filtrar_preco" value="Reset" />
                                <label htmlFor="reseta_preco">Resetar seleção</label>
                            </div>
                        </div>
                        <h2>Ordenar por</h2>
                        <div className="opcoesForm">
                            <div>
                                <input type="radio" id="relevancia" name="ordenar_por" value="Relevância" />
                                <label htmlFor="relevancia">Relevância</label>
                            </div><div>
                                <input type="radio" id="preco" name="ordenar_por" value="Preço" />
                                <label htmlFor="preco">Preço</label>
                            </div><div>
                                <input type="radio" id="reseta_ordenacao" name="ordenar_por" value="Reset" />
                                <label htmlFor="ordenacao">Resetar seleção</label>
                            </div>
                        </div>
                    </form>
                </div>
                {/** adicionar grid pegando do banco de dados todos os produtos */}
            </div>
            {/** Seção você também pode gostar */}
        </>
    )
}