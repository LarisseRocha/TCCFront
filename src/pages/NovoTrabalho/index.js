import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import "./NovoTrabalho.css";
import logo from "../../assets/logoimage.png";

export default function NovoTrabalho() {
  const [titulo, setTema] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [areaEstudo, setAreaEstudo] = useState("");
  const [arquivo, setArquivo] = useState("");
  const [IDTcc, setIDTcc] = useState("");

  const navigate = useNavigate();

  async function createNewTrabalho(e) {
    e.preventDefault();

    const data = {
      titulo,
      dataPublicacao,
      areaEstudo,
      arquivo,
      IDTcc
    };

    try {
      const response = await api.post("/https://localhost:44320//Tcc", data); // Cadastro das informações do trabalho
      const formData = new FormData();
      formData.append("arquivo", arquivo);
      const arquivoResponse = await api.post(
        "/https://localhost:44320/Arquivo",
        formData
      ); 
      console.log("Trabalho cadastrado com sucesso!");
      navigate("./Trabalhos");
    } catch (err) {
      alert("Erro ao carregar arquivo! tente novamente!");
    }
    navigate("./Trabalhos");
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setArquivo(file);
  };
    
  const handleFilePick = async () => {
    try {
      const filePicker = document.createElement("input");

      filePicker.multiple = true;

      filePicker.type = "file";

      filePicker.accept = ".pdf";

      filePicker.click();
    } catch (error) {
      console.error("Error opening file picker:", error);
    }
  };

  const [files, setFiles] = useState([]);

  const saveFile = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 0) {
      setFiles(Array.from(selectedFiles));
    }
    console.log(selectedFiles[0] + "teste1");
    console.log(files + "teste2");
  };

  const uploadFile = async () => {
    if (files.length === 0) {
      console.error("Nenhum arquivo selecionado.");
      return;
    }

    try {
      const formDataArray = files.map((file) => {
        const formData = new FormData();
        formData.append("arquivos", file);
        return formData;
      });
      console.log(formDataArray);
      
      for (const formData of formDataArray) {
        console.log(IDTcc);
        const response = await api.post(
          "https://localhost:44320/api/Arquivo/Upload/" + IDTcc,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("API response:", response.data);
      }
    } catch (error) {
      console.error("Erro ao enviar arquivos:", error);
    }
  };

  return (
    <div className="Novo-Trabalho-container">
      <div className="content">
        <section className="form">
          <h1>Cadastrar novo trabalho</h1>
          <p>Preencha os campos e clique em cadastrar</p>
          <Link className="back-link" to="http://localhost:3000/">
            <FiArrowLeft size={16} color="#251FC5" />
            Home
          </Link>
          <img src={logo} alt="logorepo" />
        </section>
        <form submit={createNewTrabalho}></form>
        <form>
        <input
            placeholder="ID do TCC"
            value={IDTcc}
            onChange={(e) => setIDTcc(e.target.value)}
            required
          />
          <input
            placeholder="Tema"
            value={titulo}
            onChange={(e) => setTema(e.target.value)}
            required
          />
          <input
            placeholder="Data de publicação"
            value={dataPublicacao}
            onChange={(e) => setDataPublicacao(e.target.value)}
            required
          />
          <input
            placeholder="Área de estudo"
            value={areaEstudo}
            onChange={(e) => setAreaEstudo(e.target.value)}
            required
          />
          <input type="file" multiple onChange={saveFile} />

          <button type="button" value="upload" onClick={uploadFile}>
            {" "} Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
