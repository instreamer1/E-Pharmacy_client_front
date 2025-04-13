import css from './LineContainer.module.css';

const LineContainer = () => {
  return (
    <div className={css.linesContainer}>
      <div className={css.line}></div>
      <div className={css.line}></div>
      <div className={css.line}></div>
    </div>
  );
};

export default LineContainer;
