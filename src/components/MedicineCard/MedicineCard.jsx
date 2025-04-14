import css from './MedicineCard.module.css';

const MedicineCard = ({ medicine, onAddToCart, onDetails }) => {
  return (
    <li className={css.medicineCard}>
      <div className={css.imgWrapper}>
        <img
          src={medicine.photo || '/default-medicine.jpg'}
          alt={medicine.name}
          className={css.medicineImage}
        />
      </div>
      <div className={css.infoWrapper}>
        <div className={css.medicineNameBlock}>
          <h3 className={css.medicineName}>{medicine.name}</h3>
          <p className={css.medicineText}>{medicine.suppliers} (Fabrication)</p>
        </div>
        <p className={css.medicinePrice}>
          $
          {
            medicine.price
            //   .toFixed(2)
          }
        </p>
        {/* <div className={css.medicineActions}> */}
          <button onClick={onAddToCart} className={css.addButton}>
            Add to cart
          </button>
          <button onClick={onDetails} className={css.detailsButton}>
            Details
          </button>
        {/* </div> */}
      </div>
    </li>
  );
};

export default MedicineCard;
