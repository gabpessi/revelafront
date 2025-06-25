import { useNavigate } from 'react-router-dom';
import Post from "../../components/Post/Post";
import MessagesTable from "../../components/MessagesTable/MessagesTable";
import styles from './Feed.module.css';
import { useEffect, useState } from 'react';
import { apiFetch } from "../../src/services/api";
import { fetchConversationsData } from '../../src/services/conversations';

export default function Feed() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);
    const [conversationsLoading, setConversationsLoading] = useState(true);
    const [postsError, setPostsError] = useState(null);
    const [conversationsError, setConversationsError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            // Buscar posts
            setPostsLoading(true);
            try {
                const postsData = await apiFetch("/posts");
                setPosts(postsData);
            } catch (error) {
                console.error("Erro ao buscar posts:", error);
                setPostsError("Erro ao carregar posts");
            } finally {
                setPostsLoading(false);
            }

            // Buscar conversas
            setConversationsLoading(true);
            try {
                const conversationsData = await fetchConversationsData();
                setConversations(conversationsData);
            } catch (error) {
                console.error("Erro ao buscar conversas:", error);
                setConversationsError("Erro ao carregar conversas");
            } finally {
                setConversationsLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSelectConversation = (conversationId) => {
        navigate(`/messages?conversation=${conversationId}`);
    };

    // remover o post deletado do feed
    const handleDelete = (id) => {
        setPosts((posts) => posts.filter((post) => String(post.id) !== String(id)));
    };

    return (
        <div className={styles.content}>
            <MessagesTable 
                conversations={conversations}
                onSelectConversation={handleSelectConversation}
            />
            <div className={styles.feed}>
                {postsLoading && <p>Carregando posts...</p>}
                {postsError && <p>{postsError}</p>}
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Post
                            key={post.id}
                            id={post.id}
                            profilePic={post.user && post.user.profile && post.user.profile.imagem ? post.user.profile.imagem : ""} 
                            username={post.user && post.user.username ? post.user.username : ""}
                            postPic={post.imagem} 
                            postDescription={post.text} 
                            userId={post.user && post.user.id ? post.user.id : post.userId}
                            onDelete={handleDelete}
                            created_at={post.created_at}
                            Date={post.Date}
                            Time={post.Time}
                        />
                    ))
                ) : !postsLoading && <p>Nenhum post encontrado.</p>}                
            </div>
        </div>
    );
}

