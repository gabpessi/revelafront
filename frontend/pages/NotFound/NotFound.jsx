import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>A página que você procura não existe.</p>
      <Link to="/" style={{color: '#C3A150'}}>Voltar para a página inicial</Link>
    </div>
  );
} 