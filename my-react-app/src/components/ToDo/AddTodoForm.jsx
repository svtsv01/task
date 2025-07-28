// Form component for adding new todo items
// Provides input field and submit button for creating tasks
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ICON_SIZES } from '../../constants';

const AddTodoForm = ({ onAddTodo }) => {
  // State for the new todo text input
  const [text, setText] = useState('');

  // Handle form submission to create new todo
  // Only adds todo if text is not empty after trimming whitespace
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText(''); // Clear input after adding todo
    }
  };

  return (
    <form onSubmit={handleSubmit} className='add-todo-form'>
      {/* Input field for new todo text */}
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Add a new task...'
        className='add-todo-input'
      />
      {/* Submit button with plus icon */}
      <button type='submit' className='add-todo-button'>
        <Plus size={ICON_SIZES.LARGE} />
        Add Task
      </button>
    </form>
  );
};

export default AddTodoForm;
