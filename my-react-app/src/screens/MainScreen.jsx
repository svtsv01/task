// src/screens/MainScreen.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Main.css';

const MainScreen = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="main-layout">
      <Header />
      <main className="app-content">
        <h1>Welcome, {user?.firstName || 'User'}!</h1>
        <p>Your to-do list will be displayed here.</p>
        {/* The to-do list with pagination will be implemented here later */}
      </main>
      <Footer />
    </div>
  );
};

export default MainScreen;