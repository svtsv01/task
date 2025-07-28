// Authentication service for handling user login and registration
// Uses the DummyJSON API for demo purposes

// Base URL for API calls - can be configured via environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `https://dummyjson.com`;

// Authenticate user with username and password
// Returns user data and authentication token on success
export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  // Handle API errors and throw meaningful error messages
  if (!response.ok) {
    throw new Error(data.message || 'Failed to login.');
  }

  return data;
};

// Register a new user account
// Creates user profile with provided credentials
export const registerUser = async ({ username, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      email,
      password,
      firstName: username, // Use username as firstName for demo
    }),
  });

  const data = await response.json();

  // Handle registration errors
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create account.');
  }

  return data;
};