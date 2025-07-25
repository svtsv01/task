import React, { useState, useEffect } from 'react';
import { fetchTodosByUserId } from '../../api/toDoService';
import TodoItem from './TodoItem';
import Pagination from './Pagination';

const TodoList = () => {
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
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
        
        setPendingTodos(data.todos.filter(todo => !todo.completed));
        setCompletedTodos(data.todos.filter(todo => todo.completed));

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

  const noTasksOnPage = pendingTodos.length === 0 && completedTodos.length === 0;

  return (
    <div className="todo-list-container">
      <h2 className="todo-section-header">Pending Tasks</h2>
      <div className="todo-grid">
        {pendingTodos.length > 0 ? (
          pendingTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <p>No pending tasks on this page.</p>
        )}
      </div>
      
      <h2 className="todo-section-header">Completed Tasks </h2>
      <div className="todo-grid">
        {completedTodos.length > 0 ? (
          completedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <p>No completed tasks on this page.</p>
        )}
      </div>

      {noTasksOnPage && !loading && (
        <p>No tasks to display on this page.</p>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TodoList;