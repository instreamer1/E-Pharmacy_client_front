import AddPharmacyPromo from '../../components/AddPharmacyPromo/AddPharmacyPromo';
import MainBanner from '../../components/MainBanner/MainBanner';
import MedicineStores from '../../components/MedicineStores/MedicineStores';
import PromoBanners from '../../components/PromoBanners/PromoBanners';
import ReviewsSection from '../../components/ReviewsSection/ReviewsSection';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <section className={css.mainBanner} aria-label='Main banner'>
        <div className={css.container}>
          <MainBanner />
        </div>
      </section>

      <section className={css.promoBanners}>
        <div className={css.container}>
          <PromoBanners />
        </div>
      </section>

      <section className={css.medicineStores}>
        <div className={css.container}>
          <MedicineStores />
        </div>
      </section>

      <section className={css.addPharmacyPromo}>
        <div className={css.container}>
          <AddPharmacyPromo />
        </div>
      </section>

      <section className={css.reviewsSection}>
        <div className={css.container}>
          <ReviewsSection />
        </div>
      </section>
    </>
  );
};

export default HomePage;
