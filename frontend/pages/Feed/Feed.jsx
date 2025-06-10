import { useNavigate } from 'react-router-dom';
import Post from "../../components/Post/Post";
import MessagesTable from "../../components/MessagesTable/MessagesTable";
import styles from './Feed.module.css';

export default function Feed() {
    const navigate = useNavigate();

    // Mock de conversas (mesmo do Messages)
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

    const handleSelectConversation = (conversationId) => {
        navigate(`/messages?conversation=${conversationId}`);
    };

    return (
        <div className={styles.content}>
            <MessagesTable 
                conversations={conversations}
                onSelectConversation={handleSelectConversation}
            />
            <div className={styles.feed}>
                <Post 
                    profilePic="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    username="User1"
                    postPic="https://images.unsplash.com/photo-1748452944022-6212ec36a45d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    postDescription="Descrição do post..."
                />
            </div>
        </div>
    );
}

