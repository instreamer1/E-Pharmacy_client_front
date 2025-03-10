import css from './MainContent.module.css';

const MainContent = () => {
  return (
    <div className={css.mainContent}>
      <div className={css.promo}>
        <img src='/path/to/background.jpg' alt='Background' />
        <p>
          Your medication, delivered Say goodbye to all your healthcare worries
          with us
        </p>
      </div>
   
    </div>
  );
};

export default MainContent;
