import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { searchMedicines } from '../redux/medicineSlice';
// import { addToCart } from '../redux/cartSlice';
// import AuthModal from '../components/AuthModal';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import css from './MedicinePage.module.css';
import MedicineCard from '../../components/MedicineCard/MedicineCard';
import {
  selectLimit,
  selectPage,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  selectTotalPages,
} from '../../redux/productsSlice/selectors';
import { getProducts } from '../../redux/productsSlice/operations';
import { SearchFilterPanel } from '../../components/SearchFilterPanel/SearchFilterPanel';
import { selectIsLoggedIn } from '../../redux/authSlice/selectors';
import { setPage } from '../../redux/productsSlice/slice';

const MedicinePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();


  const products = useSelector(selectProducts);
  const totalPages = useSelector(selectTotalPages);
  const page = useSelector(selectPage);
  const limit = useSelector(selectLimit);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

    const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const params = {
      category: searchParams.get('category') || 'All',
      search: searchParams.get('search') || '',
      page: Number(searchParams.get('page')) || 1,
      limit,
    };

    dispatch(getProducts(params));
  }, [searchParams, limit, dispatch]);

  const handlePageChange = newPage => {
    const currentParams = Object.fromEntries(searchParams);
    setSearchParams({ ...currentParams, page: newPage });
    dispatch(setPage(newPage));

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  //   const handleAddToCart = (medicine) => {
  //     if (!isAuthenticated) {
  //       setShowAuthModal(true);
  //       return;
  //     }
  //     dispatch(addToCart(medicine));
  //   };

    const handleDetails = (id) => {
      navigate(`/product/${id}`);
    };

  // if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className={css.medicinePage}>
      <div className={css.container}>
        <h1 className={css.pageTitle}>Medicine</h1>

        <div className={css.searchPanel}>
          <SearchFilterPanel />
        </div>

        {products.length > 0 ? (
          <>
            <ul className={css.medicineList}>
              {products.map(medicine => (
                <MedicineCard
                  key={medicine._id}
                  medicine={medicine}
                  // onAddToCart={() => handleAddToCart(medicine)}
                  onDetails={() => handleDetails(medicine._id)}
                />
              ))}
            </ul>

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <p className={css.noProducts}>No products found</p>
        )}

        {/* <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={() => setShowAuthModal(false)}
      /> */}
      </div>
    </section>
  );
};

export default MedicinePage;
