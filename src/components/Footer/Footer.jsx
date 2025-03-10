import FooterBottom from '../FooterBottom/FooterBottom';
import FooterLogo from '../FooterLogo/FooterLogo';
import FooterNavigation from '../FooterNavigation/FooterNavigation';
import FooterSocialMediaIcons from '../FooterSocialMediaIcons/FooterSocialMediaIcons';
import FooterText from '../FooterText/FooterText';
import css from './Footer.module.css'

const Footer = () => {
    return (
      <footer className={css.footer}>
        <FooterLogo />
        <FooterText />
        <FooterSocialMediaIcons />
        <FooterNavigation />
        <FooterBottom />
      </footer>
    );
  };
  
  export default Footer;