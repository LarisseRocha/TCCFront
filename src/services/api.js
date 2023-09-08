import axios from 'axios';
const api = axios.create({
    baseURL : 'https://localhost:44320',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Configurar o token de autenticação para todas as solicitações
api.interceptors.request.use(
  async (config) => {
    console.log('testando qualquer coisa');
    const token = localStorage.getItem('authToken'); // Recupere o token do local storage ou outro local de armazenamento seguro
    console.log(token, "teste");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

