import FooterBottom from '../FooterBottom/FooterBottom';
import FooterLinks from '../FooterLinks/FooterLinks';
import FooterLogo from '../FooterLogo/FooterLogo';
import FooterSocialMediaIcons from '../FooterSocialMediaIcons/FooterSocialMediaIcons';
import FooterText from '../FooterText/FooterText';
import FooterNavigationLinks from '../FooterNavigationLinks/FooterNavigationLinks';

import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.footerLogo}>
          <FooterLogo />
        </div>
        <div className={css.footerText}>
          <FooterText />
        </div>
        <div className={css.footerSocial}>
          <FooterSocialMediaIcons />
        </div>
        <div className={css.footerNavigation}>
          <FooterNavigationLinks />
        </div>
        <div className={css.footerBottom}>
          <FooterBottom />
        </div>
        <div className={css.footerLinks}>
          <FooterLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
