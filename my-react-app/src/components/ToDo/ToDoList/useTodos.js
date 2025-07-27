import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchTodosByUserId, addTodo, updateTodoStatus, deleteTodo } from '../../../api/toDoService';
import { TODOS_PER_PAGE, API_ID_THRESHOLD, SORT_MODES } from '../../../constants';

export const useTodos = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(SORT_MODES.DEFAULT);

  const userId = useMemo(() => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString).id : null;
  }, []);


    useEffect(() => {
    const loadTodos = async () => {
        if (!userId) {
        setError("User not found. Please log in again.");
        setLoading(false);
        return;
        }
        setLoading(true);
    try {
    const data = await fetchTodosByUserId(userId);
    setAllTodos(data.todos.sort((a, b) => a.id - b.id));
    } catch (err) {
    setError(err.message);
    } finally {setLoading(false);
    }
};

 loadTodos();
 }, [userId]);

  const handleAddTodo = useCallback(async (todoText) => {
    if (!userId) return;
    try {
      const newTodo = await addTodo(todoText, userId);
      setAllTodos(prevTodos => [newTodo, ...prevTodos]);
    } catch (err) {
      setError("Failed to add task. Please try again.");
    }
  }, [userId]);

  const handleToggleComplete = useCallback(async (todoId, currentStatus) => {
    const updateLogic = () => {
      setAllTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };
    
    if (todoId > API_ID_THRESHOLD) {
      updateLogic(); 
      return; 
    }
    try {
      await updateTodoStatus(todoId, !currentStatus);
      updateLogic(); 
    } catch (err) {
      setError("Failed to update task status. Please try again.");
    }
  }, []);

  const handleDeleteTodo = useCallback(async (todoId) => {
    const updateLogic = () => {
      setAllTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    };

    if (todoId > API_ID_THRESHOLD) {
      updateLogic();
      return;
    }
    try {
      await deleteTodo(todoId);
      updateLogic(); 
    } catch (err) {
      setError("Failed to delete task. Please try again.");
    }
  }, []);

  const sortedTodos = useMemo(() => {
    return [...allTodos].sort((a, b) => {
      if (sortBy === SORT_MODES.ALPHA) {
        return a.todo.localeCompare(b.todo);
      }
      return a.id - b.id; 
    });
  }, [allTodos, sortBy]);

  const paginatedTodos = useMemo(() => {
    const skip = (currentPage - 1) * TODOS_PER_PAGE;
    return sortedTodos.slice(skip, skip + TODOS_PER_PAGE);
  }, [sortedTodos, currentPage]);

  const pendingTodos = useMemo(() => paginatedTodos.filter(todo => !todo.completed), [paginatedTodos]);
  const completedTodos = useMemo(() => paginatedTodos.filter(todo => todo.completed), [paginatedTodos]);
  const totalPages = useMemo(() => Math.max(1, Math.ceil(allTodos.length / TODOS_PER_PAGE)), [allTodos.length]);

  return {
    loading,
    error,
    allTodos,
    pendingTodos,
    completedTodos,
    totalPages,
    currentPage,
    sortBy,
    handleAddTodo,
    handleToggleComplete,
    handleDeleteTodo,
    setCurrentPage,
    setSortBy,
  };
};