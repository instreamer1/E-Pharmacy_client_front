import { Link } from 'react-router-dom';
import css from './FooterLinks.module.css'


const FooterLinks = () => {
    return (
      <nav>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-conditions">Terms & Conditions</Link>
            </li>
          </ul>
      </nav>
    );
  };

  export default FooterLinks