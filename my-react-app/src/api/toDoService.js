const API_BASE_URL = `https://dummyjson.com`;

export const fetchTodosByUserId = async (userId, limit = 10, skip = 0) => {
  if (!userId) {
    throw new Error("User ID is required to fetch todos.");
  }
  console.log(userId)
  const response = await fetch(`${API_BASE_URL}/users/${userId}/todos`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch todos.');
  }
  const paginatedTodos = data.todos.slice(skip, skip + limit);
  return {
    todos: paginatedTodos,
    total: data.total, 
  };
};

export const addTodo = async (todoText, userId) => {
  const randomId = Math.floor(Math.random() * 850) + 151;
  const newTodo = {
    id: randomId,
    todo: todoText,
    completed: false,
    userId: userId,
  };
  return Promise.resolve(newTodo);
};

export const updateTodoStatus = async (todoId, completed) => {
  const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  if (!response.ok) throw new Error("Failed to update todo status.");
  return await response.json();
};

export const deleteTodo = async (todoId) => {
  const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error("Failed to delete todo.");
  return await response.json();
};