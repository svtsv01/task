const API_BASE_URL = 'https://dummyjson.com';


export const fetchTodosByUserId = async (userId, limit = 10, skip = 0) => {
  
  if (!userId) {
    throw new Error("User ID is required to fetch todos.");
  }
  console.log(userId)
  const response = await fetch(`https://dummyjson.com/todos`);
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