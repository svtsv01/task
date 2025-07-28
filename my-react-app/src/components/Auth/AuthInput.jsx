// Reusable input component for authentication forms
// Supports icons, password visibility toggle, and consistent styling
import React from 'react';
import { ICON_SIZES } from '../../constants';

const AuthInput = ({ Icon, ToggleIcon, onToggleVisibility, ...props }) => {
  return (
    <div className='input-group'>
      {/* Optional leading icon (e.g., mail, lock, user icons) */}
      {Icon && <Icon className='input-icon' size={ICON_SIZES.LARGE} />}
      {/* Main input field with all passed props */}
      <input className='auth-input' {...props} />
      
      {/* Optional password visibility toggle button */}
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