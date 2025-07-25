import React, { useState, useEffect, useMemo } from 'react';
import { fetchTodosByUserId, addTodo } from '../../api/toDoService';
import TodoItem from './TodoItem';
import Pagination from './Pagination';
import AddTodoForm from './AddTodoForm';
import SortControls from './SortControls';
import StatisticsWidget from './StatisticsWidget';

const TodoList = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('id');
  const TODOS_PER_PAGE = 10;

  const userId = useMemo(() => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString).id : null;
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      if (!userId) {
        setError("User not found. Please log in again.");
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await fetchTodosByUserId(userId);
        setAllTodos(data.todos.sort((a, b) => a.id - b.id)); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, [userId]);

  const handleAddTodo = async (todoText) => {
    if (!userId) return;
    try {
      const newTodo = await addTodo(todoText, userId);
      setAllTodos(prevTodos => [newTodo, ...prevTodos]);
    } catch (err) {
      setError("Failed to add task. Please try again.");
    }
  };

  const sortedTodos = useMemo(() => {
    return [...allTodos].sort((a, b) => {
      if (sortBy === 'alpha') {
        return a.todo.localeCompare(b.todo);
      }
      return a.id - b.id; 
    });
  }, [allTodos, sortBy]);

  const paginatedTodos = useMemo(() => {
    const skip = (currentPage - 1) * TODOS_PER_PAGE;
    return sortedTodos.slice(skip, skip + TODOS_PER_PAGE);
  }, [sortedTodos, currentPage]);

  const pendingTodos = paginatedTodos.filter(todo => !todo.completed);
  const completedTodos = paginatedTodos.filter(todo => todo.completed);
  const totalPages = Math.ceil(allTodos.length / TODOS_PER_PAGE);

  if (loading) return <div className="loading-indicator">Loading tasks...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="todo-list-container">
      <AddTodoForm onAddTodo={handleAddTodo} />
      <SortControls sortBy={sortBy} onSortChange={setSortBy} />
      
      <h2 className="todo-section-header">Pending Tasks</h2>
      <div className="todo-grid">
        {pendingTodos.length > 0 ? (
          pendingTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : <p>No pending tasks on this page.</p>}
      </div>
      
      <h2 className="todo-section-header"> Completed Tasks</h2>
      <div className="todo-grid">
        {completedTodos.length > 0 ? (
          completedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : <p>No completed tasks on this page.</p>}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

      <StatisticsWidget todos={allTodos} /> 
    </div>
  );
};

export default TodoList;