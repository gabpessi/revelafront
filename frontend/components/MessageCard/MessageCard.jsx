import styles from './MessageCard.module.css';
import { getImageUrl } from '../../src/services/api';
import defaultProfile from '../../src/assets/default-profile.jpg';

export default function MessageCard({ profilePic, username, ultimaMensagem, isSelected, onClick }) {
    return (
        <div 
            className={`${styles.messageCard} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}
        >
            <img
            className={styles.profilePic}
            src={profilePic ? getImageUrl(profilePic) : defaultProfile}
            alt="Foto de perfil"
                    />
            <div className={styles.messageInfo}>
                <h3>{username}</h3>
                <p>{ultimaMensagem}</p>
            </div>
        </div>
    );
}