"use client"

import { useRouter } from "next/navigation"
import "./style.css"
import { useState } from "react"

export default function LogIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()


    return (
        <div className="caixaLogSign login">
            <form> {/** onSubmit={handleSubmit}; ainda falta mexer com token */}
                <h2>Inicie sua sessão na MasterFarma:</h2>
                <label htmlFor="email">Digite seu endereço de Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Digite sua senha:</label>
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            <a href="/signup">Não possui conta? Cadastre-se aqui</a>
        </div>
    )
}