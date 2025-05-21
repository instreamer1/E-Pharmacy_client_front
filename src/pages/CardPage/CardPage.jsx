import css from './CardPage.module.css';

import { useState } from 'react';
import iconSprite from '../../assets/sprite.svg';

const CartPage = () => {
  // Состояние формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cartItems, setCartItems] = useState([
    {
      _id: 1,
      name: 'Vitamin C Medicine',
      description: 'Antioxidant Aid for Heart Health',
      price: 90.0,
      quantity: 1,
    },
    {
      _id: 2,
      name: 'Stomach Medicine',
      description: 'Soothes Indigestion, Eases Stomach Pain',
      price: 32.0,
      quantity: 1,
    },
  ]);

  // Обработчики изменений
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Здесь будет запрос к бэкенду
    console.log('Order placed:', { formData, paymentMethod, cartItems });
  };

  // Расчет общей суммы
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal; // Здесь можно добавить расчет доставки

  return (
    <section className={css.cartPage}>
      <div className={css.container}>
        <h1 className={css.cartTitle}>Cart</h1>
        {/* Секция информации о доставке */}
        <div className={css.cartForm}>
          <form onSubmit={handleSubmit} className={css.form}>
            <h2 className={css.formTitle}>Enter shipping info</h2>
            <p className={css.formDescription}>
              Enter your delivery address where you get the product. You can
              also send any other location where you send the products.
            </p>

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

            {/* Секция способа оплаты */}
            <section className={css.paymentMethodsSection}>
              <h2 className={css.paymentMethodsTitle}>Payment method</h2>
              <p className={css.paymentMethodsDescription}>
                You can pay us in a multiple way in our payment gateway system.
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
                  <span className={css.radioLabel}>Bank</span>
                </label>
              </div>
            </section>

            {/* Секция итогов */}
            <section className={css.orderSection}>
              <h2 className={css.orderTitle}>Order details</h2>
              <p className={css.orderDescription}>
                Shipping and additional costs are calculated based on values you
                have entered.
              </p>

              <div className={css.orderSummary}>
                <div className={css.totalRow}>
                  <span className={css.totalLabel}>Total:</span>
                  <span className={css.totalAmount}>${total.toFixed(2)}</span>
                </div>
              </div>
            </section>

            <button type='submit' className={css.submitButton}>
              Place order
            </button>
          </form>
        </div>

        {/* Секция товаров */}
        <section className={css.goodsSection}>
          {/* <h2 className={css.sectionTitle}>Your items</h2> */}

          <ul className={css.itemsList}>
            {cartItems.map(item => (
              <li key={item._id} className={css.cartItem}>
                <div className={css.imgWrapper}>
                  <img
                    src={item.photo || null}
                    alt={item.name}
                    className={css.medicineImage}
                  />
                </div>
                <div className={css.itemInfoWrap}>
                  <div className={css.itemInfo}>
                    <h3 className={css.itemName}>{item.name}</h3>
                    <p className={css.itemDescription}>{item.description}</p>
                    <p className={css.itemPrice}>${item.price.toFixed(2)}</p>
                  </div>

                  <div className={css.itemActions}>
                    <div className={css.quantityControl}>
                      <button
                        type='button'
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className={css.quantityButton}>
                        <svg className={css.quantityIcon}>
                          <use href={`${iconSprite}#icon-plus`}></use>
                        </svg>
                      </button>
                      <span className={css.quantityValue}>{item.quantity}</span>
                      <button
                        type='button'
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className={css.quantityButton}>
                        <svg className={css.quantityIcon}>
                          <use href={`${iconSprite}#icon-minus`}></use>
                        </svg>
                      </button>
                    </div>

                    <button
                      type='button'
                      onClick={() => removeItem(item.id)}
                      className={css.removeButton}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <svg className={css.lineSeparator}>
              <use href={`${iconSprite}#lineSeparator`}></use>
            </svg>
          </ul>
        </section>
      </div>
    </section>
  );
};

export default CartPage;
