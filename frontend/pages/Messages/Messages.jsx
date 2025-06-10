import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MessagesTable from "../../components/MessagesTable/MessagesTable"
import ChatWindow from "../../components/ChatWindow/ChatWindow"
import styles from "./Messages.module.css"

export default function Messages() {
    const [searchParams] = useSearchParams();
    const [selectedConversation, setSelectedConversation] = useState(null);

    // Mock de conversas
    const conversations = [
        {
            id: 1,
            name: "Maria",
            profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            lastMessage: "Olá! Como posso ajudar?",
            timestamp: new Date()
        },
        {
            id: 2,
            name: "João",
            profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            lastMessage: "Tudo bem?",
            timestamp: new Date()
        }
    ];

    useEffect(() => {
        const conversationId = searchParams.get('conversation');
        if (conversationId) {
            setSelectedConversation(Number(conversationId));
        }
    }, [searchParams]);

    return (
        <div className={styles.messagesContainer}>
            <div className={styles.messagesSidebar}>
                <MessagesTable
                    conversations={conversations}
                    selectedConversation={selectedConversation}
                    onSelectConversation={setSelectedConversation}
                />
            </div>
            <div className={styles.messagesContent}>
                {selectedConversation ? (
                    <ChatWindow conversationId={selectedConversation} />
                ) : (
                    <div className={styles.noConversationSelected}>
                        Selecione uma conversa para começar
                    </div>
                )}
            </div>
        </div>
    )
}