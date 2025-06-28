import styles from './Message.module.css';
import { useState } from 'react';
import ImageModal from '../ImageModal/ImageModal';

function Message({ content, timestamp, isSent, senderName, image }) {
    const [showImageModal, setShowImageModal] = useState(false);
    return (
        <div className={`${styles.messageContainer} ${isSent ? styles.sent : styles.received}`}>
            {!isSent && <div className={styles.senderName}>{senderName}</div>}
            <div className={styles.message}>
                {image && (
                    <div className={styles.imageWrapper}>
                        <img
                            src={image}
                            alt="Mensagem com imagem"
                            className={styles.image}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowImageModal(true)}
                        />
                        <ImageModal
                            isOpen={showImageModal}
                            onClose={() => setShowImageModal(false)}
                            imageUrl={image}
                            altText="Mensagem com imagem"
                        />
                    </div>
                )}
                <div className={styles.content}>{content}</div>
                <div className={styles.timestamp}>
                    {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
}

export default Message; 