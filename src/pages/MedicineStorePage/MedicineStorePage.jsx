import css from './MedicineStorePage.module.css';
import iconSprite from '../../assets/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getStores } from '../../redux/storesSlice/operations';
import Pagination from '../../components/Pagination/Pagination';
import {
  selectLimit,
  selectStores,
  selectStoresError,
  selectStoresLoading,
  selectStoresPage,
  selectStoresTotalPages,
} from '../../redux/storesSlice/selectors';
import { setStorePage } from '../../redux/storesSlice/slice';
import { useSearchParams } from 'react-router-dom';
import { isStoreOpen } from '../../utils/isStoreOpen';

const MedicineStorePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const stores = useSelector(selectStores);
  const totalPages = useSelector(selectStoresTotalPages);
  const page = useSelector(selectStoresPage);
  const isLoading = useSelector(selectStoresLoading);
  const error = useSelector(selectStoresError);
  const limit = useSelector(selectLimit);
  

  useEffect(() => {
    const urlPage = Number(searchParams.get('page')) || 1;

    if (page !== urlPage) {
      dispatch(setStorePage(urlPage));
    }

    dispatch(getStores({ page: urlPage, limit }));
  }, [dispatch, searchParams, limit]);

  const handlePageChange = newPage => {
    setSearchParams({ page: newPage, limit }); 
    dispatch(setStorePage(newPage)); 
  };



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <section className={css.medicineStorePage}>
      <div className={css.container}>
        <h1 className={css.title}>Medicine Store</h1>
        <ul className={css.storeList}>
          {stores &&
            stores.map(store => {
              const open = isStoreOpen();
              return (
                <li key={store._id} className={css.storeCard}>
                  <div className={css.blockOne}>
                    <h2 className={css.storeName}>{store.name}</h2>
                    <div className={css.addrWrapper}>
                      <svg className={css.addrIcon}>
                        <use href={`${iconSprite}#icon-map-pin`}></use>
                      </svg>
                      <div className={css.locationWrapper}>
                        <p className={css.storeAddress}>{store.address}</p>
                        <p className={css.storeCity}>{store.city}</p>
                      </div>
                    </div>
                    <div className={css.phoneWrapper}>
                      <svg className={css.addrIcon}>
                        <use href={`${iconSprite}#icon-phone`}></use>
                      </svg>
                      <p className={css.storePhone}>{store.phone}</p>
                    </div>
                  </div>
                  <div className={css.blockTwo}>
                    <button
                      className={css.visitButton}
                      onClick={() => window.open(store.url, '_blank')}>
                      Visit Store
                    </button>
                    <svg className={css.starIcon}>
                      <use href={`${iconSprite}#icon-star`}></use>
                    </svg>
                    <p className={css.rating}>{store.rating}</p>
                    <div
                      className={`${css.storeStatus} ${
                        store.isOpenNow ? css.openStore : css.closeStore
                      }`}>
                      <p className={store.isOpenNow ? css.open : css.close}>
                        {store.isOpenNow ? 'OPEN' : 'CLOSED'}
                      </p>
                    </div>
                  </div>
                  <div className={css.linesContainer}>
                    <div className={css.line}></div>
                    <div className={css.line}></div>
                    <div className={css.line}></div>
                  </div>
                </li>
              );
            })}
        </ul>
        <>
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      </div>
    </section>
  );
};

export default MedicineStorePage;
