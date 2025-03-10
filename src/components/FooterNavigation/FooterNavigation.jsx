import { Link } from 'react-router-dom';
import css from './FooterNavigation.module.css'


const FooterNavigation = () => {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/medicine-store">Medicine store</Link>
          </li>
          <li>
            <Link to="/medicine">Medicine</Link>
          </li>
        </ul>
      </nav>
    );
  };

  export default FooterNavigation