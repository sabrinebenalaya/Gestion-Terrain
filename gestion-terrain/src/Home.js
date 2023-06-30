import React from 'react';

function Home() {
  const containerStyle = {
    background: 'linear-gradient(to bottom right, #ff00ff, #00ffff)',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
  };
  return (
    <div style={containerStyle}>
      <h1>Bienvenue sur la page d'accueil</h1>
     
    </div>
  );
}

export default Home;
