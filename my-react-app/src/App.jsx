
import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider,
  Navigate
} from 'react-router-dom';
import SignInScreen from './pages/SignInScreen';
import SignUpScreen from './pages/SignupScreen';
import MainScreen from './pages/MainScreen';


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <SignInScreen />,
  },
  {
    path: "/signup",
    element: <SignUpScreen />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;