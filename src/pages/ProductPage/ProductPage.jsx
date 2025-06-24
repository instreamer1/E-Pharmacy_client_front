import { useParams } from 'react-router-dom';
import { ProductOverview } from '../../components/ProductOverview/ProductOverview';
import { TabsContainer } from '../../components/TabsContainer/TabsContainer';
import css from './ProductPage.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/productsSlice/operations';
import { selectProduct } from '../../redux/productsSlice/selectors';
import { selectIsLoggedIn, selectUser } from '../../redux/authSlice/selectors';
import ReviewFormModal from '../../components/ReviewFormModal/ReviewFormModal';
import { selectReviews } from '../../redux/reviewSlice/selectors';
import { createUserReview } from '../../redux/reviewSlice/operations';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setOpenRegisterModal } from '../../redux/authSlice/slice';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(1, 'Please select a rating'),
  testimonial: yup
    .string()
    .required('Review text is required')
    .min(5, 'Minimum 5 characters'),
});

const ProductPage = () => {
  const { id } = useParams();
  const product = useSelector(selectProduct);
  const reviews = useSelector(selectReviews);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
const user= useSelector(selectUser)
  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);
  if (!product) {
    return <div className={css.loader}>Loading...</div>;
  }

  const openReviewModal = () => {
    if (!isLoggedIn) {
      dispatch(setOpenRegisterModal());
      return;
    }
    setIsReviewModalOpen(true);
  };
  const handleReviewSubmit = data => {
    console.log('review', data);
    if (product.userReview) {
      dispatch(updateUserReview({ productId: id, reviewData: data }));
    } else {
      const credentials = { ...data, productId: id };
      console.log(credentials);
      dispatch(createUserReview(credentials));
    }
  };

  if (!product) return <div className={css.loader}>Loading...</div>;

  return (
    <>
      <section className={css.productPage}>
        <div className={css.container}>
          <ProductOverview product={product} />
          <TabsContainer
            product={product}
            reviews={reviews}
            openReviewModal={openReviewModal}
          />
        </div>
      </section>
      <ReviewFormModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
        initialReviewData={schema}
        userName={user.name}
      />
    </>
  );
};

export default ProductPage;
