import React from 'react';
import { ICON_SIZES } from '../../constants';

const AuthInput = ({ Icon, ...props }) => {
  return (
    <div className='input-group'>
      {Icon && <Icon className='input-icon' size={ICON_SIZES.LARGE} />}
      <input className='auth-input' {...props} />
    </div>
  );
};

export default AuthInput;
