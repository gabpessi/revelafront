import styles from './Message.module.css';

function Message({ content, timestamp, isSent, senderName }) {
    return (
        <div className={`${styles.messageContainer} ${isSent ? styles.sent : styles.received}`}>
            {!isSent && <div className={styles.senderName}>{senderName}</div>}
            <div className={styles.message}>
                <div className={styles.content}>{content}</div>
                <div className={styles.timestamp}>
                    {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
}

export default Message; 