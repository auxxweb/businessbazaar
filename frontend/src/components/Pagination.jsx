/* eslint-disable react/prop-types */
import { useState } from 'react'
import '../css/pagination.css' // Import the CSS file

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [activePage, setActivePage] = useState(currentPage || 1)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page)
      onPageChange(page)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const startPage = Math.max(activePage - 2, 1)
    const endPage = Math.min(startPage + 4, totalPages)
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-button ${activePage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  return (
    <div className="pagination-container">
      {/* Previous Button */}
      <button
        className={`pagination-arrow ${
          activePage === 1 ? 'disabled' : ''
        }`}
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="arrow-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Page Numbers */}
      {renderPageNumbers()}

      {/* Next Button */}
      <button
        className={`pagination-arrow ${
          activePage === totalPages ? 'disabled' : ''
        }`}
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="arrow-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
