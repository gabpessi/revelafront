import styles from './Post.module.css';

export default function Post({ profilePic, username, postPic, postDescription }) {
  return (
    <div className={styles.post}>
        <div className={styles.profileInfo}>
            <img className={styles.profilePic} src={profilePic} alt="Foto de perfil" />
            <p>{username}</p>
        </div>
        <img className={styles.postPic} src={postPic} alt="Post" />
        <p className={styles.postDescription}>{postDescription}</p>
    </div>
  );
}
