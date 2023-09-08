import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
    const [destinatario, setDestinatario] = useState('');
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [mensagemEnviada, setMensagemEnviada] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/email', {
                destinatario,
                assunto,
                mensagem,
            });
            setMensagemEnviada(response.data.Mensagem);
        } catch (error) {
            setMensagemEnviada('Erro ao enviar o e-mail.');
        }
    };

    return (
        <div className='formulario'>
            {mensagemEnviada && <p>{mensagemEnviada}</p>}
            <form onSubmit={handleSubmit}>
                <label>Destinatário:</label>
                <input
                    type="email"
                    value={destinatario}
                    onChange={(e) => setDestinatario(e.target.value)}
                    required
                />

                <label>Assunto:</label>
                <input
                    type="text"
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    required
                />

                <label>Mensagem:</label>
                <textarea
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    required
                ></textarea>

                <button className='enviar-email' type="submit">Enviar E-mail</button>
            </form>
        </div>
    );
};

export default EmailForm;
