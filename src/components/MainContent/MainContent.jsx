import css from './MainContent.module.css';

const MainContent = () => {
  return (
    <div className={css.mainContent}>
      <div className={css.promo}></div>
      <p className={css.description}>
        Your medication, delivered Say goodbye to all{' '}
        <span>your healthcare</span> worries with us
      </p>
    </div>
  );
};

export default MainContent;
