import React from 'react';

const SortControls = ({
  sortBy,
  onSortChange,
  activeStatus,
  onStatusChange,
}) => {
  const statuses = [
    { key: 'all', label: 'All Tasks' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className='sort-controls desktop-only'>
      <div className='sort-section'>
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

      <div className='filter-section'>
        <span>Filter by:</span>
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
