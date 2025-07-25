import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';
import { useGreeting } from './utils/greetings';

const Header = () => {
  const navigate = useNavigate();
  const { greeting, userName } = useGreeting(); 

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-logo">{`${greeting}, ${userName}`}</div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </header>
  );
};

export default Header;