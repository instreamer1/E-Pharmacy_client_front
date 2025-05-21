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
// import { getQueryParams } from '../../utils/getQueryParams';

const MedicinePage = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });
  const [searchParams, setSearchParams] = useSearchParams();

  const products = useSelector(selectProducts);
  const totalPages = useSelector(selectTotalPages);
  // const page = useSelector(selectPage);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const categories = useSelector(selectCategories);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const lastQuery = useSelector(selectLastQuery);

  const navigate = useNavigate();
  const limit = isDesktop ? 12 : 9;

  const getQueryParams = (searchParams, limit) => {
    const params = Object.fromEntries(searchParams);
    return {
      category: params.category || '',
      search: params.search || '',
      page: Number(params.page) || 1,
      limit,
    };
  };

    // ✅ Синхронизация URL → Redux
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const restoredQuery = {
      category: params.category || '',
      search: params.search || '',
      page: Number(params.page) || 1,
      limit,
    };
    dispatch(setLastQuery(restoredQuery));
  }, []); 

  // useForm
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

   const applyFilters = filters => {
    const query = {
      ...filters,
      page: 1,
      limit,
    };
    dispatch(setLastQuery(query));
    setSearchParams({ ...filters, page: '1' });
  };

  const handleFilter = () => {
    if (!isAnyFilterSelected) return;
    applyFilters(formValues);
  };

  const handleResetFilters = () => {
    reset({ category: '', search: '' });
    applyFilters({});
  };

   const handlePageChange = newPage => {
    const query = {
      ...lastQuery,
      page: newPage,
    };
    dispatch(setLastQuery(query));
    setSearchParams({
      category: query.category,
      search: query.search,
      page: String(newPage),
    });
  };

  



// загрузка продуктов при изменении searchParams
  useEffect(() => {
    dispatch(getProducts(lastQuery));
  }, [dispatch, lastQuery]);
  /////////////////////////////////////////

  const handleAddToCart = medicine => {
    if (!isLoggedIn) {
      dispatch(setOpenRegisterModal());
      return;
    }
    //
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

        {products.length > 0 ? (
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
                currentPage={Number(searchParams.get('page')) || 1}
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

