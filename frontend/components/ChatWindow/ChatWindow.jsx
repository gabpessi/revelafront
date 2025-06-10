import { useState, useRef, useEffect } from 'react';
import styles from './ChatWindow.module.css';
import Message from '../Message/Message';

export default function ChatWindow({ conversationId }) {
    // Mock de mensagens por conversa
    const mockMessages = {
        1: [
            {
                id: 1,
                content: "Olá! Como posso ajudar?",
                timestamp: new Date(),
                isSent: false,
                senderName: "Maria"
            },
            {
                id: 2,
                content: "Oi! Tudo bem?",
                timestamp: new Date(),
                isSent: true
            }
        ],
        2: [
            {
                id: 1,
                content: "E aí, tudo bem?",
                timestamp: new Date(),
                isSent: false,
                senderName: "João"
            },
            {
                id: 2,
                content: "Tudo sim! E você?",
                timestamp: new Date(),
                isSent: true
            }
        ]
    };

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Carrega as mensagens da conversa selecionada
        if (conversationId) {
            setMessages(mockMessages[conversationId] || []);
        }
    }, [conversationId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: messages.length + 1,
            content: newMessage,
            timestamp: new Date(),
            isSent: true
        };

        setMessages(prevMessages => [...prevMessages, message]);
        setNewMessage('');
    };

    return (
        <div className={styles.chatWindow}>
            <div className={styles.chatMessages}>
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        content={message.content}
                        timestamp={message.timestamp}
                        isSent={message.isSent}
                        senderName={message.senderName}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form className={styles.chatInput} onSubmit={handleSendMessage}>
                <input 
                    type="text" 
                    placeholder="Digite sua mensagem..."
                    className={styles.messageInput}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button 
                    type="submit" 
                    className={styles.sendButton}
                    disabled={!newMessage.trim()}
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}



