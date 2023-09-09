import React, {useState} from 'react';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import './styles.css';
import axios from 'axios';
import logo from '../../assets/logoimage.png'
import api from '../../services/api';

export default function Login(){
    const [Cpf, setCpf] = useState('');
    const [Senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function login(e){
        e.preventDefault();

        const data = {
            Cpf,
            Senha,
        };
        
        try{
            const response = await api.post('api/Login/authenticate', data); //api/auth/v{{version}}/signin
            console.log(response);
            if (response.status == 200){
                localStorage.setItem('Cpf', Cpf);
                localStorage.setItem('authToken', response.data);
                navigate('/Trabalhos');
            }else{
                alert('Ocorreu um erro ao fazer o login. Por favor, tente novamente.');
            }          
        
        }catch(error){
            alert('Usuário ou senha incorretos! tente novamente');
        }
    }
    console.log(localStorage.getItem('authToken'));
    return(
        <div className="login-container">
            <section className="form">
                <form onSubmit={login}>
                    <h1 className="title">Accessar sua conta</h1>
                    <input
                        placeholder="Cpf"
                        value={Cpf}
                        onChange={e => setCpf(e.target.value)}/>
                    <input type="password"
                        placeholder="Senha" 
                        value={Senha}
                        onChange={e => setSenha(e.target.value)}/>

                    <button className="buttonlogin" type="submit">Login</button>
                </form>
                <Link className="buttonCadUsuario" to="/TipoUsuario">
                    <h4>Cadastrar usuário</h4>
                </Link>
                <a className="recupsenha" href="/RecuperarSenha">Esqueceu a senha? clique aqui</a>. 
            </section>
            <img src={logo} alt="" />
        </div>
    );
}
/*
function Login() {
  const [cpf, setCPF] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/LoginController/BuscarPorUsuario', {
        cpf: cpf,
        senha: senha
      });
      console.log("Login realizado com sucesso!");
      Navigate("./Trabalhos");
      // A autenticação foi bem-sucedida, você pode redirecionar o usuário para outra página
    } catch (error) {
      alert('Erro ao fazer login, tente novamente');
      return;
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCPF(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
*/




