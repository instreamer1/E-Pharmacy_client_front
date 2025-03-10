import css from './MainBanner.module.css'



const MainBanner = () => {
  return (
    <div className={css.mainBanner}>
      <h1 className={css.mainBannerTitle}>Your medication delivered</h1>
      <p className={css.mainBannerSubtitle}>Say goodbye to all your healthcare worries with us</p>
    </div>
  );
};

export default MainBanner;