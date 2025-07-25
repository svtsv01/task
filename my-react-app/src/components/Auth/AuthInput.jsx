import React from 'react';

const AuthInput = ({ Icon, ...props }) => {
  return (
    <div className="input-group">
      {Icon && <Icon className="input-icon" size={20} />}
      <input className="auth-input" {...props} />
    </div>
  );
};

export default AuthInput;