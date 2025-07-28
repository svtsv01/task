// Todo Context for managing global todo state
// Provides sorting and filtering state to all todo-related components
import React, { createContext, useContext, useState } from 'react';
import { SORT_MODES } from '../constants';

// Create the context for todo state management
const TodoContext = createContext();

// Custom hook to use the todo context
// Throws an error if used outside of TodoProvider
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

// Provider component that wraps the app and provides todo state
// Manages sorting preferences and active status filters
export const TodoProvider = ({ children }) => {
  // State for sorting todos (by ID or alphabetically)
  const [sortBy, setSortBy] = useState(SORT_MODES.DEFAULT);
  // State for filtering todos by status (all, completed, pending)
  const [activeStatus, setActiveStatus] = useState('all');

  // Context value object containing state and setters
  const value = {
    sortBy,
    setSortBy,
    activeStatus,
    setActiveStatus,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
