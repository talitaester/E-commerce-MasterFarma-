"use client"

import { useRouter } from "next/router";
import "./style.css"
import { useState } from "react";

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert('As senhas não coincidem uma com a outra; por favor tente novamente.')
            return
        }

        const resposta = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })

        if (resposta.ok) {
            alert('Usuário registrado com sucesso!');
            router.push('/login');
    
        } else {
            const data = await resposta.json();
            alert(`Erro: ${data.message}`)
        }
    }

    return (
        <div className="caixaLogSign">
            <form onSubmit={handleSubmit}>
                <h2>Crie sua Conta MasterFarma:</h2>
                <label htmlFor="name">Digite seu nome completo:</label>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <input
                    type="confirmPassword"
                    placeholder="Confirmar Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
            <a href="/login">Já tem cadastro? Inicie sua sessão</a>
        </div>
    )
}