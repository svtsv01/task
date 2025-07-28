// Main App component that sets up routing and authentication
// Uses React Router for navigation between different screens
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import SignInScreen from './pages/SignInScreen';
import SignUpScreen from './pages/SignupScreen';
import MainScreen from './pages/MainScreen';
import { TodoProvider } from './context/TodoContext';

// Protected route component that checks for authentication
// Redirects to login if no auth token is found in localStorage
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

// Define the application routes with their corresponding components
// Each route represents a different screen in the app
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <TodoProvider>
          <MainScreen />
        </TodoProvider>
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <SignInScreen />,
  },
  {
    path: '/signup',
    element: <SignUpScreen />,
  },
]);

// Main App component that provides the router to the entire application
function App() {
  return <RouterProvider router={router} />;
}

export default App;
