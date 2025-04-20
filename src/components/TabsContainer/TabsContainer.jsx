import { useState } from 'react';
import css from './TabsContainer.module.css';

export const TabsContainer = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className={css.tabsContainer}>
      <div className={css.tabs}>
        <button
          className={activeTab === 'description' ? css.active : ''}
          onClick={() => setActiveTab('description')}>
          Description
        </button>
        <button
          className={activeTab === 'reviews' ? css.active : ''}
          onClick={() => setActiveTab('reviews')}>
          Reviews
        </button>
      </div>

      <div className={css.content}>
        {activeTab === 'description' ? (
          <div className={css.description}>
            {product?.description && <p>{product.description.general}</p>}
            {product?.description && (
              <ul>
                {product.description.medicinalUses.map((item, i) => (
                  <li key={i}>
                    <strong>{item.title}</strong>: {item.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className={css.reviews}>
            {product.reviews.map((review, i) => (
              <div key={i} className={css.review}>
                <p>
                  <strong>{review.user}</strong> — {review.date}
                </p>
                <p>{review.text}</p>
                <p>⭐ {review.rating}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
