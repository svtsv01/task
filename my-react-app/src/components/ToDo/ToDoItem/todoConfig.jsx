import React from 'react';
import { CheckCircle, XCircle, Undo2, Trash2, RotateCcw } from 'lucide-react';

import '../../../styles/Main.css';
import { ICON_SIZES, TIME_CONFIG } from '../../../constants';

const todoStatusConfig = {
  STATE_PENDING: {
    icon: <XCircle size={ICON_SIZES.LARGE} className='status-icon-pending' />,
    text: 'Pending',
    toggleIcon: <CheckCircle size={ICON_SIZES.MEDIUM} />,
    toggleText: 'Complete',
    cardClass: 'todo-card',
    nextState: 'STATE_COMPLETED',
  },
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
  STATE_DELETED: {
    icon: <Trash2 size={ICON_SIZES.LARGE} className='status-icon-deleted' />,
    text: 'Deleted',
    toggleIcon: <RotateCcw size={ICON_SIZES.MEDIUM} />,
    toggleText: 'Restore',
    cardClass: 'todo-card deleted',
    nextState: 'STATE_PENDING',
  },
};

export const getTodoStatusConfig = (state) => {
  return todoStatusConfig[state] || todoStatusConfig['STATE_PENDING'];
};

export const getNextState = (currentState) => {
  return todoStatusConfig[currentState]?.nextState || 'STATE_PENDING';
};

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
