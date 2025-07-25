import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const TodoItem = ({ todo }) => {
  const cardClass = todo.completed ? 'todo-card completed' : 'todo-card';

  return (
    <div className={cardClass}>
      <p className="todo-text">{todo.todo}</p>
      <div className="todo-status">
        {todo.completed ? (
          <CheckCircle size={20} className="status-icon-completed" />
        ) : (
          <XCircle size={20} className="status-icon-pending" />
        )}
        <span>{todo.completed ? 'Completed' : 'Pending'}</span>
      </div>
    </div>
  );
};

export default TodoItem;