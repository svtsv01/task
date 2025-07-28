// Sign-up screen component for new user registration
// Handles account creation with form validation and password confirmation
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff} from 'lucide-react';
import AuthForm from '../components/Auth/AuthForm';
import AuthInput from '../components/Auth/AuthInput';
import { registerUser } from '../api/authService';
import { validatePassword } from '../components/Auth/validate'; 

const SignUpScreen = () => {
  // Form state management for registration fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Password visibility toggle for both password fields
  const [showPassword, setShowPassword] = useState(false);
  
  // Handle sign-up form submission with validation
  // Validates password strength and confirms password match
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate password strength using custom validation
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Ensure both password fields match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await registerUser({ username, email, password });
      
      // Show success message and redirect to login
      alert('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      title="Sign Up For Free"
      onSubmit={handleSignUp}
      buttonText="Sign Up"
      loading={loading}
      error={error}
      linkText="Already have an account?"
      linkTo={{ path: '/login', label: 'Sign In' }}
    >
      {/* Username input field */}
      <AuthInput
        Icon={User}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {/* Email input field */}
      <AuthInput
        Icon={Mail}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {/* Password input field with visibility toggle */}
      <AuthInput
        Icon={Lock}
         type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        ToggleIcon={showPassword ? EyeOff : Eye}
        onToggleVisibility={() => setShowPassword(!showPassword)}
      />
      {/* Confirm password input field */}
      <AuthInput
        Icon={Lock}
         type={showPassword ? 'text' : 'password'}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        ToggleIcon={showPassword ? EyeOff : Eye}
        onToggleVisibility={() => setShowPassword(!showPassword)}
      />
    </AuthForm>
  );
};

export default SignUpScreen;