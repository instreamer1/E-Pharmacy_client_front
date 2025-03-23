import { Link, useLocation } from 'react-router-dom';
import css from './FooterLinks.module.css';
import { useEffect } from 'react';

const FooterLinks = () => {
  const { pathname } = useLocation();


  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 50);
  }, [pathname]);

  return (
    <>
      <Link className={`${css.link} ${css.line}`} to='/privacy-policy'>
        Privacy Policy
      </Link>

      <Link className={css.link} to='/terms-conditions'>
        Terms & Conditions
      </Link>
    </>
  );
};

export default FooterLinks;
