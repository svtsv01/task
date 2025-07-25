import { Chrome, Facebook, Github} from 'lucide-react'; 


const SocialButton = ({ Icon }) => (
  <div className="social-icon">
    <Icon size={24} />
  </div>
);

const SocialLogin = () => {
  return (
    <>
      <div className="or-divider">or</div>
      <div className="social-login-container">
        <SocialButton Icon={Chrome} />
        <SocialButton Icon={Facebook} />
        <SocialButton Icon={Github} />
      </div>
    </>
  );
};

export default SocialLogin;