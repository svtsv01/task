import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ICON_SIZES } from '../../constants';

const AddTodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='add-todo-form'>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Add a new task...'
        className='add-todo-input'
      />
      <button type='submit' className='add-todo-button'>
        <Plus size={ICON_SIZES.LARGE} />
        Add Task
      </button>
    </form>
  );
};

export default AddTodoForm;
