import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoList from '../components/ToDo/ToDoList/TodoList';

const MainScreen = () => {
  return (
    <div className='main-layout'>
      <Header />
      <main className='app-content'>
        <TodoList />
      </main>
      <Footer/>
    </div>
  );
};

export default MainScreen;
