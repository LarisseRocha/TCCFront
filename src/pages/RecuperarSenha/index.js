import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

export default function RecuperarSenhaPorEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitação de recuperação de senha enviada para o e-mail:", email);
    navigate("/");
  };

  return (
    <div>
      <h2>Recuperar Senha por Email</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Enviar solicitação</button>
        </div>
      </form>
      <p>
        Lembrar da senha? <Link to="/">Faça login</Link>
      </p>
    </div>
  );
}
