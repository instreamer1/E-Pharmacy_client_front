import css from './MedicineStores.module.css';
import iconSprite from '../../assets/sprite.svg';
import { useNavigate } from 'react-router-dom';

const MedicineStores = () => {
  const navigate = useNavigate();

  // Пример данных (в реальном приложении данные будут получены через API)
  const stores = [
    {
      id: 1,
      name: 'Huge Sale',
      address: 'Albenia G83, Seoul',
      phone: '717-24-2429',
      status: 'OPEN',
      rating: 5,
    },
    {
      id: 2,
      name: 'Baumbach LLC',
      address: 'Pretoria F11, Houxiang',
      phone: '132-90-3868',
      status: 'OPEN',
    },
    {
      id: 3,
      name: 'Tremblay and...',
      address: 'Kretoria F45, Castierea',
      phone: '595-08-2102',
      status: 'OPEN',
      rating: 3,
    },
    {
      id: 4,
      name: 'Howell Group',
      address: 'Porto 4785-103, Abelheira',
      phone: '279-16-6959',
      status: 'CLOSE',
      rating: 3
    },
    {
      id: 5,
      name: 'Fahey-Batz',
      address: 'Kretoria 11007, Champerico',
      phone: '506-84-9725',
      status: 'CLOSE',
      rating: 3
    },
    {
      id: 6,
      name: 'Williamson-G...',
      address: 'Albaira 6233, Arrufo',
      phone: '792-44-1782',
      status: 'OPEN',
    },
  ];

  return (
    <div className={css.medicineStores}>
      <div className={css.titleWrapper}>
        <h1 className={css.title}>Your Nearest Medicine Store</h1>
        <p className={css.description}>
          Search for Medicine, Filter by your location
        </p>
      </div>

      <ul className={css.storeList}>
        {stores.map(store => (
          <li key={store.id} className={css.storeCard}>
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
                  store.status === 'OPEN' ? css.openStore : css.closeStore
                }`}>
                <p className={store.status === 'OPEN' ? css.open : css.close}>
                  {store.status}
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
