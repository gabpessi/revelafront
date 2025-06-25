import modalStyles from './Modal.module.css';

export default function Modal({ isOpen, onClose, onConfirm, message, confirmText = 'Sim', cancelText = 'Cancelar', confirmClass, cancelClass }) {
  if (!isOpen) return null;
  return (
    <div className={modalStyles.modalOverlay}>
      <div className={modalStyles.modalBox}>
        <p>{message}</p>
        <div className={modalStyles.modalButtons}>
          <button onClick={onConfirm} className={confirmClass || modalStyles.confirmButton}>{confirmText}</button>
          <button onClick={onClose} className={cancelClass || modalStyles.cancelButton}>{cancelText}</button>
        </div>
      </div>
    </div>
  );
} 