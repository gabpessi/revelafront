//import { getUserIdFromToken } from '../utils/jwt';
//muda aqui na produção
const API_URL = process.env.NODE_ENV === 'production' 
  ? "https://backend-796l.onrender.com/api" 
  : "http://localhost:8000/api";

function getToken() {
  return localStorage.getItem('token');
}

export async function apiFetch(endpoint, options = {}) {
  const headers = options.headers || {};
  if (getToken()) {
    headers['Authorization'] = `Bearer ${getToken()}`;
  }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  
  console.log('Making API request to:', `${API_URL}${endpoint}`);
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  console.log('API response status:', response.status);
  
  if (!response.ok) {
    console.error('API error:', response.status, response.statusText);
    throw new Error('Erro na requisição');
  }

  // quando a resposta não tem conteudo (delete de um post)
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

/* Função para obter dados do usuário logado
export async function getCurrentUser() {
  const token = localStorage.getItem('token'); // ou de onde você armazena o token
  const userId = getUserIdFromToken(token);    // decodifica o token para pegar o ID
  const response = await fetch(`${API_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.json();
}


 Função para obter o ID do usuário logado
export function getCurrentUserId() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const userId = getUserIdFromToken(token);
      return userId;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      // Fallback: tentar outros campos possíveis
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.id || payload.sub || null;
      } catch (fallbackError) {
        console.error('Erro no fallback de decodificação do token:', fallbackError);
      }
    }
  }
  return null;
}
  */

 // Pra produção tem que alterar a URL aqui- criação do url de imagens
 export const API_CONFIG = {
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://backend-796l.onrender.com'  // URL real do seu backend em produção
    : 'http://localhost:8000',
}

//criar url completa da imagem
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // se já é uma URL completa retorna como ta
  if (imagePath.startsWith('http')) return imagePath;
  
  // constrói a URL completa
  return `${API_CONFIG.baseURL}${imagePath}`;
}; 