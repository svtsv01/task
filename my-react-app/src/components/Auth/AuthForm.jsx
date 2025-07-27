import { Link } from 'react-router-dom';
// import logo from '../../../public/assets/logo.png';
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
        <img src="/assets/logo.png" alt="Logo" className="auth-logo"/>
        <h1 className="auth-title">{title}</h1>
        
        {children}
        
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Processing...' : buttonText}
        </button>

        {error && <p className="error-message">{error}</p>}
        
        {showSocialLogin && <SocialLogin />}
        
        <p className="auth-link">
          {linkText} <Link to={linkTo.path}>{linkTo.label}</Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;