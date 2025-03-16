import { Link, useLocation } from 'react-router-dom';
import css from './FooterLinks.module.css'
import { useEffect } from 'react';


const FooterLinks = () => {

  const { pathname } = useLocation();

  // useEffect(() => {
  //   window.scrollTo({ top: -1, left: 0, behavior: "smooth" });
  // }, [pathname]); 

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 50);
  }, [pathname]);


    return (
      <>
     {/* <nav>
         <ul className={css.linksList} >
            <li className={css.linkItem}> */}
              <Link className={`${css.link} ${css.line}`} to="/privacy-policy">Privacy Policy</Link>
             {/* </li>
             <li className={css.linkItem}> */}
              <Link className={css.link} to="/terms-conditions">Terms & Conditions</Link>
            {/* </li>
          </ul>
      </nav> */}
      </>
    );
  };

  export default FooterLinks