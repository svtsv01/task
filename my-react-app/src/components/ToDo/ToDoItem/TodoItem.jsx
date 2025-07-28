import React, { useState, useEffect } from 'react';
import { Trash2, Edit3, Check, X } from 'lucide-react';
import { getTodoStatusConfig, formatCreatedTime } from './todoConfig';
import { TODO_DISPLAY } from '../../../constants';
import '../../../styles/Main.css';
import { ICON_SIZES } from '../../../constants';

const TodoItem = ({ task, onChangeStatus, onDelete, onEdit }) => {
  const config = getTodoStatusConfig(task.state);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.todo);
  
  useEffect(() => {
    setEditText(task.todo);
  }, [task.todo]);

  const MAX_LENGTH = TODO_DISPLAY.MAX_TEXT_LENGTH; 
  const currentText = isEditing ? editText : task.todo;
  const isLongText = currentText.length > MAX_LENGTH;
  const displayText =
    isLongText && !isExpanded && !isEditing
      ? currentText.substring(0, MAX_LENGTH) + '...'
      : currentText;

  const handleEdit = () => {
    if (editText.trim() !== task.todo) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.todo);
    setIsEditing(false);
  };

  return (
    <div className={config.cardClass}>
      <div className='todo-header'>
        <div className='todo-text-container'>
          {isEditing ? (
            <div className='edit-container'>
              <input
                type='text'
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className='edit-input'
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleEdit();
                  if (e.key === 'Escape') handleCancel();
                }}
              />
              <div className='edit-actions'>
                <button
                  className='edit-btn save'
                  onClick={handleEdit}
                  title='Save'
                >
                  <Check size={ICON_SIZES.SMALL} />
                </button>
                <button
                  className='edit-btn cancel'
                  onClick={handleCancel}
                  title='Cancel'
                >
                  <X size={ICON_SIZES.SMALL} />
                </button>
              </div>
            </div>
          ) : (
            <p
              className={`todo-text ${
                isLongText && !isExpanded ? 'todo-text-truncated' : ''
              }`}
            >
              {displayText}
            </p>
          )}

      
          {isLongText && !isEditing && (
            <button
              className='read-more-btn'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
        <span className='todo-time'>{formatCreatedTime(task.createdAt)}</span>
      </div>

      <div className='todo-card-footer'>
        <div className='todo-status'>
          {config.icon}
          <span>{config.text}</span>
        </div>

        <div className='todo-actions'>
          <button
            className='action-button'
            onClick={() => onChangeStatus(task.id, task.state)}
            title={config.toggleText}
          >
            {config.toggleIcon}
          </button>

          <button
            className='action-button edit'
            onClick={() => setIsEditing(true)}
            title='Edit task'
            disabled={isEditing}
          >
            <Edit3 size={ICON_SIZES.MEDIUM} />
          </button>

          <button
            className='action-button delete'
            onClick={() => onDelete(task.id)}
            title='Delete permanently'
          >
            <Trash2 size={ICON_SIZES.MEDIUM} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
