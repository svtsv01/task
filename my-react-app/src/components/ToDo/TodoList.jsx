import React, { useState, useEffect } from 'react';
import { fetchTodosByUserId } from '../../api/toDoService';
import TodoItem from './TodoItem';
import Pagination from './Pagination';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  
  const TODOS_PER_PAGE = 10;

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      setError('');
      try {
        const userString = localStorage.getItem('user');
        if (!userString) {
          throw new Error("User not found. Please log in again.");
        }
        const user = JSON.parse(userString);
        const skip = (currentPage - 1) * TODOS_PER_PAGE;

        const data = await fetchTodosByUserId(user.id, TODOS_PER_PAGE, skip);
        
        setTodos(data.todos);
        setTotalPages(Math.ceil(data.total / TODOS_PER_PAGE));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [currentPage]); 

  if (loading) {
    return <div className="loading-indicator">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="todo-list-container">
      <div className="todo-grid">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TodoList;