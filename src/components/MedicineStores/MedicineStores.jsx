import css from './MedicineStores.module.css';
import iconSprite from '../../assets/sprite.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNearestStores } from '../../redux/storesSlice/operations';
import {
  selectNearestStores,
  selectStoresError,
  selectStoresLoading,
} from '../../redux/storesSlice/selectors';
import { setGeoDenied } from '../../redux/storesSlice/slice';

const MedicineStores = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nearestStores = useSelector(selectNearestStores);
  const storesIsLoading = useSelector(selectStoresLoading);
  const storesError = useSelector(selectStoresError);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('Геолокация не поддерживается');
      dispatch(getNearestStores());
      dispatch(setGeoDenied(true));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        dispatch(getNearestStores({ lat: latitude, lng: longitude }));
      },
      error => {
        console.warn('Геолокация недоступна: ', error.message);
        dispatch(getNearestStores());
        if (error.code === error.PERMISSION_DENIED) {
          dispatch(setGeoDenied(true));
        }
      },
      {
        timeout: 5000,
      }
    );
  }, [dispatch]);


  return (
    <div className={css.medicineStores}>
      <div className={css.titleWrapper}>
        <h1 className={css.title}>Your Nearest Medicine Store</h1>
        <p className={css.description}>
          Search for Medicine, Filter by your location
        </p>
      </div>

      <ul className={css.storeList}>
        {!storesIsLoading &&
          nearestStores.map(store => (
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
          ))}
      </ul>
    </div>
  );
};

export default MedicineStores;
