import css from './CartPage.module.css';

import { useEffect, useState } from 'react';
import iconSprite from '../../assets/sprite.svg';
import {
  fetchCart,
  removeFromCart,
  updateCartItem,
} from '../../redux/cartSlice/operation';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cartSlice/selectors';

const CartPage = () => {
  const dispatch = useDispatch();

  // useEffect(()=> {
  //   dispatch(fetchCart())
  // },[dispatch])
  // Состояние формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);

  const [paymentMethod, setPaymentMethod] = useState('');
 

  // Обработчики изменений
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (id, newQuantity) => {
    console.log('newQuantity', newQuantity);
    if (newQuantity < 1) return;
    // setCartItems(
    //   cartItems.map(item =>
    //     item._id === id ? { ...item, quantity: newQuantity } : item
    //   )
    // );
    console.log('newQuantity', newQuantity);
    dispatch(updateCartItem({ productId: id, quantity: newQuantity }));
  };

  const removeItem = id => {
    console.log(id);
    // setCartItems(cartItems.filter(item => item.id !== id));
    dispatch(updateCartItem({ productId: id, quantity: 0 }));
    //  dispatch(removeFromCart(id));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Здесь будет запрос к бэкенду
    // console.log('Order placed:', { formData, paymentMethod, cartItems });
  };

  // Расчет общей суммы
  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );
  const total = subtotal; // Здесь можно добавить расчет доставки

  return (
    <section className={css.cartPage}>
      <div className={css.container}>
        <div className={css.firstBlock}>
          <h1 className={css.cartTitle}>Cart</h1>
          {/* Секция информации о доставке */}
          <div className={css.cartForm}>
            <form onSubmit={handleSubmit} className={css.form}>
              <h2 className={css.formTitle}>Enter shipping info</h2>
              <p className={css.formDescription}>
                Enter your delivery address where you get the product. You can
                also send any other location where you send the products.
              </p>

              <section className={css.enterSection}>
                <div className={css.formGroup}>
                  <label htmlFor='name' className={css.label}>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    className={css.input}
                    placeholder='Enter text'
                    required
                  />
                </div>

                <div className={css.formGroup}>
                  <label htmlFor='email' className={css.label}>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className={css.input}
                    placeholder='Enter text'
                    required
                  />
                </div>

                <div className={css.formGroup}>
                  <label htmlFor='phone' className={css.label}>
                    Phone
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={css.input}
                    placeholder='Enter text'
                    required
                  />
                </div>

                <div className={css.formGroup}>
                  <label htmlFor='address' className={css.label}>
                    Address
                  </label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className={css.input}
                    placeholder='Enter text'
                    required
                  />
                </div>
              </section>

              {/* Секция способа оплаты */}
              <section className={css.paymentMethodsSection}>
                <h2 className={css.paymentMethodsTitle}>Payment method</h2>
                <p className={css.paymentMethodsDescription}>
                  You can pay us in a multiple way in our payment gateway
                  system.
                </p>

                <div className={css.paymentMethods}>
                  <label className={css.paymentMethod}>
                    <input
                      type='radio'
                      name='payment'
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className={css.radioInput}
                    />
                    <span className={css.customRadio}></span>
                    <span className={css.radioLabel}>Cash On Delivery</span>
                  </label>

                  <label className={css.paymentMethod}>
                    <input
                      type='radio'
                      name='payment'
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className={css.radioInput}
                    />
                    <span className={css.customRadio}></span>
                    <span className={css.radioLabel}>Bank</span>
                  </label>
                </div>
              </section>

              {/* Секция итогов */}
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

              <button type='submit' className={css.submitButton} aria-label='submit'>
                Place order
              </button>
            </form>
          </div>
        </div>

        {/* Секция товаров */}
        <section className={css.goodsSection}>
          {/* <h2 className={css.sectionTitle}>Your items</h2> */}

          <ul className={css.itemsList}>
            {items.map(item => (
              <li key={item.productId._id} className={css.cartItem}>
                <div className={css.imgWrapper}>
                  <img
                    src={item.productId.photo || null}
                    alt={item.name}
                    className={css.medicineImage}
                  />
                </div>
                <div className={css.itemInfoWrap}>
                  <div className={css.itemInfo}>
                    <h3 className={css.itemName}>{item.productId.name}</h3>
                    <p className={css.itemDescription}>{item.description}</p>
                    <p className={css.itemPrice}>${item.productId.price}</p>
                  </div>

                  <div className={css.itemActions}>
                    <div className={css.quantityControl}>
                      <button
                        type='button'
                        aria-label='increase'
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity + 1
                          )
                        }
                        className={css.quantityButton}>
                        <svg className={css.quantityIcon}>
                          <use href={`${iconSprite}#icon-plus`}></use>
                        </svg>
                      </button>
                      <span className={css.quantityValue}>{item.quantity}</span>
                      <button
                        type='button'
                        aria-label='decrease'
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity - 1
                          )
                        }
                        className={css.quantityButton}>
                        <svg className={css.quantityIcon}>
                          <use href={`${iconSprite}#icon-minus`}></use>
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
            {/* <svg className={css.lineSeparator}>
              <use href={`${iconSprite}#lineSeparator`}></use>
            </svg> */}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default CartPage;
