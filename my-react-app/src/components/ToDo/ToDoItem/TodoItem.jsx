import React from 'react';
import { Trash2 } from 'lucide-react';
import { getTodoStatusConfig } from './todoConfig';
import '../../../styles/Main.css';

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
  const config = getTodoStatusConfig(todo.completed);

  return (
    <div className={config.cardClass}>
      <p className='todo-text'>{todo.todo}</p>
      <div className='todo-card-footer'>
        <div className='todo-status'>
          {config.icon}
          <span>{config.text}</span>
        </div>

        <div className='todo-actions'>
          <button
            className='action-button'
            onClick={() => onToggleComplete(todo.id, todo.completed)}
          >
            {config.toggleIcon}
          </button>
          <button
            className='action-button delete'
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
