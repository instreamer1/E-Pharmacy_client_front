import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import css from "./SharedLayout.module.css"
import { Outlet } from 'react-router-dom';


const SharedLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Вложенные маршруты рендерятся здесь */}
      </main>
      <Footer />
    </>
  );
};

export default SharedLayout;