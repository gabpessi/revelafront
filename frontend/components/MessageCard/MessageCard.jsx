import styles from './MessageCard.module.css';

export default function MessageCard({ profilePicture, username, ultimaMensagem, isSelected, onClick }) {
    return (
        <div 
            className={`${styles.messageCard} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}
        >
            <img src={profilePicture} alt={username} className={styles.profilePicture} />
            <div className={styles.messageInfo}>
                <h3>{username}</h3>
                <p>{ultimaMensagem}</p>
            </div>
        </div>
    );
}