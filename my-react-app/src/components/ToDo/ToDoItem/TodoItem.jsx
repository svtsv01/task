import React from 'react';
import { CheckCircle, XCircle, Trash2, Undo2 } from 'lucide-react';
import '../../../styles/Main.css';

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
  const cardClass = todo.completed ? 'todo-card completed' : 'todo-card';

  return (
    <div className={cardClass}>
      <p className="todo-text">{todo.todo}</p>
      <div className="todo-card-footer">
        <div className="todo-status">
          {todo.completed ? (
            <CheckCircle size={20} className="status-icon-completed" />
          ) : (
            <XCircle size={20} className="status-icon-pending" />
          )}
          <span>{todo.completed ? 'Completed' : 'Pending'}</span>
        </div>

        <div className="todo-actions">
          <button
            className="action-button"
            onClick={() => onToggleComplete(todo.id, todo.completed)}
          >
            {todo.completed ? <Undo2 size={16} /> : <CheckCircle size={16} />}
          </button>
          <button
            className="action-button delete"
            onClick={() => onDelete(todo.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;