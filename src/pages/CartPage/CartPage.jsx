import css from './CartPage.module.css';
import { useEffect } from 'react';
import iconSprite from '../../assets/sprite.svg';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import {
  checkoutCart,
  fetchCart,
  updateCartItem,
} from '../../redux/cartSlice/operation';
import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cartSlice/selectors';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const total = subtotal;

  const shippingInfo = useSelector(state => state.cart.shippingInfo);
  const paymentMethod = useSelector(state => state.cart.paymentMethod);
  const checkoutSuccess = useSelector(state => state.cart.checkoutSuccess);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // useEffect(() => {
  //   if (checkoutSuccess) {
  //     navigate('/order-success');
  //   }
  // }, [checkoutSuccess, navigate]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ productId: id, quantity: newQuantity }));
  };

  const removeItem = id => {
    dispatch(updateCartItem({ productId: id, quantity: 0 }));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    dispatch({
      type: 'cart/setShippingInfo',
      payload: { ...shippingInfo, [name]: value },
    });
  };

  const handlePaymentChange = value => {
    dispatch({ type: 'cart/setPaymentMethod', payload: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      checkoutCart({
        items: items.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        shippingInfo,
        paymentMethod,
        total,
        createdAt: new Date().toISOString(),
      })
    );
  };

  return (
    <section className={css.cartPage}>
      <div className={css.container}>
        <div className={css.firstBlock}>
          <h1 className={css.cartTitle}>Cart</h1>
          <div className={css.cartForm}>
            <form onSubmit={handleSubmit} className={css.form}>
              <h2 className={css.formTitle}>Enter shipping info</h2>
              <p className={css.formDescription}>
                Enter your delivery address where you get the product. You can
                also send any other location where you send the products.
              </p>

              <section className={css.enterSection}>
                {['name', 'email', 'phone', 'address'].map(field => (
                  <div className={css.formGroup} key={field}>
                    <label htmlFor={field} className={css.label}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={shippingInfo[field] || ''}
                      onChange={handleInputChange}
                      className={css.input}
                      placeholder='Enter text'
                      required
                    />
                  </div>
                ))}
              </section>

              <section className={css.paymentMethodsSection}>
                <h2 className={css.paymentMethodsTitle}>Payment method</h2>
                <p className={css.paymentMethodsDescription}>
                  You can pay us in a multiple way in our payment gateway
                  system.
                </p>
                <div className={css.paymentMethods}>
                  {['Cash On Delivery', 'Bank'].map(method => (
                    <label key={method} className={css.paymentMethod}>
                      <input
                        type='radio'
                        name='payment'
                        checked={paymentMethod === method}
                        onChange={() => handlePaymentChange(method)}
                        className={css.radioInput}
                      />
                      <span className={css.customRadio}></span>
                      <span className={css.radioLabel}>{method}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className={css.orderSection}>
                <h2 className={css.orderTitle}>Order details</h2>
                <p className={css.orderDescription}>
                  Shipping and additional costs are calculated based on values
                  you have entered.
                </p>
                <div className={css.orderSummary}>
                  <div className={css.totalRow}>
                    <span className={css.totalLabel}>Total:</span>
                    <span className={css.totalAmount}>${total.toFixed(2)}</span>
                  </div>
                </div>
              </section>

              <button
                type='submit'
                className={css.submitButton}
                aria-label='submit'>
                Place order
              </button>
            </form>
          </div>
        </div>

        <section className={css.goodsSection}>
          <ul className={css.itemsList}>
            {items.map(item => (
              <li key={item.productId._id} className={css.cartItem}>
                <div className={css.imgWrapper}>
                  <img
                    src={item.productId.photo || ''}
                    alt={item.productId.name}
                    className={css.medicineImage}
                  />
                </div>
                <div className={css.itemInfoWrap}>
                  <div className={css.itemInfo}>
                    <h3 className={css.itemName}>{item.productId.name}</h3>
                    <p className={css.itemPrice}>${item.productId.price}</p>
                  </div>
                  <div className={css.itemActions}>
                    <div className={css.quantityControl}>
                      <button
                        type='button'
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity + 1
                          )
                        }
                        className={css.quantityButton}>
                        <svg className={css.quantityIcon}>
                          <use href={`${iconSprite}#icon-plus`} />
                        </svg>
                      </button>
                      <span className={css.quantityValue}>{item.quantity}</span>
                      <button
                        type='button'
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity - 1
                          )
                        }
                        className={css.quantityButton}>
                        <svg className={css.quantityIcon}>
                          <use href={`${iconSprite}#icon-minus`} />
                        </svg>
                      </button>
                    </div>
                    <button
                      type='button'
                      onClick={() => removeItem(item.productId._id)}
                      className={css.removeButton}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default CartPage;
