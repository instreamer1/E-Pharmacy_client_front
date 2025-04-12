import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { searchMedicines } from '../redux/medicineSlice';
// import { addToCart } from '../redux/cartSlice';
// import AuthModal from '../components/AuthModal';
import Pagination from '../../components/Pagination/Pagination';

import css from './MedicinePage.module.css';
import MedicineCard from '../../MedicineCard/MedicineCard';

const medicines = [
  {
    id: '0',
    photo: 'https://i.ibb.co/bLKP624/5-15-1000x1000-min.jpg',
    name: 'Aspirin',
    suppliers: 'Square',
    stock: '12',
    price: '89.66',
    category: 'Medicine',
  },
  {
    id: '1',
    photo: 'https://i.ibb.co/Hg0zZkQ/shop-4-7-1000x1000-min.jpg',
    name: 'Paracetamol',
    suppliers: 'Acme',
    stock: '19',
    price: '34.16',
    category: 'Heart',
  },
  {
    id: '2',
    photo: 'https://i.ibb.co/02WmJdc/5-19-1000x1000-min.jpg',
    name: 'Ibuprofen',
    suppliers: 'Beximco',
    stock: '09',
    price: '53.76',
    category: 'Head',
  },
  {
    id: '3',
    photo: 'https://i.ibb.co/GxTVSVk/shop-4-9-1000x1000-min.jpg',
    name: 'Acetaminophen',
    suppliers: 'ACI',
    stock: '14',
    price: '28.57',
    category: 'Hand',
  },
  {
    id: '4',
    photo: 'https://i.ibb.co/X330FTj/shop-4-10-1000x1000-min.jpg',
    name: 'Naproxen',
    suppliers: 'Uniliver',
    stock: '10',
    price: '56.34',
    category: 'Leg',
  },
  {
    id: '5',
    photo: 'https://i.ibb.co/bLKP624/5-15-1000x1000-min.jpg',
    name: 'Amoxicillin',
    suppliers: 'Square',
    stock: '25',
    price: '45.99',
    category: 'Medicine',
  },
  {
    id: '6',
    photo: 'https://i.ibb.co/Hg0zZkQ/shop-4-7-1000x1000-min.jpg',
    name: 'Lisinopril',
    suppliers: 'Acme',
    stock: '17',
    price: '29.88',
    category: 'Heart',
  },
  {
    id: '7',
    photo: 'https://i.ibb.co/02WmJdc/5-19-1000x1000-min.jpg',
    name: 'Ciprofloxacin',
    suppliers: 'Beximco',
    stock: '11',
    price: '38.45',
    category: 'Head',
  },
  {
    id: '8',
    photo: 'https://i.ibb.co/GxTVSVk/shop-4-9-1000x1000-min.jpg',
    name: 'Hydrochlorothiazide',
    suppliers: 'ACI',
    stock: '22',
    price: '24.76',
    category: 'Hand',
  },
  {
    id: '9',
    photo: 'https://i.ibb.co/X330FTj/shop-4-10-1000x1000-min.jpg',
    name: 'Prednisone',
    suppliers: 'Uniliver',
    stock: '15',
    price: '48.99',
    category: 'Leg',
  },
  {
    id: '10',
    photo: 'https://i.ibb.co/bLKP624/5-15-1000x1000-min.jpg',
    name: 'Propranolol',
    suppliers: 'Square',
    stock: '18',
    price: '35.66',
    category: 'Medicine',
  },
];

const MedicinePage = () => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const totalPages = 3;
  //   const { isAuthenticated } = useSelector(state => state.auth);
  //   const { medicines, totalPages, loading, error } = useSelector(state => state.medicines);

  //   const [searchParams, setSearchParams] = useState({
  //     category: '',
  //     searchTerm: '',
  //     page: 1,
  //     limit: 12
  //   });
  //   const [showAuthModal, setShowAuthModal] = useState(false);

  //   useEffect(() => {
  //     dispatch(searchMedicines(searchParams));
  //   }, [searchParams, dispatch]);

  //   const handleFilterChange = (e) => {
  //     const { name, value } = e.target;
  //     setSearchParams(prev => ({ ...prev, [name]: value, page: 1 }));
  //   };

    // const handlePageChange = (page) => {
    //   setSearchParams(prev => ({ ...prev, page }));
    // };

  //   const handleAddToCart = (medicine) => {
  //     if (!isAuthenticated) {
  //       setShowAuthModal(true);
  //       return;
  //     }
  //     dispatch(addToCart(medicine));
  //   };

  //   const handleDetails = (id) => {
  //     navigate(`/medicine/${id}`);
  //   };

  const categories = [
    'All',
    'Antibiotics',
    'Painkillers',
    'Vitamins',
    'Antihistamines',
    'Other',
  ];

  return (
    <section className={css.medicinePage}>
      <div className={css.container}>
        <h1 className='page-title'>Medicine</h1>

        <div className={css.searchPane}>
          <select
            name='category'
            //   value={searchParams.category}
            //   onChange={handleFilterChange}
            className={css.categorySelect}>
            <option value=''>Product category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type='text'
            name='searchTerm'
            placeholder='Search medicine'
            //   value={searchParams.searchTerm}
            //   onChange={handleFilterChange}
            className={css.searchInput}
          />

          <button className={css.filterButton}>Filter</button>
        </div>

        {/* {loading && <div className={css.loading}>Loading...</div>} */}

        {/* {error && <div className={css.error}>{error}</div>} */}

        {/* {!loading && !error && medicines.length === 0 && (
        <div className={css.noResults}>Nothing was found for your request</div>
      )} */}

        <ul className={css.medicineList}>
          {medicines.map(medicine => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              // onAddToCart={() => handleAddToCart(medicine)}
              // onDetails={() => handleDetails(medicine.id)}
            />
          ))}
        </ul>

        {totalPages > 1 && (
          <Pagination
            //   currentPage={searchParams.page}
            totalPages={totalPages}
            //   onPageChange={handlePageChange}
          />
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
