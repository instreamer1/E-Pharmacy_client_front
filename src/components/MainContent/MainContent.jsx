import css from './MainContent.module.css';
// import  roundPill from '../../assets/images/white round pill_1x.png'
const MainContent = () => {
  return (
    <div className={css.mainContent}>
      <div className={css.promo}></div>
      {/* <img src={roundPill} alt='Background' /> */}
      <p className={css.description}>
        Your medication, delivered Say goodbye to all{' '}
        <span>your healthcare</span> worries with us
      </p>
    </div>
  );
};

export default MainContent;
