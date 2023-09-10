import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import "./NovoProfessor.css";
import logo from "../../assets/logoimage.png";
import api from "../../services/api";

export default function NovoProfessor() {
  const [formData, setFormData] = useState({
    Nome: "",
    DataNascimento: "",
    SIAPE: "",
    Email: "",
    Cpf: "",
    AreaInteresse: "",
    Senha: "",
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
      const apiUrl = "api/Professor";

      const response = await api.post(apiUrl, formData, {
        Headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Professor adicionado com sucesso!");
        navigate("/");
      } else {
        navigate("/Trabalhos");
        alert("Ocorreu um erro ao adicionar professor");
      }
    } catch (error) {
      setCadastro("Erro ao cadastrar usuário, tente novamente");
      console.error("Error sending data:", error);
      return;
    }
  };

  const handleInputChange = (inputName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [inputName]: value,
    }));
  };

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
              placeholder="SIAPE"
              required
              onChange={(e) =>
                handleInputChange("SIAPE", e.target.value)
              }
            />
            <input
              placeholder="Email"
              required
              onChange={(e) => handleInputChange("Email", e.target.value)}
            />
            <input
              placeholder="CPF"
              onChange={(e) => handleInputChange("Cpf", e.target.value)}
            />
              <input
              placeholder="Area de estudos"
              required
              onChange={(e) => handleInputChange("AreaInteresse", e.target.value)}
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

            {cadastro ? (
              <div>
                <p>{cadastro}</p>
                <button type="button" onClick={() => navigate("/")}>
                  Login
                </button>
              </div>
            ) : (
              <div>
                <p></p>
                <button type="submit">Cadastrar professor</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
