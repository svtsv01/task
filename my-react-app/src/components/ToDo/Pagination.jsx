import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ICON_SIZES } from '../../constants';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='pagination-controls'>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        <ArrowLeft size={ICON_SIZES.MEDIUM} />
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
        <ArrowRight size={ICON_SIZES.MEDIUM} />
      </button>
    </div>
  );
};

export default Pagination;
