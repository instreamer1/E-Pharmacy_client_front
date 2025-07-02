import { Link } from 'react-router-dom';
import css from './OrderSuccessPage.module.css';

const OrderSuccessPage = () => {
  return (
    <section className={css.successPage}>
      <div className={css.container}>
        <h1 className={css.title}>🎉 Thank You!</h1>
        <p className={css.message}>Your order has been placed successfully.</p>
        <Link to='/' className={css.homeLink}>
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default OrderSuccessPage;
