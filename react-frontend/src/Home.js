import React, { useState, useEffect } from 'react';
import ButtonAppBar from './Navbar';

const HomePage = () => {
  const [text, setText] = useState('');
  const fullText = 'Welcome to Mission Log';

  useEffect(() => {
    if (text.length < fullText.length) {
      setTimeout(() => setText(fullText.slice(0, text.length + 1)), 100);
    }
  }, [text]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at center, #0a4700 0%, #002400 80%, #000000 100%)',
    }}
    >
      <ButtonAppBar />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <main>
          <h1 style={{ color: '#1bff80', fontFamily: '"Courier New", Courier, monospace' }}>{text}</h1>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
