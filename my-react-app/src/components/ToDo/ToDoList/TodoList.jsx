import React, { useState, useEffect, useMemo } from 'react';
import TodoItem from '../ToDoItem/TodoItem';
import Pagination from '../Pagination';
import AddTodoForm from '../AddTodoForm';
import SortControls from '../SortControls';
import StatisticsWidget from '../StatisticsWidget';
import { useTodos } from './useTodos';

const TodoList = () => {

  const {
    loading,
    error,
    allTodos,
    pendingTodos,
    completedTodos,
    totalPages,
    currentPage,
    sortBy,
    handleAddTodo,
    handleToggleComplete,
    handleDeleteTodo,
    setCurrentPage,
    setSortBy,
  } = useTodos();

  if (loading) return <div className="loading-indicator">Loading tasks...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="todo-list-container">
      <AddTodoForm onAddTodo={handleAddTodo} />
      <SortControls sortBy={sortBy} onSortChange={setSortBy} />
      
      <h2 className="todo-section-header">
        Pending Tasks
      </h2>
      <div className="todo-grid">
        {pendingTodos.length > 0 ? (
          pendingTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
            />
          ))
        ) : <p>No pending tasks on this page.</p>}
      </div>
      
      <h2 className="todo-section-header">
        Completed Tasks
      </h2>
      <div className="todo-grid">
        {completedTodos.length > 0 ? (
          completedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
            />
          ))
        ) : <p>No completed tasks on this page.</p>}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <StatisticsWidget todos={allTodos} />
    </div>
  );
};

export default TodoList;