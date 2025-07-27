import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';
import { useGreeting } from './utils/greetings';
import MobileMenu from './ToDo/MobileMenu';
import { useTodoContext } from '../context/TodoContext';

const Header = () => {
  const navigate = useNavigate();
  const { greeting, userName } = useGreeting();
  const { sortBy, setSortBy, activeStatus, setActiveStatus } = useTodoContext();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className='app-header'>
      <div className='header-logo'>{`${greeting}, ${userName}`}</div>
      <div className='header-controls'>
        <MobileMenu
          sortBy={sortBy}
          onSortChange={setSortBy}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
        />
        <button onClick={handleLogout} className='logout-button'>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
