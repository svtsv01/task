// Configuration system for todo item statuses and utilities
// Defines icons, text, and behavior for different todo states
import React from 'react';
import { CheckCircle, XCircle, Undo2, Trash2, RotateCcw } from 'lucide-react';

import '../../../styles/Main.css';
import { ICON_SIZES, TIME_CONFIG } from '../../../constants';

// Configuration object for different todo status states
// Each state has its own icon, text, toggle behavior, and styling
const todoStatusConfig = {
  // Pending state: task is not yet completed
  STATE_PENDING: {
    icon: <XCircle size={ICON_SIZES.LARGE} className='status-icon-pending' />,
    text: 'Pending',
    toggleIcon: <CheckCircle size={ICON_SIZES.MEDIUM} />,
    toggleText: 'Complete',
    cardClass: 'todo-card',
    nextState: 'STATE_COMPLETED',
  },
  // Completed state: task has been finished
  STATE_COMPLETED: {
    icon: (
      <CheckCircle size={ICON_SIZES.LARGE} className='status-icon-completed' />
    ),
    text: 'Completed',
    toggleIcon: <Undo2 size={ICON_SIZES.MEDIUM} />,
    toggleText: 'Mark as Pending',
    cardClass: 'todo-card completed',
    nextState: 'STATE_PENDING',
  },
  // Deleted state: task has been removed (soft delete)
  STATE_DELETED: {
    icon: <Trash2 size={ICON_SIZES.LARGE} className='status-icon-deleted' />,
    text: 'Deleted',
    toggleIcon: <RotateCcw size={ICON_SIZES.MEDIUM} />,
    toggleText: 'Restore',
    cardClass: 'todo-card deleted',
    nextState: 'STATE_PENDING',
  },
};

// Get configuration for a specific todo status
// Returns pending config as fallback if status is not found
export const getTodoStatusConfig = (state) => {
  return todoStatusConfig[state] || todoStatusConfig['STATE_PENDING'];
};

// Get the next state when toggling a todo status
// Returns pending as default if current state is not found
export const getNextState = (currentState) => {
  return todoStatusConfig[currentState]?.nextState || 'STATE_PENDING';
};

// Format creation timestamp into readable date and time
// Returns empty string if no timestamp is provided
export const formatCreatedTime = (createdAt) => {
  if (!createdAt) return '';

  const date = new Date(createdAt);
  return date.toLocaleDateString(TIME_CONFIG.LOCALE, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
