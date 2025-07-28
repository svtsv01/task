// Main screen component - the primary interface after user authentication
// Displays the todo list with header and footer navigation
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoList from '../components/ToDo/ToDoList/TodoList';

// Main screen layout that wraps the todo functionality
// Provides consistent header and footer across the app
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
