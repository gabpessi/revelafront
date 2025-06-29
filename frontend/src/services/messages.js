// Busca conversas
export async function getConversationsAPI(token) {
  const API_URL = process.env.NODE_ENV === 'production' 
    ? "https://backend-796l.onrender.com/api"  // URL real do seu backend em produção
    : "http://localhost:8000/api";
    
  console.log('Fetching conversations from:', `${API_URL}/conversations`);
  
  const response = await fetch(`${API_URL}/conversations`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  console.log('Conversations response status:', response.status);
  
  if (!response.ok) {
    console.error('Error fetching conversations:', response.status, response.statusText);
    throw new Error('Erro ao buscar conversas');
  }
  
  const data = await response.json();
  console.log('Conversations data received:', data);
  return data;
}

// Busca mensagens
export async function getMessagesAPI(conversationId, token) {
  const API_URL = process.env.NODE_ENV === 'production' 
    ? "https://backend-796l.onrender.com/api"  // URL real do seu backend em produção
    : "http://localhost:8000/api";
    
  const response = await fetch(`${API_URL}/conversations/${conversationId}/messages`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Erro ao buscar mensagens');
  }
  return response.json();
}

// Envia mensagem
export async function sendMessageAPI(conversationId, content, token) {
  const API_URL = process.env.NODE_ENV === 'production' 
    ? "https://backend-796l.onrender.com/api"  // URL real do seu backend em produção
    : "http://localhost:8000/api";
    
  const response = await fetch(`${API_URL}/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, conversation: conversationId }),
  });
  if (!response.ok) {
    throw new Error('Erro ao enviar mensagem');
  }
  return response.json();
}

// Busca todos os usuários
export async function getAllUsersAPI(token) {
  const API_URL = process.env.NODE_ENV === 'production' 
    ? "https://backend-796l.onrender.com/api"  // URL real do seu backend em produção
    : "http://localhost:8000/api";
    
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Erro ao buscar usuários');
  }
  return response.json();
} 