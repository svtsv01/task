// Header component for the main application interface
// Displays personalized greeting, mobile menu, and logout functionality
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';
import { useGreeting } from './utils/greetings';
import MobileMenu from './ToDo/MobileMenu';
import { useTodoContext } from '../context/TodoContext';

const Header = () => {
  const navigate = useNavigate();
  // Get personalized greeting and user name from custom hook
  const { greeting, userName } = useGreeting();
  // Access todo context for sorting and filtering controls
  const { sortBy, setSortBy, activeStatus, setActiveStatus } = useTodoContext();

  // Handle user logout by clearing stored data and redirecting
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className='app-header'>
      {/* Display personalized greeting with user name */}
      <div className='header-logo'>{`${greeting}, ${userName}`}</div>
      <div className='header-controls'>
        {/* Mobile menu for sorting and filtering on smaller screens */}
        <MobileMenu
          sortBy={sortBy}
          onSortChange={setSortBy}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
        />
        {/* Logout button to end user session */}
        <button onClick={handleLogout} className='logout-button'>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
