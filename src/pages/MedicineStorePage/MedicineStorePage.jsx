import css from './MedicineStorePage.module.css';
import iconSprite from '../../assets/sprite.svg';

const MedicineStorePage = () => {
  //   const [stores, setStores] = useState([]);
  const stores = [
    {
      name: 'Pharmacy Hope',
      address: 'Shevchenka St, 100',
      city: 'Lviv',
      phone: '0322-45-67-89',
      rating: 4,
      status: 'OPEN',
    },
    {
      name: 'Pharmakor',
      address: 'Hoholia St, 24',
      city: 'Kharkiv',
      phone: '0572-58-22-12',
      rating: 3,
      status: 'Close',
    },
    {
      name: 'Aesculap',
      address: 'Peace Ave, 5',
      city: 'Dnipro',
      phone: '056-744-55-66',
      rating: 5,
      status: 'Close',
    },
    {
      name: 'Balsam',
      address: 'Soborna St, 14',
      city: 'Rivne',
      phone: '0362-62-33-44',
      rating: 3,
      status: 'OPEN',
    },
    {
      name: 'Med-Service',
      address: 'Lesi Ukrainki St, 78',
      city: 'Zaporizhzhia',
      phone: '0612-34-56-78',
      rating: 4,
      status: 'OPEN',
    },
    {
      name: 'Pharmacy',
      address: 'Freedom Ave, 120',
      city: 'Ternopil',
      phone: '0352-52-43-21',
      rating: 3,
      status: 'OPEN',
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
                  onClick={() => (window.location.href = store.url)}>
                  Visit Store
                </button>
                <svg className={css.starIcon}>
                  <use href={`${iconSprite}#icon-star`}></use>
                </svg>
                <p className={css.rating}>{store.rating}</p>
                <div
                  className={`${css.storeStatus} ${
                    store.status === 'OPEN' ? css.openStore : css.closeStore
                  }`}>
                  <p
                    className={store.status === 'OPEN' ? css.open : css.close}>
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
    </section>
  );
};

export default MedicineStorePage;
