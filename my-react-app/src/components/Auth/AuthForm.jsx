// Reusable authentication form wrapper component
// Provides consistent layout and styling for login and signup forms
import { Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import '../../styles/Auth.css';

const AuthForm = ({
  title,
  onSubmit,
  children,
  buttonText,
  loading,
  error,
  linkText,
  linkTo,
  showSocialLogin = false,
}) => {
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={onSubmit}>
        {/* Application logo */}
        <img src="/assets/logo.png" alt="Logo" className="auth-logo"/>
        {/* Form title (e.g., "Sign In" or "Sign Up") */}
        <h1 className="auth-title">{title}</h1>
        
        {/* Form input fields passed as children */}
        {children}
        
        {/* Submit button with loading state */}
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Processing...' : buttonText}
        </button>

        {/* Error message display */}
        {error && <p className="error-message">{error}</p>}
        
        {/* Optional social login options */}
        {showSocialLogin && <SocialLogin />}
        
        {/* Navigation link to other auth screens */}
        <p className="auth-link">
          {linkText} <Link to={linkTo.path}>{linkTo.label}</Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;