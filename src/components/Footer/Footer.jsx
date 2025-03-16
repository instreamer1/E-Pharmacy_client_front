import FooterBottom from '../FooterBottom/FooterBottom';
import FooterLinks from '../FooterLinks/FooterLinks';
import FooterLogo from '../FooterLogo/FooterLogo';
import FooterSocialMediaIcons from '../FooterSocialMediaIcons/FooterSocialMediaIcons';
import FooterText from '../FooterText/FooterText';
import FooterNavigationLinks from '../FooterNavigationLinks/FooterNavigationLinks';
import css from './Footer.module.css';
import iconSprite from '../../assets/sprite.svg';

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
        <span className={css.footerLine}>
          <svg className={css.lineSeparator}>
            <use href={`${iconSprite}#lineSeparator`}></use>
          </svg>
        </span>
        <div className={css.footerWrapper}>
          {/* <div className={css.footerBottom}> */}
            <FooterBottom />
          {/* </div> */}
          {/* <div className={css.footerLinks}> */}
            <FooterLinks />
          {/* </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
