import { useState } from 'react';
import css from './TabsContainer.module.css';
import iconSprite from '../../assets/sprite.svg';

export const TabsContainer = ({ product, reviews, openReviewModal }) => {
  const [activeTab, setActiveTab] = useState('description');

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    return rtf.format(-diffInDays, 'day');
  }

  return (
    <>
      <div className={css.tabsContainer}>
        <div className={css.tabs}>
          <button
            className={`${css.text} ${
              activeTab === 'description' ? css.active : css.tab
            }`}
            onClick={() => setActiveTab('description')}>
            Description
          </button>
          <button
            className={`${css.text} ${
              activeTab === 'reviews' ? css.active : css.tab
            }`}
            onClick={() => setActiveTab('reviews')}>
            Reviews
          </button>
        </div>

        <div className={css.content}>
          {activeTab === 'description' ? (
            <div className={css.description}>
              {product?.description && (
                <p className={css.descGeneral}>{product.description.general}</p>
              )}
              {product?.description && (
                <ul className={css.list}>
                  {product.description.medicinalUses.map((item, i) => (
                    <li className={css.item} key={i}>
                      <strong className={css.title}>{item.title}</strong>:{' '}
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <>
              <div className={css.leaveReview}>
                Leave your review
                <button
                  className={css.addReview}
                  type='button'
                  aria-label='Write a review'
                  onClick={openReviewModal}>
                  Write a review
                </button>
              </div>
              {reviews && reviews.length > 0 ? (
                <ul className={css.reviews}>
                  {reviews.map((review, i) => (
                    <li key={review._id} className={css.review}>
                      <div className={css.wrapper}>
                        <div className={css.imgWrapper}>
                          <img src={review.avatar || null} alt='avatar' />
                        </div>
                        <div className={css.reviewUser}>
                          <p className={css.reviewUserName}>{review.name}</p>

                          <p className={css.reviewData}>
                            {timeAgo(review.createdAt)}
                          </p>
                        </div>
                        <p className={css.rating}>
                          <svg className={css.icon}>
                            <use href={`${iconSprite}#icon-star`}></use>
                          </svg>
                          {review.rating}
                        </p>
                      </div>
                      <p className={css.reviewText}>{review.testimonial}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Your review will be the first</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
