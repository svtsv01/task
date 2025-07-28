// Main todo list component that orchestrates the entire todo interface
// Combines all todo-related components and manages the overall layout
import React from 'react';
import TodoItem from '../ToDoItem/TodoItem';
import Pagination from '../Pagination';
import AddTodoForm from '../AddTodoForm';
import SortControls from '../SortControls';
import StatisticsWidget from '../StatisticsWidget';
import { useTodos } from './useTodos';
import { useTodoContext } from '../../../context/TodoContext';

const TodoList = () => {
  // Get sorting and filtering state from context
  const { sortBy, setSortBy, activeStatus, setActiveStatus } = useTodoContext();

  // Custom hook that manages all todo-related state and operations
  const {
    loading,
    error,
    allTodos,
    paginatedTodos,
    totalPages,
    currentPage,
    handleAddTodo,
    handleChangeStatus,
    handleDelete,
    handleEdit,
    setCurrentPage,
  } = useTodos(sortBy, activeStatus);

  // Show loading state while fetching todos
  if (loading) return <div className='loading-indicator'>Loading tasks...</div>;
  // Show error message if something goes wrong
  if (error) return <div className='error-message'>{error}</div>;

  return (
    <div className='todo-list-container'>
      {/* Form for adding new todos */}
      <AddTodoForm onAddTodo={handleAddTodo} />
      {/* Controls for sorting and filtering todos */}
      <SortControls
        sortBy={sortBy}
        onSortChange={setSortBy}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
      />

      {/* Grid container for displaying todo items */}
      <div className='todo-grid'>
        {paginatedTodos.length > 0 ? (
          // Render individual todo items
          paginatedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              task={todo}
              onChangeStatus={handleChangeStatus}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          // Show message when no todos match the current filter
          <p>No tasks found for the selected filter.</p>
        )}
      </div>

      {/* Pagination controls for navigating through todo pages */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {/* Statistics widget showing todo completion metrics */}
      <StatisticsWidget todos={allTodos} />
    </div>
  );
};

export default TodoList;
