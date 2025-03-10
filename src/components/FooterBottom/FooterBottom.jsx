import { Link } from 'react-router-dom';
import css from './FooterBottom.module.css'

const FooterBottom = () => {
    return (
      <div>
        <p>© E-Pharmacy 2023. All Rights Reserved</p>
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
      </div>
    );
  };

  export default FooterBottom