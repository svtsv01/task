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
  const [allTodos, setAllTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const userId = useMemo(() => {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString).id : null;
  }, []);

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
        const todosWithState = data.todos.map((todo, index) => ({
          ...todo,
          state: todo.completed ? 'STATE_COMPLETED' : 'STATE_PENDING',
          createdAt: new Date(
            currentTime.getTime() - index * TIME_CONFIG.TIME_OFFSET_MS
          ), 
        }));
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
        setAllTodos((prevTodos) => [todoWithState, ...prevTodos]);
      } catch (err) {
        console.log(err);
        setError('Failed to add task. Please try again.');
      }
    },
    [userId]
  );

  const handleChangeStatus = useCallback(async (todoId, currentState) => {
    const updateLogic = (newState) => {
      setAllTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, state: newState } : todo
        )
      );
    };

    const nextState = getNextState(currentState);

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

  const handleDelete = useCallback(async (todoId) => {
    const updateLogic = () => {
      setAllTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== todoId)
      );
    };

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

  const handleEdit = useCallback((todoId, newText) => {
    if (!newText.trim()) return;

    setAllTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, todo: newText.trim() } : todo
      )
    );
  }, []);

  const sortedTodos = useMemo(() => {
    return [...allTodos].sort((a, b) => {
      if (sortBy === SORT_MODES.ALPHA) {
        return a.todo.localeCompare(b.todo);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [allTodos, sortBy]);


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

  const paginatedTodos = useMemo(() => {
    const skip = (currentPage - 1) * TODOS_PER_PAGE;
    return filteredTodos.slice(skip, skip + TODOS_PER_PAGE);
  }, [filteredTodos, currentPage]);

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


const getNextState = (currentState) => {
  const stateTransitions = {
    STATE_PENDING: 'STATE_COMPLETED',
    STATE_COMPLETED: 'STATE_PENDING',
  };
  return stateTransitions[currentState] || 'STATE_PENDING';
};
