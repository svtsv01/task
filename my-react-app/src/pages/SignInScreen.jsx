// Sign-in screen component for user authentication
// Handles login form submission and navigation to main app
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthForm from '../components/Auth/AuthForm';
import AuthInput from '../components/Auth/AuthInput';
import { loginUser } from '../api/authService';
import { TEST_DATA } from '../constants';

const SignInScreen = () => {
  // Form state management
  const [username, setUsername] = useState(TEST_DATA.DEFAULT_USERNAME);
  const [password, setPassword] = useState(TEST_DATA.DEFAULT_PASSWORD);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Password visibility toggle state
  const [showPassword, setShowPassword] = useState(false);

  // Handle login form submission
  // Authenticates user and stores token in localStorage
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(username, password);

      // Store authentication data for session persistence
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title='Sign In'
      onSubmit={handleLogin}
      buttonText='Sign In'
      loading={loading}
      error={error}
      linkText="Don't have an account?"
      linkTo={{ path: '/signup', label: 'Sign Up' }}
      showSocialLogin={true}
    >
      {/* Username input field */}
      <AuthInput
        Icon={Mail}
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {/* Password input field with visibility toggle */}
      <AuthInput
        Icon={Lock}
        type={showPassword ? 'text' : 'password'}
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        ToggleIcon={showPassword ? EyeOff : Eye}
        onToggleVisibility={() => setShowPassword(!showPassword)}
      />
    </AuthForm>
  );
};

export default SignInScreen;
