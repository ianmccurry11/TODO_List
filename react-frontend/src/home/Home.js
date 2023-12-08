import React, { useState, useEffect } from 'react';
import '../stylesheets/App.css';
import ButtonAppBar from '../ui_elements/Navbar';

const HomePage = () => {
  const [text, setText] = useState('');
  const fullText = 'Welcome to Mission Log';

  useEffect(() => {
    if (text.length < fullText.length) {
      setTimeout(() => setText(fullText.slice(0, text.length + 1)), 100);
    }
  }, [text]);

  return (
    <div className="home-container">
      <ButtonAppBar />
      <div className="home-content">
        <body>
          <h1>{text}</h1>
        </body>
      </div>
    </div>
  );
};

export default HomePage;
