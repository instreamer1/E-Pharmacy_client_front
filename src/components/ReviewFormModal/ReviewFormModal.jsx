import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import css from './ReviewFormModal.module.css';
import Modal from '../Modal/Modal';
import InputField from '../InputField/InputField';
import iconSprite from '../../assets/sprite.svg';
import { yupResolver } from '@hookform/resolvers/yup';

const ratingLabels = ['Bad', 'So-so', 'Okay', 'Good', 'Excellent'];

const ReviewFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialReviewData,
  userName,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(initialReviewData),
    defaultValues: {
      name: userName || '',
      rating: initialReviewData?.rating || 0,
      testimonial: initialReviewData?.testimonial || '',
    },
  });

  const rating = watch('rating', 0);

  useEffect(() => {
    if (initialReviewData) {
      reset({
        name: userName || '',
        rating: initialReviewData.rating || 0,
        testimonial: initialReviewData.testimonial || '',
      });
    } else {
      reset({ name: userName || '', rating: 0, testimonial: '' });
    }
  }, [initialReviewData, userName, reset]);

  const handleFormSubmit = data => {
    onSubmit(data);
    onClose();
  };

  const selectRating = value => {
    setValue('rating', value, { shouldValidate: true });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalBackdrop}>
        <div className={css.reviewModal} onClick={e => e.stopPropagation()}>
          <h2 className={css.title}>
            {initialReviewData ? 'Edit Review' : 'Write a Review'}
          </h2>

          <form onSubmit={handleSubmit(handleFormSubmit)} className={css.form}>
            <label className={css.label}>Rate this product</label>
            <div className={css.ratingBlock}>
              {ratingLabels.map((label, index) => {
                const value = index + 1;
                return (
                  <div
                    className={css.rating}
                    key={value}
                    onClick={() => selectRating(value)}>
                    <svg
                      className={`${css.icon}  ${
                        rating >= value ? css.orange : css.default
                      }`}>
                      <use href={`${iconSprite}#icon-star`}></use>
                    </svg>
                    <div>{label}</div>
                  </div>
                );
              })}
            </div>
            {errors.rating && (
              <p className={css.error}>{errors.rating.message}</p>
            )}

            <InputField
              name='name'
              placeholder='User Name'
              error={errors.name?.message}
              {...register('name')}
            />

            <label className={css.label}>Your review </label>
            <textarea {...register('testimonial')} className={css.textarea} />
            {errors.testimonial && (
              <span className={css.error}>{errors.testimonial.message}</span>
            )}

            <input type='hidden' {...register('rating')} />

            <div className={css.actions}>
              <button
                type='button'
                onClick={onClose}
                className={css.cancel}
                disabled={isSubmitting}>
                Cancel
              </button>
              <button
                type='submit'
                className={css.submit}
                disabled={!isValid || isSubmitting}>
                {initialReviewData ? 'Save Changes' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ReviewFormModal;
