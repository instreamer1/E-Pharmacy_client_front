import { useEffect, useState } from 'react';
import axios from 'axios';
import css from './MedicineStorePage.module.css';

const MedicineStorePage = () => {
  //   const [stores, setStores] = useState([]);
  const stores = [
    {
      name: 'Pharmacy Hope',
      address: 'Shevchenka St, 100',
      city: 'Lviv',
      phone: '0322-45-67-89',
      rating: 4,
    },
    {
      name: 'Pharmakor',
      address: 'Hoholia St, 24',
      city: 'Kharkiv',
      phone: '0572-58-22-12',
      rating: 3,
    },
    {
      name: 'Aesculap',
      address: 'Peace Ave, 5',
      city: 'Dnipro',
      phone: '056-744-55-66',
      rating: 5,
    },
    {
      name: 'Balsam',
      address: 'Soborna St, 14',
      city: 'Rivne',
      phone: '0362-62-33-44',
      rating: 3,
    },
    {
      name: 'Med-Service',
      address: 'Lesi Ukrainki St, 78',
      city: 'Zaporizhzhia',
      phone: '0612-34-56-78',
      rating: 4,
    },
    {
      name: 'Pharmacy',
      address: 'Freedom Ave, 120',
      city: 'Ternopil',
      phone: '0352-52-43-21',
      rating: 3,
    },
  ];
  //   useEffect(() => {
  //     // Запрос к API для получения списка магазинов
  //     axios.get('/api/stores')
  //       .then(response => {
  //         setStores(response.data);
  //       })
  //       .catch(error => {
  //         console.error('There was an error fetching the stores!', error);
  //       });
  //   }, []);

  return (
    <section className={css.medicineStorePage}>
      <div className={css.container}>
        <h1 className={css.title}>Medicine Store</h1>
        <ul className={css.storeList}>
          {stores.map(store => (
            <li key={store.name} className={css.storeCard}>
              <h2 className={css.storeName}>{store.name}</h2>
              <p className={css.storeAddress}>{store.address}</p>
              <p className={css.storeAddress}>{store.city}</p>
              <p className={css.storePhone}>{store.phone}</p>
              <div className={css.storeStatus}>
                <span
                  className={store.status === 'OPEN' ? css.open : css.close}>
                  {store.status}
                </span>
                <span className={css.rating}>{'★'.repeat(store.rating)}</span>
              </div>
              <button
                className={css.visitButton}
                onClick={() => (window.location.href = store.url)}>
                Visit Store
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MedicineStorePage;
