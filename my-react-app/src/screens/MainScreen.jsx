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
     
      </main>
      <Footer />
    </div>
  );
};

export default MainScreen;