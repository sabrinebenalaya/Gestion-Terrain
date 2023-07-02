import React from 'react';
import { NavLink } from "react-router-dom";

function Home() {
  const containerStyle = {
    background: 'linear-gradient(to bottom right, #ff00ff, #00ffff)',
    height: '100vh',
    paddingTop: '30vh',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
  };

  const linkStyle = {
    color: '#000',
    textDecoration: 'none',
    margin: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1>Bienvenue sur la page d'accueil</h1>

      <div style={{ textAlign: 'center' }}>
        <p>
          <NavLink to="/logIn" style={linkStyle}>Se connecter</NavLink> |
          <NavLink to="/register" style={linkStyle}>S'inscrire</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Home;
