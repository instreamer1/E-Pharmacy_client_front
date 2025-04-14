import './App.css';
import { lazy, Suspense } from 'react';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './pages/PrivateRoute';
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
const CardPage = lazy(() => import('./pages/CardPage/CardPage'));

const App = () => {
  return (
    <Suspense fallback={<div className='loading'>Loading...</div>}>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path='medicine-store' element={<MedicineStorePage />} />
          <Route path='medicine' element={<MedicinePage />} />
          {/* <Route path='card-page' element={<CardPage/>}/> */}

          <Route
            path='card-page'
            element={
              <PrivateRoute redirectTo='/login'>
                <CardPage />
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
      <Toaster />
    </Suspense>
  );
};

export default App;
