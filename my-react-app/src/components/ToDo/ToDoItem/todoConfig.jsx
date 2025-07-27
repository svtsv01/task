import React from 'react';
import { CheckCircle, XCircle, Undo2 } from 'lucide-react';

import '../../../styles/Main.css';

const todoStatusConfig = {
  completed: {
    icon: <CheckCircle size={20} className='status-icon-completed' />,
    text: 'Completed',
    toggleIcon: <Undo2 size={16} />,
    toggleText: 'Undo',
    cardClass: 'todo-card completed',
  },
  pending: {
    icon: <XCircle size={20} className='status-icon-pending' />,
    text: 'Pending',
    toggleIcon: <CheckCircle size={16} />,
    toggleText: 'Done',
    cardClass: 'todo-card',
  },
};

export const getTodoStatusConfig = (isCompleted) => {
  return todoStatusConfig[isCompleted ? 'completed' : 'pending'];
};