import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddTodoForm from '../src/components/ToDo/AddTodoForm';

describe('AddTodoForm', () => {
  it('should call onAddTodo with the input text when the form is submitted', () => {
    const mockOnAddTodo = vi.fn();

    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);

    const inputElement = screen.getByPlaceholderText('Add a new task...');
    const buttonElement = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(inputElement, { target: { value: 'My new test task' } });

    fireEvent.click(buttonElement);
    expect(mockOnAddTodo).toHaveBeenCalledWith('My new test task');
    
    expect(inputElement.value).toBe('');
  });

  it('should not call onAddTodo if the input is empty', () => {
    const mockOnAddTodo = vi.fn();
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    const buttonElement = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(buttonElement);
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });
});