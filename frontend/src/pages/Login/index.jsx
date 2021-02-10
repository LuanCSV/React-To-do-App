import React, { useCallback, useState } from 'react';
import './styles.css';

function Login(props) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    const logar = useCallback((event) => {
        if (event) {
            event.preventDefault();
        }
        console.log(email, senha);
    }, [email, senha]);

    return (
        <div className="pageLogin">
            
            <form onSubmit={logar}>
                <h3>Login</h3>
                <div className="area">
                    <input 
                        type="text" 
                        name="email" 
                        value={email} 
                        onChange={(e) => {setEmail(e.target.value)}}
                        placeholder="E-mail"/>
                </div>
                <div className="area">
                    <input 
                        type="password" 
                        name="senha" 
                        value={senha} 
                        onChange={(e) => {setSenha(e.target.value)}}
                        placeholder="Senha"/>
                </div>
                <div className="area">
                    <button type="submit" onClick={() => {logar()}}> Logar</button>
                </div>
                <div className="area esqueceuSenha">
                    <button> Esqueceu a senha? </button>
                </div>

                <div className="area naoTemCadastro">
                    <small>Ainda não tem cadastro? Clique aqui!</small>
                </div>
                
            </form>
        </div>
    )
}

export default Login;
