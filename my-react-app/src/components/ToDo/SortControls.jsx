// Controls component for sorting and filtering todo items
// Provides desktop interface for organizing and viewing todos
import React from 'react';

const SortControls = ({
  sortBy,
  onSortChange,
  activeStatus,
  onStatusChange,
}) => {
  // Available status filter options
  const statuses = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className='sort-controls desktop-only'>
      {/* Sorting controls section */}
      <div className='sort-section'>
        <span>Sort by:</span>
        {/* Default sort by ID button */}
        <button
          className={sortBy === 'id' ? 'active' : ''}
          onClick={() => onSortChange('id')}
        >
          Default
        </button>
        {/* Alphabetical sort button */}
        <button
          className={sortBy === 'alpha' ? 'active' : ''}
          onClick={() => onSortChange('alpha')}
        >
          Alphabetical
        </button>
      </div>

      {/* Filtering controls section */}
      <div className='filter-section'>
        <span>Filter by:</span>
        {/* Status filter buttons */}
        {statuses.map((status) => (
          <button
            key={status.key}
            className={activeStatus === status.key ? 'active' : ''}
            onClick={() => onStatusChange(status.key)}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortControls;
