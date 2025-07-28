// Individual todo item component that displays and manages a single task
// Handles editing, status changes, deletion, and text expansion for long content
import React, { useState, useEffect } from 'react';
import { Trash2, Edit3, Check, X } from 'lucide-react';
import { getTodoStatusConfig, formatCreatedTime } from './todoConfig';
import { TODO_DISPLAY } from '../../../constants';
import '../../../styles/Main.css';
import { ICON_SIZES } from '../../../constants';

const TodoItem = ({ task, onChangeStatus, onDelete, onEdit }) => {
  // Get configuration for the current todo status (pending, completed, deleted)
  const config = getTodoStatusConfig(task.state);
  
  // State for managing text expansion and editing modes
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.todo);
  
  // Update edit text when task content changes
  useEffect(() => {
    setEditText(task.todo);
  }, [task.todo]);

  // Text display logic for handling long content
  const MAX_LENGTH = TODO_DISPLAY.MAX_TEXT_LENGTH; 
  const currentText = isEditing ? editText : task.todo;
  const isLongText = currentText.length > MAX_LENGTH;
  const displayText =
    isLongText && !isExpanded && !isEditing
      ? currentText.substring(0, MAX_LENGTH) + '...'
      : currentText;

  // Handle saving edited todo text
  // Only updates if the text has actually changed
  const handleEdit = () => {
    if (editText.trim() !== task.todo) {
      onEdit(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  // Cancel editing and revert to original text
  const handleCancel = () => {
    setEditText(task.todo);
    setIsEditing(false);
  };

  return (
    <div className={config.cardClass}>
      {/* Todo header with text content and timestamp */}
      <div className='todo-header'>
        <div className='todo-text-container'>
          {isEditing ? (
            /* Edit mode: input field with save/cancel buttons */
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
                {/* Save button */}
                <button
                  className='edit-btn save'
                  onClick={handleEdit}
                  title='Save'
                >
                  <Check size={ICON_SIZES.SMALL} />
                </button>
                {/* Cancel button */}
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
            /* Display mode: show todo text with optional truncation */
            <p
              className={`todo-text ${
                isLongText && !isExpanded ? 'todo-text-truncated' : ''
              }`}
            >
              {displayText}
            </p>
          )}

          {/* Expand/collapse button for long text */}
          {isLongText && !isEditing && (
            <button
              className='read-more-btn'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
        {/* Display formatted creation time */}
        <span className='todo-time'>{formatCreatedTime(task.createdAt)}</span>
      </div>

      {/* Todo footer with status and action buttons */}
      <div className='todo-card-footer'>
        {/* Status indicator with icon and text */}
        <div className='todo-status'>
          {config.icon}
          <span>{config.text}</span>
        </div>

        {/* Action buttons for status toggle, edit, and delete */}
        <div className='todo-actions'>
          {/* Toggle status button (complete/pending/restore) */}
          <button
            className='action-button'
            onClick={() => onChangeStatus(task.id, task.state)}
            title={config.toggleText}
          >
            {config.toggleIcon}
          </button>

          {/* Edit button - disabled while editing */}
          <button
            className='action-button edit'
            onClick={() => setIsEditing(true)}
            title='Edit task'
            disabled={isEditing}
          >
            <Edit3 size={ICON_SIZES.MEDIUM} />
          </button>

          {/* Delete button */}
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
