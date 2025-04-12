import css from './Pagination.module.css'



const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={css.pagination}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${css.pageButton} ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;