import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import "./NovoProfessor.css";

import logo from "../../assets/logoimage.png";
import api from "../../services/api";

export default function NovoProfessor() {
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
    cpf: "",
    siape: "",
    areaInteresse: "",
    senha: "",
    repetirSenha: "",
  });

  const [cadastro, setCadastro] = useState("");
  const navigate = useNavigate();
  const [repetirSenha, setRepetirSenha] = useState("");

  const submitData = async (e) => {
    e.preventDefault();

    if (formData.Senha !== repetirSenha) {
      setCadastro("As senhas não coincidem");
      return;
    }

    try {
      const apiUrl = "https://localhost:44320/api/Professor";

      const response = await axios.post(apiUrl, formData, {
        Headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Professor adicionado com sucesso!");
        navigate("/");
      } else {
        navigate("/Trabalhos");
        alert("Ocorreu um erro ao adicionar professor...");
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição POST para CadastrarProfessor:", error);
    }
  };

  const handleInputChange = (inputName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

  function validarCPF(inputCPF) {
    var soma = 0;
    var resto;
    var inputCPF = document.getElementById("cpf").value;

    if (inputCPF == "00000000000") return false;
    for (i = 1; i <= 9; i++)
      soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(inputCPF.substring(9, 10))) return false;

    soma = 0;
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(inputCPF.substring(10, 11))) return false;
    return true;
  }

  return (
    <div className="Novo-Professor-container">
      <div className="content">
        <div className="form-div">
          <section className="form">
            <h1>Cadastrar novo professor</h1>
            <p>Preencha os campos e clique em cadastrar</p>
            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#251FC5" />
              Home
            </Link>
            <img src={logo} alt="logorepo" />
          </section>
          <form onSubmit={submitData}>
            <input
              placeholder="Nome"
              required
              onChange={(e) => handleInputChange("Nome", e.target.value)}
            />
            <input
              type="date"
              placeholder="Data de nascimento"
              required
              onChange={(e) =>
                handleInputChange("DataNascimento", e.target.value)
              }
            />
            <input
              placeholder="Email"
              required
              onChange={(e) => handleInputChange("Email", e.target.value)}
            />
            <input
              placeholder="SIAPE"
              onChange={(e) => handleInputChange("SIAPE", e.target.value)}
            />
            <input
              placeholder="CPF"
              onChange={(e) => handleInputChange("CPF", e.target.value)}
            />
            <input
              placeholder="Area de interesse"
              required
              onChange={(e) =>
                handleInputChange("AreaInteresse", e.target.value)
              }
            />
            <input
              placeholder="Senha"
              type="password"
              required
              onChange={(e) => handleInputChange("Senha", e.target.value)}
            />
            <input
              placeholder="Repetir Senha"
              type="password"
              required
              value={repetirSenha}
              onChange={(e) => setRepetirSenha(e.target.value)}
            />
            <div>
              <p></p>
              <button onClick={submitData}>Cadastrar Professor</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
