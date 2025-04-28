import { useState } from 'react';
import css from './TabsContainer.module.css';

export const TabsContainer = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className={css.tabsContainer}>
      <div className={css.tabs}>
        <button
          className={`${css.text} ${activeTab === 'description' ? css.active : css.tab}`}
          onClick={() => setActiveTab('description')}>
          Description
        </button>
        <button
          className={`${css.text} ${activeTab === 'reviews' ? css.active : css.tab}`}
          onClick={() => setActiveTab('reviews')}>
          Reviews
        </button>
      </div>

      <div className={css.content}>
        {activeTab === 'description' ? (
          <div className={css.description}>
            {product?.description && <p className={css.descGeneral} >{product.description.general}</p>}
            {product?.description && (
              <ul className={css.list} >
                {product.description.medicinalUses.map((item, i) => (
                  <li className={css.item} key={i}>
                    <strong className={css.title} >{item.title}</strong>: {item.text}
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
