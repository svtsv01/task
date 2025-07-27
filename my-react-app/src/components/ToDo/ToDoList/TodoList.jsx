import React from 'react';
import TodoItem from '../ToDoItem/TodoItem';
import Pagination from '../Pagination';
import AddTodoForm from '../AddTodoForm';
import SortControls from '../SortControls';
import StatisticsWidget from '../StatisticsWidget';
import { useTodos } from './useTodos';
import { useTodoContext } from '../../../context/TodoContext';

const TodoList = () => {
  const { sortBy, setSortBy, activeStatus, setActiveStatus } = useTodoContext();

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

  if (loading) return <div className='loading-indicator'>Loading tasks...</div>;
  if (error) return <div className='error-message'>{error}</div>;

  return (
    <div className='todo-list-container'>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <SortControls
        sortBy={sortBy}
        onSortChange={setSortBy}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
      />

      <div className='todo-grid'>
        {paginatedTodos.length > 0 ? (
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
          <p>No tasks found for the selected filter.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <StatisticsWidget todos={allTodos} />
    </div>
  );
};

export default TodoList;
