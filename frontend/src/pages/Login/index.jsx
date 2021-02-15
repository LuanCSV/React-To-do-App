import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authUser } from '../../services/users';
import './styles.css';
import { ID_TOKEN } from './../../constants/services'

function Login(props) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const history = useHistory();

    if (localStorage.getItem(ID_TOKEN)) {
        console.log("tem localStorage");
        history.push('/to-do');
    }else {
        console.log("nao tem localStorage");
    }

    const logar = useCallback(async (event) => {
        if (event) {
            event.preventDefault();
        }
        const body = {email, senha};
        const res = await authUser(body);

        if (res.status) {
            alert(res.message);
            localStorage.setItem(ID_TOKEN, true);
            history.push('/to-do');
        } else {
            alert(res.message);
        }

    }, [email, senha, history]);

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
                    <button type="submit"> Logar</button>
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
