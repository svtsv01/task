import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import AuthForm from '../components/Auth/AuthForm';
import AuthInput from '../components/Auth/AuthInput';
import { loginUser } from '../api/authService';
import { TEST_DATA } from '../constants';

const SignInScreen = () => {
  const [username, setUsername] = useState(TEST_DATA.DEFAULT_USERNAME);
  const [password, setPassword] = useState(TEST_DATA.DEFAULT_PASSWORD);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(username, password);

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
      <AuthInput
        Icon={Mail}
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <AuthInput
        Icon={Lock}
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </AuthForm>
  );
};

export default SignInScreen;
