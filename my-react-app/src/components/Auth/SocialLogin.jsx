import { Chrome, Facebook, Github } from 'lucide-react';
import { ICON_SIZES } from '../../constants';

const SocialButton = ({ Icon }) => (
  <div className='social-icon'>
    <Icon size={ICON_SIZES.LARGE} />
  </div>
);

const SocialLogin = () => {
  return (
    <>
      <div className='or-divider'>or</div>
      <div className='social-login-container'>
        <SocialButton Icon={Chrome} />
        <SocialButton Icon={Facebook} />
        <SocialButton Icon={Github} />
      </div>
    </>
  );
};

export default SocialLogin;
