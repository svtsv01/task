import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ICON_SIZES } from '../../constants';

const MobileMenu = ({ sortBy, onSortChange, activeStatus, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const statuses = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSortChange = (newSortBy) => {
    onSortChange(newSortBy);
    setIsOpen(false);
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  return (
    <div className='mobile-menu'>
      <button className='mobile-menu-toggle' onClick={toggleMenu}>
        {isOpen ? (
          <X size={ICON_SIZES.XLARGE} />
        ) : (
          <Menu size={ICON_SIZES.XLARGE} />
        )}
      </button>

      {isOpen && (
        <div className='mobile-menu-overlay' onClick={toggleMenu}>
          <div
            className='mobile-menu-content'
            onClick={(e) => e.stopPropagation()}
          >
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
