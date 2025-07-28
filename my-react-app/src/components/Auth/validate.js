// Password validation utility function
// Checks password strength requirements and returns error messages if validation fails
export const validatePassword = (password) => {
  // Check if password is provided
  if (!password) {
    return 'Password is required.';
  }
  // Ensure minimum length of 6 characters
  if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }
  // Require at least one numeric character
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number.';
  }
  // Require at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character.';
  }
  return null; // Return null if password passes all validation checks
};