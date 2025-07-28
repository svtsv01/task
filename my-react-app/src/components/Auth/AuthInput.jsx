import React from 'react';
import { ICON_SIZES } from '../../constants';

const AuthInput = ({ Icon, ToggleIcon, onToggleVisibility, ...props }) => {
  return (
    <div className='input-group'>
      {Icon && <Icon className='input-icon' size={ICON_SIZES.LARGE} />}
      <input className='auth-input' {...props} />
      
      {ToggleIcon && (
        <button 
          type="button" 
          onClick={onToggleVisibility} 
          className="toggle-visibility-button"
        >
          <ToggleIcon size={ICON_SIZES.LARGE} />
        </button>
      )}
    </div>
  );
};

export default AuthInput;