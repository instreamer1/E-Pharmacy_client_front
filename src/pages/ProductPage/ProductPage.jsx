import { useParams } from 'react-router-dom';
import { ProductOverview } from '../../components/ProductOverview/ProductOverview';
import { TabsContainer } from '../../components/TabsContainer/TabsContainer';
import css from './ProductPage.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/productsSlice/operations';
import { selectProduct } from '../../redux/productsSlice/selectors';
import { selectIsLoggedIn } from '../../redux/authSlice/selectors';

const ProductPage = () => {

const { id } = useParams();
const product = useSelector(selectProduct)
 const isLoggedIn = useSelector(selectIsLoggedIn);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getProductById(id))

  
  }, [dispatch, id]);
  if (!product) {
    return <div className={css.loader}>Loading...</div>; 
  }

  return (
    <section className={css.productPage}>
      <div className={css.container}>
        <ProductOverview product={product} />
        <TabsContainer
        product={product}
 
        />
      </div>
    </section>
  );
};

export default ProductPage;
