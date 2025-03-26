import css from './AddPharmacyPromo.module.css';
import { useNavigate } from 'react-router-dom';
import iconSprite from '../../assets/sprite.svg';
import imageMobile from '../../assets/images/Image_home.png';
import imageMobile1x from '../../assets/images/Image_home_mobile_1x.webp';
import imageMobile2x from '../../assets/images/Image_home_mobile_2x.webp';
import imageTablet1x from '../../assets/images/Image_home_tablet_1x.webp';
import imageTablet2x from '../../assets/images/Image_home_tablet_2x.webp';
import imageDesktop1x from '../../assets/images/Image_home_tablet_1x.webp';
import imageDesktop2x from '../../assets/images/Image_home_tablet_2x.webp';

const AddPharmacyPromo = () => {
  const navigate = useNavigate();

  // Обработчик клика по кнопке
  const handleBuyMedicineClick = () => {
    navigate('/medicine-store'); // Перенаправление на страницу MedicineStorePage
  };

  return (
    <>
      <div className={css.addPharmacyPromo}>
    
        <div className={css.content}>
          <h1 className={css.title}>Add your local pharmacy online now</h1>
          <p className={css.description}>
            Enjoy the convenience of having your prescriptions filled from home
            by connecting with your community pharmacy through our online
            platform.
          </p>

          <button className={css.button} onClick={handleBuyMedicineClick}>
            Buy medicine
          </button>
        </div>
        <div className={css.imgWrapper}>
          <picture>
          
            <source
              media='(min-width: 1440px)'
              srcSet={`${imageDesktop1x} 1x, ${imageDesktop2x} 2x`}
              type='image/webp'
            />

         
            <source
              media='(min-width: 768px)'
              srcSet={`${imageTablet1x} 1x, ${imageTablet2x} 2x`}
              type='image/webp'
            />

          
            <img
              src={imageMobile}
              srcSet={`${imageMobile1x} 1x, ${imageMobile2x} 2x`}
              alt='Add the medicines you need online now'
              loading='lazy'
              // width='295'
              // height='634'
            />
          </picture>
        </div>
      </div>

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
