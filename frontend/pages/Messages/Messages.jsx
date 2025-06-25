import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MessagesTable from "../../components/MessagesTable/MessagesTable"
import ChatWindow from "../../components/ChatWindow/ChatWindow"
import styles from "./Messages.module.css"
import { fetchConversationsData } from '../../src/services/conversations';

export default function Messages() {
    const [searchParams] = useSearchParams();
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchConversations() {
            setLoading(true);
            try {
                const conversationsData = await fetchConversationsData();
                setConversations(conversationsData);
            } catch (err) {
                setError('Erro ao carregar conversas');
            } finally {
                setLoading(false);
            }
        }
        fetchConversations();
    }, []);

    //seleciona conversa
    useEffect(() => {
        const conversationId = searchParams.get('conversation');
        if (conversationId) {
            setSelectedConversation(Number(conversationId));
        }
    }, [searchParams]);

    const handleBack = () => {
        setSelectedConversation(null);
    };

    return (
        <div className={styles.messagesContainer}>
            <div className={styles.messagesSidebar}>
                {loading && <p>Carregando conversas...</p>}
                {error && <p>{error}</p>}
                <MessagesTable
                    conversations={conversations}
                    selectedConversation={selectedConversation}
                    onSelectConversation={setSelectedConversation}
                    isMessagesPage={!selectedConversation}
                />
            </div>
            <div className={`${styles.messagesContent} ${selectedConversation ? styles.active : ''}`}>
                {selectedConversation ? (
                    <ChatWindow 
                        conversationId={selectedConversation}
                        conversationName={conversations.find(c => c.id === selectedConversation)?.name}
                        onBack={handleBack}
                    />
                ) : (
                    <div className={styles.noConversationSelected}>
                        Selecione uma conversa para começar
                    </div>
                )}
            </div>
        </div>
    )
}