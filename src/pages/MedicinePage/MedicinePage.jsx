import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../../components/Pagination/Pagination';
import css from './MedicinePage.module.css';
import MedicineCard from '../../components/MedicineCard/MedicineCard';
import SearchFilterPanel from '../../components/SearchFilterPanel/SearchFilterPanel';
import {
  selectPage,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  selectTotalPages,
  selectCategories,
  selectLastQuery,
} from '../../redux/productsSlice/selectors';
import {
  getProducts,
  getCategories,
} from '../../redux/productsSlice/operations';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from '../../redux/authSlice/selectors';
import { setLastQuery, setPage } from '../../redux/productsSlice/slice';
import { setOpenRegisterModal } from '../../redux/authSlice/slice';
import { getUser } from '../../redux/authSlice/operations';
import { useMediaQuery } from 'react-responsive';

const MedicinePage = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [searchParams, setSearchParams] = useSearchParams();

  const products = useSelector(selectProducts);
  const totalPages = useSelector(selectTotalPages);
  const page = useSelector(selectPage);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const categories = useSelector(selectCategories);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const lastQuery = useSelector(selectLastQuery);

  const navigate = useNavigate();
  let limit = isDesktop ? 12 : 9;

  // useForm + Filters

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
    },
    mode: 'onChange',
  });

  const formValues = watch();

  const isAnyFilterSelected =
    formValues.category !== '' || formValues.search !== '';

  const applyFilters = (filters = {}) => {
    setSearchParams(filters);
    dispatch(setPage(1));
  };

  const handleFilter = () => {
    if (!isAnyFilterSelected) {
      return;
    }
    const params = {
      category: formValues.category,
      search: formValues.search,
      page: 1,
    };
    applyFilters(params);
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    const currentQuery = { ...params, page, limit };
    const queriesAreEqual =
      JSON.stringify(currentQuery) === JSON.stringify(lastQuery);

    if (!queriesAreEqual) {
      dispatch(getProducts(currentQuery));
      dispatch(setLastQuery(currentQuery));
    }
  }, [dispatch, searchParams, page, limit, lastQuery]);

  const handleResetFilters = () => {
    reset({ category: '', search: '' });
    setSearchParams({});
    applyFilters();
  };

  const handlePageChange = newPage => {
    const currentParams = Object.fromEntries(searchParams);
    setSearchParams({ ...currentParams, page: newPage });
    dispatch(setPage(newPage));

    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = medicine => {
    if (!isLoggedIn) {
      dispatch(setOpenRegisterModal());
      return;
    }
  };

  const handleDetails = id => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (isLoggedIn && !isRefreshing) {
      dispatch(getUser());
    }
  }, [dispatch, isLoggedIn, isRefreshing]);

  if (isLoading) return <p>Loading ...</p>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className={css.medicinePage}>
      <div className={css.container}>
        <h1 className={css.pageTitle}>Medicine</h1>

        <div className={css.searchPanel}>
          <SearchFilterPanel
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={handleFilter}
            onReset={handleResetFilters}
            isSubmitting={isSubmitting}
            isValid={isValid}
            categories={categories}
            isAnyFilterSelected={isAnyFilterSelected}
          />
        </div>

        {products && products.length > 0 ? (
          <>
            <ul className={css.medicineList}>
              {products.map(product => (
                <MedicineCard
                  key={product._id}
                  medicine={product}
                  onAddToCart={() => handleAddToCart(product._id)}
                  onDetails={() => handleDetails(product._id)}
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
      </div>
    </section>
  );
};

export default MedicinePage;
