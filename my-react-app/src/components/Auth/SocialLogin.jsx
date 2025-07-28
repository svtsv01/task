// Social login component for alternative authentication methods
// Displays social media login options (currently visual only)
import { Chrome, Facebook, Github } from 'lucide-react';
import { ICON_SIZES } from '../../constants';

// Individual social login button component
const SocialButton = ({ Icon }) => (
  <div className='social-icon'>
    <Icon size={ICON_SIZES.LARGE} />
  </div>
);

const SocialLogin = () => {
  return (
    <>
      {/* Divider text between regular and social login */}
      <div className='or-divider'>or</div>
      {/* Container for social login buttons */}
      <div className='social-login-container'>
        <SocialButton Icon={Chrome} />
        <SocialButton Icon={Facebook} />
        <SocialButton Icon={Github} />
      </div>
    </>
  );
};

export default SocialLogin;
