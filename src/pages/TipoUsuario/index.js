import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css'

export default function Trabalhos(){
    return(
        <div className="Container">
             <Link className="buttonProf" to="/NovoProfessor">
                    Cadastrar professor
             </Link>

             <Link className="buttonAluno" to="/NovoAluno">
                    Cadastrar aluno
             </Link>
             
            <Link className="back-link" to="http://localhost:3000/">
                  <FiArrowLeft size={16} color="#251FC5"/>
                  Home
            </Link>
        </div>
    );
}