import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useGreeting } from '../src/components/utils/greetings';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('useGreeting Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear(); 
  });

  afterEach(() => {
    vi.useRealTimers(); 
  });

  it('should return "Good morning" and the user name before 12 PM', () => {
    const morningTime = new Date(2023, 10, 20, 9, 30, 0);
    vi.setSystemTime(morningTime);

    const mockUser = { firstName: 'John' };
    localStorage.setItem('user', JSON.stringify(mockUser));

    const { result } = renderHook(() => useGreeting());
    expect(result.current.greeting).toBe('Good morning');
    expect(result.current.userName).toBe('John');
  });

  it('should return "Good afternoon" between 12 PM and 6 PM', () => {

    const afternoonTime = new Date(2023, 10, 20, 14, 0, 0);
    vi.setSystemTime(afternoonTime);
    const { result } = renderHook(() => useGreeting());
    expect(result.current.greeting).toBe('Good afternoon');
  });

  it('should return "Good evening" after 6 PM (18:00)', () => {
    const eveningTime = new Date(2023, 10, 20, 20, 0, 0);
    vi.setSystemTime(eveningTime);
    const { result } = renderHook(() => useGreeting())
    expect(result.current.greeting).toBe('Good evening');
  });

  it('should return a fallback userName of "User" if no user is in localStorage', () => {
   
    const { result } = renderHook(() => useGreeting());

    expect(result.current.userName).toBe('User');
  });
});