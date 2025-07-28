// Custom hook for managing todo state and operations
// Handles fetching, adding, updating, deleting, sorting, filtering, and pagination
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  fetchTodosByUserId,
  addTodo,
  updateTodoStatus,
  deleteTodo,
} from '../../../api/toDoService';
import {
  TODOS_PER_PAGE,
  API_ID_THRESHOLD,
  SORT_MODES,
  TIME_CONFIG,
} from '../../../constants';

export const useTodos = (sortBy, activeStatus) => {
  // Core todo state management
  const [allTodos, setAllTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Get user ID from localStorage for API calls
  const userId = useMemo(() => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString).id : null;
  }, []);

  // Load todos on component mount and when user changes
  useEffect(() => {
    const loadTodos = async () => {
      if (!userId) {
        setError('User not found. Please log in again.');
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await fetchTodosByUserId(userId);
        const currentTime = new Date();
        // Add state and creation time to each todo
        const todosWithState = data.todos.map((todo, index) => ({
          ...todo,
          state: todo.completed ? 'STATE_COMPLETED' : 'STATE_PENDING',
          createdAt: new Date(
            currentTime.getTime() - index * TIME_CONFIG.TIME_OFFSET_MS
          ), 
        }));
        // Sort by creation time (newest first)
        setAllTodos(
          todosWithState.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [userId]);

  // Add a new todo to the list
  const handleAddTodo = useCallback(
    async (todoText) => {
      if (!userId) return;
      try {
        const newTodo = await addTodo(todoText, userId);
        const todoWithState = {
          ...newTodo,
          state: 'STATE_PENDING',
          createdAt: new Date(), 
        };
        // Add new todo to the beginning of the list
        setAllTodos((prevTodos) => [todoWithState, ...prevTodos]);
      } catch (err) {
        console.log(err);
        setError('Failed to add task. Please try again.');
      }
    },
    [userId]
  );

  // Toggle todo status (pending ↔ completed)
  const handleChangeStatus = useCallback(async (todoId, currentState) => {
    // Local state update function
    const updateLogic = (newState) => {
      setAllTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, state: newState } : todo
        )
      );
    };

    const nextState = getNextState(currentState);

    // Skip API call for locally created todos (above threshold)
    if (todoId > API_ID_THRESHOLD) {
      updateLogic(nextState);
      return;
    }

    try {
      const isCompleted = nextState === 'STATE_COMPLETED';
      await updateTodoStatus(todoId, isCompleted);
      updateLogic(nextState);
    } catch (err) {
      console.log(err);
      setError('Failed to update task status. Please try again.');
    }
  }, []);

  // Delete a todo from the list
  const handleDelete = useCallback(async (todoId) => {
    // Local state update function
    const updateLogic = () => {
      setAllTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== todoId)
      );
    };

    // Skip API call for locally created todos
    if (todoId > API_ID_THRESHOLD) {
      updateLogic();
      return;
    }
    try {
      await deleteTodo(todoId);
      updateLogic();
    } catch (err) {
      console.log(err);
      setError('Failed to delete task. Please try again.');
    }
  }, []);

  // Edit todo text content
  const handleEdit = useCallback((todoId, newText) => {
    if (!newText.trim()) return;

    setAllTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, todo: newText.trim() } : todo
      )
    );
  }, []);

  // Sort todos based on current sort mode
  const sortedTodos = useMemo(() => {
    return [...allTodos].sort((a, b) => {
      if (sortBy === SORT_MODES.ALPHA) {
        return a.todo.localeCompare(b.todo);
      }
      // Default sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [allTodos, sortBy]);

  // Filter todos based on active status filter
  const filteredTodos = useMemo(() => {
    if (activeStatus === 'all') {
      return sortedTodos;
    }

    const statusMap = {
      pending: 'STATE_PENDING',
      completed: 'STATE_COMPLETED',
    };

    return sortedTodos.filter((todo) => todo.state === statusMap[activeStatus]);
  }, [sortedTodos, activeStatus]);

  // Apply pagination to filtered todos
  const paginatedTodos = useMemo(() => {
    const skip = (currentPage - 1) * TODOS_PER_PAGE;
    return filteredTodos.slice(skip, skip + TODOS_PER_PAGE);
  }, [filteredTodos, currentPage]);

  // Calculate total number of pages
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredTodos.length / TODOS_PER_PAGE)),
    [filteredTodos.length]
  );

  return {
    loading,
    error,
    allTodos,
    paginatedTodos,
    totalPages,
    currentPage,
    handleAddTodo,
    handleChangeStatus,
    handleDelete,
    handleEdit,
    setCurrentPage,
  };
};

// Helper function to determine next state when toggling todo status
const getNextState = (currentState) => {
  const stateTransitions = {
    STATE_PENDING: 'STATE_COMPLETED',
    STATE_COMPLETED: 'STATE_PENDING',
  };
  return stateTransitions[currentState] || 'STATE_PENDING';
};
