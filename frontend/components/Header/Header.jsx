import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../src/assets/revela-logo-branco.png';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav>
      <div className={styles.container}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Logo" />
        </Link>
        
        {/* Hamburger Menu Button */}
        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <ul className={`${styles.menu} ${isMenuOpen ? styles.active : ''}`}>
          <Link to="/">
            <li className={isActive('/') ? styles.active : ''}>Feed</li>
          </Link>
          <Link to="/create">
            <li className={isActive('/create') ? styles.active : ''}>Criar</li>
          </Link>
          <Link to="/messages">
            <li className={isActive('/messages') ? styles.active : ''}>Mensagens</li>
          </Link>
          <Link to="/profile">
            <li className={isActive('/profile') ? styles.active : ''}>Perfil</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}