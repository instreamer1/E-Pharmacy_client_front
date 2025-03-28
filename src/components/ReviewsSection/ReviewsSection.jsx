import css from './ReviewsSection.module.css';

import { useEffect, useRef, useState } from 'react';

const ReviewsSection = () => {
  const listRef = useRef();

  const smoothScroll = e => {
    e.preventDefault();
    listRef.current.scrollBy({
      left: e.deltaY > 0 ? 200 : -200,
      behavior: 'smooth',
    });
  };
  //   const [reviews, setReviews] = useState([]);

  // Запрос на API для получения отзывов (пример)
  //   useEffect(() => {
  //     const fetchReviews = async () => {
  //       try {
  //         const response = await fetch('/api/reviews'); // Замените на ваш API
  //         const data = await response.json();
  //         setReviews(data);
  //       } catch (error) {
  //         console.error('Ошибка при загрузке отзывов:', error);
  //       }
  //     };

  //     fetchReviews();
  //   }, []);

  const reviews = [
    {
      id: 1,
      photo: 'https://i.imgur.com/1As0akH.png',
      name: 'Maria Tkachuk',
      text: 'I recently used this medical platform to book an appointment with a specialist, and I was impressed by how easy and user-friendly the process was. Highly recommended!',
    },
    {
      id: 2,
      photo: 'https://i.imgur.com/UYCE7Rr.png',
      name: 'Sergey Rybachok',
      text: 'I had a great experience using this medical platform to access my health records. This platform is a game-changer for managing my healthcare needs.',
    },
    {
      id: 3,
      photo: 'https://i.imgur.com/hz6bZkb.png',
      name: 'Natalia Chatuk',
      text: 'I recently had a virtual appointment with my doctor through this medical platform, and I was pleasantly surprised by how seamless the experience was.',
    },
  ];

  return (
    <div className={css.reviewsWrapper}>
      <div className={css.header}>
        <h1 className={css.title}>Reviews</h1>
        <p className={css.description}>
          Search for Medicine, Filter by your location
        </p>
      </div>
      <ul className={css.reviewsList} ref={listRef} onWheel={smoothScroll}>
        {reviews.map(review => (
          <li key={review.id} className={css.reviewCard}>
            <div className={css.photoWrapper}>
              <img
                src={review.photo}
                alt={review.name}
                className={css.userPhoto}
              />
            </div>
            <div className={css.cardBlock}>
              <h2 className={css.userName}>{review.name}</h2>
              <p className={css.reviewText}>{review.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsSection;
