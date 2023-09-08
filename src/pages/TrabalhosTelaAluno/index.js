import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiDownload,
} from "react-icons/fi";
import "./styles.css";
import api from "../../services/api";
import axios from "axios";

function App() {
  const [files, setFiles] = useState([]);
  const [tcc, setTcc] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(""); // Novo estado para o título selecionado
  const [ConsultarTccCommand, setConsultarTccCommand] = useState({
    AreaEstudo: "",
    NomeAluno: "",
    NomeProfessor: "",
  });

  const downloadFiles = async (guid, nomeOriginal) => {
    try {
      const response = await api.get(
        `https://localhost:44320/api/Arquivo/Download/${guid}`
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(new Blob([blob]));

      const link = document.createElement("a");
      link.href = url;
      link.download = `${nomeOriginal}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.parentNode.removeChild(link);
      // Clean up by revoking the Blob URL
      // const downData = await response;
      // return downData;
    } catch (error) {
      console.error("Erro ao buscar arquivos:", error);
    }
  };

  const fetchAllFiles = async () => {
    try {
      const response = await api.get("api/Arquivo/BuscarTccs");
      setFiles(response.data);
    } catch (error) {
      console.error("Erro ao buscar arquivos:", error);
    }
  };

  const consultarTcc = async () => {
    try {
      const apiUrl = "https://localhost:44320/api/Tcc/ConsultarTcc";

      const response = await axios.post(apiUrl, ConsultarTccCommand, {
        Headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setFiles(response.data);
        alert("Tcc filtrado com sucesso!")
      } else {
        alert("Erro ao consultar TCCs");
      }
    } catch (error) {
      alert("Erro ao fazer a requisição GET para ConsultarTcc:", error);
    }
  };

  useEffect(() => {
    fetchAllFiles();
  }, []);
  useEffect(() => {
    console.log(tcc);
  }, [tcc]);

  useEffect(() => {
    // Quando o título selecionado mudar, chame a função de busca com o novo título
    if (selectedTitle) {
      buscarTccPorTitulo(selectedTitle);
    }
  }, [selectedTitle]);

  const buscarTccPorTitulo = async (titulo) => {
    try {
      const response = await api.get(
        `https://localhost:44320/api/Tcc/{BuscarTccPorTitulo}`
      );
      console.log(response);
      // Lógica para tratar a resposta do servidor aqui
    } catch (error) {
      console.error("Erro ao buscar TCC por título:", error);
    }
  };

  return (
    <div className="listagemtrabalhos-container">
      <div className="trabalhos-title">
        <h1>Lista de trabalhos</h1>
        <Link className="trabalhos" to="/InteressePesquisa">
          Cadastro de interesse em pesquisa
        </Link>
      </div>
      <div className="input-container">
        <input
          name="inputAreaEstudo"
          type="text"
          placeholder="Area de Estudo"
          value={ConsultarTccCommand.AreaEstudo}
          onChange={(e) =>
            setConsultarTccCommand({
              ...ConsultarTccCommand,
              AreaEstudo: e.target.value,
            })
          }
        />
        <input
          name="inputNomeAluno"
          type="text"
          placeholder="Aluno"
          value={ConsultarTccCommand.NomeAluno}
          onChange={(e) =>
            setConsultarTccCommand({
              ...ConsultarTccCommand,
              NomeAluno: e.target.value,
            })
          }
        />
        <input
          name="inputNomeProfessor"
          type="text"
          placeholder="Professor"
          value={ConsultarTccCommand.NomeProfessor}
          onChange={(e) =>
            setConsultarTccCommand({
              ...ConsultarTccCommand,
              NomeProfessor: e.target.value,
            })
          }
        />
        <div>
          <button type="button" onClick={consultarTcc}>
            Consultar
          </button>
        </div>
      </div>
      <ul style={{display: "flex", flexWrap: "wrap"}}>
        {files.length
          ? files.map((item, index) => {
              return (
                <li
                  key={index}
                  style={{
                    padding: "15px",
                    marginBottom: "20px",
                    marginLeft: "20px",
                    width: "310px",
                  }}
                >
                  <strong>Titulo: {item.titulo}</strong>
                  <strong>Data da Defesa: {item.dataDefesa}</strong>
                  <strong>Área de Estudo: {item.areaEstudo}</strong>
                  <strong>Nome do Aluno: {item.aluno.nome}</strong>
                  <strong>Nome do Professor: {item.professor.nome}</strong>
                  <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                    <span style={{ color: "black" }}>
                      {item.arquivo.nomeOriginal}
                    </span>
                    <button
                      onClick={() => downloadFiles(item.arquivo.guidArquivo, item.arquivo.nomeOriginal)}
                      type="button"
                    >
                      <FiDownload size={25} color="#179254" />
                    </button>
                  </div>
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
}
export default App;
