import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Trabalhos from './pages/Trabalhos';
import TrabalhosTelaAluno from './pages/TrabalhosTelaAluno';
import NovoTrabalho from './pages/NovoTrabalho';
import NovoProfessor from './pages/NovoProfessor';
import NovoAluno from './pages/NovoAluno';
import TipoUsuario from './pages/TipoUsuario';
import RecuperarSenha from './pages/RecuperarSenha';
import Perfil from './pages/Perfil';
import InteressePesquisa from './pages/InteressePesquisa';
import { useNavigate } from "react-router-dom";

export default function AppRoutes(){
    return(
        <BrowserRouter>
           <Routes>
                <Route path="/" exact element={<Login/>}/>
                <Route path="/Trabalhos" element={<Trabalhos/>}/>
                <Route path="/TrabalhosTelaAluno" element={<TrabalhosTelaAluno/>}/>
                <Route path="/NovoTrabalho" element={<NovoTrabalho/>}/>
                <Route path="/NovoAluno" element={<NovoAluno/>}/>
                <Route path="/NovoProfessor" element={<NovoProfessor/>}/>
                <Route path="/TipoUsuario" element={<TipoUsuario/>}/>
                <Route path="/Perfil" element={<TipoUsuario/>}/>
                <Route path="RecuperarSenha" element={<RecuperarSenha/>}/>
                <Route path="InteressePesquisa" element={<InteressePesquisa/>}/>
           </Routes>
        </BrowserRouter>
    );
}