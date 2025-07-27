import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchTodosByUserId,
  addTodo,
  updateTodoStatus,
  deleteTodo,
} from '../src/api/toDoService'; 

beforeEach(() => {
  global.fetch = vi.fn();
});

describe('Todo Service', () => {


  describe('fetchTodosByUserId', () => {
    it('should fetch and paginate todos for a user', async () => {
      const mockTodos = {
        todos: Array.from({ length: 20 }, (v, i) => ({ id: i + 1, todo: `Task ${i + 1}` })),
        total: 20,
      };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      });

      const result = await fetchTodosByUserId(5, 10, 0);

      expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/users/5/todos');
      expect(result.todos.length).toBe(10);
      expect(result.todos[0].id).toBe(1);
      expect(result.total).toBe(20);
    });

    it('should throw an error if userId is not provided', async () => {
      await expect(fetchTodosByUserId(null)).rejects.toThrow('User ID is required to fetch todos.');
    });
  });

 
  describe('addTodo', () => {
    it('should resolve with a new todo object with a random ID', async () => {
      const result = await addTodo('A new task', 5);
      
      expect(result.todo).toBe('A new task');
      expect(result.completed).toBe(false);
      expect(result.userId).toBe(5);
      expect(result.id).toBeGreaterThanOrEqual(151);
      expect(result.id).toBeLessThanOrEqual(1000);
    });
  });

  describe('updateTodoStatus', () => {
    it('should call the update endpoint with the correct data', async () => {
      const mockResponse = { id: 1, completed: true };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      await updateTodoStatus(1, true);

      expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/todos/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });
    });
  });


  describe('deleteTodo', () => {
    it('should call the delete endpoint', async () => {
      const mockResponse = { id: 1, isDeleted: true };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      await deleteTodo(1);

      expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/todos/1', {
        method: 'DELETE',
      });
    });
  });
});