import React from "react";
import "./pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const maxButtons = 10;
        const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {getPageNumbers().map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={currentPage === pageNumber ? "active" : ""}
                >
                    {pageNumber}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
