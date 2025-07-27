import React, { createContext, useContext, useState } from 'react';
import { SORT_MODES } from '../constants';

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [sortBy, setSortBy] = useState(SORT_MODES.DEFAULT);
  const [activeStatus, setActiveStatus] = useState('all');

  const value = {
    sortBy,
    setSortBy,
    activeStatus,
    setActiveStatus,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
