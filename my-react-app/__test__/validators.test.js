import { describe, it, expect } from 'vitest';
import { validatePassword } from '../src/components/Auth/validate';

describe('validatePassword', () => {
  it('should return null for a valid password', () => {
    expect(validatePassword('ValidPass1!')).toBeNull();
  });

  it('should return an error for a password that is too short', () => {
    expect(validatePassword('Vp1!')).toBe('Password must be at least 6 characters.');
  });

  it('should return an error for a password without a number', () => {
    expect(validatePassword('ValidPassword!')).toBe('Password must contain at least one number.');
  });

  it('should return an error for a password without a special character', () => {
    expect(validatePassword('ValidPassword1')).toBe('Password must contain at least one special character.');
  });

  it('should return an error for an empty password', () => {
    expect(validatePassword('')).toBe('Password is required.');
  });
});