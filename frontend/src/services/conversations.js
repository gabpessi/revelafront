import {getConversationsAPI } from './messages';
import { getUserIdFromToken } from '../utils/jwt';

export async function fetchConversationsData() {
    const token = localStorage.getItem('token');
    let userId = null;
    if (token) {
        try {
            userId = getUserIdFromToken(token);
            console.log('User ID from token:', userId);
        } catch (e) {
            console.error('Error getting user ID from token:', e);
            userId = null;
        }
    }
    
    let conversationsData = [];
    if (token) {
        try {
            console.log('Fetching conversations from API...');
            conversationsData = await getConversationsAPI(token);
            console.log('Raw conversations data:', conversationsData);
        } catch (error) {
            console.error('Error fetching conversations:', error);
            throw error;
        }
    }

    // formato esperado pela tabela
    let tableData = [];
    if (token) {
        tableData = conversationsData.map(conv => {
            console.log('Processing conversation:', conv);
            const otherUser = conv.user1.id === userId ? conv.user2 : conv.user1;
            console.log('Other user:', otherUser);
            return {
                id: conv.id,
                userId: otherUser.id,
                name: otherUser.username,
                profilePicture: otherUser.profile && otherUser.profile.imagem ? otherUser.profile.imagem : '',
                lastMessage: conv.last_message ? conv.last_message.content : '',
                timestamp: conv.last_message ? conv.last_message.timestamp : conv.created_at,
            };
        });
    } else {
        tableData = conversationsData;
    }
    
    console.log('Final table data:', tableData);
    return tableData;
} 