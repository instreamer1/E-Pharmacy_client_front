import css from './FooterSocialMediaIcons.module.css'
import iconSprite from '../../assets/sprite.svg';

const FooterSocialMediaIcons = () => {
    return (
      <ul className={css.iconList}>
        <li className={css.iconItem}>
          <a href="https://www.facebook.com/goITclub/" target="_blank" rel="noopener noreferrer"className={css.iconItemLink}>
            <svg className={css.icon}><use href={`${iconSprite}#icon-facebook`}></use></svg>
          </a>
        </li>
        <li className={css.iconItem}>
          <a href="https://www.instagram.com/goitclub/" target="_blank" rel="noopener noreferrer"className={css.iconItemLink}>
           <svg className={css.icon}><use href={`${iconSprite}#icon-instagram`}></use></svg>

          </a>
        </li>
        <li className={css.iconItem}>
          <a href="https://www.youtube.com/c/GoIT" target="_blank" rel="noopener noreferrer"className={css.iconItemLink}>
          <svg className={css.icon}><use href={`${iconSprite}#icon-youtube`}></use></svg>
          </a>
        </li>
      </ul>
    );
  };

  export default FooterSocialMediaIcons