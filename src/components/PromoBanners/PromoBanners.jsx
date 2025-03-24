import css from './PromoBanners.module.css'



import { useNavigate } from 'react-router-dom'; 

const PromoBanners = () => {
  const navigate = useNavigate();

  // Обработчики для кнопок
  const handleShopNow70 = () => {
    // Запрос на бэкенд для поиска товаров со скидкой 70%
    // Например, fetch('/api/products?discount=70')
    navigate('/search?discount=70'); // Перенаправление на страницу поиска
  };

  const handleReadMore = () => {
    navigate('/feature'); // Перенаправление на страницу Feature
  };

  const handleShopNow35 = () => {
    // Запрос на бэкенд для поиска товаров со скидкой 35%
    // Например, fetch('/api/products?discount=35')
    navigate('/search?discount=35'); // Перенаправление на страницу поиска
  };

  return (
    <div className={css.promoBanners}>
      {/* Banner 1 */}
      <div className={css.banner}>
        <div className={css.numberWrap}>
          <p className={css.number}>1</p>
        </div>
        <h2 className={css.title}>Huge Sale</h2>
        <p className={css.discount}>70%</p>
        <button className={css.button} onClick={handleShopNow70}>
          Shop now
        </button>
      </div>

      {/* Banner 2 */}
      <div className={css.banner}>
      <div className={css.numberWrap}>
          <p className={css.number}>2</p>
        </div>
        <h2 className={css.title}>Secure delivery</h2>
        <p className={css.guarantee}>100%</p>
        <button className={css.button} onClick={handleReadMore}>
          Read more
        </button>
      </div>

      {/* Banner 3 */}
      <div className={css.banner}>
      <div className={css.numberWrap}>
          <p className={css.number}>3</p>
        </div>
        <h2 className={css.title}>Off</h2>
        <p className={css.discount}>35%</p>
        <button className={css.button} onClick={handleShopNow35}>
          Shop now
        </button>
      </div>
    </div>
  );
};

export default PromoBanners;