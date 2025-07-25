
import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider,
  Navigate
} from 'react-router-dom';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignupScreen';
import MainScreen from './screens/MainScreen';


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