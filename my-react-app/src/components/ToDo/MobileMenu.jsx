// Mobile menu component for sorting and filtering controls on smaller screens
// Provides a collapsible overlay menu with touch-friendly buttons
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ICON_SIZES } from '../../constants';

const MobileMenu = ({ sortBy, onSortChange, activeStatus, onStatusChange }) => {
  // State for controlling menu open/close
  const [isOpen, setIsOpen] = useState(false);

  // Available status filter options
  const statuses = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ];

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle sort change and close menu
  const handleSortChange = (newSortBy) => {
    onSortChange(newSortBy);
    setIsOpen(false);
  };

  // Handle status change and close menu
  const handleStatusChange = (newStatus) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className='mobile-menu'>
      {/* Menu toggle button - shows hamburger or X icon */}
      <button className='mobile-menu-toggle' onClick={toggleMenu}>
        {isOpen ? (
          <X size={ICON_SIZES.XLARGE} />
        ) : (
          <Menu size={ICON_SIZES.XLARGE} />
        )}
      </button>

      {/* Overlay menu that appears when open */}
      {isOpen && (
        <div className='mobile-menu-overlay' onClick={toggleMenu}>
          <div
            className='mobile-menu-content'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sorting controls section */}
            <div className='mobile-menu-section'>
              <h3>Sort by:</h3>
              <div className='mobile-menu-buttons'>
                <button
                  className={sortBy === 'id' ? 'active' : ''}
                  onClick={() => handleSortChange('id')}
                >
                  Default
                </button>
                <button
                  className={sortBy === 'alpha' ? 'active' : ''}
                  onClick={() => handleSortChange('alpha')}
                >
                  Alphabetical
                </button>
              </div>
            </div>

            {/* Filtering controls section */}
            <div className='mobile-menu-section'>
              <h3>Filter by:</h3>
              <div className='mobile-menu-buttons'>
                {statuses.map((status) => (
                  <button
                    key={status.key}
                    className={activeStatus === status.key ? 'active' : ''}
                    onClick={() => handleStatusChange(status.key)}
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
