import React, { useState, useEffect } from "react";
import api from "../../services/api";
import './styles.css'; // Import your CSS file for the profile page

export default function AlunosPage() {
  const [alunos, setAlunos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("https://localhost:44320/api/Aluno");
        setAlunos(response.data);
      } catch (error) {
        setError("Erro ao buscar dados dos alunos.");
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container">
      <header className="header">Lista de Alunos</header>
      {error && <div className="error-message">{error}</div>}
      <ul className="aluno-list">
        {alunos.map((aluno) => (
          <li className="aluno-item" key={aluno.id}>
            <div className="aluno-info">
              <div className="aluno-nome">{aluno.Nome}</div>
              <div className="aluno-email">{aluno.Email}</div>
            </div>
            <div className="aluno-actions">
              {/* Adicione ações do aluno aqui, se necessário */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}