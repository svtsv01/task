import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <footer className="app-footer">
       <button onClick={handleLogout} className="mobile-logout-button">
        Logout
      </button>
      <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>

     
    </footer>
  );
};

export default Footer;