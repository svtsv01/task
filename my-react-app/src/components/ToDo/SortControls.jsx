import React from 'react';

const SortControls = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-controls">
      <span>Sort by:</span>
      <button
        className={sortBy === 'id' ? 'active' : ''}
        onClick={() => onSortChange('id')}
      >
        Default
      </button>
      <button
        className={sortBy === 'alpha' ? 'active' : ''}
        onClick={() => onSortChange('alpha')}
      >
        Alphabetical
      </button>
    </div>
  );
};

export default SortControls;