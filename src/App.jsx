import './App.css';
import { lazy, Suspense, useEffect } from 'react';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './pages/PrivateRoute';
import AuthModalSwitcher from './components/AuthModalSwitcher/AuthModalSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from './redux/authSlice/selectors';
import { getUser, refresh } from './redux/authSlice/operations';
import { fetchCart } from './redux/cartSlice/operation';
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const MedicineStorePage = lazy(() =>
  import('./pages/MedicineStorePage/MedicineStorePage')
);
const MedicinePage = lazy(() => import('./pages/MedicinePage/MedicinePage'));
const ChangePasswordPage = lazy(() =>
  import('./components/ChangePasswordPage/ChangePasswordPage')
);

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
    const isLoggedIn = useSelector(selectIsLoggedIn);
   

  useEffect(() => {
  //   dispatch(refresh()); // при монтировании приложения пытаемся восстановить сессию
    if (isLoggedIn && !isRefreshing) {
      dispatch(getUser());
      dispatch(fetchCart());
    }
  }, [dispatch, isLoggedIn, isRefreshing]);

  //   useEffect(() => {
  //   if (isLoggedIn && !isRefreshing) {
  //     dispatch(getUser());
  //     dispatch(fetchCart());
  //   }
  // }, [dispatch, isLoggedIn, isRefreshing]);

  if (isRefreshing) {
    return <p>Loading...</p>; // или ваш Loader
  }
  return (
    <Suspense fallback={<div className='loading'>Loading...</div>}>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path='medicine-store' element={<MedicineStorePage />} />
          <Route path='medicine' element={<MedicinePage />} />
          <Route path='product/:id' element={<ProductPage />} />
          {/* <Route path='cart-page' element={<CardPage/>}/> */}
          {/* <Route
            path='medicine'
            element={
              <PrivateRoute redirectTo='/register'>
                <MedicinePage />
              </PrivateRoute>
            }
          /> */}
          <Route
            path='cart-page'
            element={
              <PrivateRoute redirectTo='/login'>
                <CartPage />
              </PrivateRoute>
            }
          />
          {/* <Route
            path='/register'
            element={
              <RestrictedRoute redirectTo='/profile'>
                <RegistrationPage />
              </RestrictedRoute>
            }
          /> */}
        </Route>
        <Route path='register' element={<RegisterPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='change-password' element={<ChangePasswordPage />} />
      </Routes>
      <AuthModalSwitcher />
      <Toaster />
    </Suspense>
  );
};

export default App;
