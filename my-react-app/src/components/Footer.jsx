// Footer component for the main application
// Provides mobile logout button and copyright information
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';

const Footer = () => {
  const navigate = useNavigate();

  // Handle user logout by clearing stored data and redirecting
  // This provides an alternative logout option for mobile users
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <footer className="app-footer">
       {/* Mobile logout button for easier access on smaller screens */}
       <button onClick={handleLogout} className="mobile-logout-button">
        Logout
      </button>
      {/* Copyright information with current year */}
      <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>

     
    </footer>
  );
};

export default Footer;