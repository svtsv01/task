import React from 'react';
import Header from '../components/Header';
import TodoList from '../components/ToDo/ToDoList/TodoList';

const MainScreen = () => {
  return (
    <div className='main-layout'>
      <Header />
      <main className='app-content'>
        <TodoList />
      </main>
    </div>
  );
};

export default MainScreen;
