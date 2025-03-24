import css from './AddPharmacyPromo.module.css';
import { useNavigate } from 'react-router-dom';
import iconSprite from '../../assets/sprite.svg';

const AddPharmacyPromo = () => {
  const navigate = useNavigate();

  // Обработчик клика по кнопке
  const handleBuyMedicineClick = () => {
    navigate('/medicine-store'); // Перенаправление на страницу MedicineStorePage
  };

  return (
    <>
      <div className={css.addPharmacyPromo}>
        {/* Заголовок и описание */}
        <div className={css.content}>
          <h1 className={css.title}>Add your local pharmacy online now</h1>
          <p className={css.description}>
            Enjoy the convenience of having your prescriptions filled from home
            by connecting with your community pharmacy through our online
            platform.
          </p>

          {/* Кнопка */}
          <button className={css.button} onClick={handleBuyMedicineClick}>
            Buy medicine
          </button>
        </div>
      </div>

      {/* Список возможностей */}
      <div className={css.features}>
        <div className={css.featureItem}>
          <svg className={css.featureIcon}>
            <use href={`${iconSprite}#custom-icon`}></use>
          </svg>
          <p className={css.featureText}>Take user orders form online</p>
        </div>
        <div className={css.featureItem}>
          <svg className={css.featureIcon}>
            <use href={`${iconSprite}#custom-icon`}></use>
          </svg>
          <p className={css.featureText}>Create your shop profile</p>
        </div>
        <div className={css.featureItem}>
          <svg className={css.featureIcon}>
            <use href={`${iconSprite}#custom-icon`}></use>
          </svg>
          <p className={css.featureText}>Manage your store</p>
        </div>
        <div className={css.featureItem}>
          <svg className={css.featureIcon}>
            <use href={`${iconSprite}#custom-icon`}></use>
          </svg>
          <p className={css.featureText}>Get more orders</p>
        </div>
        <div className={css.featureItem}>
          <svg className={css.featureIcon}>
            <use href={`${iconSprite}#custom-icon`}></use>
          </svg>

          <p className={css.featureText}>Storage shed</p>
        </div>
      </div>
    </>
  );
};

export default AddPharmacyPromo;
