import styles from './ImageModal.module.css';

export default function ImageModal({ isOpen, onClose, imageUrl, altText }) {
  if (!isOpen) return null;
  return (
    <div className={styles.imageModalOverlay} onClick={onClose}>
      <div className={styles.imageModalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <img src={imageUrl} alt={altText || 'Imagem'} className={styles.imageModalImg} />
      </div>
    </div>
  );
} 