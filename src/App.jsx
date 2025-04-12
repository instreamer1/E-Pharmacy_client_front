import './App.css';
import { lazy, Suspense } from 'react';
import SharedLayout from './components/SharedLayout/SharedLayout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MedicineStorePage from './pages/MedicineStorePage/MedicineStorePage';
import MedicinePage from './pages/MedicinePage/MedicinePage';
import ChangePasswordPage from './components/ChangePasswordPage/ChangePasswordPage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Suspense fallback={<div className='loading'>Loading...</div>}>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path='medicine-store' element={<MedicineStorePage />} />
          <Route path='medicine' element={<MedicinePage />} />
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
