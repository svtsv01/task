import React from 'react';
import '../styles/Main.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; All rights reserved. {new Date().getFullYear()} </p>
    </footer>
  );
};

export default Footer;