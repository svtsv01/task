// Pagination component for navigating through todo pages
// Provides previous/next buttons and current page indicator
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ICON_SIZES } from '../../constants';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Navigate to the previous page if not on the first page
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Navigate to the next page if not on the last page
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='pagination-controls'>
      {/* Previous page button - disabled on first page */}
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        <ArrowLeft size={ICON_SIZES.MEDIUM} />
        Previous
      </button>
      {/* Current page indicator */}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {/* Next page button - disabled on last page */}
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
        <ArrowRight size={ICON_SIZES.MEDIUM} />
      </button>
    </div>
  );
};

export default Pagination;
