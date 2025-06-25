import styles from './Post.module.css';
import { apiFetch } from "../../src/services/api";
import { useState, useEffect, useRef } from "react";
import Modal from '../../components/Modal/Modal.jsx';
import { getImageUrl } from '../../src/services/api';
import defaultProfile from '../../src/assets/default-profile.jpg';

export default function Post({ id, profilePic, username, postPic, postDescription, userId, onDelete, created_at, Date: postDate, Time: postTime }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const menuRef = useRef(null);
  const loggedUserId = localStorage.getItem("userId");

  // Lógica para data/hora
  let dateObj;
  if (created_at) {
    dateObj = new Date(created_at);
  } else if (postDate && postTime) {
    dateObj = new Date(`${postDate}T${postTime}`);
  }

  let dateStr = '';
  let timeStr = '';
  let isToday = false;

  if (dateObj) {
    const today = new Date();
    isToday =
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear();

    dateStr = isToday
      ? 'Hoje'
      : dateObj.toLocaleDateString('pt-BR');
    timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  const handleDelete = async () => {
    try {
      await apiFetch(`/posts/${id}/`, {
        method: "DELETE",
      });
      if (onDelete) onDelete(id);
    } catch (error) {
      alert("Erro ao deletar post.");
    } finally {
      setShowConfirmBox(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      /*se o menu existe e o clique acontece fora dele, fecha o menu. */
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className={styles.post}>
      <div className={styles.profileInfo}>
        <div className={styles.userInfo}>
        <img
          className={styles.profilePic}
          src={profilePic ? getImageUrl(profilePic) : defaultProfile}
          alt="Foto de perfil"
        />
          <p>{username}</p>
          {(dateStr || timeStr) && (
        <div className={styles.postDate}>
          {dateStr} {timeStr}
        </div>
      )}
        </div>

        {String(userId) === String(loggedUserId) && (
          <div className={styles.menuContainer} ref={menuRef}>
            <button className={styles.menuButton} onClick={() => setShowMenu(!showMenu)}>⋯</button>
            {showMenu && (
              <div className={styles.dropdownMenu}>
                <button onClick={() => setShowConfirmBox(true)}>Deletar</button>
              </div>
            )}
          </div>
        )}
      </div>      

      {postPic && (
        <img
          className={styles.postPic}
          src={getImageUrl(postPic)}
          alt="Post"
          style={{ cursor: "pointer" }}
          onClick={() => setShowImageModal(true)}
        />
      )}
      {postDescription && (
        <p className={styles.postDescription}>{postDescription}</p>
      )}

      {/* Modal de confirmação */}
      <Modal
        isOpen={showConfirmBox}
        onClose={() => setShowConfirmBox(false)}
        onConfirm={handleDelete}
        message="Tem certeza que deseja deletar este post?"
        confirmText="Sim"
        cancelText="Cancelar"
      />

      {showImageModal && (
        <div className={styles.imageModalOverlay} onClick={() => setShowImageModal(false)}>
          <div className={styles.imageModalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowImageModal(false)}>×</button>
            <img src={getImageUrl(postPic)} alt="Post grande" className={styles.imageModalImg} />
          </div>
        </div>
      )}
    </div>
  );
}
