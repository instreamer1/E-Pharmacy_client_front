import useResponsive from '../../services/useResponsive';
import css from './Pagination.module.css';
import iconSprite from '../../assets/sprite.svg';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { isMobile, isTablet } = useResponsive();

  const getVisiblePages = () => {
    const visiblePages = [];

    if (totalPages <= 2) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else if (isMobile) {
      if (currentPage === 1) {
        visiblePages.push(1, 2, '...');
      } else if (currentPage >= 2 && currentPage < totalPages - 1) {
        visiblePages.push(currentPage, currentPage + 1, '...');
      } else if (currentPage === totalPages) {
        visiblePages.push('...', currentPage - 1, totalPages);
      } else if (currentPage === totalPages - 1) {
        visiblePages.push('...', currentPage, currentPage + 1);
      } else if (currentPage < totalPages - 1) {
        visiblePages.push(currentPage - 1, currentPage, '...');
      }
    } 
    else {
      if (currentPage === 1) {
        visiblePages.push(1, 2, 3, '...');
      } else if (currentPage === 2) {
        visiblePages.push(1, currentPage, currentPage + 1, '...');
      } else if (currentPage === totalPages) {
        visiblePages.push(
          // 1,
          '...',
          currentPage - 2,
          currentPage - 1,
          totalPages
        );
      } 
      else if (currentPage < totalPages - 1) {
        visiblePages.push(
          // 1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...'
          ,
          // totalPages
        );
      } else if (currentPage === totalPages - 1) {
        visiblePages.push(
          // 1,
          '...',
          currentPage - 1,
          currentPage,
          // '...',
          totalPages
        );
      }
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={css.pagination}>
      <div className={css.buttonWrap}>
        <button
          className={css.pageButton}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}>
          <svg className={css.icon}>
            <use href={`${iconSprite}#arrowLeft`}></use>
          </svg>
          <svg className={css.icon}>
            <use href={`${iconSprite}#arrowLeft`}></use>
          </svg>
        </button>
        <button
          className={css.pageButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          <svg className={css.icon}>
            <use href={`${iconSprite}#arrowLeft`}></use>
          </svg>
        </button>
      </div>
      <div className={css.buttonWrap}>
        {visiblePages.map((page, index) =>
          page === '...' ? (
            <span key={index} className={css.dots}>
              ...
            </span>
          ) : (
            <button
              key={index}
              className={`${css.pageButton} ${
                page === currentPage ? css.active : ''
              }`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === currentPage || page === '...'}>
              {page}
            </button>
          )
        )}
      </div>
      <div className={css.buttonWrap}>
        <button
          className={css.pageButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          <svg className={css.icon}>
            <use href={`${iconSprite}#arrowRight`}></use>
          </svg>
        </button>

      
        <button
          className={css.pageButton}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}>
          <svg className={css.icon}>
            <use href={`${iconSprite}#arrowRight`}></use>
          </svg>
          <svg className={css.icon}>
            <use href={`${iconSprite}#arrowRight`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
