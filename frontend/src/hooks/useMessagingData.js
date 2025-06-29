import { useState, useEffect } from 'react';
import { fetchConversationsData } from '../services/conversations';
import { getAllUsersAPI } from '../services/messages';

export function useMessagingData() {
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const conversationsData = await fetchConversationsData();
        setConversations(conversationsData);
        const token = localStorage.getItem('token');
        const usersData = await getAllUsersAPI(token);
        setUsers(usersData);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Função para criar conversa
  async function createOrGetConversation(userId) {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/conversations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
    if (!response.ok) throw new Error('Erro ao criar conversa');
    const conversation = await response.json();
    // Atualiza conversas
    const conversationsData = await fetchConversationsData();
    setConversations(conversationsData);
    return conversation;
  }

  return { conversations, users, loading, createOrGetConversation };
} 