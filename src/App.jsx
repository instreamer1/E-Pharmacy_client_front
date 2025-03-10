import { useState } from 'react'
import './App.css'
import SharedLayout from './components/SharedLayout/SharedLayout';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MedicineStorePage from './pages/MedicineStorePage/MedicineStorePage';

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} /> 
          <Route path="medicine-store" element={<MedicineStorePage />} />
          {/* <Route path="medicine" element={<MedicinePage />} /> */}
        
          
        </Route>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} /> 
      </Routes>
   
  );
};

export default App
