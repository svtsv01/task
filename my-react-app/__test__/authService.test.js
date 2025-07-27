import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginUser, registerUser } from '../src/api/authService';

beforeEach(() => {
  global.fetch = vi.fn();
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

describe('Auth Service', () => {

  describe('loginUser', () => {
    it('should return user data on successful login', async () => {
    
      const mockUserData = { id: 1, username: 'testuser', token: 'fake-token' };
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockUserData),
      });


      const result = await loginUser('testuser', 'password');

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, expect.any(Object));
      expect(result).toEqual(mockUserData);
    });

    it('should throw an error on failed login', async () => {

      fetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      });
      await expect(loginUser('wronguser', 'wrongpass')).rejects.toThrow('Invalid credentials');
    });
  });

  describe('registerUser', () => {
    it('should return the new user data on successful registration', async () => {
      const newUser = { username: 'newbie', email: 'new@test.com', password: 'password123' };
      const mockResponse = { id: 151, ...newUser };
      
      fetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await registerUser(newUser);

      expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}/users/add`, expect.any(Object));
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error on failed registration', async () => {
      fetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ message: 'Failed to create' }),
      });

      await expect(registerUser({})).rejects.toThrow('Failed to create');
    });
  });
});